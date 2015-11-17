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
import constant, {constantTrue} from "./constant";
import linear from "./interpolate/linear";
import linearClosed from "./interpolate/linear-closed";
import natural from "./interpolate/natural";
import step from "./interpolate/step";
import stepAfter from "./interpolate/step-after";
import stepBefore from "./interpolate/step-before";
import {path} from "d3-path";
import {x as pointX, y as pointY} from "./point";

export default function() {
  var x = pointX,
      y = pointY,
      defined = true,
      getX = pointX,
      getY = pointY,
      getDefined = constantTrue,
      interpolate = linear,
      context = null,
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        isDefined = false,
        buffer;

    if (!context) output = interpolate(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && getDefined(d = data[i], i)) === isDefined) {
        if (isDefined = !isDefined) output.lineStart();
        else output.lineEnd();
      }
      if (isDefined) output.point(+getX(d, i), +getY(d, i));
    }

    if (!context) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x = _, getX = typeof _ === "function" ? x : constant(x), line) : x;
  };

  line.y = function(_) {
    return arguments.length ? (y = _, getY = typeof _ === "function" ? y : constant(y), line) : y;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = _, getDefined = typeof _ === "function" ? defined : constant(defined), line) : defined;
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
    if (context != null) output = interpolate(context);
    return line;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = interpolate(context = _), line) : context;
  };

  return line;
};
