export function point(basis, x, y) {
  basis._context.bezierCurveTo(
    (2 * basis._x0 + basis._x1) / 3,
    (2 * basis._y0 + basis._y1) / 3,
    (basis._x0 + 2 * basis._x1) / 3,
    (basis._y0 + 2 * basis._y1) / 3,
    (basis._x0 + 4 * basis._x1 + x) / 6,
    (basis._y0 + 4 * basis._y1 + y) / 6
  );
};

function basis(context) {
  return new Basis(context);
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = null;
  },
  lineEnd: function() {
    if (this._x0 != null) {
      point(this, this._x1, this._y1);
      this._context.lineTo(this._x1, this._y1);
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._x0 != null) point(this, x, y);
    else if (this._x1 != null) this._context.lineTo((5 * this._x1 + x) / 6, (5 * this._y1 + y) / 6);
    else this._context.moveTo(x, y);
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

export default basis;
