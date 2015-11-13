function cardinalClosed(tension) {
  return function(context) {
    return new CardinalClosed(context, tension);
  };
}

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (tension == null ? 1 : 1 - tension) / 6;
}

CardinalClosed.prototype = {
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
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
    switch (this._state) {
      case 0: this._state = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._state = 2; this._x4 = x, this._y4 = y; this._context.moveTo(x, y); break;
      case 2: this._state = 3; this._x5 = x, this._y5 = y; break;
      default: {
        this._context.bezierCurveTo(
          this._x1 + this._k * (this._x2 - this._x0),
          this._y1 + this._k * (this._y2 - this._y0),
          this._x2 + this._k * (this._x1 - x),
          this._y2 + this._k * (this._y1 - y),
          this._x2,
          this._y2
        );
        break;
      }
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

export default cardinalClosed;
