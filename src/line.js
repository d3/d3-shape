import {Basis, BasisOpen, BasisClosed} from "./interpolate/basis";
import {Cardinal, CardinalOpen} from "./interpolate/cardinal";
import {Linear, LinearClosed} from "./interpolate/linear";
import {Step, StepBefore, StepAfter} from "./interpolate/step";
import {path} from "d3-path";

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
    .set("linear", Linear)
    .set("linear-closed", LinearClosed)
    .set("step", Step)
    .set("step-before", StepBefore)
    .set("step-after", StepAfter)
    .set("basis", Basis)
    .set("basis-open", BasisOpen)
    .set("basis-closed", BasisClosed)
    // .set("bundle", Bundle)
    .set("cardinal", Cardinal)
    .set("cardinal-open", CardinalOpen)
    // .set("cardinal-closed", CardinalClosed)
    // .set("monotone", Monotone);

export default function() {
  var x = pointX, _x = x,
      y = pointY, _y = y,
      defined = true, _defined = _true,
      interpolate = Linear,
      context = null,
      stream = null;

  function line(data) {
    var defined = false,
        result;

    if (!stream) stream = new interpolate(result = path()); // TODO tension?

    for (var i = 0, n = data.length, d; i < n; ++i) {
      if (!_defined.call(this, d = data[i], i) === defined) {
        if (defined = !defined) stream.lineStart();
        else stream.lineEnd();
      }
      if (defined) stream.point(+_x.call(this, d, i), +_y.call(this, d, i));
    }

    if (defined) stream.lineEnd();
    if (result) return stream = null, result += "";
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

  line.interpolate = function(_, tension) {
    if (!arguments.length) return interpolate;
    if (!(interpolate = interpolates.get(_ + ""))) interpolate = Linear;
    if (context != null) stream = new interpolate(context); // TODO tension?
    return line;
  };

  line.context = function(_) {
    if (!arguments.length) return context;
    if (_ == null) context = stream = null;
    else stream = new interpolate(context = _); // TODO tension?
    return line;
  };

  return line;
};
