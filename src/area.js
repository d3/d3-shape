import basis from "./interpolate/basis";
import basisOpen from "./interpolate/basis-open";
import cardinal from "./interpolate/cardinal";
import cardinalOpen from "./interpolate/cardinal-open";
import catmullRom from "./interpolate/catmull-rom";
import catmullRomOpen from "./interpolate/catmull-rom-open";
import constant, {constantTrue, constantZero} from "./constant";
import linear from "./interpolate/linear";
import natural from "./interpolate/natural";
import step from "./interpolate/step";
import stepAfter from "./interpolate/step-after";
import stepBefore from "./interpolate/step-before";
import {path} from "d3-path";
import {x as pointX, y as pointY} from "./point";

export default function() {
  var x0 = pointX,
      x1 = pointX,
      y0 = 0,
      y1 = pointY,
      x0i,
      y0i,
      defined = true,
      getX0 = pointX,
      getX1 = sameX,
      getY0 = constantZero,
      getY1 = pointY,
      getDefined = constantTrue,
      interpolate = linear,
      context = null,
      output = null;

  function sameX() {
    return x0i;
  }

  function sameY() {
    return y0i;
  }

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        isDefined = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (!context) output = interpolate(buffer = path());

    output.areaStart();
    for (i = 0; i <= n; ++i) {
      if (!(i < n && getDefined(d = data[i], i)) === isDefined) {
        if (isDefined = !isDefined) {
          j = i;
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
        }
      }
      if (isDefined) {
        x0z[i] = x0i = +getX0(d, i), y0z[i] = y0i = +getY0(d, i);
        output.point(+getX1(d, i), +getY1(d, i));
      }
    }
    output.areaEnd();

    if (!context) return output = null, buffer + "" || null;
  }

  area.x = function(_) {
    return arguments.length ? area.x0(_).x1(_) : x1;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = _, getX0 = typeof _ === "function" ? x0 : constant(x0), area.x1(x1)) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _, getX1 = _ === x0 ? sameX : typeof _ === "function" ? x1 : constant(x1), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? area.y0(_).y1(_) : y1;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = _, getY0 = typeof _ === "function" ? y0 : constant(y0), area.y1(y1)) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _, getY1 = _ === y0 ? sameY : typeof _ === "function" ? y1 : constant(y1), area) : y1;
  };

  area.defined = function(_) {
    return arguments.length ? (defined = _, getDefined = typeof _ === "function" ? defined : constant(defined), area) : defined;
  };

  area.interpolate = function(_, a) {
    if (!arguments.length) return interpolate;
    if (typeof _ === "function") interpolate = _;
    else switch (_ + "") {
      case "step": interpolate = step; break;
      case "step-before": interpolate = stepBefore; break;
      case "step-after": interpolate = stepAfter; break;
      case "basis": interpolate = basis; break;
      case "basis-open": interpolate = basisOpen; break;
      case "cardinal": interpolate = cardinal(a); break;
      case "cardinal-open": interpolate = cardinalOpen(a); break;
      case "catmull-rom": interpolate = catmullRom(a); break;
      case "catmull-rom-open": interpolate = catmullRomOpen(a); break;
      case "natural": interpolate = natural; break;
      default: interpolate = linear; break;
    }
    if (context != null) output = interpolate(context);
    return area;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = interpolate(context = _), area) : context;
  };

  return area;
};
