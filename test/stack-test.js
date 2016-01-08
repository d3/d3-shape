var tape = require("tape"),
    shape = require("../");

tape("stack() has the expected defaults", function(test) {
  var s = shape.stack();
  test.deepEqual(s.keys()(), []);
  test.equal(s.value()({foo: 42}, "foo"), 42);
  test.equal(s.order(), shape.stackOrderNone);
  test.equal(s.offset(), shape.stackOffsetNone);
  test.end();
});

tape("stack(data) computes the stacked series for the given data", function(test) {
  var s = shape.stack().keys([0, 1, 2, 3]),
      data = [[1, 3, 5, 1], [2, 4, 2, 3], [1, 2, 4, 2]];
  test.deepEqual(s(data), [
    series([[0,  1], [0,  2], [0, 1]], data, 0, 0),
    series([[1,  4], [2,  6], [1, 3]], data, 1, 1),
    series([[4,  9], [6,  8], [3, 7]], data, 2, 2),
    series([[9, 10], [8, 11], [7, 9]], data, 3, 3)
  ]);
  test.end();
});

tape("stack.keys(array) sets the array of constant keys", function(test) {
  var s = shape.stack().keys(["0.0", "2.0", "4.0"]);
  test.deepEqual(s.keys()(), ["0.0", "2.0", "4.0"]);
  test.end();
});

tape("stack.keys(function) sets the key accessor function", function(test) {
  var s = shape.stack().keys(function() { return "abc".split(""); });
  test.deepEqual(s.keys()(), ["a", "b", "c"]);
  test.end();
});

tape("stack(data, arguments…) passes the key accessor any additional arguments", function(test) {
  var A,
      B,
      k = function(data, a, b) { A = a, B = b; return Object.keys(data[0]); },
      s = shape.stack().keys(k),
      data = [[1, 3, 5, 1], [2, 4, 2, 3], [1, 2, 4, 2]];
  test.deepEqual(s(data, "foo", "bar"), [
    series([[0,  1], [0,  2], [0, 1]], data, "0", 0),
    series([[1,  4], [2,  6], [1, 3]], data, "1", 1),
    series([[4,  9], [6,  8], [3, 7]], data, "2", 2),
    series([[9, 10], [8, 11], [7, 9]], data, "3", 3)
  ]);
  test.equal(A, "foo");
  test.equal(B, "bar");
  test.end();
});

tape("stack.value(number) sets the constant value", function(test) {
  var s = shape.stack().value("42.0");
  test.equal(s.value()(), 42);
  test.end();
});

tape("stack.value(function) sets the value accessor function", function(test) {
  var v = function() { return 42; },
      s = shape.stack().value(v);
  test.equal(s.value(), v);
  test.end();
});

tape("stack(data) passes the value accessor datum, key, index and data", function(test) {
  var actual,
      v = function(d, k, i, data) { actual = {datum: d, key: k, index: i, data: data}; return 2; },
      s = shape.stack().keys(["foo"]).value(v),
      data = [{foo: 1}];
  test.deepEqual(s(data), [series([[0, 2]], data, "foo", 0)]);
  test.deepEqual(actual, {datum: data[0], key: "foo", index: 0, data: data});
  test.end();
});

tape("stack(data) coerces the return value of the value accessor to a number", function(test) {
  var actual,
      v = function() { return "2.0"; },
      s = shape.stack().keys(["foo"]).value(v),
      data = [{foo: 1}];
  test.deepEqual(s(data), [series([[0, 2]], data, "foo", 0)]);
  test.end();
});

tape("stack.order(null) is equivalent to stack.order(stackOrderNone)", function(test) {
  var s = shape.stack().order(null);
  test.equal(s.order(), shape.stackOrderNone);
  test.equal(typeof s.order(), "function");
  test.end();
});

tape("stack.order(function) sets the order function", function(test) {
  var s = shape.stack().keys([0, 1, 2, 3]).order(shape.stackOrderReverse),
      data = [[1, 3, 5, 1], [2, 4, 2, 3], [1, 2, 4, 2]];
  test.equal(s.order(), shape.stackOrderReverse);
  test.deepEqual(s(data), [
    series([[9, 10], [9, 11], [8, 9]], data, 0, 3),
    series([[6,  9], [5,  9], [6, 8]], data, 1, 2),
    series([[1,  6], [3,  5], [2, 6]], data, 2, 1),
    series([[0,  1], [0,  3], [0, 2]], data, 3, 0)
  ]);
  test.end();
});

tape("stack.offset(null) is equivalent to stack.offset(stackOffsetNone)", function(test) {
  var s = shape.stack().offset(null);
  test.equal(s.offset(), shape.stackOffsetNone);
  test.equal(typeof s.offset(), "function");
  test.end();
});

tape("stack.offset(function) sets the offset function", function(test) {
  var s = shape.stack().keys([0, 1, 2, 3]).offset(shape.stackOffsetExpand),
      data = [[1, 3, 5, 1], [2, 4, 2, 3], [1, 2, 4, 2]];
  test.equal(s.offset(), shape.stackOffsetExpand);
  test.deepEqual(s(data).map(roundSeries), [
    [[0 / 10,  1 / 10], [0 / 11,  2 / 11], [0 / 9, 1 / 9]],
    [[1 / 10,  4 / 10], [2 / 11,  6 / 11], [1 / 9, 3 / 9]],
    [[4 / 10,  9 / 10], [6 / 11,  8 / 11], [3 / 9, 7 / 9]],
    [[9 / 10, 10 / 10], [8 / 11, 11 / 11], [7 / 9, 9 / 9]]
  ].map(roundSeries));
  test.end();
});

function series(series, data, key, index) {
  data.forEach(function(d, i) { series[i].data = d; });
  series.key = key;
  series.index = index;
  return series;
}

function roundSeries(series) {
  return series.map(function(point) {
    return point.map(function(value) {
      return Math.round(value * 1e6) / 1e6;
    });
  });
}
