function step(context) {
  this._context = context;
};

step.prototype = {
  lineStart: function() {
    this._x = this._y = null;
  },
  lineEnd: function() {
    if (this._x != null) {
      this._context.lineTo(this._x, this._y);
      this._x = this._y = null;
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._x != null) {
      var x1 = (this._x + x) / 2;
      this._context.lineTo(x1, this._y);
      this._context.lineTo(x1, y);
    } else {
      this._context.moveTo(x, y);
    }
    this._x = x, this._y = y;
  }
};

export default step;
