var tape = require("tape"),
    shape = require("../../");

tape("stackOrderAscending(series) returns an order by sum", function(test) {
  test.deepEqual(shape.stackOrderAscending([
    [[0, 1], [0, 2], [0, 3]],
    [[0, 2], [0, 3], [0, 4]],
    [[0, 0], [0, 1], [0, 2]]
  ]), [2, 0, 1]);
  test.end();
});

tape("stackOrderAscending(series) treats NaN values as zero", function(test) {
  test.deepEqual(shape.stackOrderAscending([
    [[0, 1], [0, 2], [0, NaN], [0, 3]],
    [[0, 2], [0, 3], [0, NaN], [0, 4]],
    [[0, 0], [0, 1], [0, NaN], [0, 2]]
  ]), [2, 0, 1]);
  test.end();
});
