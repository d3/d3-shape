import constant from "./constant";
import curveBind from "./curve/bind";
import curveLinear from "./curve/linear";
import curveRadial from "./curve/radial";
import area from "./area";

export default function() {
  var a = area(),
      c = a.curve;

  a.radius = a.x, delete a.x;
  a.innerRadius = a.x0, delete a.x0;
  a.outerRadius = a.x1, delete a.x1;

  a.angle = a.y, delete a.y;
  a.startAngle = a.y0, delete a.y0;
  a.endAngle = a.y1, delete a.y1;

  a.curve = function(_) {
    return arguments.length ? c(curveRadial(_, arguments)) : c()._curve;
  };

  return a.curve(curveLinear);
};
