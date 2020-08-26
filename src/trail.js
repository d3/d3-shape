import {path} from "d3-path";
import constant from "./constant.js";
import {x as pointX, y as pointY, z as pointSize} from "./point.js";
import {abs, atan2, cos, pi, sin, sqrt} from "./math.js";

export default function(x, y, size){
    var defined = constant(true),
        context = null,
        ready, 
        x1, 
        y1, 
        r1,
        ready2,
        scaleRatio_min = 1;
    
    x = typeof x === "function" ? x : (x === undefined) ? pointX : constant(x);
    y = typeof y === "function" ? y : (y === undefined) ? pointY : constant(y);
    size = typeof size === "function" ? size : (size === undefined) ? pointSize : constant(size);
    
    function point(x2, y2, w2){
        var r2 = w2 / 2;

        if(ready){
             var alpha, //the smallest angle in right-angled trapezoid
                 alpha_x,
                 alpha_y,
                 beta, //the slope of line segment
                 cos_x,
                 sin_y,
                 angleRegister;
                 
            alpha_x = abs(r2 - r1);
            alpha_y = sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2) - alpha_x*alpha_x);
            alpha = atan2(alpha_y, alpha_x);
            beta = atan2(y2 - y1, x2 - x1);

            if(r1 < r2){
                cos_x = -cos(alpha + beta);
                sin_y = -sin(alpha + beta);

                //draw segment           
                context.moveTo(x1 + r1*cos_x, y1 + r1*sin_y);
                context.lineTo(x2 + r2*cos_x, y2 + r2*sin_y);
                context.arc(x2, y2, r2, alpha + beta - pi, beta - alpha + pi, 0);

                angleRegister = beta - alpha + pi;
                beta = atan2(y1 - y2, x1 - x2);
                cos_x = cos(beta - alpha);
                sin_y = sin(beta - alpha);

                context.lineTo(x1 + r1*cos_x, y1 + r1*sin_y);
                context.arc(x1, y1, r1, angleRegister, angleRegister + 2*alpha, 0);
            }
            else{
                cos_x = cos(beta - alpha);
                sin_y = sin(beta - alpha);

                //draw segment
                context.moveTo(x1 + r1*cos_x, y1 + r1*sin_y);
                context.lineTo(x2 + r2*cos_x, y2 + r2*sin_y);
                context.arc(x2, y2, r2, beta - alpha, beta + alpha, 0);

                angleRegister = beta + alpha;
                beta = atan2(y1 - y2, x1 - x2);
                cos_x = -cos(alpha + beta);
                sin_y = -sin(alpha + beta);

                context.lineTo(x1 + r1*cos_x, y1 + r1*sin_y);
                context.arc(x1, y1, r1, angleRegister, angleRegister + 2*(pi - alpha), 0);
            }
            context.closePath();
        }
        else{
            ready = 1;
        }
        x1 = x2;
        y1 = y2;
        r1 = r2;
    }

    function scaleRatio(x2, y2, w2){
        var r2 = w2 / 2;

        if(ready2){
            var lxy = sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
            if(r1 + r2 > lxy){
                var sr = lxy / (r1 + r2);
                if(sr < scaleRatio_min){
                    scaleRatio_min = sr;
                } 
            }
        }
        else{
            ready2 = 1;
        }
        x1 = x2;
        y1 = y2;
        r1 = r2;
    }

    function trail(data){ 
        var i,
            n = data.length, 
            d,
            def,
            s,
            defined0 = false,
            defined1 = false,
            buffer; 
        
        //make global optimization for radius when r1 + r2 > lxy
        for(i = 0; i < n; i++){
            d = data[i];
            def = defined(d, i, data) && (s = +size(d, i, data));
            if(!(i < n && def) === defined1){
                if (defined1 = !defined1) ready2 = 0;
            }
            if(defined1) scaleRatio(+x(d, i, data), +y(d, i, data), s);
        }

        if(context == null) context = buffer = path();

        for(i = 0; i < n; i++){
            d = data[i];
            def = defined(d, i, data) && (s = +size(d, i, data)); 
            if (!(i < n && def) === defined0) {
                if (defined0 = !defined0) ready = 0;
            }
            if(defined0) point(+x(d, i, data), +y(d, i, data), s*scaleRatio_min);
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