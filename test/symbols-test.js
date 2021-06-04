import assert from "assert";
import {symbols, symbolCircle, symbolCross, symbolDiamond, symbolSquare, symbolStar, symbolTriangle, symbolWye} from "../src/index.js";

it("symbols is the array of symbol types", () => {
  assert.deepStrictEqual(symbols, [
    symbolCircle,
    symbolCross,
    symbolDiamond,
    symbolSquare,
    symbolStar,
    symbolTriangle,
    symbolWye
  ]);
});
