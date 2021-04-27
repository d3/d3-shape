import assert from "assert";
import * as d3 from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveCatmullRomOpen)(data) generates the expected path", () => {
  const l = d3.line().curve(d3.curveCatmullRomOpen);
  assert.strictEqual(l([]), null);
  assert.strictEqual(l([[0, 1]]), null);
  assert.strictEqual(l([[0, 1], [1, 3]]), null);
  assertPathEqual(l([[0, 1], [1, 3], [2, 1]]), "M1,3Z");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1");
});

it("line.curve(curveCatmullRomOpen.alpha(1))(data) generates the expected path", () => {
  const l = d3.line().curve(d3.curveCatmullRomOpen.alpha(1));
  assert.strictEqual(l([]), null);
  assert.strictEqual(l([[0, 1]]), null);
  assert.strictEqual(l([[0, 1], [1, 3]]), null);
  assertPathEqual(l([[0, 1], [1, 3], [2, 1]]), "M1,3Z");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1");
});

it("line.curve(curveCatmullRomOpen) uses a default alpha of 0.5 (centripetal)", () => {
  const l = d3.line().curve(d3.curveCatmullRomOpen.alpha(0.5));
  assert.strictEqual(d3.line().curve(d3.curveCatmullRomOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("line.curve(curveCatmullRom.alpha(alpha)) coerces the specified alpha to a number", () => {
  const l = d3.line().curve(d3.curveCatmullRom.alpha("0.5"));
  assert.strictEqual(d3.line().curve(d3.curveCatmullRom.alpha(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("area.curve(curveCatmullRomOpen.alpha(0.5))(data) generates the expected path", () => {
  const a = d3.area().curve(d3.curveCatmullRomOpen, 0.5);
  assert.strictEqual(a([]), null);
  assert.strictEqual(a([[0, 1]]), null);
  assert.strictEqual(a([[0, 1], [1, 3]]), null);
  assertPathEqual(a([[0, 1], [1, 3], [2, 1]]), "M1,3L1,0Z");
  assertPathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1L2,0C1.666667,0,1.333333,0,1,0Z");
});

it("area.curve(curveCatmullRomOpen) uses a default alpha of 0.5 (centripetal)", () => {
  const a = d3.area().curve(d3.curveCatmullRomOpen, 0.5);
  assert.strictEqual(d3.area().curve(d3.curveCatmullRomOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("area.curve(curveCatmullRomOpen.alpha(alpha)) coerces the specified alpha to a number", () => {
  const a = d3.area().curve(d3.curveCatmullRomOpen.alpha("0.5"));
  assert.strictEqual(d3.area().curve(d3.curveCatmullRomOpen.alpha(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
});
