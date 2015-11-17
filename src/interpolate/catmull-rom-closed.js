import cardinalClosed from "./cardinal-closed";
import {point} from "./catmull-rom";

function catmullRomClosed(alpha) {
  return alpha == null || !(alpha = +alpha) ? cardinalClosed(0) : function(context) {
    return new CatmullRomClosed(context, alpha);
  };
}

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._state = 0;
  },
  lineEnd: function() {
    switch (this._state) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._state) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._state) {
      case 0: this._state = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._state = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._state = 3; this._x5 = x, this._y5 = y; break;
      default: point(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

export default catmullRomClosed;
