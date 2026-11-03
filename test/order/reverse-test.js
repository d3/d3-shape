import assert from "node:assert";
import {it} from "vitest";
import {stackOrderReverse} from "d3-shape";

it("stackOrderReverse(series) returns [series.length - 1, series.length - 2, … 0]", () => {
  assert.deepStrictEqual(stackOrderReverse(new Array(4)), [3, 2, 1, 0]);
});
