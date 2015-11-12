import {point} from "./basis";

function basisClosed(context) {
  this._context = context;
};

basisClosed.prototype = {
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = null;
  },
  lineEnd: function() {
    if (this._x4 != null) {
      this.point(this._x2, this._y2);
      this.point(this._x3, this._y3);
      this.point(this._x4, this._y4);
    } else if (this._x3 != null) {
      this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
      this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
      this._context.closePath();
    } else if (this._x2 != null) {
      this._context.moveTo(this._x2, this._y2);
      this._context.closePath();
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._x4 != null) point(this, x, y);
    else if (this._x3 != null) this._x4 = x, this._y4 = y, this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
    else if (this._x2 != null) this._x3 = x, this._y3 = y;
    else this._x2 = x, this._y2 = y;
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

export default basisClosed;
