var tape = require("tape"),
    shape = require("../");

tape("symbols is the array of symbol types", function(test) {
  test.deepEqual(shape.symbols, [
    shape.circle,
    shape.cross,
    shape.diamond,
    shape.square,
    shape.triangleDown,
    shape.triangleUp
  ]);
  test.end();
});
