function StepBefore(context) {
  this._context = context;
  this._x = null;
}

StepBefore.prototype.lineStart = function() {
  this._x = null;
};

StepBefore.prototype.lineEnd = function() {};

StepBefore.prototype.point = function(x, y) {
  x = +x, y = +y;
  if (this._x == null) {
    this._context.moveTo(x, y);
  } else {
    this._context.lineTo(this._x, y);
    this._context.lineTo(x, y);
  }
  this._x = x;
};

export default StepBefore;
