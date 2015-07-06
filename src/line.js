import {path} from "d3-path";
import {interpolateLinear, interpolateLinearClosed} from "./interpolateLinear";

function pointX(p) {
  return p[0];
}

function pointY(p) {
  return p[1];
}

function functor(x) {
  return function() {
    return x;
  };
}

function _true() {
  return true;
}

var interpolates = (new Map)
    .set("linear", interpolateLinear)
    .set("linear-closed", interpolateLinearClosed)
    // .set("step", interpolateStep)
    // .set("step-before", interpolateStepBefore)
    // .set("step-after", interpolateStepAfter)
    // .set("basis", interpolateBasis)
    // .set("basis-open", interpolateBasisOpen)
    // .set("basis-closed", interpolateBasisClosed)
    // .set("bundle", interpolateBundle)
    // .set("cardinal", interpolateCardinal)
    // .set("cardinal-open", interpolateCardinalOpen)
    // .set("cardinal-closed", interpolateCardinalClosed)
    // .set("monotone", interpolateMonotone);

export default function() {
  var x = pointX, _x = x,
      y = pointY, _y = y,
      defined = true, _defined = _true,
      interpolate = "linear", _interpolate = interpolateLinear,
      context = null,
      stream = null;

  function line(data) {
    var i = -1,
        n = data.length,
        d,
        defined = false,
        result;

    if (context == null) stream = _interpolate(result = path());

    while (++i < n) {
      if (!_defined.call(this, d = data[i], i) === defined) {
        if (defined = !defined) stream.lineStart();
        else stream.lineEnd();
      }
      if (defined) stream.point(+_x.call(this, d, i), +_y.call(this, d, i));
    }
    if (defined) stream.lineEnd();

    if (context == null) return stream = null, result += "";
  }

  line.x = function(_) {
    if (!arguments.length) return x;
    x = _, _x = typeof _ === "function" ? x : functor(x);
    return line;
  };

  line.y = function(_) {
    if (!arguments.length) return y;
    y = _, _y = typeof _ === "function" ? y : functor(y);
    return line;
  };

  line.defined = function(_) {
    if (!arguments.length) return defined;
    defined = _, _defined = typeof _ === "function" ? defined : functor(defined);
    return line;
  };

  // TODO allow custom interpolators
  // TODO pass tension to interpolate constructor
  line.interpolate = function(_) {
    if (!arguments.length) return interpolate;
    if (!(_interpolate = interpolates.get(interpolate = _ + ""))) interpolate = "linear", _interpolate = interpolateLinear;
    if (context != null) stream = _interpolate(context);
    return line;
  };

  line.context = function(_) {
    if (!arguments.length) return context;
    if (_ == null) context = stream = null;
    else stream = _interpolate(context = _);
    return line;
  };

  return line;
};
