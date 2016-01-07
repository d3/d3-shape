var tape = require("tape"),
    shape = require("../../");

tape("stackOrderDescending(series) returns an order by sum", function(test) {
  test.deepEqual(shape.stackOrderDescending([
    [[0, 1], [0, 2], [0, 3]],
    [[0, 2], [0, 3], [0, 4]],
    [[0, 0], [0, 1], [0, 2]]
  ]), [1, 0, 2]);
  test.end();
});

tape("stackOrderDescending(series) treats NaN values as zero", function(test) {
  test.deepEqual(shape.stackOrderDescending([
    [[0, 1], [0, 2], [0, 3], [0, NaN]],
    [[0, 2], [0, 3], [0, 4], [0, NaN]],
    [[0, 0], [0, 1], [0, 2], [0, NaN]]
  ]), [1, 0, 2]);
  test.end();
});
