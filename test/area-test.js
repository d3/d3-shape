var tape = require("tape"),
    shape = require("../");

require("./pathEqual");

tape("area() returns a default area shape", function(test) {
  var a = shape.area();
  test.equal(a.x0()([42, 34]), 42);
  test.equal(a.x1(), null);
  test.equal(a.y0()([42, 34]), 0);
  test.equal(a.y1()([42, 34]), 34);
  test.equal(a.defined()([42, 34]), true);
  test.equal(a.curve(), shape.linear);
  test.equal(a.context(), null);
  test.pathEqual(a([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5L4,0L2,0L0,0Z");
  test.end();
});

tape("area.x(x)(data) observes the specified function", function(test) {
  var x = function(d) { return d.x; },
      a = shape.area().x(x);
  test.equal(a.x(), x);
  test.equal(a.x0(), x);
  test.equal(a.x1(), null);
  test.pathEqual(a([{x: 0, 1: 1}, {x: 2, 1: 3}, {x: 4, 1: 5}]), "M0,1L2,3L4,5L4,0L2,0L0,0Z");
  test.end();
});

tape("area.x(x)(data) observes the specified constant", function(test) {
  var x = 0,
      a = shape.area().x(x);
  test.equal(a.x()(), 0);
  test.equal(a.x0()(), 0);
  test.equal(a.x1(), null);
  test.pathEqual(a([{1: 1}, {1: 3}, {1: 5}]), "M0,1L0,3L0,5L0,0L0,0L0,0Z");
  test.end();
});

tape("area.y(y)(data) observes the specified function", function(test) {
  var y = function(d) { return d.y; },
      a = shape.area().y(y);
  test.equal(a.y(), y);
  test.equal(a.y0(), y);
  test.equal(a.y1(), null);
  test.pathEqual(a([{0: 0, y: 1}, {0: 2, y: 3}, {0: 4, y: 5}]), "M0,1L2,3L4,5L4,5L2,3L0,1Z");
  test.end();
});

tape("area.y(y)(data) observes the specified constant", function(test) {
  var a = shape.area().y(0);
  test.equal(a.y()(), 0);
  test.equal(a.y0()(), 0);
  test.equal(a.y1(), null);
  test.pathEqual(a([{0: 0}, {0: 2}, {0: 4}]), "M0,0L2,0L4,0L4,0L2,0L0,0Z");
  test.end();
});

tape("area.curve(linear)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.linear);
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [2, 3]]), "M0,1L2,3L2,0L0,0Z");
  test.pathEqual(a([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5L4,0L2,0L0,0Z");
  test.end();
});

tape("area.curve(basis)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.basis);
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1L0.166667,1.333333C0.333333,1.666667,0.666667,2.333333,1,2.333333C1.333333,2.333333,1.666667,1.666667,1.833333,1.333333L2,1L2,0L1.833333,0C1.666667,0,1.333333,0,1,0C0.666667,0,0.333333,0,0.166667,0L0,0Z");
  test.end();
});

tape("area.curve(basisOpen)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.basisOpen);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), null);
  test.equal(a([[0, 1], [1, 3]]), null);
  test.pathEqual(a([[0, 0], [0, 10], [10, 10]]), "M1.666667,8.333333L1.666667,0Z");
  test.pathEqual(a([[0, 0], [0, 10], [10, 10], [10, 0]]), "M1.666667,8.333333C3.333333,10,6.666667,10,8.333333,8.333333L8.333333,0C6.666667,0,3.333333,0,1.666667,0Z");
  test.pathEqual(a([[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]]), "M1.666667,8.333333C3.333333,10,6.666667,10,8.333333,8.333333C10,6.666667,10,3.333333,8.333333,1.666667L8.333333,0C10,0,10,0,8.333333,0C6.666667,0,3.333333,0,1.666667,0Z");
  test.end();
});

tape("area.curve(cardinal)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.cardinal);
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,2,1,2,1L2,0C2,0,1.333333,0,1,0C0.666667,0,0,0,0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3,3,3,3L3,0C3,0,2.333333,0,2,0C1.666667,0,1.333333,0,1,0C0.666667,0,0,0,0,0Z");
  test.end();
});

tape("area.curve(cardinalOpen)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.cardinalOpen);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), null);
  test.equal(a([[0, 1], [1, 3]]), null);
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M1,3L1,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1L2,0C1.666667,0,1.333333,0,1,0Z");
  test.end();
});

tape("area.curve(catmullRom, 0.5)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.catmullRom, 0.5);
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,2,1,2,1L2,0C2,0,1.333333,0,1,0C0.666667,0,0,0,0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3,3,3,3L3,0C3,0,2.333333,0,2,0C1.666667,0,1.333333,0,1,0C0.666667,0,0,0,0,0Z");
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

tape("area.curve(step)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.step);
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [2, 3]]), "M0,1L1,1L1,3L2,3L2,0L1,0L1,0L0,0Z");
  test.pathEqual(a([[0, 1], [2, 3], [4, 5]]), "M0,1L1,1L1,3L3,3L3,5L4,5L4,0L3,0L3,0L1,0L1,0L0,0Z");
  test.end();
});

tape("area.curve(stepBefore)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.stepBefore);
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [2, 3]]), "M0,1L0,3L2,3L2,0L2,0L0,0Z");
  test.pathEqual(a([[0, 1], [2, 3], [4, 5]]), "M0,1L0,3L2,3L2,5L4,5L4,0L4,0L2,0L2,0L0,0Z");
  test.end();
});

tape("area.curve(stepAfter)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.stepAfter);
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [2, 3]]), "M0,1L2,1L2,3L2,0L0,0L0,0Z");
  test.pathEqual(a([[0, 1], [2, 3], [4, 5]]), "M0,1L2,1L2,3L4,3L4,5L4,0L2,0L2,0L0,0L0,0Z");
  test.end();
});

tape("area.curve(natural)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.natural);
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0.333333,2,0.666667,3,1,3C1.333333,3,1.666667,2,2,1L2,0C1.666667,0,1.333333,0,1,0C0.666667,0,0.333333,0,0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0.333333,2.111111,0.666667,3.222222,1,3C1.333333,2.777778,1.666667,1.222222,2,1C2.333333,0.777778,2.666667,1.888889,3,3L3,0C2.666667,0,2.333333,0,2,0C1.666667,0,1.333333,0,1,0C0.666667,0,0.333333,0,0,0Z");
  test.end();
});

tape("area.curve(cardinal) uses a default tension of zero", function(test) {
  var a = shape.area().curve(shape.cardinal, 0);
  test.equal(shape.area().curve(shape.cardinal)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().curve(shape.cardinal, null)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().curve(shape.cardinal, undefined)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.curve(cardinalOpen) uses a default tension of zero", function(test) {
  var a = shape.area().curve(shape.cardinalOpen, 0);
  test.equal(shape.area().curve(shape.cardinalOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().curve(shape.cardinalOpen, null)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().curve(shape.cardinalOpen, undefined)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.curve(catmullRom) uses a default alpha of zero", function(test) {
  var a = shape.area().curve(shape.catmullRom, 0);
  test.equal(shape.area().curve(shape.catmullRom)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().curve(shape.catmullRom, null)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().curve(shape.catmullRom, undefined)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.curve(catmullRomOpen) uses a default alpha of zero", function(test) {
  var a = shape.area().curve(shape.catmullRomOpen, 0);
  test.equal(shape.area().curve(shape.catmullRomOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().curve(shape.catmullRomOpen, null)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().curve(shape.catmullRomOpen, undefined)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});
