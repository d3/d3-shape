function Linear(context) {
  this._context = context;
  this._move = true;
}

Linear.prototype.lineStart = function() {
  this._move = true;
};

Linear.prototype.lineEnd = function() {};

Linear.prototype.point = function(x, y) {
  if (this._move) this._move = false, this._context.moveTo(x, y);
  else this._context.lineTo(x, y);
};

export default Linear;
