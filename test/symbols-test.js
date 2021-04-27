import assert from "assert";
import * as d3 from "../src/index.js";

it("symbols is the array of symbol types", () => {
  assert.deepStrictEqual(d3.symbols, [
    d3.symbolCircle,
    d3.symbolCross,
    d3.symbolDiamond,
    d3.symbolSquare,
    d3.symbolStar,
    d3.symbolTriangle,
    d3.symbolWye
  ]);
});
