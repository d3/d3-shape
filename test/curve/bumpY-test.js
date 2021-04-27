import assert from "assert";
import * as d3 from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveBumpY)(data) generates the expected path", () => {
  const l = d3.line().curve(d3.curveBumpY);
  assert.strictEqual(l([]), null);
  assertPathEqual(l([[0, 1]]), "M0,1Z");
  assertPathEqual(l([[0, 1], [1, 3]]), "M0,1C0,2,1,2,1,3");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0,2,1,2,1,3C1,2,2,2,2,1");
});

it("area.curve(curveBumpY)(data) generates the expected path", () => {
  const a = d3.area().curve(d3.curveBumpY);
  assert.strictEqual(a([]), null);
  assertPathEqual(a([[0, 1]]), "M0,1L0,0Z");
  assertPathEqual(a([[0, 1], [1, 3]]), "M0,1C0,2,1,2,1,3L1,0C1,0,0,0,0,0Z");
  assertPathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0,2,1,2,1,3C1,2,2,2,2,1L2,0C2,0,1,0,1,0C1,0,0,0,0,0Z");
});
