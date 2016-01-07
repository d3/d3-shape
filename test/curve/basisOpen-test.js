var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveBasisOpen)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveBasisOpen);
  test.equal(l([]), null);
  test.equal(l([[0, 0]]), null);
  test.equal(l([[0, 0], [0, 10]]), null);
  test.pathEqual(l([[0, 0], [0, 10], [10, 10]]), "M1.666667,8.333333Z");
  test.pathEqual(l([[0, 0], [0, 10], [10, 10], [10, 0]]), "M1.666667,8.333333C3.333333,10,6.666667,10,8.333333,8.333333");
  test.pathEqual(l([[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]]), "M1.666667,8.333333C3.333333,10,6.666667,10,8.333333,8.333333C10,6.666667,10,3.333333,8.333333,1.666667");
  test.end();
});

tape("area.curve(curveBasisOpen)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.curveBasisOpen);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), null);
  test.equal(a([[0, 1], [1, 3]]), null);
  test.pathEqual(a([[0, 0], [0, 10], [10, 10]]), "M1.666667,8.333333L1.666667,0Z");
  test.pathEqual(a([[0, 0], [0, 10], [10, 10], [10, 0]]), "M1.666667,8.333333C3.333333,10,6.666667,10,8.333333,8.333333L8.333333,0C6.666667,0,3.333333,0,1.666667,0Z");
  test.pathEqual(a([[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]]), "M1.666667,8.333333C3.333333,10,6.666667,10,8.333333,8.333333C10,6.666667,10,3.333333,8.333333,1.666667L8.333333,0C10,0,10,0,8.333333,0C6.666667,0,3.333333,0,1.666667,0Z");
  test.end();
});
