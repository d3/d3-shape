import assert from "assert";
import * as d3 from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveBasisOpen)(data) generates the expected path", () => {
  const l = d3.line().curve(d3.curveBasisOpen);
  assert.strictEqual(l([]), null);
  assert.strictEqual(l([[0, 0]]), null);
  assert.strictEqual(l([[0, 0], [0, 10]]), null);
  assertPathEqual(l([[0, 0], [0, 10], [10, 10]]), "M1.666667,8.333333Z");
  assertPathEqual(l([[0, 0], [0, 10], [10, 10], [10, 0]]), "M1.666667,8.333333C3.333333,10,6.666667,10,8.333333,8.333333");
  assertPathEqual(l([[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]]), "M1.666667,8.333333C3.333333,10,6.666667,10,8.333333,8.333333C10,6.666667,10,3.333333,8.333333,1.666667");
});

it("area.curve(curveBasisOpen)(data) generates the expected path", () => {
  const a = d3.area().curve(d3.curveBasisOpen);
  assert.strictEqual(a([]), null);
  assert.strictEqual(a([[0, 1]]), null);
  assert.strictEqual(a([[0, 1], [1, 3]]), null);
  assertPathEqual(a([[0, 0], [0, 10], [10, 10]]), "M1.666667,8.333333L1.666667,0Z");
  assertPathEqual(a([[0, 0], [0, 10], [10, 10], [10, 0]]), "M1.666667,8.333333C3.333333,10,6.666667,10,8.333333,8.333333L8.333333,0C6.666667,0,3.333333,0,1.666667,0Z");
  assertPathEqual(a([[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]]), "M1.666667,8.333333C3.333333,10,6.666667,10,8.333333,8.333333C10,6.666667,10,3.333333,8.333333,1.666667L8.333333,0C10,0,10,0,8.333333,0C6.666667,0,3.333333,0,1.666667,0Z");
});
