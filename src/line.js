import basis from "./interpolate/basis";
import basisClosed from "./interpolate/basis-closed";
import basisOpen from "./interpolate/basis-open";
import cardinal from "./interpolate/cardinal";
import cardinalClosed from "./interpolate/cardinal-closed";
import cardinalOpen from "./interpolate/cardinal-open";
import cubic from "./interpolate/cubic";
import linear from "./interpolate/linear";
import linearClosed from "./interpolate/linear-closed";
import step from "./interpolate/step";
import stepAfter from "./interpolate/step-after";
import stepBefore from "./interpolate/step-before";
import {path} from "d3-path";

function pointX(p) {
  return p[0];
}

function pointY(p) {
  return p[1];
}

function constant(x) {
  return function() {
    return x;
  };
}

function _true() {
  return true;
}

export default function() {
  var x = pointX, _x = x,
      y = pointY, _y = y,
      defined = true, _defined = _true,
      interpolate = linear,
      context = null,
      stream = null;

  function line(data) {
    var defined = false,
        buffer;

    if (!context) stream = interpolate(buffer = path());

    for (var i = 0, n = data.length, d; i < n; ++i) {
      if (!_defined(d = data[i], i) === defined) {
        if (defined = !defined) stream.lineStart();
        else stream.lineEnd();
      }
      if (defined) stream.point(+_x(d, i), +_y(d, i));
    }

    if (defined) stream.lineEnd();
    if (!context) return stream = null, buffer + "" || null;
  }

  line.x = function(_) {
    if (!arguments.length) return x;
    x = _, _x = typeof _ === "function" ? x : constant(x);
    return line;
  };

  line.y = function(_) {
    if (!arguments.length) return y;
    y = _, _y = typeof _ === "function" ? y : constant(y);
    return line;
  };

  line.defined = function(_) {
    if (!arguments.length) return defined;
    defined = _, _defined = typeof _ === "function" ? defined : constant(defined);
    return line;
  };

  line.interpolate = function(_, tension) {
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
      case "cardinal": interpolate = cardinal(tension); break;
      case "cardinal-open": interpolate = cardinalOpen(tension); break;
      case "cardinal-closed": interpolate = cardinalClosed(tension); break;
      case "cubic": interpolate = cubic; break;
      default: interpolate = linear; break;
    }
    if (context != null) stream = interpolate(context);
    return line;
  };

  line.context = function(_) {
    if (!arguments.length) return context;
    if (_ == null) context = stream = null;
    else stream = interpolate(context = _);
    return line;
  };

  return line;
};
