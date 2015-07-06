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
  if (this._x1 == null) this._context.moveTo(x, y);
  else if (this._x0 == null) this._context.lineTo((5 * this._x1 + x) / 6, (5 * this._y1 + y) / 6);
  else this._context.bezierCurveTo((2 * this._x0 + this._x1) / 3, (2 * this._y0 + this._y1) / 3, (this._x0 + 2 * this._x1) / 3, (this._y0 + 2 * this._y1) / 3, (this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
  this._x0 = this._x1, this._x1 = x;
  this._y0 = this._y1, this._y1 = y;
};

// else if (this._x0 == null) this._context.bezierCurveTo(
//   (0 * this._x0 + 4 * this._x0 + 2 * this._x1 + 0 * x) / 6,
//   (0 * this._y0 + 4 * this._y0 + 2 * this._y1 + 0 * y) / 6,
//   (0 * this._x0 + 2 * this._x0 + 4 * this._x1 + 0 * x) / 6,
//   (0 * this._y0 + 2 * this._y0 + 4 * this._y1 + 0 * y) / 6,
//   (0 * this._x0 + 1 * this._x0 + 4 * this._x1 + 1 * x) / 6,
//   (0 * this._y0 + 1 * this._y0 + 4 * this._y1 + 1 * y) / 6
// );
// else this._context.bezierCurveTo(
//   (0 * this._x0 + 4 * this._x0 + 2 * this._x1 + 0 * x) / 6,
//   (0 * this._y0 + 4 * this._y0 + 2 * this._y1 + 0 * y) / 6,
//   (0 * this._x0 + 2 * this._x0 + 4 * this._x1 + 0 * x) / 6,
//   (0 * this._y0 + 2 * this._y0 + 4 * this._y1 + 0 * y) / 6,
//   (0 * this._x0 + 1 * this._x0 + 4 * this._x1 + 1 * x) / 6,
//   (0 * this._y0 + 1 * this._y0 + 4 * this._y1 + 1 * y) / 6
// );

// export function interpolateBasis(points) {
//   if (points.length < 3) return interpolateLinear(points);
//   var i = 1,
//       n = points.length,
//       pi = points[0],
//       x0 = pi[0],
//       y0 = pi[1],
//       px = [x0, x0, x0, (pi = points[1])[0]],
//       py = [y0, y0, y0, pi[1]],
//       path = [x0, ",", y0, "L", dot4(basisBezier3, px), ",", dot4(basisBezier3, py)];
//   points.push(points[n - 1]);
//   while (++i <= n) {
//     pi = points[i];
//     px.shift(); px.push(pi[0]);
//     py.shift(); py.push(pi[1]);
//     basisBezier(path, px, py);
//   }
//   points.pop();
//   path.push("L", pi);
//   return path.join("");
// };

// // Open B-spline interpolation; generates "C" commands.
// export function interpolateBasisOpen(points) {
//   if (points.length < 4) return interpolateLinear(points);
//   var path = [],
//       i = -1,
//       n = points.length,
//       pi,
//       px = [0],
//       py = [0];
//   while (++i < 3) {
//     pi = points[i];
//     px.push(pi[0]);
//     py.push(pi[1]);
//   }
//   path.push(dot4(basisBezier3, px)
//     + "," + dot4(basisBezier3, py));
//   --i; while (++i < n) {
//     pi = points[i];
//     px.shift(); px.push(pi[0]);
//     py.shift(); py.push(pi[1]);
//     basisBezier(path, px, py);
//   }
//   return path.join("");
// };

// // Closed B-spline interpolation; generates "C" commands.
// export function interpolateBasisClosed(points) {
//   var path,
//       i = -1,
//       n = points.length,
//       m = n + 4,
//       pi,
//       px = [],
//       py = [];
//   while (++i < 4) {
//     pi = points[i % n];
//     px.push(pi[0]);
//     py.push(pi[1]);
//   }
//   path = [
//     dot4(basisBezier3, px), ",",
//     dot4(basisBezier3, py)
//   ];
//   --i; while (++i < m) {
//     pi = points[i % n];
//     px.shift(); px.push(pi[0]);
//     py.shift(); py.push(pi[1]);
//     basisBezier(path, px, py);
//   }
//   return path.join("");
// };
