var tape = require("tape"),
    shape = require("../../");

tape("stackOrderNone(series) returns [0, 1, … series.length - 1]", function(test) {
  test.deepEqual(shape.stackOrderNone(new Array(4)), [0, 1, 2, 3]);
  test.end();
});
