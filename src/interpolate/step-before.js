function stepBefore(context) {
  this._context = context;
};

stepBefore.prototype = {
  lineStart: function() { this._x = null; },
  lineEnd: function() {},
  point: function(x, y) {
    x = +x, y = +y;
    if (this._x != null) {
      this._context.lineTo(this._x, y);
      this._context.lineTo(x, y);
    } else {
      this._context.moveTo(x, y);
    }
    this._x = x;
  }
};

export default stepBefore;
