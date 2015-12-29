var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(catmullRomOpen)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.catmullRomOpen);
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), null);
  test.equal(l([[0, 1], [1, 3]]), null);
  test.pathEqual(l([[0, 1], [1, 3], [2, 1]]), "M1,3Z");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1");
  test.end();
});

tape("line.curve(catmullRomOpen, 1)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.catmullRomOpen, 1);
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), null);
  test.equal(l([[0, 1], [1, 3]]), null);
  test.pathEqual(l([[0, 1], [1, 3], [2, 1]]), "M1,3Z");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1");
  test.end();
});

tape("line.curve(catmullRomOpen) uses a default alpha of 0.5 (centripetal)", function(test) {
  var l = shape.line().curve(shape.catmullRomOpen, 0.5);
  test.equal(shape.line().curve(shape.catmullRomOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.line().curve(shape.catmullRomOpen, null)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.line().curve(shape.catmullRomOpen, undefined)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.curve(catmullRomOpen, 0.5)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.catmullRomOpen, 0.5);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), null);
  test.equal(a([[0, 1], [1, 3]]), null);
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M1,3L1,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1L2,0C1.666667,0,1.333333,0,1,0Z");
  test.end();
});

tape("area.curve(catmullRomOpen) uses a default alpha of 0.5 (centripetal)", function(test) {
  var a = shape.area().curve(shape.catmullRomOpen, 0.5);
  test.equal(shape.area().curve(shape.catmullRomOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().curve(shape.catmullRomOpen, null)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().curve(shape.catmullRomOpen, undefined)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});
