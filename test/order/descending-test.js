var tape = require("tape"),
    shape = require("../../");

tape("orderDescending(series) returns an order by sum", function(test) {
  test.deepEqual(shape.orderDescending([
    [[0, 1], [0, 2], [0, 3]],
    [[0, 2], [0, 3], [0, 4]],
    [[0, 0], [0, 1], [0, 2]]
  ]), [1, 0, 2]);
  test.end();
});
