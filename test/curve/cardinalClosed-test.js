var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveCardinalClosed)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveCardinalClosed);
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1]]), "M0,1Z");
  test.pathEqual(l([[0, 1], [1, 3]]), "M1,3L0,1Z");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1]]), "M1,3C1.333333,3,2.166667,1.333333,2,1C1.833333,0.666667,0.166667,0.666667,0,1C-0.166667,1.333333,0.666667,3,1,3");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3.333333,3,3,3C2.666667,3,0.333333,1,0,1C-0.333333,1,0.666667,3,1,3");
  test.end();
});

tape("line.curve(curveCardinalClosed) uses a default tension of zero", function(test) {
  var l = shape.line().curve(shape.curveCardinalClosed.tension(0));
  test.equal(shape.line().curve(shape.curveCardinalClosed)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("line.curve(curveCardinalClosed.tension(tension)) uses the specified tension", function(test) {
  test.equal(shape.line().curve(shape.curveCardinalClosed.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.1666666666666667,3,1.8333333333333333,1,2,1C2.1666666666666665,1,3.1666666666666665,3,3,3C2.8333333333333335,3,0.16666666666666666,1,0,1C-0.16666666666666666,1,0.8333333333333334,3,1,3");
  test.end();
});

tape("line.curve(curveCardinalClosed.tension(tension)) coerces the specified tension to a number", function(test) {
  var l = shape.line().curve(shape.curveCardinalClosed.tension("0.5"));
  test.equal(shape.line().curve(shape.curveCardinalClosed.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.curve(curveCardinalClosed)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.curveCardinalClosed);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1ZM0,0Z");
  test.equal(a([[0, 1], [1, 3]]), "M1,3L0,1ZM0,0L1,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M1,3C1.333333,3,2.166667,1.333333,2,1C1.833333,0.666667,0.166667,0.666667,0,1C-0.166667,1.333333,0.666667,3,1,3M1,0C0.666667,0,-0.166667,0,0,0C0.166667,0,1.833333,0,2,0C2.166667,0,1.333333,0,1,0");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3.333333,3,3,3C2.666667,3,0.333333,1,0,1C-0.333333,1,0.666667,3,1,3M2,0C1.666667,0,1.333333,0,1,0C0.666667,0,-0.333333,0,0,0C0.333333,0,2.666667,0,3,0C3.333333,0,2.333333,0,2,0");
  test.end();
});

tape("area.curve(curveCardinalClosed) uses a default tension of zero", function(test) {
  var a = shape.area().curve(shape.curveCardinalClosed.tension(0));
  test.equal(shape.area().curve(shape.curveCardinalClosed)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.curve(curveCardinalClosed.tension(tension)) uses the specified tension", function(test) {
  test.equal(shape.area().curve(shape.curveCardinalClosed.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.1666666666666667,3,1.8333333333333333,1,2,1C2.1666666666666665,1,3.1666666666666665,3,3,3C2.8333333333333335,3,0.16666666666666666,1,0,1C-0.16666666666666666,1,0.8333333333333334,3,1,3M2,0C1.8333333333333333,0,1.1666666666666667,0,1,0C0.8333333333333334,0,-0.16666666666666666,0,0,0C0.16666666666666666,0,2.8333333333333335,0,3,0C3.1666666666666665,0,2.1666666666666665,0,2,0");
  test.end();
});

tape("area.curve(curveCardinalClosed.tension(tension)) coerces the specified tension to a number", function(test) {
  var a = shape.area().curve(shape.curveCardinalClosed.tension("0.5"));
  test.equal(shape.area().curve(shape.curveCardinalClosed.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});
