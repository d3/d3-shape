import assert from "assert";
import * as d3 from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveStepAfter)(data) generates the expected path", () => {
  const l = d3.line().curve(d3.curveStepAfter);
  assert.strictEqual(l([]), null);
  assertPathEqual(l([[0, 1]]), "M0,1Z");
  assertPathEqual(l([[0, 1], [2, 3]]), "M0,1L2,1L2,3");
  assertPathEqual(l([[0, 1], [2, 3], [4, 5]]), "M0,1L2,1L2,3L4,3L4,5");
});

it("area.curve(curveStepAfter)(data) generates the expected path", () => {
  const a = d3.area().curve(d3.curveStepAfter);
  assert.strictEqual(a([]), null);
  assertPathEqual(a([[0, 1]]), "M0,1L0,0Z");
  assertPathEqual(a([[0, 1], [2, 3]]), "M0,1L2,1L2,3L2,0L2,0L0,0Z");
  assertPathEqual(a([[0, 1], [2, 3], [4, 5]]), "M0,1L2,1L2,3L4,3L4,5L4,0L4,0L2,0L2,0L0,0Z");
});
