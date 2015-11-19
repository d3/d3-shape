var tape = require("tape"),
    shape = require("../");

tape("symbolTypes is the array of symbol types", function(test) {
  test.deepEqual(shape.symbolTypes, [
    shape.circle,
    shape.cross,
    shape.diamond,
    shape.square,
    shape.triangleDown,
    shape.triangleUp
  ]);
  test.end();
});
