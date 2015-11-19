var tape = require("tape"),
    shape = require("../");

tape("area() returns a default area shape", function(test) {
  var a = shape.area();
  test.equal(a.x0()([42, 34]), 42);
  test.equal(a.x1(), null);
  test.equal(a.y0()([42, 34]), 0);
  test.equal(a.y1()([42, 34]), 34);
  test.equal(a.defined()([42, 34]), true);
  test.equal(a.interpolate(), shape.linear);
  test.equal(a.context(), null);
  test.equal(a([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5L4,0L2,0L0,0Z");
  test.end();
});

tape("area.x(x)(data) observes the specified function", function(test) {
  var x = function(d) { return d.x; },
      a = shape.area().x(x);
  test.equal(a.x(), x);
  test.equal(a.x0(), x);
  test.equal(a.x1(), null);
  test.equal(a([{x: 0, 1: 1}, {x: 2, 1: 3}, {x: 4, 1: 5}]), "M0,1L2,3L4,5L4,0L2,0L0,0Z");
  test.end();
});

tape("area.x(x)(data) observes the specified constant", function(test) {
  var x = 0,
      a = shape.area().x(x);
  test.equal(a.x()(), 0);
  test.equal(a.x0()(), 0);
  test.equal(a.x1(), null);
  test.equal(a([{1: 1}, {1: 3}, {1: 5}]), "M0,1L0,3L0,5L0,0L0,0L0,0Z");
  test.end();
});

tape("area.y(y)(data) observes the specified function", function(test) {
  var y = function(d) { return d.y; },
      a = shape.area().y(y);
  test.equal(a.y(), y);
  test.equal(a.y0(), y);
  test.equal(a.y1(), null);
  test.equal(a([{0: 0, y: 1}, {0: 2, y: 3}, {0: 4, y: 5}]), "M0,1L2,3L4,5L4,5L2,3L0,1Z");
  test.end();
});

tape("area.y(y)(data) observes the specified constant", function(test) {
  var a = shape.area().y(0);
  test.equal(a.y()(), 0);
  test.equal(a.y0()(), 0);
  test.equal(a.y1(), null);
  test.equal(a([{0: 0}, {0: 2}, {0: 4}]), "M0,0L2,0L4,0L4,0L2,0L0,0Z");
  test.end();
});

tape("area.interpolate(linear)(data) generates the expected path", function(test) {
  var a = shape.area().interpolate(shape.linear);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [2, 3]]), "M0,1L2,3L2,0L0,0Z");
  test.equal(a([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5L4,0L2,0L0,0Z");
  test.end();
});

tape("area.interpolate(basis)(data) generates the expected path", function(test) {
  var a = shape.area().interpolate(shape.basis);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.equal(a([[0, 1], [1, 3], [2, 1]]), "M0,1L0.16666666666666666,1.3333333333333333C0.3333333333333333,1.6666666666666667,0.6666666666666666,2.3333333333333335,1,2.3333333333333335C1.3333333333333333,2.3333333333333335,1.6666666666666667,1.6666666666666667,1.8333333333333333,1.3333333333333333L2,1L2,0L1.8333333333333333,0C1.6666666666666667,0,1.3333333333333333,0,1,0C0.6666666666666666,0,0.3333333333333333,0,0.16666666666666666,0L0,0Z");
  test.end();
});

tape("area.interpolate(basisOpen)(data) generates the expected path", function(test) {
  var a = shape.area().interpolate(shape.basisOpen);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), null);
  test.equal(a([[0, 1], [1, 3]]), null);
  test.equal(a([[0, 0], [0, 10], [10, 10]]), "M1.6666666666666667,8.333333333333334L1.6666666666666667,0Z");
  test.equal(a([[0, 0], [0, 10], [10, 10], [10, 0]]), "M1.6666666666666667,8.333333333333334C3.3333333333333335,10,6.666666666666667,10,8.333333333333334,8.333333333333334L8.333333333333334,0C6.666666666666667,0,3.3333333333333335,0,1.6666666666666667,0Z");
  test.equal(a([[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]]), "M1.6666666666666667,8.333333333333334C3.3333333333333335,10,6.666666666666667,10,8.333333333333334,8.333333333333334C10,6.666666666666667,10,3.3333333333333335,8.333333333333334,1.6666666666666667L8.333333333333334,0C10,0,10,0,8.333333333333334,0C6.666666666666667,0,3.3333333333333335,0,1.6666666666666667,0Z");
  test.end();
});

tape("area.interpolate(cardinal)(data) generates the expected path", function(test) {
  var a = shape.area().interpolate(shape.cardinal);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.equal(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.6666666666666667,3,1,3C1.3333333333333333,3,2,1,2,1L2,0C2,0,1.3333333333333333,0,1,0C0.6666666666666667,0,0,0,0,0Z");
  test.equal(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.6666666666666667,3,1,3C1.3333333333333333,3,1.6666666666666667,1,2,1C2.3333333333333335,1,3,3,3,3L3,0C3,0,2.3333333333333335,0,2,0C1.6666666666666667,0,1.3333333333333333,0,1,0C0.6666666666666667,0,0,0,0,0Z");
  test.end();
});

tape("area.interpolate(cardinalOpen)(data) generates the expected path", function(test) {
  var a = shape.area().interpolate(shape.cardinalOpen);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), null);
  test.equal(a([[0, 1], [1, 3]]), null);
  test.equal(a([[0, 1], [1, 3], [2, 1]]), "M1,3L1,0Z");
  test.equal(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.3333333333333333,3,1.6666666666666667,1,2,1L2,0C1.6666666666666667,0,1.3333333333333333,0,1,0Z");
  test.end();
});

tape("area.interpolate(catmullRom, 0.5)(data) generates the expected path", function(test) {
  var a = shape.area().interpolate(shape.catmullRom, 0.5);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.equal(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.6666666666666667,3.0000000000000004,1,3C1.3333333333333337,3.0000000000000004,2,1,2,1L2,0C2,0,1.3333333333333333,0,1,0C0.6666666666666666,0,0,0,0,0Z");
  test.equal(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.6666666666666667,3.0000000000000004,1,3C1.3333333333333337,3.0000000000000004,1.6666666666666667,1,2,1C2.3333333333333335,1.0000000000000002,3,3,3,3L3,0C3,0,2.3333333333333335,0,2,0C1.6666666666666667,0,1.3333333333333333,0,1,0C0.6666666666666666,0,0,0,0,0Z");
  test.end();
});

tape("area.interpolate(catmullRomOpen, 0.5)(data) generates the expected path", function(test) {
  var a = shape.area().interpolate(shape.catmullRomOpen, 0.5);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), null);
  test.equal(a([[0, 1], [1, 3]]), null);
  test.equal(a([[0, 1], [1, 3], [2, 1]]), "M1,3L1,0Z");
  test.equal(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.3333333333333337,3.0000000000000004,1.6666666666666667,1,2,1L2,0C1.6666666666666667,0,1.3333333333333333,0,1,0Z");
  test.end();
});

tape("area.interpolate(step)(data) generates the expected path", function(test) {
  var a = shape.area().interpolate(shape.step);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [2, 3]]), "M0,1L1,1L1,3L2,3L2,0L1,0L1,0L0,0Z");
  test.equal(a([[0, 1], [2, 3], [4, 5]]), "M0,1L1,1L1,3L3,3L3,5L4,5L4,0L3,0L3,0L1,0L1,0L0,0Z");
  test.end();
});

