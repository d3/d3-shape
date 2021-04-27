import assert from "assert";
import * as d3 from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveCardinalOpen)(data) generates the expected path", () => {
  const l = d3.line().curve(d3.curveCardinalOpen);
  assert.strictEqual(l([]), null);
  assert.strictEqual(l([[0, 1]]), null);
  assert.strictEqual(l([[0, 1], [1, 3]]), null);
  assertPathEqual(l([[0, 1], [1, 3], [2, 1]]), "M1,3Z");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1");
});

it("line.curve(curveCardinalOpen) uses a default tension of zero", () => {
  const l = d3.line().curve(d3.curveCardinalOpen.tension(0));
  assert.strictEqual(d3.line().curve(d3.curveCardinalOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("line.curve(curveCardinalOpen.tension(tension)) uses the specified tension", () => {
  assertPathEqual(d3.line().curve(d3.curveCardinalOpen.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.166667,3,1.833333,1,2,1");
});

it("line.curve(curveCardinalOpen.tension(tension)) coerces the specified tension to a number", () => {
  const l = d3.line().curve(d3.curveCardinalOpen.tension("0.5"));
  assert.strictEqual(d3.line().curve(d3.curveCardinalOpen.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("area.curve(curveCardinalOpen)(data) generates the expected path", () => {
  const a = d3.area().curve(d3.curveCardinalOpen);
  assert.strictEqual(a([]), null);
  assert.strictEqual(a([[0, 1]]), null);
  assert.strictEqual(a([[0, 1], [1, 3]]), null);
  assertPathEqual(a([[0, 1], [1, 3], [2, 1]]), "M1,3L1,0Z");
  assertPathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1L2,0C1.666667,0,1.333333,0,1,0Z");
});

it("area.curve(curveCardinalOpen) uses a default tension of zero", () => {
  const a = d3.area().curve(d3.curveCardinalOpen.tension(0));
  assert.strictEqual(d3.area().curve(d3.curveCardinalOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("area.curve(curveCardinalOpen.tension(tension)) uses the specified tension", () => {
  assertPathEqual(d3.area().curve(d3.curveCardinalOpen.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.166667,3,1.833333,1,2,1L2,0C1.833333,0,1.166667,0,1,0Z");
});

it("area.curve(curveCardinalOpen.tension(tension)) coerces the specified tension to a number", () => {
  const a = d3.area().curve(d3.curveCardinalOpen.tension("0.5"));
  assert.strictEqual(d3.area().curve(d3.curveCardinalOpen.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
});
