var tape = require("tape"),
    shape = require("../");

require("./pathEqual");

tape("arc() can render a complete circle", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: 2 * Math.PI}), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100L0,0Z");
  test.end();
});
