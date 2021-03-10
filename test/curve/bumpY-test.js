var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveBumpY)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveBumpY);
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1]]), "M0,1Z");
  test.pathEqual(l([[0, 1], [1, 3]]), "M0,1C0,2,1,2,1,3");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0,2,1,2,1,3C1,2,2,2,2,1");
  test.end();
});

tape("area.curve(curveBumpY)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.curveBumpY);
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3]]), "M0,1C0,2,1,2,1,3L1,0C1,0,0,0,0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0,2,1,2,1,3C1,2,2,2,2,1L2,0C2,0,1,0,1,0C1,0,0,0,0,0Z");
  test.end();
});
