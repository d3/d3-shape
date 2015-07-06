export function Step(context) {
  this._context = context;
};

Step.prototype.lineStart = function() {
  this._x = this._y = null;
};

Step.prototype.lineEnd = function() {
  if (this._x != null) {
    this._context.lineTo(this._x, this._y);
    this._x = this._y = null;
  }
};

Step.prototype.point = function(x, y) {
  x = +x, y = +y;
  if (this._x == null) {
    this._context.moveTo(x, y);
  } else {
    var x1 = (this._x + x) / 2;
    this._context.lineTo(x1, this._y);
    this._context.lineTo(x1, y);
  }
  this._x = x, this._y = y;
};

export function StepAfter(context) {
  this._context = context;
};

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

export function StepBefore(context) {
  this._context = context;
};

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
