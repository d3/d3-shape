function linearClosed(context) {
  return new LinearClosed(context);
}

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

export default linearClosed;
