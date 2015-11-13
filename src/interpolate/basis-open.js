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
    this._y0 = this._y1 = NaN;
    this._state = 0;
  },
  lineEnd: function() {
    if (this._state === 3) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._state) {
      case 0: this._state = 1; break;
      case 1: this._state = 2; break;
      case 2: this._state = 3; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break; // TODO
      case 3: this._state = 4; // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

export default basisOpen;
