var tape = require("tape"),
    shape = require("../../");

tape("orderNone(series) returns [0, 1, … series.length - 1]", function(test) {
  test.deepEqual(shape.orderNone(new Array(4)), [0, 1, 2, 3]);
  test.end();
});
