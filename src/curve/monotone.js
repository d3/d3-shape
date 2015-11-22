function monotone(context) {
    return new Monotone(context);
}

function Monotone(context) {
    this._context = context;
}

Monotone.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var dx,
            s = slopes(x, y);

        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          // According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
          // "you can express cubic Hermite interpolation in terms of cubic
          // Bézier curves with respect to the four values p0, p0 + m0 / 3, p1 -
          // m1 / 3, p1".
          dx = (x[i1] - x[i0]) / 3.0;
          this._context.bezierCurveTo(x[i0] + dx, y[i0] + dx * s[i0], x[i1] - dx, y[i1] - dx * s[i1], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
}

function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slopes(x, y) {
  var h0,
      h1,
      s0,
      s1,
      p,
      l = x.length,
      t = new Array(l);

  for (var i = 1; i < l - 1; i++) {
    h0 = x[i] - x[i - 1];
    h1 = x[i + 1] - x[i];
    s0 = h0 === 0 ? 0 : (y[i] - y[i - 1]) / h0;
    s1 = h1 === 0 ? 0 : (y[i + 1] - y[i]) / h1;
    p = h0 + h1 === 0 ? 0 : (s0 * h1 + s1 * h0) / (h0 + h1);
    t[i] = (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p));
  }

  // Easiest option for handling boundary points: just choose to set the slope to 0.
  t[0] = 0;
  t[l - 1] = 0;

  return t;
}

export default monotone;
