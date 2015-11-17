function linear(context) {
  return new Linear(context);
}

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._context.closePath();
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point === 1) this._context.closePath();
    this._line ^= 1;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

export default linear;
