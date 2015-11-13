function step(context) {
  return new Step(context);
}

function Step(context) {
  this._context = context;
}

Step.prototype = {
  lineStart: function() {
    this._x = this._y = NaN;
    this._state = 0;
  },
  lineEnd: function() {
    switch (this._state) {
      case 1: this._context.closePath(); break;
      case 2: this._context.lineTo(this._x, this._y); break;
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._state) {
      case 0: this._state = 1; this._context.moveTo(x, y); break;
      case 1: this._state = 2; // proceed
      default: {
        var x1 = (this._x + x) / 2;
        this._context.lineTo(x1, this._y);
        this._context.lineTo(x1, y);
        break;
      }
    }
    this._x = x, this._y = y;
  }
};

export default step;
