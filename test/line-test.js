var tape = require("tape"),
    shape = require("../");

tape("line() returns a default line shape", function(test) {
  var l = shape.line();
  test.equal(l.x()([42, 34]), 42);
  test.equal(l.y()([42, 34]), 34);
  test.equal(l.defined()([42, 34]), true);
  test.equal(l.interpolate(), shape.linear);
  test.equal(l.context(), null);
  test.equal(l([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5");
  test.end();
});

tape("line.x(x)(data) observes the specified function", function(test) {
  var l = shape.line().x(function(d) { return d.x; });
  test.equal(l([{x: 0, 1: 1}, {x: 2, 1: 3}, {x: 4, 1: 5}]), "M0,1L2,3L4,5");
  test.end();
});

tape("line.x(x)(data) observes the specified constant", function(test) {
  var l = shape.line().x(0);
  test.equal(l([{1: 1}, {1: 3}, {1: 5}]), "M0,1L0,3L0,5");
  test.end();
});

tape("line.y(y)(data) observes the specified function", function(test) {
  var l = shape.line().y(function(d) { return d.y; });
  test.equal(l([{0: 0, y: 1}, {0: 2, y: 3}, {0: 4, y: 5}]), "M0,1L2,3L4,5");
  test.end();
});

tape("line.y(y)(data) observes the specified constant", function(test) {
  var l = shape.line().y(0);
  test.equal(l([{0: 0}, {0: 2}, {0: 4}]), "M0,0L2,0L4,0");
  test.end();
});

tape("line.interpolate(interpolate) sets the interpolation method", function(test) {
  var l = shape.line().interpolate(shape.linearClosed);
  test.equal(l([]), null);
  test.equal(l([[0, 1], [2, 3]]), "M0,1L2,3Z");
  test.end();
});

tape("line.interpolate(cardinal(tension)) sets the cardinal interpolation tension", function(test) {
  var l = shape.line().interpolate(shape.cardinal(0.1));
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [1, 3]]), "M0,1L1,3");
  test.equal(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.7,3,1,3C1.3,3,2,1,2,1");
  test.equal(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.7,3,1,3C1.3,3,1.7,1,2,1C2.3,1,3,3,3,3");
  test.end();
});

tape("line.interpolate(cardinal(tension)) coerces the specified tension to a number", function(test) {
  var l = shape.line().interpolate(shape.cardinal("0.1"));
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [1, 3]]), "M0,1L1,3");
  test.equal(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.7,3,1,3C1.3,3,2,1,2,1");
  test.equal(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.7,3,1,3C1.3,3,1.7,1,2,1C2.3,1,3,3,3,3");
  test.end();
});

tape("line.interpolate(cardinal()) implicitly uses a tension of zero", function(test) {
  var l = shape.line().interpolate(shape.cardinal(0));
  test.equal(shape.line().interpolate(shape.cardinal())([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]])); // TODO no empty invocation?
  test.equal(shape.line().interpolate(shape.cardinal(null))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.line().interpolate(shape.cardinal(undefined))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("line.interpolate(cardinalOpen()) implicitly uses a tension of zero", function(test) {
  var l = shape.line().interpolate(shape.cardinalOpen(0));
  test.equal(shape.line().interpolate(shape.cardinalOpen())([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]])); // TODO no empty invocation?
  test.equal(shape.line().interpolate(shape.cardinalOpen(null))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.line().interpolate(shape.cardinalOpen(undefined))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("line.interpolate(linear)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.linear);
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [2, 3]]), "M0,1L2,3");
  test.equal(l([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5");
  test.end();
});

tape("line.interpolate(linear-closed)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.linearClosed);
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [2, 3]]), "M0,1L2,3Z");
  test.equal(l([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5Z");
  test.end();
});

tape("line.interpolate(step)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.step);
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [2, 3]]), "M0,1L1,1L1,3L2,3");
  test.equal(l([[0, 1], [2, 3], [4, 5]]), "M0,1L1,1L1,3L3,3L3,5L4,5");
  test.end();
});

tape("line.interpolate(step-before)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.stepBefore);
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [2, 3]]), "M0,1L0,3L2,3");
  test.equal(l([[0, 1], [2, 3], [4, 5]]), "M0,1L0,3L2,3L2,5L4,5");
  test.end();
});

tape("line.interpolate(step-after)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.stepAfter);
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [2, 3]]), "M0,1L2,1L2,3");
  test.equal(l([[0, 1], [2, 3], [4, 5]]), "M0,1L2,1L2,3L4,3L4,5");
  test.end();
});