tape("area.interpolate(stepBefore)(data) generates the expected path", function(test) {
  var a = shape.area().interpolate(shape.stepBefore);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [2, 3]]), "M0,1L0,3L2,3L2,0L2,0L0,0Z");
  test.equal(a([[0, 1], [2, 3], [4, 5]]), "M0,1L0,3L2,3L2,5L4,5L4,0L4,0L2,0L2,0L0,0Z");
  test.end();
});

tape("area.interpolate(stepAfter)(data) generates the expected path", function(test) {
  var a = shape.area().interpolate(shape.stepAfter);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [2, 3]]), "M0,1L2,1L2,3L2,0L0,0L0,0Z");
  test.equal(a([[0, 1], [2, 3], [4, 5]]), "M0,1L2,1L2,3L4,3L4,5L4,0L2,0L2,0L0,0L0,0Z");
  test.end();
});

tape("area.interpolate(natural)(data) generates the expected path", function(test) {
  var a = shape.area().interpolate(shape.natural);
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.equal(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0.33333333333333337,2,0.6666666666666667,3,1,3C1.3333333333333333,3,1.6666666666666665,2,2,1L2,0C1.6666666666666667,0,1.3333333333333335,0,1,0C0.6666666666666666,0,0.3333333333333333,0,0,0Z");
  test.equal(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0.33333333333333326,2.111111111111111,0.6666666666666665,3.2222222222222223,1,3C1.3333333333333335,2.7777777777777777,1.666666666666667,1.2222222222222223,2,1C2.333333333333333,0.7777777777777778,2.6666666666666665,1.8888888888888888,3,3L3,0C2.666666666666667,0,2.3333333333333335,0,2,0C1.6666666666666665,0,1.3333333333333333,0,1,0C0.6666666666666667,0,0.33333333333333337,0,0,0Z");
  test.end();
});

tape("area.interpolate(cardinal) uses a default tension of zero", function(test) {
  var a = shape.area().interpolate(shape.cardinal, 0);
  test.equal(shape.area().interpolate(shape.cardinal)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().interpolate(shape.cardinal, null)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().interpolate(shape.cardinal, undefined)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.interpolate(cardinalOpen) uses a default tension of zero", function(test) {
  var a = shape.area().interpolate(shape.cardinalOpen, 0);
  test.equal(shape.area().interpolate(shape.cardinalOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().interpolate(shape.cardinalOpen, null)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().interpolate(shape.cardinalOpen, undefined)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.interpolate(catmullRom) uses a default alpha of zero", function(test) {
  var a = shape.area().interpolate(shape.catmullRom, 0);
  test.equal(shape.area().interpolate(shape.catmullRom)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().interpolate(shape.catmullRom, null)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().interpolate(shape.catmullRom, undefined)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("area.interpolate(catmullRomOpen) uses a default alpha of zero", function(test) {
  var a = shape.area().interpolate(shape.catmullRomOpen, 0);
  test.equal(shape.area().interpolate(shape.catmullRomOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().interpolate(shape.catmullRomOpen, null)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.area().interpolate(shape.catmullRomOpen, undefined)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});
