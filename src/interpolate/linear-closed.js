function linearClosed(context) {
  this._context = context;
}

linearClosed.prototype = {
  lineStart: function() { this._move = true; },
  lineEnd: function() { this._context.closePath(); },
  point: function(x, y) {
    if (this._move) this._move = false, this._context.moveTo(x, y);
    else this._context.lineTo(x, y);
  }
};

export default linearClosed;
