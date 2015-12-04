import {path} from "d3-path";
import constant from "./constant";
import curveBind from "./curve/bind";
import curveLinear from "./curve/linear";

var halfPi = Math.PI / 2;

function lineRadius(d) {
  return d.radius;
}

function lineAngle(d) {
  return d.angle;
}

export default function() {
  var radius = lineRadius,
      angle = lineAngle,
      defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  function radialLine(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (!context) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) {
        var r = +radius(d, i, data),
            a = +angle(d, i, data) - halfPi;
        output.point(r * Math.cos(a), r * Math.sin(a));
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  radialLine.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), radialLine) : radius;
  };

  radialLine.angle = function(_) {
    return arguments.length ? (angle = typeof _ === "function" ? _ : constant(+_), radialLine) : angle;
  };

  radialLine.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), radialLine) : defined;
  };

  radialLine.curve = function(_) {
    var n = arguments.length;
    return n ? (curve = n > 1 ? curveBind(_, arguments) : _, context != null && (output = curve(context)), radialLine) : curve;
  };

  radialLine.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), radialLine) : context;
  };
};
