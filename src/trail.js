import {path} from "d3-path";
import constant from "./constant.js";
import {x as pointX, y as pointY, z as pointSize} from "./point.js";
import {abs, atan2, cos, pi, tau, sin, sqrt, max, min} from "./math.js";

export default function(x, y, size){
  var defined = constant(true),
      context = null,
      ready, 
      ready2,
      scaleRatio_min = 1,
      ct1,
      px1, py1, pr1,
      arp = []; 

  x = typeof x === "function" ? x : (x === undefined) ? pointX : constant(x);
  y = typeof y === "function" ? y : (y === undefined) ? pointY : constant(y);
  size = typeof size === "function" ? size : (size === undefined) ? pointSize : constant(size);

  function cross(x1, y1, x2, y2){
    return x1 * y2 - x2 * y1;
  }
  
  function isIntersect(x1, y1, x2, y2, x3, y3, x4, y4){
    //rapid repulsion
    if(max(x3, x4) < min(x1, x2) || max(y3, y4) < min(y1, y2) || max(x1, x2) < min(x3, x4) || max(y1, y2) < min(y3, y4)){
      return false;
    }
    
    //straddle experiment
    if(cross(x1 - x4, y1 - y4, x3 - x4, y3 - y4)*cross(x2 - x4, y2 - y4, x3 - x4, y3 - y4) > 0 ||
       cross(x3 - x2, y3 - y2, x1 - x2, y1 - y2)*cross(x4 - x2, y4 - y2, x1 - x2, y1 - y2) > 0){
      return false;
    }
    return true;
  }

  function intersectPoint(x1, y1, x2, y2, x3, y3, x4, y4){
    var d1 = abs(cross(x4 - x3, y4 - y3, x1 - x3, y1 - y3)),
        d2 = abs(cross(x4 - x3, y4 - y3, x2 - x3, y2 - y3)),
        t;

    if(!(d1 || d2)){
      return {
        x: x2,
        y: y2
      };
    }
    else{
      t = d1 / (d1 + d2);
      return {
        x: x1 + (x2 - x1) * t,
        y: y1 + (y2 - y1) * t
      };
    }  
  }

  function commonTangent(x1, y1, w1, x2, y2, w2){
    var r1 = w1 / 2,
        r2 = w2 / 2, 
        alpha, //the smallest angle in right-angled trapezoid
        alpha_x,
        alpha_y,
        beta, //the slope of line segment
        cos_x,
        sin_y;
        
    alpha_x = abs(r2 - r1);
    alpha_y = sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) - alpha_x * alpha_x);
    alpha = atan2(alpha_y, alpha_x);
    beta = atan2(y2 - y1, x2 - x1);

    if(r1 < r2){
      cos_x = -cos(alpha + beta);
      sin_y = -sin(alpha + beta);

      return {
        sg1_x: x1 + r1 * cos_x,
        sg1_y: y1 + r1 * sin_y,
        sg2_x: x2 + r2 * cos_x,
        sg2_y: y2 + r2 * sin_y,
        angle: alpha + beta - pi
      };
    }
    else{
      cos_x = cos(beta - alpha);
      sin_y = sin(beta - alpha);

      return {
        sg1_x: x1 + r1 * cos_x,
        sg1_y: y1 + r1 * sin_y,
        sg2_x: x2 + r2 * cos_x,
        sg2_y: y2 + r2 * sin_y,
        angle: beta - alpha
      };
    }
  }

  function segment(x1, y1, w1, x2, y2, w2){
    var ct2 = commonTangent(x1, y1, w1, x2, y2, w2);

    if(ready){
      if(isIntersect(ct1.sg1_x, ct1.sg1_y, ct1.sg2_x, ct1.sg2_y, ct2.sg1_x, ct2.sg1_y, ct2.sg2_x, ct2.sg2_y)){
        var p = intersectPoint(ct1.sg1_x, ct1.sg1_y, ct1.sg2_x, ct1.sg2_y, ct2.sg1_x, ct2.sg1_y, ct2.sg2_x, ct2.sg2_y);
            
        context.lineTo(p.x, p.y);
      }
      else{
        context.lineTo(ct1.sg2_x, ct1.sg2_y);
        context.arc(x1, y1, w1 / 2, ct1.angle, ct2.angle, 0);
      }
    }
    else{
      ready = 1;
      context.moveTo(ct2.sg1_x, ct2.sg1_y);
    }
    ct1 = ct2;
  }

  function scaleRatio(px2, py2, pw2, i){
    var pr2 = pw2 / 2;

    if(ready2){
      var lxy = sqrt((px1 - px2) * (px1 - px2) + (py1 - py2) * (py1 - py2));
      if(lxy){
        if(pr1 + pr2 > lxy){
          var sr = lxy / (pr1 + pr2);
          if(sr < scaleRatio_min){
            scaleRatio_min = sr;
          } 
        }
        arp[i] = false;
      }
      else{
        arp[i] = true; //when p1.x == p2.x and p1.y == p2.y
      }
    }
    else{
      ready2 = 1;
      arp[i] = false;
    }
    px1 = px2;
    py1 = py2;
    pr1 = pr2;
  }

  function trail(data){ 
    var i,
        n = data.length, 
        d,
        def,
        defined0 = false,
        defined1 = false,
        buffer,
        arx = [], //arrays of x(), y(), size(), defined()
        ary = [],
        ars = [],
        ard = [];

    //make global optimization for radius when r1 + r2 > lxy
    for(i = 0; i < n; i++){
      def = (ard[i] = defined(d = data[i], i, data)) && (ars[i] = +size(d, i, data));
      if(!(i < n && def) === defined1){
        if (defined1 = !defined1) ready2 = 0;
      }
      if(defined1) {
        scaleRatio(arx[i] = +x(d, i, data), ary[i] = +y(d, i, data), ars[i], i);
      }
    }

    if(context == null) context = buffer = path();

    var start,
        j,
        d1,
        def1,
        tag = false;

    for(i = 0; i < n; i++){
      def = ard[i] && ars[i];
      if(!(i < n && def) === defined0){
        if(defined0 = !defined0){
          ready = 0;
          start = i;
        }
      }
      if(defined0){
        j = i + 1;
        if(j < n){
          def1 = ard[j] && ars[j];
          if(def1){
            if(arp[j]){
              tag = true;
            }
            else{
              segment(arx[i], ary[i], ars[i] * scaleRatio_min, arx[j], ary[j], ars[j] * scaleRatio_min);
            }
          }
          else{
            tag = true;
          }
        }
        else{
          tag = true;
        }
        if(tag){
          j = i - 1;
          if(j < start){
            //draw a circle
            context.moveTo(arx[i] + ars[i] * scaleRatio_min / 2, ary[i]);
            context.arc(arx[i], ary[i], ars[i] * scaleRatio_min / 2, 0, tau, 0);
            context.closePath();
          }
          else{
            while(j >= start){
              d1 = data[j];
              segment(arx[j + 1], ary[j + 1], ars[j + 1] * scaleRatio_min, arx[j], ary[j], ars[j] * scaleRatio_min);
              d = d1;
              j -= 1;
            }
            j += 1;
            d1 = data[j + 1];
            segment(arx[j], ary[j], ars[j] * scaleRatio_min, arx[j + 1], ary[j + 1], ars[j + 1] * scaleRatio_min);

            context.closePath();
          }
          tag = false;
          ready = 0;
          start = i + 1;
        }
      }
    }

    if(buffer){
      context = null;
      return buffer + '' || null;
    }
  }

  trail.x = function(_){
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), trail) : x;
  };

  trail.y = function(_){
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), trail) : y;
  };

  trail.size = function(_){
    return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), trail) : size;
  };

  trail.defined = function(_){
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), trail) : defined;
  };

  trail.context = function(_){
    return arguments.length ? ((context = _ == null ? null : _), trail) : context;
  };

  return trail;
}