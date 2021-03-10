var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveBumpX)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveBumpX);
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1]]), "M0,1Z");
  test.pathEqual(l([[0, 1], [1, 3]]), "M0,1C0.500000,1,0.500000,3,1,3");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0.500000,1,0.500000,3,1,3C1.500000,3,1.500000,1,2,1");
  test.end();
});

tape("area.curve(curveBumpX)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.curveBumpX);
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3]]), "M0,1C0.500000,1,0.500000,3,1,3L1,0C0.500000,0,0.500000,0,0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0.500000,1,0.500000,3,1,3C1.500000,3,1.500000,1,2,1L2,0C1.500000,0,1.500000,0,1,0C0.500000,0,0.500000,0,0,0Z");
  test.end();
});
