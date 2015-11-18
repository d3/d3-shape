var tape = require("tape"),
    shape = require("../");

tape("symbolTypes is the array of symbol types", function(test) {
  test.deepEqual(shape.symbolTypes, [
    "circle",
    "cross",
    "diamond",
    "square",
    "triangle-down",
    "triangle-up"
  ]);
  test.end();
});
