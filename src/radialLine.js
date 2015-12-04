import constant from "./constant";
import line from "./line";
import {halfPi} from "./math";

function lineRadius(d) {
  return d.radius;
}

function lineAngle(d) {
  return d.angle;
}

export default function() {
  var radialLine = line().x(x).y(y),
      r,
      a,
      radius = lineRadius,
      angle = lineAngle;

  delete radialLine.x;
  delete radialLine.y;

  function x(d, i, data) {
    r = +radius(d, i, data);
    a = +angle(d, i, data) - halfPi;
    return r * Math.cos(a);
  }

  function y() {
    return r * Math.sin(a);
  }

  radialLine.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), radialLine) : radius;
  };

  radialLine.angle = function(_) {
    return arguments.length ? (angle = typeof _ === "function" ? _ : constant(+_), radialLine) : angle;
  };

  return radialLine;
};
