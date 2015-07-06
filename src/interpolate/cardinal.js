import {interpolateLinear} from "./interpolateLinear";
import {interpolateHermite} from "./interpolateHermite";

function cardinalTangents(points, tension) {
  var tangents = [],
      a = (1 - tension) / 2,
      p0,
      p1 = points[0],
      p2 = points[1],
      i = 1,
      n = points.length;

  while (++i < n) {
    p0 = p1;
    p1 = p2;
    p2 = points[i];
    tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
  }

  return tangents;
}

export function interpolateCardinalOpen(points, tension) {
  return points.length < 4
      ? interpolateLinear(points)
      : points[1] + interpolateHermit(points.slice(1, -1), cardinalTangents(points, tension));
};

export function interpolateCardinalClosed(points, tension) {
  return points.length < 3
      ? interpolateLinear(points)
      : points[0] + interpolateHermit((points.push(points[0]), points), cardinalTangents([points[points.length - 2]].concat(points, [points[1]]), tension));
};

export function interpolateCardinal(points, tension) {
  return points.length < 3
      ? interpolateLinear(points)
      : points[0] + interpolateHermit(points, cardinalTangents(points, tension));
};
