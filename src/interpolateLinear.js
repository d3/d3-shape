function Linear(context) {
  this._context = context;
  this._move = true;
}

var linearPrototype = Linear.prototype;

linearPrototype.lineStart = function() {
  this._move = true;
};

linearPrototype.point = function(x, y) {
  if (this._move) this._move = false, this._context.moveTo(x, y);
  else this._context.lineTo(x, y);
};

linearPrototype.lineEnd = function() {};

export function interpolateLinear(context) {
  return new Linear(context);
};

function LinearClosed(context) {
  Linear.call(this, context);
}

var linearClosedPrototype = LinearClosed.prototype = Object.create(linearPrototype);

linearClosedPrototype.lineEnd = function() {
  this._context.closePath();
};

export function interpolateLinearClosed(context) {
  return new LinearClosed(context);
};
