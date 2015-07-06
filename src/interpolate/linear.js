export function Linear(context) {
  this._context = context;
};

Linear.prototype.lineStart = function() {
  this._move = true;
};

Linear.prototype.lineEnd = function() {};

Linear.prototype.point = function(x, y) {
  if (this._move) this._move = false, this._context.moveTo(x, y);
  else this._context.lineTo(x, y);
};

export function LinearClosed(context) {
  Linear.call(this, context); // https://github.com/rollup/rollup/issues/34
};

LinearClosed.prototype = Object.create(Linear.prototype);

LinearClosed.prototype.lineEnd = function() {
  this._context.closePath();
};
