import * as polygon from "d3-polygon";

export function polygonContext() {
  return {
    points: null,
    area: function() { return Math.abs(polygon.polygonArea(this.points)); },
    moveTo: function(x, y) { this.points = [[x, y]]; },
    lineTo: function(x, y) { this.points.push([x, y]); },
    rect: function(x, y, w, h) { this.points = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; },
    closePath: function() {}
  };
}
