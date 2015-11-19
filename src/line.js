import {path} from "d3-path";
import constant from "./constant";
import linear from "./interpolate/linear";
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

  line.interpolate = function(_) {
    return arguments.length ? (interpolate = _, context != null && (interpolator = _(context)), line) : interpolate;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = interpolator = null : interpolator = interpolate(context = _), line) : context;
  };

  return line;
};
