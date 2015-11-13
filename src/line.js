import basis from "./interpolate/basis";
import basisClosed from "./interpolate/basis-closed";
import basisOpen from "./interpolate/basis-open";
import cardinal from "./interpolate/cardinal";
import cardinalOpen from "./interpolate/cardinal-open";
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

// TODO bundle, cardinal-closed, monotone, cubic
var interpolates = {
  "linear": linear,
  "linear-closed": linearClosed,
  "step": step,
  "step-before": stepBefore,
  "step-after": stepAfter,
  "basis": basis,
  "basis-open": basisOpen,
  "basis-closed": basisClosed,
  "cardinal": cardinal,
  "cardinal-open": cardinalOpen
};

export default function() {
  var x = pointX, _x = x,
      y = pointY, _y = y,
      defined = true, _defined = _true,
      interpolate = "linear", _interpolate = linear,
      tension = null,
      context = null,
      stream = null;

  function line(data) {
    var defined = false,
        buffer;

    if (!context) stream = new _interpolate(buffer = path(), tension);

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

  line.interpolate = function(_) {
    if (!arguments.length) return interpolate;
    _interpolate = interpolates[interpolate = interpolates.hasOwnProperty(_ += "") ? _ : "linear"];
    if (context != null) stream = new _interpolate(context, tension);
    return line;
  };

  line.tension = function(_) {
    if (!arguments.length) return tension;
    tension = _ == null ? _ : +_;
    if (context != null) stream = new _interpolate(context, tension);
    return line;
  };

  line.context = function(_) {
    if (!arguments.length) return context;
    if (_ == null) context = stream = null;
    else stream = new _interpolate(context = _, tension);
    return line;
  };

  return line;
};
