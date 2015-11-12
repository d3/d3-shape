function stepAfter(context) {
  this._context = context;
};

stepAfter.prototype = {
  lineStart: function() { this._y = null; },
  lineEnd: function() {},
  point: function(x, y) {
    x = +x, y = +y;
    if (this._y != null) {
      this._context.lineTo(x, this._y);
      this._context.lineTo(x, y);
    } else {
      this._context.moveTo(x, y);
    }
    this._y = y;
  }
};

export default stepAfter;
