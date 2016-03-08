var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveCatmullRomClosed)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveCatmullRomClosed);
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1]]), "M0,1Z");
  test.pathEqual(l([[0, 1], [1, 3]]), "M1,3L0,1Z");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1]]), "M1,3C1.333333,3,2.200267,1.324038,2,1C1.810600,0.693544,0.189400,0.693544,0,1C-0.200267,1.324038,0.666667,3,1,3");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3.160469,2.858341,3,3C2.796233,3.179882,0.203767,0.820118,0,1C-0.160469,1.141659,0.666667,3,1,3");
  test.end();
});

tape("line.curve(curveCatmullRomClosed.alpha(0))(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveCatmullRomClosed.alpha(0));
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1]]), "M0,1Z");
  test.pathEqual(l([[0, 1], [1, 3]]), "M1,3L0,1Z");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1]]), "M1,3C1.333333,3,2.166667,1.333333,2,1C1.833333,0.666667,0.166667,0.666667,0,1C-0.166667,1.333333,0.666667,3,1,3");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3.333333,3,3,3C2.666667,3,0.333333,1,0,1C-0.333333,1,0.666667,3,1,3");
  test.end();
});

tape("line.curve(curveCatmullRomClosed.alpha(1))(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveCatmullRomClosed.alpha(1));
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1]]), "M0,1Z");
  test.pathEqual(l([[0, 1], [1, 3]]), "M1,3L0,1Z");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1]]), "M1,3C1.333333,3,2.236068,1.314757,2,1C1.788854,0.718473,0.211146,0.718473,0,1C-0.236068,1.314757,0.666667,3,1,3");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3.031652,2.746782,3,3C2.948962,3.408301,0.051038,0.591699,0,1C-0.031652,1.253218,0.666667,3,1,3");
  test.end();
});

tape("line.curve(curveCatmullRomClosed) uses a default alpha of 0.5 (centripetal)", function(test) {
  var l = shape.line().curve(shape.curveCatmullRomClosed.alpha(0.5));
  test.equal(shape.line().curve(shape.curveCatmullRomClosed)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("line.curve(curveCatmullRomClosed.alpha(alpha)) coerces the specified alpha to a number", function(test) {
  var l = shape.line().curve(shape.curveCatmullRomClosed.alpha("0.5"));
  test.equal(shape.line().curve(shape.curveCatmullRomClosed.alpha(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.curve(curveCatmullRomClosed.alpha(alpha)) coerces the specified alpha to a number", function(test) {
  var a = shape.area().curve(shape.curveCatmullRomClosed.alpha("0.5"));
  test.equal(shape.area().curve(shape.curveCatmullRomClosed.alpha(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});
