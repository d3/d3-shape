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
  test.pathEqual(shape.line().curve(shape.curveCardinalClosed.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.166667,3,1.833333,1,2,1C2.166667,1,3.166667,3,3,3C2.833333,3,0.166667,1,0,1C-0.166667,1,0.833333,3,1,3");
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
  test.pathEqual(shape.area().curve(shape.curveCardinalClosed.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.166667,3,1.833333,1,2,1C2.166667,1,3.166667,3,3,3C2.833333,3,0.166667,1,0,1C-0.166667,1,0.833333,3,1,3M2,0C1.833333,0,1.166667,0,1,0C0.833333,0,-0.166667,0,0,0C0.166667,0,2.833333,0,3,0C3.166667,0,2.166667,0,2,0");
  test.end();
});

tape("area.curve(curveCardinalClosed.tension(tension)) coerces the specified tension to a number", function(test) {
  var a = shape.area().curve(shape.curveCardinalClosed.tension("0.5"));
  test.equal(shape.area().curve(shape.curveCardinalClosed.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});
