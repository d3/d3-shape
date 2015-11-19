import {path} from "d3-path";
import basis from "./interpolate/basis";
import basisClosed from "./interpolate/basis-closed";
import basisOpen from "./interpolate/basis-open";
import bundle from "./interpolate/bundle";
import cardinal from "./interpolate/cardinal";
import cardinalClosed from "./interpolate/cardinal-closed";
import cardinalOpen from "./interpolate/cardinal-open";
import catmullRom from "./interpolate/catmull-rom";
import catmullRomClosed from "./interpolate/catmull-rom-closed";
import catmullRomOpen from "./interpolate/catmull-rom-open";
import constant from "./constant";
import linear from "./interpolate/linear";
import linearClosed from "./interpolate/linear-closed";
import natural from "./interpolate/natural";
import step from "./interpolate/step";
import stepAfter from "./interpolate/step-after";
import stepBefore from "./interpolate/step-before";
import {x as pointX, y as pointY} from "./point";

export default function() {
  var x = pointX,
      y = pointY,
      defined = constant(true),
      context = null,
      interpolate = linear,
      interpolator = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (!context) interpolator = interpolate(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i)) === defined0) {
        if (defined0 = !defined0) interpolator.lineStart();
        else interpolator.lineEnd();
      }
      if (defined0) interpolator.point(+x(d, i), +y(d, i));
    }

    if (buffer) return interpolator = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), line) : x;
  };

  line.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), line) : y;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
  };

  line.interpolate = function(_, a) {
    if (!arguments.length) return interpolate;
    if (typeof _ === "function") interpolate = _;
    else switch (_ + "") {
      case "linear-closed": interpolate = linearClosed; break;
      case "step": interpolate = step; break;
      case "step-before": interpolate = stepBefore; break;
      case "step-after": interpolate = stepAfter; break;
      case "basis": interpolate = basis; break;
      case "basis-open": interpolate = basisOpen; break;
      case "basis-closed": interpolate = basisClosed; break;
      case "bundle": interpolate = bundle(a); break;
      case "cardinal": interpolate = cardinal(a); break;
      case "cardinal-open": interpolate = cardinalOpen(a); break;
      case "cardinal-closed": interpolate = cardinalClosed(a); break;
      case "catmull-rom": interpolate = catmullRom(a); break;
      case "catmull-rom-open": interpolate = catmullRomOpen(a); break;
      case "catmull-rom-closed": interpolate = catmullRomClosed(a); break;
      case "natural": interpolate = natural; break;
      default: interpolate = linear; break;
    }
    if (context != null) interpolator = interpolate(context);
    return line;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = interpolator = null : interpolator = interpolate(context = _), line) : context;
  };

  return line;
};
