var tape = require("tape"),
    shape = require("../../");

tape("stackOffsetExpand(series, order) expands to fill [0, 1]", function(test) {
  var series = [
    [[0, 1], [0, 2], [0, 1]],
    [[0, 3], [0, 4], [0, 2]],
    [[0, 5], [0, 2], [0, 4]]
  ];
  shape.stackOffsetExpand(series, shape.stackOrderNone(series));
  test.deepEqual(series, [
    [[0 / 9, 1 / 9], [0 / 8, 2 / 8], [0 / 7, 1 / 7]],
    [[1 / 9, 4 / 9], [2 / 8, 6 / 8], [1 / 7, 3 / 7]],
    [[4 / 9, 9 / 9], [6 / 8, 8 / 8], [3 / 7, 7 / 7]]
  ]);
  test.end();
});

tape("stackOffsetExpand(series, order) treats NaN as zero", function(test) {
  var series = [
    [[0, 1], [0,   2], [0, 1]],
    [[0, 3], [0, NaN], [0, 2]],
    [[0, 5], [0,   2], [0, 4]]
  ];
  shape.stackOffsetExpand(series, shape.stackOrderNone(series));
  test.ok(isNaN(series[1][1][1]));
  series[1][1][1] = "NaN"; // can’t test.equal NaN
  test.deepEqual(series, [
    [[0 / 9, 1 / 9], [0 / 4, 2 / 4], [0 / 7, 1 / 7]],
    [[1 / 9, 4 / 9], [2 / 4, "NaN"], [1 / 7, 3 / 7]],
    [[4 / 9, 9 / 9], [2 / 4, 4 / 4], [3 / 7, 7 / 7]]
  ]);
  test.end();
});

tape("stackOffsetExpand(series, order) observes the specified order", function(test) {
  var series = [
    [[0, 1], [0, 2], [0, 1]],
    [[0, 3], [0, 4], [0, 2]],
    [[0, 5], [0, 2], [0, 4]]
  ];
  shape.stackOffsetExpand(series, shape.stackOrderReverse(series));
  test.deepEqual(series, [
    [[8 / 9, 9 / 9], [6 / 8, 8 / 8], [6 / 7, 7 / 7]],
    [[5 / 9, 8 / 9], [2 / 8, 6 / 8], [4 / 7, 6 / 7]],
    [[0 / 9, 5 / 9], [0 / 8, 2 / 8], [0 / 7, 4 / 7]]
  ]);
  test.end();
});
