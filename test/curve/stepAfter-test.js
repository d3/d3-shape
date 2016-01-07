var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveStepAfter)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveStepAfter);
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1]]), "M0,1Z");
  test.pathEqual(l([[0, 1], [2, 3]]), "M0,1L2,1L2,3");
  test.pathEqual(l([[0, 1], [2, 3], [4, 5]]), "M0,1L2,1L2,3L4,3L4,5");
  test.end();
});

tape("area.curve(curveStepAfter)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.curveStepAfter);
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [2, 3]]), "M0,1L2,1L2,3L2,0L2,0L0,0Z");
  test.pathEqual(a([[0, 1], [2, 3], [4, 5]]), "M0,1L2,1L2,3L4,3L4,5L4,0L4,0L2,0L2,0L0,0Z");
  test.end();
});
