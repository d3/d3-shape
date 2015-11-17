// TODO Check if n or m is zero, and avoid NaN.
// n is zero if (x0,y0) and (x1,y1) are coincident.
// m is zero if (x2,y2) and (x3,y3) are coincident.

import cardinalOpen from "./cardinal-open";

function catmullRomOpen(alpha) {
  return alpha == null || !(alpha = +alpha) ? cardinalOpen(0) : function(context) {
    return new CatmullRomOpen(context, alpha);
  };
}

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
  this._alpha2 = alpha / 2;
}

CatmullRomOpen.prototype = {
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 =
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a = NaN;
    this._state = 0;
  },
  lineEnd: function() {
    switch (this._state) {
      case 2:
      case 3: this._context.closePath(); break;
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._state) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y,
          l23_2 = x23 * x23 + y23 * y23;
      this._l23_a = Math.pow(l23_2, this._alpha2);
      this._l23_2a = Math.pow(l23_2, this._alpha);
    }

    switch (this._state) {
      case 0: this._state = 1; break;
      case 1: this._state = 2; this._context.moveTo(x, y); break;
      case 2: this._state = 3; break;
      case 3: this._state = 4; // proceed
      default: {
        var a = 2 * this._l01_2a + 3 * this._l01_a * this._l12_a + this._l12_2a,
            b = 2 * this._l23_2a + 3 * this._l23_a * this._l12_a + this._l12_2a,
            n = 3 * this._l01_a * (this._l01_a + this._l12_a),
            m = 3 * this._l23_a * (this._l23_a + this._l12_a);
        this._context.bezierCurveTo(
          (this._x1 * a - this._x0 * this._l12_2a + this._x2 * this._l01_2a) / n,
          (this._y1 * a - this._y0 * this._l12_2a + this._y2 * this._l01_2a) / n,
          (this._x2 * b + this._x1 * this._l23_2a - x * this._l12_2a) / m,
          (this._y2 * b + this._y1 * this._l23_2a - y * this._l12_2a) / m,
          this._x2,
          this._y2
        );
        break;
      }
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

export default catmullRomOpen;
