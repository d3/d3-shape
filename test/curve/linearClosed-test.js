var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveLinearClosed)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveLinearClosed);
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1]]), "M0,1Z");
  test.pathEqual(l([[0, 1], [2, 3]]), "M0,1L2,3Z");
  test.pathEqual(l([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5Z");
  test.end();
});
