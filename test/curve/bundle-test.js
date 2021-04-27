import assert from "assert";
import * as d3 from "../../src/index.js";

it("line.curve(curveBundle) uses a default beta of 0.85", () => {
  const l = d3.line().curve(d3.curveBundle.beta(0.85));
  assert.strictEqual(d3.line().curve(d3.curveBundle)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("line.curve(curveBundle.beta(beta)) uses the specified beta", () => {
  assert.strictEqual(d3.line().curve(d3.curveBundle.beta(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1L0.16666666666666666,1.222222222222222C0.3333333333333333,1.4444444444444444,0.6666666666666666,1.8888888888888886,1,1.9999999999999998C1.3333333333333333,2.1111111111111107,1.6666666666666667,1.8888888888888886,2,2C2.3333333333333335,2.111111111111111,2.6666666666666665,2.5555555555555554,2.8333333333333335,2.7777777777777772L3,3");
});

it("line.curve(curveBundle.beta(beta)) coerces the specified beta to a number", () => {
  const l = d3.line().curve(d3.curveBundle.beta("0.5"));
  assert.strictEqual(d3.line().curve(d3.curveBundle.beta(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});
