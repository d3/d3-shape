var tape = require("tape"),
    shape = require("../../");

tape("stackOrderReverse(series) returns [series.length - 1, series.length - 2, … 0]", function(test) {
  test.deepEqual(shape.stackOrderReverse(new Array(4)), [3, 2, 1, 0]);
  test.end();
});
