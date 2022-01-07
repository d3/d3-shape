import assert from "assert";
import {symbols, symbolsFill, symbolsStroke, symbolCircle, symbolCross, symbolDiamond, symbolSquare, symbolStar, symbolTriangle, symbolWye, symbolPlus, symbolX, symbolTriangle2, symbolAsterisk, symbolSquare2, symbolDiamond2} from "../src/index.js";

it("symbols is a deprecated alias for symbolsFill", () => {
  assert.strictEqual(symbols, symbolsFill);
});

it("symbolsFill is the array of symbol types", () => {
  assert.deepStrictEqual(symbolsFill, [
    symbolCircle,
    symbolCross,
    symbolDiamond,
    symbolSquare,
    symbolStar,
    symbolTriangle,
    symbolWye
  ]);
});

it("symbolsStroke is the array of symbol types", () => {
  assert.deepStrictEqual(symbolsStroke, [
    symbolCircle,
    symbolPlus,
    symbolX,
    symbolTriangle2,
    symbolAsterisk,
    symbolSquare2,
    symbolDiamond2
  ]);
});
