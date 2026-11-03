import {it} from "vitest";
import assert from "assert";
import {stackOrderReverse} from "../../src/index.js";

it("stackOrderReverse(series) returns [series.length - 1, series.length - 2, … 0]", () => {
  assert.deepStrictEqual(stackOrderReverse(new Array(4)), [3, 2, 1, 0]);
});
