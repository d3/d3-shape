var tape = require("tape"),
    shape = require("../");

tape("symbols is the array of symbol types", function(test) {
  test.deepEqual(shape.symbols, [
    shape.symbolCircle,
    shape.symbolCross,
    shape.symbolDiamond,
    shape.symbolSquare,
    shape.symbolStar,
    shape.symbolTriangle,
    shape.symbolWye
  ]);
  test.end();
});
