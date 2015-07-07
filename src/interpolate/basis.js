export function Basis(context) {
  this._context = context;
};

Basis.prototype.lineStart = function() {
  this._x0 = this._x1 =
  this._y0 = this._y1 = null;
};

Basis.prototype.lineEnd = function() {
  if (this._x0 != null) this._context.bezierCurveTo((2 * this._x0 + this._x1) / 3, (2 * this._y0 + this._y1) / 3, (this._x0 + 2 * this._x1) / 3, (this._y0 + 2 * this._y1) / 3, (this._x0 + 5 * this._x1) / 6, (this._y0 + 5 * this._y1) / 6);
  if (this._x1 != null) this._context.lineTo(this._x1, this._y1);
};

Basis.prototype.point = function(x, y) {
  x = +x, y = +y;
  if (this._x0 != null) this._context.bezierCurveTo((2 * this._x0 + this._x1) / 3, (2 * this._y0 + this._y1) / 3, (this._x0 + 2 * this._x1) / 3, (this._y0 + 2 * this._y1) / 3, (this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
  else if (this._x1 != null) this._context.lineTo((5 * this._x1 + x) / 6, (5 * this._y1 + y) / 6);
  else this._context.moveTo(x, y);
  this._x0 = this._x1, this._x1 = x;
  this._y0 = this._y1, this._y1 = y;
};

export function BasisOpen(context) {
  this._context = context;
};

BasisOpen.prototype.lineStart = function() {
  this._x0 = this._x1 =
  this._y0 = this._y1 = null;
  this._moved = false;
};

BasisOpen.prototype.lineEnd = function() {};

BasisOpen.prototype.point = function(x, y) {
  x = +x, y = +y;
  if (this._moved) this._context.bezierCurveTo((2 * this._x0 + this._x1) / 3, (2 * this._y0 + this._y1) / 3, (this._x0 + 2 * this._x1) / 3, (this._y0 + 2 * this._y1) / 3, (this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
  else if (this._x0 != null) this._moved = true, this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
  this._x0 = this._x1, this._x1 = x;
  this._y0 = this._y1, this._y1 = y;
};

export function BasisClosed(context) {
  this._context = context;
};

BasisClosed.prototype.lineStart = function() {
  this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
  this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = null;
};

BasisClosed.prototype.lineEnd = function() {
  if (this._x2 != null) this.point(this._x2, this._y2);
  if (this._x3 != null) this.point(this._x3, this._y3);
  if (this._x4 != null) this.point(this._x4, this._y4);
};

BasisClosed.prototype.point = function(x, y) {
  x = +x, y = +y;
  if (this._x4 != null) this._context.bezierCurveTo((2 * this._x0 + this._x1) / 3, (2 * this._y0 + this._y1) / 3, (this._x0 + 2 * this._x1) / 3, (this._y0 + 2 * this._y1) / 3, (this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
  else if (this._x3 != null) this._x4 = x, this._y4 = y, this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
  else if (this._x2 != null) this._x3 = x, this._y3 = y;
  else this._x2 = x, this._y2 = y;
  this._x0 = this._x1, this._x1 = x;
  this._y0 = this._y1, this._y1 = y;
};
