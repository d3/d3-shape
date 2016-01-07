var tape = require("tape"),
    shape = require("../../");

tape("stackOffsetSilhouette(series, order) centers the stack around zero", function(test) {
  var series = [
    [[0, 1], [0, 2], [0, 1]],
    [[0, 3], [0, 4], [0, 2]],
    [[0, 5], [0, 2], [0, 4]]
  ];
  shape.stackOffsetSilhouette(series, shape.stackOrderNone(series));
  test.deepEqual(series, [
    [[0 - 9 / 2, 1 - 9 / 2], [0 - 8 / 2, 2 - 8 / 2], [0 - 7 / 2, 1 - 7 / 2]],
    [[1 - 9 / 2, 4 - 9 / 2], [2 - 8 / 2, 6 - 8 / 2], [1 - 7 / 2, 3 - 7 / 2]],
    [[4 - 9 / 2, 9 - 9 / 2], [6 - 8 / 2, 8 - 8 / 2], [3 - 7 / 2, 7 - 7 / 2]]
  ]);
  test.end();
});

tape("stackOffsetSilhouette(series, order) treats NaN as zero", function(test) {
  var series = [
    [[0, 1], [0,   2], [0, 1]],
    [[0, 3], [0, NaN], [0, 2]],
    [[0, 5], [0,   2], [0, 4]]
  ];
  shape.stackOffsetSilhouette(series, shape.stackOrderNone(series));
  test.ok(isNaN(series[1][1][1]));
  series[1][1][1] = "NaN"; // can’t test.equal NaN
  test.deepEqual(series, [
    [[0 - 9 / 2, 1 - 9 / 2], [0 - 4 / 2, 2 - 4 / 2], [0 - 7 / 2, 1 - 7 / 2]],
    [[1 - 9 / 2, 4 - 9 / 2], [2 - 4 / 2,     "NaN"], [1 - 7 / 2, 3 - 7 / 2]],
    [[4 - 9 / 2, 9 - 9 / 2], [2 - 4 / 2, 4 - 4 / 2], [3 - 7 / 2, 7 - 7 / 2]]
  ]);
  test.end();
});

tape("stackOffsetSilhouette(series, order) observes the specified order", function(test) {
  var series = [
    [[0, 1], [0, 2], [0, 1]],
    [[0, 3], [0, 4], [0, 2]],
    [[0, 5], [0, 2], [0, 4]]
  ];
  shape.stackOffsetSilhouette(series, shape.stackOrderReverse(series));
  test.deepEqual(series, [
    [[8 - 9 / 2, 9 - 9 / 2], [6 - 8 / 2, 8 - 8 / 2], [6 - 7 / 2, 7 - 7 / 2]],
    [[5 - 9 / 2, 8 - 9 / 2], [2 - 8 / 2, 6 - 8 / 2], [4 - 7 / 2, 6 - 7 / 2]],
    [[0 - 9 / 2, 5 - 9 / 2], [0 - 8 / 2, 2 - 8 / 2], [0 - 7 / 2, 4 - 7 / 2]]
  ]);
  test.end();
});
