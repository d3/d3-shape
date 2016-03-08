var tape = require("tape"),
    shape = require("../");

require("./pathEqual");

tape("line() returns a default line shape", function(test) {
  var l = shape.line();
  test.equal(l.x()([42, 34]), 42);
  test.equal(l.y()([42, 34]), 34);
  test.equal(l.defined()([42, 34]), true);
  test.equal(l.curve(), shape.curveLinear);
  test.equal(l.context(), null);
  test.pathEqual(l([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5");
  test.end();
});

tape("line.x(f)(data) passes d, i and data to the specified function f", function(test) {
  var data = ["a", "b"], actual = [];
  shape.line().x(function() { actual.push([].slice.call(arguments)); })(data);
  test.deepEqual(actual, [["a", 0, data], ["b", 1, data]]);
  test.end();
});

tape("line.y(f)(data) passes d, i and data to the specified function f", function(test) {
  var data = ["a", "b"], actual = [];
  shape.line().y(function() { actual.push([].slice.call(arguments)); })(data);
  test.deepEqual(actual, [["a", 0, data], ["b", 1, data]]);
  test.end();
});

tape("line.defined(f)(data) passes d, i and data to the specified function f", function(test) {
  var data = ["a", "b"], actual = [];
  shape.line().defined(function() { actual.push([].slice.call(arguments)); })(data);
  test.deepEqual(actual, [["a", 0, data], ["b", 1, data]]);
  test.end();
});

tape("line.x(x)(data) observes the specified function", function(test) {
  var l = shape.line().x(function(d) { return d.x; });
  test.pathEqual(l([{x: 0, 1: 1}, {x: 2, 1: 3}, {x: 4, 1: 5}]), "M0,1L2,3L4,5");
  test.end();
});

tape("line.x(x)(data) observes the specified constant", function(test) {
  var l = shape.line().x(0);
  test.pathEqual(l([{1: 1}, {1: 3}, {1: 5}]), "M0,1L0,3L0,5");
  test.end();
});

tape("line.y(y)(data) observes the specified function", function(test) {
  var l = shape.line().y(function(d) { return d.y; });
  test.pathEqual(l([{0: 0, y: 1}, {0: 2, y: 3}, {0: 4, y: 5}]), "M0,1L2,3L4,5");
  test.end();
});

tape("line.y(y)(data) observes the specified constant", function(test) {
  var l = shape.line().y(0);
  test.pathEqual(l([{0: 0}, {0: 2}, {0: 4}]), "M0,0L2,0L4,0");
  test.end();
});

tape("line.curve(curve) sets the curve method", function(test) {
  var l = shape.line().curve(shape.curveLinearClosed);
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1], [2, 3]]), "M0,1L2,3Z");
  test.end();
});
