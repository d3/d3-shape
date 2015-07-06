import {interpolateLinear} from "./interpolateLinear";

// Returns the dot product of the given four-element vectors.
function dot4(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

// Matrix to transform basis (b-spline) control points to bezier
// control points. Derived from FvD 11.2.8.
var basisBezier1 = [0, 2/3, 1/3, 0],
    basisBezier2 = [0, 1/3, 2/3, 0],
    basisBezier3 = [0, 1/6, 2/3, 1/6];

// Pushes a "C" Bézier curve onto the specified path array, given the
// two specified four-element arrays which define the control points.
function basisBezier(path, x, y) {
  path.push(
      "C", dot4(basisBezier1, x),
      ",", dot4(basisBezier1, y),
      ",", dot4(basisBezier2, x),
      ",", dot4(basisBezier2, y),
      ",", dot4(basisBezier3, x),
      ",", dot4(basisBezier3, y));
}

export function interpolateBasis(points) {
  if (points.length < 3) return interpolateLinear(points);
  var i = 1,
      n = points.length,
      pi = points[0],
      x0 = pi[0],
      y0 = pi[1],
      px = [x0, x0, x0, (pi = points[1])[0]],
      py = [y0, y0, y0, pi[1]],
      path = [x0, ",", y0, "L", dot4(basisBezier3, px), ",", dot4(basisBezier3, py)];
  points.push(points[n - 1]);
  while (++i <= n) {
    pi = points[i];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    basisBezier(path, px, py);
  }
  points.pop();
  path.push("L", pi);
  return path.join("");
};

// Open B-spline interpolation; generates "C" commands.
export function interpolateBasisOpen(points) {
  if (points.length < 4) return interpolateLinear(points);
  var path = [],
      i = -1,
      n = points.length,
      pi,
      px = [0],
      py = [0];
  while (++i < 3) {
    pi = points[i];
    px.push(pi[0]);
    py.push(pi[1]);
  }
  path.push(dot4(basisBezier3, px)
    + "," + dot4(basisBezier3, py));
  --i; while (++i < n) {
    pi = points[i];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    basisBezier(path, px, py);
  }
  return path.join("");
};

// Closed B-spline interpolation; generates "C" commands.
export function interpolateBasisClosed(points) {
  var path,
      i = -1,
      n = points.length,
      m = n + 4,
      pi,
      px = [],
      py = [];
  while (++i < 4) {
    pi = points[i % n];
    px.push(pi[0]);
    py.push(pi[1]);
  }
  path = [
    dot4(basisBezier3, px), ",",
    dot4(basisBezier3, py)
  ];
  --i; while (++i < m) {
    pi = points[i % n];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    basisBezier(path, px, py);
  }
  return path.join("");
};
