function linear(context) {
  this._context = context;
}

linear.prototype = {
  lineStart: function() {
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
      default: this._context.lineTo(x, y); break;
    }
  }
};

export default linear;
