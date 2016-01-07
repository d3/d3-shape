var tape = require("tape"),
    shape = require("../../");

tape("stackOrderInsideOut(series) returns an order by sum", function(test) {
  test.deepEqual(shape.stackOrderInsideOut([
    [[0, 0]],
    [[0, 1]],
    [[0, 2]],
    [[0, 3]],
    [[0, 4]],
    [[0, 5]],
    [[0, 6]]
  ]), [2, 3, 6, 5, 4, 1, 0]);
  test.end();
});

tape("stackOrderInsideOut(series) treats NaN values as zero", function(test) {
  test.deepEqual(shape.stackOrderInsideOut([
    [[0, 0], [0, NaN]],
    [[0, 1], [0, NaN]],
    [[0, 2], [0, NaN]],
    [[0, 3], [0, NaN]],
    [[0, 4], [0, NaN]],
    [[0, 5], [0, NaN]],
    [[0, 6], [0, NaN]]
  ]), [2, 3, 6, 5, 4, 1, 0]);
  test.end();
});
