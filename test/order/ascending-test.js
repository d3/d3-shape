import assert from "assert";
import * as d3 from "../../src/index.js";

it("stackOrderAscending(series) returns an order by sum", () => {
  assert.deepStrictEqual(d3.stackOrderAscending([
    [[0, 1], [0, 2], [0, 3]],
    [[0, 2], [0, 3], [0, 4]],
    [[0, 0], [0, 1], [0, 2]]
  ]), [2, 0, 1]);
});

it("stackOrderAscending(series) treats NaN values as zero", () => {
  assert.deepStrictEqual(d3.stackOrderAscending([
    [[0, 1], [0, 2], [0, NaN], [0, 3]],
    [[0, 2], [0, 3], [0, NaN], [0, 4]],
    [[0, 0], [0, 1], [0, NaN], [0, 2]]
  ]), [2, 0, 1]);
});
