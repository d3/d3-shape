function step(context) {
  return new Step(context);
}

function Step(context) {
  this._context = context;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line >= 0) {
      if (this._point === 2) this._context.lineTo(this._x, this._y);
      if (this._line && this._point) this._context.closePath();
      this._line ^= 1;
    } else {
      switch (this._point) {
        case 1: this._context.closePath(); break;
        case 2: this._context.lineTo(this._x, this._y); break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
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
