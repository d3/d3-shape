var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveNatural)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveNatural);
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1]]), "M0,1Z");
  test.pathEqual(l([[0, 1], [1, 3]]), "M0,1L1,3");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0.333333,2,0.666667,3,1,3C1.333333,3,1.666667,2,2,1");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0.333333,2.111111,0.666667,3.222222,1,3C1.333333,2.777778,1.666667,1.222222,2,1C2.333333,0.777778,2.666667,1.888889,3,3");
  test.end();
});

tape("area.curve(curveNatural)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.curveNatural);
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0.333333,2,0.666667,3,1,3C1.333333,3,1.666667,2,2,1L2,0C1.666667,0,1.333333,0,1,0C0.666667,0,0.333333,0,0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0.333333,2.111111,0.666667,3.222222,1,3C1.333333,2.777778,1.666667,1.222222,2,1C2.333333,0.777778,2.666667,1.888889,3,3L3,0C2.666667,0,2.333333,0,2,0C1.666667,0,1.333333,0,1,0C0.666667,0,0.333333,0,0,0Z");
  test.end();
});
