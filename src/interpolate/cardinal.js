export function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - (tension == null ? .7 : tension)) / 2; // TODO
};

Cardinal.prototype.lineStart = function() {
  this._x0 = this._x1 = this._x2 =
  this._y0 = this._y1 = this._y2 = null;
};

Cardinal.prototype.lineEnd = function() {
  if (this._x0 != null) {
    this._context.quadraticCurveTo(
      this._x1 + this._k * (this._x2 - this._x0) * 2 / 3,
      this._y1 + this._k * (this._y2 - this._y0) * 2 / 3,
      this._x2,
      this._y2
    );
  } else if (this._x1 != null) {
    this._context.lineTo(this._x2, this._y2);
  }
};

Cardinal.prototype.point = function(x, y) {
  x = +x, y = +y;
  if (this._x0 != null) {
    this._context.bezierCurveTo(
      this._x1 + this._k * (this._x2 - this._x0),
      this._y1 + this._k * (this._y2 - this._y0),
      this._x2 - this._k * (x - this._x1),
      this._y2 - this._k * (y - this._y1),
      this._x2,
      this._y2
    );
  } else if (this._x1 != null) {
    this._context.quadraticCurveTo(
      this._x2 - this._k * (x - this._x1) * 2 / 3,
      this._y2 - this._k * (y - this._y1) * 2 / 3,
      this._x2,
      this._y2
    );
  } else if (this._x2 == null) {
    this._context.moveTo(x, y);
  }
  this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
  this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
};

export function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - (tension == null ? .7 : tension)) / 2; // TODO
};

CardinalOpen.prototype.lineStart = function() {
  this._x0 = this._x1 = this._x2 =
  this._y0 = this._y1 = this._y2 = null;
};

CardinalOpen.prototype.lineEnd = function() {};

CardinalOpen.prototype.point = function(x, y) {
  x = +x, y = +y;
  if (this._x0 != null) {
    this._context.bezierCurveTo(
      this._x1 + this._k * (this._x2 - this._x0),
      this._y1 + this._k * (this._y2 - this._y0),
      this._x2 - this._k * (x - this._x1),
      this._y2 - this._k * (y - this._y1),
      this._x2,
      this._y2
    );
  } else if (this._x1 == null && this._x2 != null) {
    this._context.moveTo(x, y);
  }
  this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
  this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
};

// function cardinalTangents(points, tension) {
//   var tangents = [],
//       a = (1 - tension) / 2,
//       p0,
//       p1 = points[0],
//       p2 = points[1],
//       i = 1,
//       n = points.length;

//   while (++i < n) {
//     p0 = p1;
//     p1 = p2;
//     p2 = points[i];
//     tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
//   }

//   return tangents;
// }

// export function interpolateCardinalOpen(points, tension) {
//   return points.length < 4
//       ? interpolateLinear(points)
//       : points[1] + interpolateHermit(points.slice(1, -1), cardinalTangents(points, tension));
// };

// export function interpolateCardinalClosed(points, tension) {
//   return points.length < 3
//       ? interpolateLinear(points)
//       : points[0] + interpolateHermit((points.push(points[0]), points), cardinalTangents([points[points.length - 2]].concat(points, [points[1]]), tension));
// };

// export function interpolateCardinal(points, tension) {
//   return points.length < 3
//       ? interpolateLinear(points)
//       : points[0] + interpolateHermit(points, cardinalTangents(points, tension));
// };
