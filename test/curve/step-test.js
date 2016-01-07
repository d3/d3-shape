var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveStep)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveStep);
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1]]), "M0,1Z");
  test.pathEqual(l([[0, 1], [2, 3]]), "M0,1L1,1L1,3L2,3");
  test.pathEqual(l([[0, 1], [2, 3], [4, 5]]), "M0,1L1,1L1,3L3,3L3,5L4,5");
  test.end();
});

tape("area.curve(curveStep)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.curveStep);
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [2, 3]]), "M0,1L1,1L1,3L2,3L2,0L1,0L1,0L0,0Z");
  test.pathEqual(a([[0, 1], [2, 3], [4, 5]]), "M0,1L1,1L1,3L3,3L3,5L4,5L4,0L3,0L3,0L1,0L1,0L0,0Z");
  test.end();
});
