var tape = require("tape"),
    shape = require("../../");

tape("stackOffsetWiggle(series, order) minimizes weighted wiggle", function(test) {
  var series = [
    [[0, 1], [0, 2], [0, 1]],
    [[0, 3], [0, 4], [0, 2]],
    [[0, 5], [0, 2], [0, 4]]
  ];
  shape.stackOffsetWiggle(series, shape.stackOrderNone(series));
  test.deepEqual(series.map(roundSeries), [
    [[0, 1], [-1, 1], [0.7857143, 1.7857143]],
    [[1, 4], [ 1, 5], [1.7857143, 3.7857143]],
    [[4, 9], [ 5, 7], [3.7857143, 7.7857143]]
  ].map(roundSeries));
  test.end();
});

tape("stackOffsetWiggle(series, order) treats NaN as zero", function(test) {
  var series = [
    [[0,   1], [0,   2], [0,   1]],
    [[0, NaN], [0, NaN], [0, NaN]],
    [[0,   3], [0,   4], [0,   2]],
    [[0,   5], [0,   2], [0,   4]]
  ];
  shape.stackOffsetWiggle(series, shape.stackOrderNone(series));
  test.ok(isNaN(series[1][0][1]));
  test.ok(isNaN(series[1][0][2]));
  test.ok(isNaN(series[1][0][3]));
  series[1][0][1] = series[1][1][1] = series[1][2][1] = "NaN"; // can’t test.equal NaN
  test.deepEqual(series.map(roundSeries), [
    [[0,     1], [-1,     1], [0.7857143, 1.7857143]],
    [[1, "NaN"], [ 1, "NaN"], [1.7857143,     "NaN"]],
    [[1,     4], [ 1,     5], [1.7857143, 3.7857143]],
    [[4,     9], [ 5,     7], [3.7857143, 7.7857143]]
  ].map(roundSeries));
  test.end();
});

tape("stackOffsetWiggle(series, order) observes the specified order", function(test) {
  var series = [
    [[0, 1], [0, 2], [0, 1]],
    [[0, 3], [0, 4], [0, 2]],
    [[0, 5], [0, 2], [0, 4]]
  ];
  shape.stackOffsetWiggle(series, shape.stackOrderReverse(series));
  test.deepEqual(series.map(roundSeries), [
    [[8, 9], [8, 10], [7.21428571, 8.21428571]],
    [[5, 8], [4,  8], [5.21428571, 7.21428571]],
    [[0, 5], [2,  4], [1.21428571, 5.21428571]]
  ].map(roundSeries));
  test.end();
});

function roundSeries(series) {
  return series.map(function(point) {
    return point.map(function(value) {
      return isNaN(value) ? value : Math.round(value * 1e6) / 1e6;
    });
  });
}