tape("line.interpolate(basis)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.basis);
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [1, 3]]), "M0,1L1,3");
  test.equal(l([[0, 1], [1, 3], [2, 1]]), "M0,1L0.16666666666666666,1.3333333333333333C0.3333333333333333,1.6666666666666667,0.6666666666666666,2.3333333333333335,1,2.3333333333333335C1.3333333333333333,2.3333333333333335,1.6666666666666667,1.6666666666666667,1.8333333333333333,1.3333333333333333L2,1");
  test.end();
});

tape("line.interpolate(basis-open)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.basisOpen);
  test.equal(l([]), null);
  test.equal(l([[0, 0]]), null);
  test.equal(l([[0, 0], [0, 10]]), null);
  test.equal(l([[0, 0], [0, 10], [10, 10]]), "M1.6666666666666667,8.333333333333334Z");
  test.equal(l([[0, 0], [0, 10], [10, 10], [10, 0]]), "M1.6666666666666667,8.333333333333334C3.3333333333333335,10,6.666666666666667,10,8.333333333333334,8.333333333333334");
  test.equal(l([[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]]), "M1.6666666666666667,8.333333333333334C3.3333333333333335,10,6.666666666666667,10,8.333333333333334,8.333333333333334C10,6.666666666666667,10,3.3333333333333335,8.333333333333334,1.6666666666666667");
  test.end();
});

tape("line.interpolate(basis-closed)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.basisClosed);
  test.equal(l([]), null);
  test.equal(l([[0, 0]]), "M0,0Z");
  test.equal(l([[0, 0], [0, 10]]), "M0,6.666666666666667L0,3.3333333333333335Z");
  test.equal(l([[0, 0], [0, 10], [10, 10]]), "M1.6666666666666667,8.333333333333334C3.3333333333333335,10,6.666666666666667,10,6.666666666666667,8.333333333333334C6.666666666666667,6.666666666666667,3.3333333333333335,3.3333333333333335,1.6666666666666667,3.3333333333333335C0,3.3333333333333335,0,6.666666666666667,1.6666666666666667,8.333333333333334");
  test.equal(l([[0, 0], [0, 10], [10, 10], [10, 0]]), "M1.6666666666666667,8.333333333333334C3.3333333333333335,10,6.666666666666667,10,8.333333333333334,8.333333333333334C10,6.666666666666667,10,3.3333333333333335,8.333333333333334,1.6666666666666667C6.666666666666667,0,3.3333333333333335,0,1.6666666666666667,1.6666666666666667C0,3.3333333333333335,0,6.666666666666667,1.6666666666666667,8.333333333333334");
  test.equal(l([[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]]), "M1.6666666666666667,8.333333333333334C3.3333333333333335,10,6.666666666666667,10,8.333333333333334,8.333333333333334C10,6.666666666666667,10,3.3333333333333335,8.333333333333334,1.6666666666666667C6.666666666666667,0,3.3333333333333335,0,1.6666666666666667,0C0,0,0,0,0,1.6666666666666667C0,3.3333333333333335,0,6.666666666666667,1.6666666666666667,8.333333333333334");
  test.end();
});

tape("line.interpolate(cardinal)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.cardinal()); // TODO no empty invocation?
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [1, 3]]), "M0,1L1,3");
  test.equal(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.6666666666666667,3,1,3C1.3333333333333333,3,2,1,2,1");
  test.equal(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.6666666666666667,3,1,3C1.3333333333333333,3,1.6666666666666667,1,2,1C2.3333333333333335,1,3,3,3,3");
  test.end();
});

tape("line.interpolate(cardinal-open)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.cardinalOpen()); // TODO no empty invocation?
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), null);
  test.equal(l([[0, 1], [1, 3]]), null);
  test.equal(l([[0, 1], [1, 3], [2, 1]]), "M1,3Z");
  test.equal(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.3333333333333333,3,1.6666666666666667,1,2,1");
  test.end();
});

tape("line.interpolate(cardinal-closed)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.cardinalClosed()); // TODO no empty invocation?
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [1, 3]]), "M1,3L0,1Z");
  test.equal(l([[0, 1], [1, 3], [2, 1]]), "M1,3C1.3333333333333333,3,2.1666666666666665,1.3333333333333333,2,1C1.8333333333333333,0.6666666666666667,0.16666666666666666,0.6666666666666667,0,1C-0.16666666666666666,1.3333333333333333,0.6666666666666667,3,1,3");
  test.equal(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.3333333333333333,3,1.6666666666666667,1,2,1C2.3333333333333335,1,3.3333333333333335,3,3,3C2.6666666666666665,3,0.3333333333333333,1,0,1C-0.3333333333333333,1,0.6666666666666667,3,1,3");
  test.end();
});

