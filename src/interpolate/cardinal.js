function cardinal(context, tension) {
  this._context = context;
  this._k = (1 - (tension == null ? 2 / 3 : tension)) / 2;
}

cardinal.prototype = {
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = null;
    this._state = 0;
  },
  lineEnd: function() {
    switch (this._state) {
      case 1: this._context.closePath(); break;
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: {
        this._context.quadraticCurveTo(
          this._x1 + this._k * (this._x2 - this._x0) * 2 / 3,
          this._y1 + this._k * (this._y2 - this._y0) * 2 / 3,
          this._x2,
          this._y2
        );
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._state) {
      case 0: this._state = 1; this._context.moveTo(x, y); break;
      case 1: this._state = 2; break;
      case 2: {
        this._state = 3;
        this._context.quadraticCurveTo(
          this._x2 + this._k * (this._x1 - x) * 2 / 3,
          this._y2 + this._k * (this._y1 - y) * 2 / 3,
          this._x2,
          this._y2
        );
        break;
      }
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

export default cardinal;
