import assert from "assert";
import {line, curveLinear, curveLinearClosed} from "../src/index.js";
import {assertPathEqual} from "./asserts.js";

it("line() returns a default line shape", () => {
  const l = line();
  assert.strictEqual(l.x()([42, 34]), 42);
  assert.strictEqual(l.y()([42, 34]), 34);
  assert.strictEqual(l.defined()([42, 34]), true);
  assert.strictEqual(l.curve(), curveLinear);
  assert.strictEqual(l.context(), null);
  assertPathEqual(l([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5");
});

it("line(x, y) sets x and y", () => {
  const x = function() {}, y = function() {};
  assert.strictEqual(line(x).x(), x);
  assert.strictEqual(line(x, y).y(), y);
  assert.strictEqual(line(3, 2).x()("aa"), 3);
  assert.strictEqual(line(3, 2).y()("aa"), 2);
});

it("line.x(f)(data) passes d, i and data to the specified function f", () => {
  const data = ["a", "b"], actual = [];
  line().x(function() { actual.push([].slice.call(arguments)); })(data);
  assert.deepStrictEqual(actual, [["a", 0, data], ["b", 1, data]]);
});

it("line.y(f)(data) passes d, i and data to the specified function f", () => {
  const data = ["a", "b"], actual = [];
  line().y(function() { actual.push([].slice.call(arguments)); })(data);
  assert.deepStrictEqual(actual, [["a", 0, data], ["b", 1, data]]);
});

it("line.defined(f)(data) passes d, i and data to the specified function f", () => {
  const data = ["a", "b"], actual = [];
  line().defined(function() { actual.push([].slice.call(arguments)); })(data);
  assert.deepStrictEqual(actual, [["a", 0, data], ["b", 1, data]]);
});

it("line.x(x)(data) observes the specified function", () => {
  const l = line().x(function(d) { return d.x; });
  assertPathEqual(l([{x: 0, 1: 1}, {x: 2, 1: 3}, {x: 4, 1: 5}]), "M0,1L2,3L4,5");
});

it("line.x(x)(data) observes the specified constant", () => {
  const l = line().x(0);
  assertPathEqual(l([{1: 1}, {1: 3}, {1: 5}]), "M0,1L0,3L0,5");
});

it("line.y(y)(data) observes the specified function", () => {
  const l = line().y(function(d) { return d.y; });
  assertPathEqual(l([{0: 0, y: 1}, {0: 2, y: 3}, {0: 4, y: 5}]), "M0,1L2,3L4,5");
});

it("line.y(y)(data) observes the specified constant", () => {
  const l = line().y(0);
  assertPathEqual(l([{0: 0}, {0: 2}, {0: 4}]), "M0,0L2,0L4,0");
});

it("line.curve(curve) sets the curve method", () => {
  const l = line().curve(curveLinearClosed);
  assert.strictEqual(l([]), null);
  assertPathEqual(l([[0, 1], [2, 3]]), "M0,1L2,3Z");
});
