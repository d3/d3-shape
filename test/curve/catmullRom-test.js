var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveCatmullRom)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveCatmullRom);
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1]]), "M0,1Z");
  test.pathEqual(l([[0, 1], [1, 3]]), "M0,1L1,3");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,2,1,2,1");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3,3,3,3");
  test.end();
});

tape("line.curve(curveCatmullRom.alpha(1))(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveCatmullRom.alpha(1));
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1]]), "M0,1Z");
  test.pathEqual(l([[0, 1], [1, 3]]), "M0,1L1,3");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,2,1,2,1");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3,3,3,3");
  test.end();
});

tape("line.curve(curveCatmullRom) uses a default alpha of 0.5 (centripetal)", function(test) {
  var l = shape.line().curve(shape.curveCatmullRom.alpha(0.5));
  test.equal(shape.line().curve(shape.curveCatmullRom)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("line.curve(curveCatmullRom.alpha(alpha)) coerces the specified alpha to a number", function(test) {
  var l = shape.line().curve(shape.curveCatmullRom.alpha("0.5"));
  test.equal(shape.line().curve(shape.curveCatmullRom.alpha(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.curve(curveCatmullRom.alpha(0))(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.curveCatmullRom.alpha(0));
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,2,1,2,1L2,0C2,0,1.333333,0,1,0C0.666667,0,0,0,0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3,3,3,3L3,0C3,0,2.333333,0,2,0C1.666667,0,1.333333,0,1,0C0.666667,0,0,0,0,0Z");
  test.end();
});

tape("area.curve(curveCatmullRom) uses a default alpha of 0.5 (centripetal)", function(test) {
  var a = shape.area().curve(shape.curveCatmullRom.alpha(0.5));
  test.equal(shape.area().curve(shape.curveCatmullRom)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.curve(curveCatmullRom.alpha(alpha)) coerces the specified alpha to a number", function(test) {
  var a = shape.area().curve(shape.curveCatmullRom.alpha("0.5"));
  test.equal(shape.area().curve(shape.curveCatmullRom.alpha(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});
