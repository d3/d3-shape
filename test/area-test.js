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
  test.equal(a.curve(), shape.curveLinear);
  test.equal(a.context(), null);
  test.pathEqual(a([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5L4,0L2,0L0,0Z");
  test.end();
});

tape("area.x(f)(data) passes d, i and data to the specified function f", function(test) {
  var data = ["a", "b"], actual = [];
  shape.area().x(function() { actual.push([].slice.call(arguments)); })(data);
  test.deepEqual(actual, [["a", 0, data], ["b", 1, data]]);
  test.end();
});

tape("area.x0(f)(data) passes d, i and data to the specified function f", function(test) {
  var data = ["a", "b"], actual = [];
  shape.area().x0(function() { actual.push([].slice.call(arguments)); })(data);
  test.deepEqual(actual, [["a", 0, data], ["b", 1, data]]);
  test.end();
});

tape("area.x1(f)(data) passes d, i and data to the specified function f", function(test) {
  var data = ["a", "b"], actual = [];
  shape.area().x1(function() { actual.push([].slice.call(arguments)); })(data);
  test.deepEqual(actual, [["a", 0, data], ["b", 1, data]]);
  test.end();
});

tape("area.y(f)(data) passes d, i and data to the specified function f", function(test) {
  var data = ["a", "b"], actual = [];
  shape.area().y(function() { actual.push([].slice.call(arguments)); })(data);
  test.deepEqual(actual, [["a", 0, data], ["b", 1, data]]);
  test.end();
});

tape("area.y0(f)(data) passes d, i and data to the specified function f", function(test) {
  var data = ["a", "b"], actual = [];
  shape.area().y0(function() { actual.push([].slice.call(arguments)); })(data);
  test.deepEqual(actual, [["a", 0, data], ["b", 1, data]]);
  test.end();
});

tape("area.y1(f)(data) passes d, i and data to the specified function f", function(test) {
  var data = ["a", "b"], actual = [];
  shape.area().y1(function() { actual.push([].slice.call(arguments)); })(data);
  test.deepEqual(actual, [["a", 0, data], ["b", 1, data]]);
  test.end();
});

tape("area.defined(f)(data) passes d, i and data to the specified function f", function(test) {
  var data = ["a", "b"], actual = [];
  shape.area().defined(function() { actual.push([].slice.call(arguments)); })(data);
  test.deepEqual(actual, [["a", 0, data], ["b", 1, data]]);
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

tape("area.curve(curve) sets the curve method", function(test) {
  var a = shape.area().curve(shape.curveCardinal);
  test.pathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3,3,3,3L3,0C3,0,2.333333,0,2,0C1.666667,0,1.333333,0,1,0C0.666667,0,0,0,0,0Z");
  test.end();
});

tape("area.curve(curveCardinal.tension(tension)) sets the cardinal spline tension", function(test) {
  var a = shape.area().curve(shape.curveCardinal.tension(0.1));
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.700000,3,1,3C1.300000,3,2,1,2,1L2,0C2,0,1.300000,0,1,0C0.700000,0,0,0,0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.700000,3,1,3C1.300000,3,1.700000,1,2,1C2.300000,1,3,3,3,3L3,0C3,0,2.300000,0,2,0C1.700000,0,1.300000,0,1,0C0.700000,0,0,0,0,0Z");
  test.end();
});

tape("area.curve(curveCardinal.tension(tension)) coerces the specified tension to a number", function(test) {
  var a = shape.area().curve(shape.curveCardinal.tension("0.1"));
  test.equal(a([]), null);
  test.pathEqual(a([[0, 1]]), "M0,1L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.700000,3,1,3C1.300000,3,2,1,2,1L2,0C2,0,1.300000,0,1,0C0.700000,0,0,0,0,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.700000,3,1,3C1.300000,3,1.700000,1,2,1C2.300000,1,3,3,3,3L3,0C3,0,2.300000,0,2,0C1.700000,0,1.300000,0,1,0C0.700000,0,0,0,0,0Z");
  test.end();
});

tape("area.lineX0() returns a line derived from the area", function(test) {
  var defined = function() { return true; },
      curve = shape.curveCardinal,
      context = {},
      x0 = function() {},
      x1 = function() {},
      y = function() {},
      a = shape.area().defined(defined).curve(curve).context(context).y(y).x0(x0).x1(x1),
      l = a.lineX0();
  test.equal(l.defined(), defined);
  test.equal(l.curve(), curve);
  test.equal(l.context(), context);
  test.equal(l.x(), x0);
  test.equal(l.y(), y);
  test.end();
});

tape("area.lineX1() returns a line derived from the area", function(test) {
  var defined = function() { return true; },
      curve = shape.curveCardinal,
      context = {},
      x0 = function() {},
      x1 = function() {},
      y = function() {},
      a = shape.area().defined(defined).curve(curve).context(context).y(y).x0(x0).x1(x1),
      l = a.lineX1();
  test.equal(l.defined(), defined);
  test.equal(l.curve(), curve);
  test.equal(l.context(), context);
  test.equal(l.x(), x1);
  test.equal(l.y(), y);
  test.end();
});

tape("area.lineY0() returns a line derived from the area", function(test) {
  var defined = function() { return true; },
      curve = shape.curveCardinal,
      context = {},
      x = function() {},
      y0 = function() {},
      y1 = function() {},
      a = shape.area().defined(defined).curve(curve).context(context).x(x).y0(y0).y1(y1),
      l = a.lineY0();
  test.equal(l.defined(), defined);
  test.equal(l.curve(), curve);
  test.equal(l.context(), context);
  test.equal(l.x(), x);
  test.equal(l.y(), y0);
  test.end();
});

tape("area.lineY1() returns a line derived from the area", function(test) {
  var defined = function() { return true; },
      curve = shape.curveCardinal,
      context = {},
      x = function() {},
      y0 = function() {},
      y1 = function() {},
      a = shape.area().defined(defined).curve(curve).context(context).x(x).y0(y0).y1(y1),
      l = a.lineY1();
  test.equal(l.defined(), defined);
  test.equal(l.curve(), curve);
  test.equal(l.context(), context);
  test.equal(l.x(), x);
  test.equal(l.y(), y1);
  test.end();
});
