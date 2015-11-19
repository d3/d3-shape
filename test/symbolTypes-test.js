var tape = require("tape"),
    shape = require("../");

tape("symbolTypes is the array of symbol types", function(test) {
  test.deepEqual(shape.symbolTypes, [
    shape.symbolCircle,
    shape.symbolCross,
    shape.symbolDiamond,
    shape.symbolSquare,
    shape.symbolTriangleDown,
    shape.symbolTriangleUp
  ]);
  test.end();
});
