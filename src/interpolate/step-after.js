function stepAfter(context) {
  this._context = context;
}

stepAfter.prototype = {
  lineStart: function() {
    this._y = null;
    this._state = 0;
  },
  lineEnd: function() {
    if (this._state === 1) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._state) {
      case 0: this._state = 1; this._context.moveTo(x, y); break;
      case 1: this._state = 2; // proceed
      default: {
        this._context.lineTo(x, this._y);
        this._context.lineTo(x, y);
        break;
      }
    }
    this._y = y;
  }
};

export default stepAfter;