tape("line.interpolate(catmull-rom)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.catmullRom()); // TODO no empty invocation?
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [1, 3]]), "M0,1L1,3");
  test.equal(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.6666666666666667,3,1,3C1.3333333333333333,3,2,1,2,1");
  test.equal(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.6666666666666667,3,1,3C1.3333333333333333,3,1.6666666666666667,1,2,1C2.3333333333333335,1,3,3,3,3");
  test.end();
});

tape("line.interpolate(catmull-rom-open)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.catmullRomOpen()); // TODO no empty invocation?
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), null);
  test.equal(l([[0, 1], [1, 3]]), null);
  test.equal(l([[0, 1], [1, 3], [2, 1]]), "M1,3Z");
  test.equal(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.3333333333333333,3,1.6666666666666667,1,2,1");
  test.end();
});

tape("line.interpolate(catmull-rom-closed)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.catmullRomClosed()); // TODO no empty invocation?
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [1, 3]]), "M1,3L0,1Z");
  test.equal(l([[0, 1], [1, 3], [2, 1]]), "M1,3C1.3333333333333333,3,2.1666666666666665,1.3333333333333333,2,1C1.8333333333333333,0.6666666666666667,0.16666666666666666,0.6666666666666667,0,1C-0.16666666666666666,1.3333333333333333,0.6666666666666667,3,1,3");
  test.equal(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.3333333333333333,3,1.6666666666666667,1,2,1C2.3333333333333335,1,3.3333333333333335,3,3,3C2.6666666666666665,3,0.3333333333333333,1,0,1C-0.3333333333333333,1,0.6666666666666667,3,1,3");
  test.end();
});

tape("line.interpolate(catmull-rom, 1)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.catmullRom(1));
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [1, 3]]), "M0,1L1,3");
  test.equal(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.6666666666666666,2.9999999999999996,1,3C1.3333333333333333,2.9999999999999996,2,1,2,1");
  test.equal(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.6666666666666666,2.9999999999999996,1,3C1.3333333333333333,2.9999999999999996,1.6666666666666665,0.9999999999999999,2,1C2.333333333333333,0.9999999999999999,3,3,3,3");
  test.end();
});

tape("line.interpolate(catmull-rom-open, 1)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.catmullRomOpen(1));
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), null);
  test.equal(l([[0, 1], [1, 3]]), null);
  test.equal(l([[0, 1], [1, 3], [2, 1]]), "M1,3Z");
  test.equal(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.3333333333333333,2.9999999999999996,1.6666666666666665,0.9999999999999999,2,1");
  test.end();
});

tape("line.interpolate(catmull-rom-closed, 1)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.catmullRomClosed(1));
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [1, 3]]), "M1,3L0,1Z");
  test.equal(l([[0, 1], [1, 3], [2, 1]]), "M1,3C1.3333333333333333,2.9999999999999996,2.23606797749979,1.3147573033330529,2,1C1.7888543819998317,0.718472509333109,0.21114561800016823,0.718472509333109,0,1C-0.2360679774997897,1.3147573033330529,0.6666666666666666,2.9999999999999996,1,3");
  test.equal(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.3333333333333333,2.9999999999999996,1.6666666666666665,0.9999999999999999,2,1C2.333333333333333,0.9999999999999999,3.0316521939211634,2.746782448630695,3,3C2.94896237086169,3.4083010331064725,0.05103762913830916,0.5916989668935266,0,1C-0.03165219392116314,1.2532175513693051,0.6666666666666666,2.9999999999999996,1,3");
  test.end();
});

tape("line.interpolate(natural)(data) generates the expected path", function(test) {
  var l = shape.line().interpolate(shape.natural);
  test.equal(l([]), null);
  test.equal(l([[0, 1]]), "M0,1Z");
  test.equal(l([[0, 1], [1, 3]]), "M0,1L1,3");
  test.equal(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0.33333333333333337,2,0.6666666666666667,3,1,3C1.3333333333333333,3,1.6666666666666665,2,2,1");
  test.equal(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0.33333333333333326,2.111111111111111,0.6666666666666665,3.2222222222222223,1,3C1.3333333333333335,2.7777777777777777,1.666666666666667,1.2222222222222223,2,1C2.333333333333333,0.7777777777777778,2.6666666666666665,1.8888888888888888,3,3");
  test.end();
});
