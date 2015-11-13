function linearClosed(context) {
  this._context = context;
}

linearClosed.prototype = {
  lineStart: function() {
    this._state = 0;
  },
  lineEnd: function() {
    this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._state) this._context.lineTo(x, y);
    else this._state = 1, this._context.moveTo(x, y);
  }
};

export default linearClosed;
