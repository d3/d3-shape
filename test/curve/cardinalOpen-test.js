var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveCardinalOpen)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveCardinalOpen);
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), null);
  test.equal(l([[0, 1], [1, 3]]), null);
  test.pathEqual(l([[0, 1], [1, 3], [2, 1]]), "M1,3Z");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1");
  test.end();
});

tape("line.curve(curveCardinalOpen) uses a default tension of zero", function(test) {
  var l = shape.line().curve(shape.curveCardinalOpen.tension(0));
  test.equal(shape.line().curve(shape.curveCardinalOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("line.curve(curveCardinalOpen.tension(tension)) uses the specified tension", function(test) {
  test.pathEqual(shape.line().curve(shape.curveCardinalOpen.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.166667,3,1.833333,1,2,1");
  test.end();
});

tape("line.curve(curveCardinalOpen.tension(tension)) coerces the specified tension to a number", function(test) {
  var l = shape.line().curve(shape.curveCardinalOpen.tension("0.5"));
  test.equal(shape.line().curve(shape.curveCardinalOpen.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.curve(curveCardinalOpen)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.curveCardinalOpen);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), null);
  test.equal(a([[0, 1], [1, 3]]), null);
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M1,3L1,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1L2,0C1.666667,0,1.333333,0,1,0Z");
  test.end();
});

tape("area.curve(curveCardinalOpen) uses a default tension of zero", function(test) {
  var a = shape.area().curve(shape.curveCardinalOpen.tension(0));
  test.equal(shape.area().curve(shape.curveCardinalOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.curve(curveCardinalOpen.tension(tension)) uses the specified tension", function(test) {
  test.pathEqual(shape.area().curve(shape.curveCardinalOpen.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.166667,3,1.833333,1,2,1L2,0C1.833333,0,1.166667,0,1,0Z");
  test.end();
});

tape("area.curve(curveCardinalOpen.tension(tension)) coerces the specified tension to a number", function(test) {
  var a = shape.area().curve(shape.curveCardinalOpen.tension("0.5"));
  test.equal(shape.area().curve(shape.curveCardinalOpen.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});
