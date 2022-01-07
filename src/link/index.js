import {slice} from "../array.js";
import constant from "../constant.js";
import line from "../line.js";
import {x as pointX, y as pointY} from "../point.js";
import pointRadial from "../pointRadial.js";
import {bumpX as curveBumpX, bumpY as curveBumpY} from "../curve/bump.js";

function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

export function link(curve) {
  var source = linkSource,
      target = linkTarget,
      x = pointX,
      y = pointY,
      l = line().curve(curve);

  function link() {
    const argv = slice.call(arguments);
    const s = source.apply(this, argv);
    const t = target.apply(this, argv);
    return l([
      (argv[0] = s, [+x.apply(this, argv), +y.apply(this, argv)]),
      (argv[0] = t, [+x.apply(this, argv), +y.apply(this, argv)])
    ]);
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
    return arguments.length ? (l.context(_), link) : l.context();
  };

  return link;
}

export function linkHorizontal() {
  return link(curveBumpX);
}

export function linkVertical() {
  return link(curveBumpY);
}

export function linkRadial() {
  var l = link(curveRadial);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}

class CurveRadial {
  constructor(context) {
    this._context = context;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {}
  point(x, y) {
    x = +x, y = +y;
    if (this._point++ === 0) {
      this._x0 = x, this._y0 = y;
    } else {
      const p0 = pointRadial(this._x0, this._y0);
      const p1 = pointRadial(this._x0, this._y0 = (this._y0 + y) / 2);
      const p2 = pointRadial(x, this._y0);
      const p3 = pointRadial(x, y);
      this._context.moveTo(...p0);
      this._context.bezierCurveTo(...p1, ...p2, ...p3);
    }
  }
}

function curveRadial(context) {
  return new CurveRadial(context);
}
