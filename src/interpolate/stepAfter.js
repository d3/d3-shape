function StepAfter(context) {
  this._context = context;
  this._y = null;
}

StepAfter.prototype.lineStart = function() {
  this._y = null;
};

StepAfter.prototype.lineEnd = function() {};

StepAfter.prototype.point = function(x, y) {
  x = +x, y = +y;
  if (this._y == null) {
    this._context.moveTo(x, y);
  } else {
    this._context.lineTo(x, this._y);
    this._context.lineTo(x, y);
  }
  this._y = y;
};

export default StepAfter;
