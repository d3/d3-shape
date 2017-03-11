var tape = require("tape"),
    shape = require("../../");

tape("stackOffsetDiverging(series, order) applies a zero baseline, ignoring existing offsets", function(test) {
  var series = [
    [[1, 2], [2, 4], [3, 4]],
    [[0, 3], [0, 4], [0, 2]],
    [[0, 5], [0, 2], [0, 4]]
  ];
  shape.stackOffsetDiverging(series, shape.stackOrderNone(series));
  test.deepEqual(series, [
    [[0, 1], [0, 2], [0, 1]],
    [[1, 4], [2, 6], [1, 3]],
    [[4, 9], [6, 8], [3, 7]]
  ]);
  test.end();
});

tape("stackOffsetDiverging(series, order) treats NaN as zero", function(test) {
  var series = [
    [[0, 1], [0,   2], [0, 1]],
    [[0, 3], [0, NaN], [0, 2]],
    [[0, 5], [0,   2], [0, 4]]
  ];
  shape.stackOffsetDiverging(series, shape.stackOrderNone(series));
  test.ok(isNaN(series[1][1][1]));
  series[1][1][1] = "NaN"; // can’t test.equal NaN
  test.deepEqual(series, [
    [[0, 1], [0,     2], [0, 1]],
    [[1, 4], [2, "NaN"], [1, 3]],
    [[4, 9], [2,     4], [3, 7]]
  ]);
  test.end();
});

tape("stackOffsetDiverging(series, order) observes the specified order", function(test) {
  var series = [
    [[0, 1], [0, 2], [0, 1]],
    [[0, 3], [0, 4], [0, 2]],
    [[0, 5], [0, 2], [0, 4]]
  ];
  shape.stackOffsetDiverging(series, shape.stackOrderReverse(series));
  test.deepEqual(series, [
    [[8, 9], [6, 8], [6, 7]],
    [[5, 8], [2, 6], [4, 6]],
    [[0, 5], [0, 2], [0, 4]]
  ]);
  test.end();
});

tape("stackOffsetDiverging(series, order) puts negative values below zero, in order", function(test) {
  var series = [
    [[0,  1], [0, -2], [0, -1]],
    [[0, -3], [0, -4], [0, -2]],
    [[0, -5], [0, -2], [0,  4]]
  ];
  shape.stackOffsetDiverging(series, shape.stackOrderNone(series));
  test.deepEqual(series, [
    [[ 0,  1], [-2,  0], [-1,  0]],
    [[-3,  0], [-6, -2], [-3, -1]],
    [[-8, -3], [-8, -6], [ 0,  4]]
  ]);
  test.end();
});
