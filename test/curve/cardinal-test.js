var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveCardinal)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveCardinal);
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1]]), "M0,1Z");
  test.pathEqual(l([[0, 1], [1, 3]]), "M0,1L1,3");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,2,1,2,1");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3,3,3,3");
  test.end();
});

tape("line.curve(curveCardinal) uses a default tension of zero", function(test) {
  var l = shape.line().curve(shape.curveCardinal.tension(0));
  test.equal(shape.line().curve(shape.curveCardinal)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("line.curve(curveCardinal.tension(tension)) uses the specified tension", function(test) {
  test.pathEqual(shape.line().curve(shape.curveCardinal.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.833333,3,1,3C1.166667,3,1.833333,1,2,1C2.166667,1,3,3,3,3");
  test.end();
});

tape("line.curve(curveCardinal.tension(tension)) coerces the specified tension to a number", function(test) {
  var l = shape.line().curve(shape.curveCardinal.tension("0.5"));
  test.equal(shape.line().curve(shape.curveCardinal.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.curve(curveCardinal)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.curveCardinal);
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,2,1,2,1L2,0C2,0,1.333333,0,1,0C0.666667,0,0,0,0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3,3,3,3L3,0C3,0,2.333333,0,2,0C1.666667,0,1.333333,0,1,0C0.666667,0,0,0,0,0Z");
  test.end();
});

tape("area.curve(curveCardinal) uses a default tension of zero", function(test) {
  var a = shape.area().curve(shape.curveCardinal.tension(0));
  test.equal(shape.area().curve(shape.curveCardinal)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.curve(curveCardinal.tension(tension)) uses the specified tension", function(test) {
  test.pathEqual(shape.area().curve(shape.curveCardinal.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.833333,3,1,3C1.166667,3,1.833333,1,2,1C2.166667,1,3,3,3,3L3,0C3,0,2.166667,0,2,0C1.833333,0,1.166667,0,1,0C0.833333,0,0,0,0,0Z");
  test.end();
});

tape("area.curve(curveCardinal.tension(tension)) coerces the specified tension to a number", function(test) {
  var a = shape.area().curve(shape.curveCardinal.tension("0.5"));
  test.equal(shape.area().curve(shape.curveCardinal.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});
