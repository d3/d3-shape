import {path} from "d3-path";
import {slice} from "../array";
import constant from "../constant";
import {x as pointX, y as pointY} from "../point";

function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(horizontal) {
  var source = linkSource,
      target = linkTarget,
      x = pointX,
      y = pointY,
      context = null;

  function link() {
    var buffer,
        argv = slice.call(arguments),
        s = source.apply(this, argv),
        t = target.apply(this, argv),
        x0 = +x.apply(this, (argv[0] = s, argv)),
        y0 = +y.apply(this, argv),
        x1 = +x.apply(this, (argv[0] = t, argv)),
        y1 = +y.apply(this, argv);
    if (!context) context = buffer = path();
    context.moveTo(x0, y0);
    if (horizontal) context.bezierCurveTo((x0 + x1) / 2, y0, (x0 + x1) / 2, y1, x1, y1);
    else context.bezierCurveTo(x0, (y0 + y1) / 2, x1, (y0 + y1) / 2, x1, y1);
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), link) : x;
  };

  link.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), link) : y;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

export function linkHorizontal() {
  return link(true);
}

export function linkVertical() {
  return link(false);
}
