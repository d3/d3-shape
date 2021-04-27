import assert from "assert";
import * as d3 from "../../src/index.js";

it("stackOrderReverse(series) returns [series.length - 1, series.length - 2, … 0]", () => {
  assert.deepStrictEqual(d3.stackOrderReverse(new Array(4)), [3, 2, 1, 0]);
});
