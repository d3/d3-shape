var tape = require("tape"),
    shape = require("../../");

tape("orderInsideOut(series) returns an order by sum", function(test) {
  test.deepEqual(shape.orderInsideOut([
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
