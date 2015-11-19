import {path} from "d3-path";
import basis from "./interpolate/basis";
import basisOpen from "./interpolate/basis-open";
import cardinal from "./interpolate/cardinal";
import cardinalOpen from "./interpolate/cardinal-open";
import catmullRom from "./interpolate/catmull-rom";
import catmullRomOpen from "./interpolate/catmull-rom-open";
import constant from "./constant";
import linear from "./interpolate/linear";
import natural from "./interpolate/natural";
import step from "./interpolate/step";
import stepAfter from "./interpolate/step-after";
import stepBefore from "./interpolate/step-before";
import {x as pointX, y as pointY} from "./point";

export default function() {
  var x0 = pointX,
      x1 = null,
      y0 = constant(0),
      y1 = pointY,
      defined = constant(true),
      context = null,
      interpolate = linear,
      interpolator = null;

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (!context) interpolator = interpolate(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          interpolator.areaStart();
          interpolator.lineStart();
        } else {
          interpolator.lineEnd();
          interpolator.lineStart();
          for (k = i - 1; k >= j; --k) {
            interpolator.point(x0z[k], y0z[k]);
          }
          interpolator.lineEnd();
          interpolator.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i), y0z[i] = +y0(d, i);
        interpolator.point(x1 ? +x1(d, i) : x0z[i], y1 ? +y1(d, i) : y0z[i]);
      }
    }

    if (buffer) return interpolator = null, buffer + "" || null;
  }

  area.x = function(_) {
    return arguments.length ? area.x0(_).x1(null) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? area.y0(_).y1(null) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : y1;
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area) : defined;
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
    if (context != null) interpolator = interpolate(context);
    return area;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = interpolator = null : interpolator = interpolate(context = _), area) : context;
  };

  return area;
};
