import {point} from "./basis";

function basisOpen(context) {
  return new BasisOpen(context);
}

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = null;
    this._moved = false;
  },
  lineEnd: function() {},
  point: function(x, y) {
    x = +x, y = +y;
    if (this._moved) point(this, x, y);
    else if (this._x0 != null) this._moved = true, this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

export default basisOpen;
