function Bump(context, dir) {
  this._context = context;
  this.dir = dir;
}

let line, point, x0, y0;

Bump.prototype = {
  areaStart() {
    line = 0;
  },
  areaEnd() {
    line = NaN;
  },
  lineStart() {
    point = 0;
  },
  lineEnd() {
    if (line || (line !== 0 && point === 1)) this._context.closePath();
    line = 1 - line;
  },
  point(x, y) {
    x = +x, y = +y;
    switch (point) {
      case 0: {
        point = 1;
        if (line) this._context.lineTo(x, y);
        else this._context.moveTo(x, y);
        break;
      }
      case 1: point = 2; // proceed
      default: {
        if (this.dir === "x") 
          this._context.bezierCurveTo(x0 = (x0 + x) / 2, y0, x0, y, x, y);
        else
          this._context.bezierCurveTo(x0, y0 = (y0 + y) / 2, x, y0, x, y);
        break;
      }
    }
    x0 = x, y0 = y;
  }
};

export function bumpX(context) {
  return new Bump(context, "x");
}

export function bumpY(context) {
  return new Bump(context, "y");
}
