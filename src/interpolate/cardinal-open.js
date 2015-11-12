function cardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - (tension == null ? 2 / 3 : tension)) / 2;
}

cardinalOpen.prototype = {
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = null;
  },
  lineEnd: function() {},
  point: function(x, y) {
    x = +x, y = +y;
    if (this._x0 != null) {
      this._context.bezierCurveTo(
        this._x1 + this._k * (this._x2 - this._x0),
        this._y1 + this._k * (this._y2 - this._y0),
        this._x2 - this._k * (x - this._x1),
        this._y2 - this._k * (y - this._y1),
        this._x2,
        this._y2
      );
    } else if (this._x1 == null && this._x2 != null) {
      this._context.moveTo(x, y);
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

export default cardinalOpen;
