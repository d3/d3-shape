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
        px1, py1, pr1;
    
    x = typeof x === "function" ? x : (x === undefined) ? pointX : constant(x);
    y = typeof y === "function" ? y : (y === undefined) ? pointY : constant(y);
    size = typeof size === "function" ? size : (size === undefined) ? pointSize : constant(size);
    
    function crossProduct(x1, y1, x2, y2){
        return x1*y2 - x2*y1;
    }

    function isIntersect(x1, y1, x2, y2, x3, y3, x4, y4){
        //rapid repulsion
        if(max(x3, x4) < min(x1, x2) || max(y3, y4) < min(y1, y2) || max(x1, x2) < min(x3, x4) || max(y1, y2) < min(y3, y4)){
          return false;
        }
        //straddle experiment
        if(crossProduct(x1 - x4, y1 - y4, x3 - x4, y3 - y4)*crossProduct(x2 - x4, y2 - y4, x3 - x4, y3 - y4) > 0 ||
        crossProduct(x3 - x2, y3 - y2, x1 - x2, y1 - y2)*crossProduct(x4 - x2, y4 - y2, x1 - x2, y1 - y2) > 0){
          return false;
        }
        return true;
    }

    function intersectPoint(x1, y1, x2, y2, x3, y3, x4, y4){
        var d1 = abs(crossProduct(x4 - x3, y4 - y3, x1 - x3, y1 - y3)),
            d2 = abs(crossProduct(x4 - x3, y4 - y3, x2 - x3, y2 - y3)),
            t = d1 / (d1 + d2);
        
        return {
          x: x1 + (x2 - x1)*t,
          y: y1 + (y2 - y1)*t
        };
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
        alpha_y = sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2) - alpha_x*alpha_x);
        alpha = atan2(alpha_y, alpha_x);
        beta = atan2(y2 - y1, x2 - x1);
    
        if(r1 < r2){
          cos_x = -cos(alpha + beta);
          sin_y = -sin(alpha + beta);
    
          return {
            sg1_x: x1 + r1*cos_x,
            sg1_y: y1 + r1*sin_y,
            sg2_x: x2 + r2*cos_x,
            sg2_y: y2 + r2*sin_y,
            angle: alpha + beta - pi
          };
        }
        else{
          cos_x = cos(beta - alpha);
          sin_y = sin(beta - alpha);
    
          return {
            sg1_x: x1 + r1*cos_x,
            sg1_y: y1 + r1*sin_y,
            sg2_x: x2 + r2*cos_x,
            sg2_y: y2 + r2*sin_y,
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

    function scaleRatio(px2, py2, pw2){
        var pr2 = pw2 / 2;
    
        if(ready2){
            var lxy = sqrt((px1 - px2)*(px1 - px2) + (py1 - py2)*(py1 - py2));
            if(pr1 + pr2 > lxy){
                var sr = lxy / (pr1 + pr2);
                if(sr < scaleRatio_min){
                    scaleRatio_min = sr;
                } 
            }
        }
        else{
            ready2 = 1;
        }
        px1 = px2;
        py1 = py2;
        pr1 = pr2;
    }

    function trail(data){ 
        var i,
            n = (data = array(data)).length, 
            d,
            defined0 = false,
            defined1 = false,
            buffer;

        //make global optimization for radius when r1 + r2 > lxy
        for(i = 0; i < n; i++){
            if(!(i < n && defined(d = data[i], i, data)) === defined1){
                if (defined1 = !defined1) ready2 = 0;
            }
            if(defined1) {
                scaleRatio(+x(d, i, data), +y(d, i, data), +size(d, i, data));
            }
        }

        if(context == null) context = buffer = path();

        var start,
        j,
        d1;

        for(i = 0; i < n; i++){
            if(!(i < n && defined(d = data[i], i, data)) === defined0){
                if(defined0 = !defined0){
                    ready = 0;
                    start = i;
                }
            }
            if(defined0){
                j = i + 1;
                if(j < n && defined(d1 = data[j], j, data)){
                    segment(+x(d, i, data), +y(d, i, data), +size(d, i, data)*scaleRatio_min, +x(d1, j, data), +y(d1, j, data), +size(d1, j, data)*scaleRatio_min);
                }
                else{
                    j = i - 1;
                    if(j < start){
                    var tx = +x(d, i, data),
                        ty = +y(d, i, data),
                        ts = +size(d, i, data);
                    
                    context.moveTo(tx, ty - ts*scaleRatio_min / 2);
                    context.arc(tx, ty, ts*scaleRatio_min / 2, 0, tau, 0);
                    context.closePath();
                    }
                    else{
                        while(j >= start){
                            d1 = data[j];
                            segment(+x(d, j + 1, data), +y(d, j + 1, data), +size(d, j + 1, data)*scaleRatio_min, +x(d1, j, data), +y(d1, j, data), +size(d1, j, data)*scaleRatio_min);
                            d = d1;
                            j -= 1;
                        }
                        j += 1;
                        d1 = data[j + 1];
                        segment(+x(d, j, data), +y(d, j, data), +size(d, j, data)*scaleRatio_min, +x(d1, j + 1, data), +y(d1, j + 1, data), +size(d1, j + 1, data)*scaleRatio_min);

                        context.closePath();
                    }
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