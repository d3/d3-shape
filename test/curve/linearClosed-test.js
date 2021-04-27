import assert from "assert";
import * as d3 from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveLinearClosed)(data) generates the expected path", () => {
  const l = d3.line().curve(d3.curveLinearClosed);
  assert.strictEqual(l([]), null);
  assertPathEqual(l([[0, 1]]), "M0,1Z");
  assertPathEqual(l([[0, 1], [2, 3]]), "M0,1L2,3Z");
  assertPathEqual(l([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5Z");
});
