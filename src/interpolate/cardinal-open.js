import {point} from "./cardinal";

function cardinalOpen(tension) {
  var k = (tension == null ? 1 : 1 - tension) / 6;
  return function(context) {
    return new CardinalOpen(context, k);
  };
}

function CardinalOpen(context, k) {
  this._context = context;
  this._k = k;
}

CardinalOpen.prototype = {
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
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
    switch (this._state) {
      case 0: this._state = 1; break;
      case 1: this._state = 2; this._context.moveTo(x, y); break;
      case 2: this._state = 3; break;
      case 3: this._state = 4; // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

export default cardinalOpen;
