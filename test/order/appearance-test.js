var tape = require("tape"),
    shape = require("../../");

tape("stackOrderAppearance(series) returns an order by appearance", function(test) {
  test.deepEqual(shape.stackOrderAppearance([
    [[0, 0], [0, 0], [0, 1]],
    [[0, 3], [0, 2], [0, 0]],
    [[0, 0], [0, 4], [0, 0]]
  ]), [1, 2, 0]);
  test.end();
});

tape("stackOrderAppearance(series) treats NaN values as zero", function(test) {
  test.deepEqual(shape.stackOrderAppearance([
    [[0, NaN], [0, NaN], [0, 1]],
    [[0, 3], [0, 2], [0, NaN]],
    [[0, NaN], [0, 4], [0, NaN]]
  ]), [1, 2, 0]);
  test.end();
});
