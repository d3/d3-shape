import assert from "assert";
import * as d3 from "../../src/index.js";

it("stackOrderNone(series) returns [0, 1, … series.length - 1]", () => {
  assert.deepStrictEqual(d3.stackOrderNone(new Array(4)), [0, 1, 2, 3]);
});
