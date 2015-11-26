var tape = require("tape"),
    shape = require("../");

require("./pathEqual");

tape("arc().innerRadius(f)(…) propagates the context and arguments to the specified function f", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.arc().innerRadius(function() { actual = {that: this, args: [].slice.call(arguments)}; }).apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("arc().outerRadius(f)(…) propagates the context and arguments to the specified function f", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.arc().outerRadius(function() { actual = {that: this, args: [].slice.call(arguments)}; }).apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("arc().cornerRadius(f)(…) propagates the context and arguments to the specified function f", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.arc().outerRadius(100).cornerRadius(function() { actual = {that: this, args: [].slice.call(arguments)}; }).apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("arc().startAngle(f)(…) propagates the context and arguments to the specified function f", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.arc().startAngle(function() { actual = {that: this, args: [].slice.call(arguments)}; }).apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("arc().endAngle(f)(…) propagates the context and arguments to the specified function f", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.arc().endAngle(function() { actual = {that: this, args: [].slice.call(arguments)}; }).apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("arc().padAngle(f)(…) propagates the context and arguments to the specified function f", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.arc().outerRadius(100).startAngle(Math.PI / 2).padAngle(function() { actual = {that: this, args: [].slice.call(arguments)}; }).apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("arc().padRadius(f)(…) propagates the context and arguments to the specified function f", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.arc().outerRadius(100).startAngle(Math.PI / 2).padAngle(0.1).padRadius(function() { actual = {that: this, args: [].slice.call(arguments)}; }).apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("arc().centroid(…) computes the midpoint of the center line of the arc", function(test) {
  var a = shape.arc(), round = function(x) { return Math.round(x * 1e6) / 1e6; };
  test.deepEqual(a.centroid({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: Math.PI}).map(round), [50, 0]);
  test.deepEqual(a.centroid({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: Math.PI / 2}).map(round), [35.355339, -35.355339]);
  test.deepEqual(a.centroid({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: -Math.PI}).map(round), [-75, 0]);
  test.deepEqual(a.centroid({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: -Math.PI / 2}).map(round), [-53.033009, -53.033009]);
  test.end();
});

tape("arc().innerRadius(f).centroid(…) propagates the context and arguments to the specified function f", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.arc().innerRadius(function() { actual = {that: this, args: [].slice.call(arguments)}; }).centroid.apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("arc().outerRadius(f).centroid(…) propagates the context and arguments to the specified function f", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.arc().outerRadius(function() { actual = {that: this, args: [].slice.call(arguments)}; }).centroid.apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("arc().startAngle(f).centroid(…) propagates the context and arguments to the specified function f", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.arc().startAngle(function() { actual = {that: this, args: [].slice.call(arguments)}; }).centroid.apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("arc().endAngle(f).centroid(…) propagates the context and arguments to the specified function f", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.arc().endAngle(function() { actual = {that: this, args: [].slice.call(arguments)}; }).centroid.apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("arc().innerRadius(0).outerRadius(0) renders a point", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(0);
  test.pathEqual(a.startAngle(0).endAngle(2 * Math.PI)(), "M0,0Z");
  test.pathEqual(a.startAngle(0).endAngle(0)(), "M0,0Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁) renders a clockwise circle if r > 0 and θ₁ - θ₀ ≥ τ", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100);
  test.pathEqual(a.startAngle(0).endAngle(2 * Math.PI)(), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100Z");
  test.pathEqual(a.startAngle(0).endAngle(3 * Math.PI)(), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100Z");
  test.pathEqual(a.startAngle(-2 * Math.PI).endAngle(0)(), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100Z");
  test.pathEqual(a.startAngle(-Math.PI).endAngle(Math.PI)(), "M0,100A100,100,0,1,1,0,-100A100,100,0,1,1,0,100Z");
  test.pathEqual(a.startAngle(-3 * Math.PI).endAngle(0)(), "M0,100A100,100,0,1,1,0,-100A100,100,0,1,1,0,100Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁) renders an anticlockwise circle if r > 0 and θ₀ - θ₁ ≥ τ", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100);
  test.pathEqual(a.startAngle(0).endAngle(-2 * Math.PI)(), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100Z");
  test.pathEqual(a.startAngle(0).endAngle(-3 * Math.PI)(), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100Z");
  test.pathEqual(a.startAngle(2 * Math.PI).endAngle(0)(), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100Z");
  test.pathEqual(a.startAngle(Math.PI).endAngle(-Math.PI)(), "M0,100A100,100,0,1,0,0,-100A100,100,0,1,0,0,100Z");
  test.pathEqual(a.startAngle(3 * Math.PI).endAngle(0)(), "M0,100A100,100,0,1,0,0,-100A100,100,0,1,0,0,100Z");
  test.end();
});

// Note: The outer ring starts and ends at θ₀, but the inner ring starts and ends at θ₁.
// Note: The outer ring is clockwise, but the inner ring is anticlockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁) renders a clockwise annulus if r₀ > 0, r₁ > 0 and θ₀ - θ₁ ≥ τ", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100);
  test.pathEqual(a.startAngle(0).endAngle(2 * Math.PI)(), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100M0,-50A50,50,0,1,0,0,50A50,50,0,1,0,0,-50Z");
  test.pathEqual(a.startAngle(0).endAngle(3 * Math.PI)(), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100M0,50A50,50,0,1,0,0,-50A50,50,0,1,0,0,50Z");
  test.pathEqual(a.startAngle(-2 * Math.PI).endAngle(0)(), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100M0,-50A50,50,0,1,0,0,50A50,50,0,1,0,0,-50Z");
  test.pathEqual(a.startAngle(-Math.PI).endAngle(Math.PI)(), "M0,100A100,100,0,1,1,0,-100A100,100,0,1,1,0,100M0,50A50,50,0,1,0,0,-50A50,50,0,1,0,0,50Z");
  test.pathEqual(a.startAngle(-3 * Math.PI).endAngle(0)(), "M0,100A100,100,0,1,1,0,-100A100,100,0,1,1,0,100M0,-50A50,50,0,1,0,0,50A50,50,0,1,0,0,-50Z");
  test.end();
});

// Note: The outer ring starts and ends at θ₀, but the inner ring starts and ends at θ₁.
// Note: The outer ring is anticlockwise, but the inner ring is clockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁) renders an anticlockwise annulus if r₀ > 0, r₁ > 0 and θ₁ - θ₀ ≥ τ", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100);
  test.pathEqual(a.startAngle(0).endAngle(-2 * Math.PI)(), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100M0,-50A50,50,0,1,1,0,50A50,50,0,1,1,0,-50Z");
  test.pathEqual(a.startAngle(0).endAngle(-3 * Math.PI)(), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100M0,50A50,50,0,1,1,0,-50A50,50,0,1,1,0,50Z");
  test.pathEqual(a.startAngle(2 * Math.PI).endAngle(0)(), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100M0,-50A50,50,0,1,1,0,50A50,50,0,1,1,0,-50Z");
  test.pathEqual(a.startAngle(Math.PI).endAngle(-Math.PI)(), "M0,100A100,100,0,1,0,0,-100A100,100,0,1,0,0,100M0,50A50,50,0,1,1,0,-50A50,50,0,1,1,0,50Z");
  test.pathEqual(a.startAngle(3 * Math.PI).endAngle(0)(), "M0,100A100,100,0,1,0,0,-100A100,100,0,1,0,0,100M0,-50A50,50,0,1,1,0,50A50,50,0,1,1,0,-50Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁) renders a small clockwise sector if r > 0 and π > θ₁ - θ₀ ≥ 0", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100);
  test.pathEqual(a.startAngle(0).endAngle(Math.PI / 2)(), "M0,-100A100,100,0,0,1,100,0L0,0Z");
  test.pathEqual(a.startAngle(2 * Math.PI).endAngle(5 * Math.PI / 2)(), "M0,-100A100,100,0,0,1,100,0L0,0Z");
  test.pathEqual(a.startAngle(-Math.PI).endAngle(-Math.PI / 2)(), "M0,100A100,100,0,0,1,-100,0L0,0Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁) renders a small anticlockwise sector if r > 0 and π > θ₀ - θ₁ ≥ 0", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100);
  test.pathEqual(a.startAngle(0).endAngle(-Math.PI / 2)(), "M0,-100A100,100,0,0,0,-100,0L0,0Z");
  test.pathEqual(a.startAngle(-2 * Math.PI).endAngle(-5 * Math.PI / 2)(), "M0,-100A100,100,0,0,0,-100,0L0,0Z");
  test.pathEqual(a.startAngle(Math.PI).endAngle(Math.PI / 2)(), "M0,100A100,100,0,0,0,100,0L0,0Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁) renders a large clockwise sector if r > 0 and τ > θ₁ - θ₀ ≥ π", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100);
  test.pathEqual(a.startAngle(0).endAngle(3 * Math.PI / 2)(), "M0,-100A100,100,0,1,1,-100,0L0,0Z");
  test.pathEqual(a.startAngle(2 * Math.PI).endAngle(7 * Math.PI / 2)(), "M0,-100A100,100,0,1,1,-100,0L0,0Z");
  test.pathEqual(a.startAngle(-Math.PI).endAngle(Math.PI / 2)(), "M0,100A100,100,0,1,1,100,0L0,0Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁) renders a large anticlockwise sector if r > 0 and τ > θ₀ - θ₁ ≥ π", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100);
  test.pathEqual(a.startAngle(0).endAngle(-3 * Math.PI / 2)(), "M0,-100A100,100,0,1,0,100,0L0,0Z");
  test.pathEqual(a.startAngle(-2 * Math.PI).endAngle(-7 * Math.PI / 2)(), "M0,-100A100,100,0,1,0,100,0L0,0Z");
  test.pathEqual(a.startAngle(Math.PI).endAngle(-Math.PI / 2)(), "M0,100A100,100,0,1,0,-100,0L0,0Z");
  test.end();
});

// Note: The outer ring is clockwise, but the inner ring is anticlockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁) renders a small clockwise annular sector if r₀ > 0, r₁ > 0 and π > θ₁ - θ₀ ≥ 0", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100);
  test.pathEqual(a.startAngle(0).endAngle(Math.PI / 2)(), "M0,-100A100,100,0,0,1,100,0L50,0A50,50,0,0,0,0,-50Z");
  test.pathEqual(a.startAngle(2 * Math.PI).endAngle(5 * Math.PI / 2)(), "M0,-100A100,100,0,0,1,100,0L50,0A50,50,0,0,0,0,-50Z");
  test.pathEqual(a.startAngle(-Math.PI).endAngle(-Math.PI / 2)(), "M0,100A100,100,0,0,1,-100,0L-50,0A50,50,0,0,0,0,50Z");
  test.end();
});

// Note: The outer ring is anticlockwise, but the inner ring is clockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁) renders a small anticlockwise annular sector if r₀ > 0, r₁ > 0 and π > θ₀ - θ₁ ≥ 0", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100);
  test.pathEqual(a.startAngle(0).endAngle(-Math.PI / 2)(), "M0,-100A100,100,0,0,0,-100,0L-50,0A50,50,0,0,1,0,-50Z");
  test.pathEqual(a.startAngle(-2 * Math.PI).endAngle(-5 * Math.PI / 2)(), "M0,-100A100,100,0,0,0,-100,0L-50,0A50,50,0,0,1,0,-50Z");
  test.pathEqual(a.startAngle(Math.PI).endAngle(Math.PI / 2)(), "M0,100A100,100,0,0,0,100,0L50,0A50,50,0,0,1,0,50Z");
  test.end();
});

// Note: The outer ring is clockwise, but the inner ring is anticlockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁) renders a large clockwise annular sector if r₀ > 0, r₁ > 0 and τ > θ₁ - θ₀ ≥ π", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100);
  test.pathEqual(a.startAngle(0).endAngle(3 * Math.PI / 2)(), "M0,-100A100,100,0,1,1,-100,0L-50,0A50,50,0,1,0,0,-50Z");
  test.pathEqual(a.startAngle(2 * Math.PI).endAngle(7 * Math.PI / 2)(), "M0,-100A100,100,0,1,1,-100,0L-50,0A50,50,0,1,0,0,-50Z");
  test.pathEqual(a.startAngle(-Math.PI).endAngle(Math.PI / 2)(), "M0,100A100,100,0,1,1,100,0L50,0A50,50,0,1,0,0,50Z");
  test.end();
});

// Note: The outer ring is anticlockwise, but the inner ring is clockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁) renders a large anticlockwise annular sector if r₀ > 0, r₁ > 0 and τ > θ₀ - θ₁ ≥ π", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100);
  test.pathEqual(a.startAngle(0).endAngle(-3 * Math.PI / 2)(), "M0,-100A100,100,0,1,0,100,0L50,0A50,50,0,1,1,0,-50Z");
  test.pathEqual(a.startAngle(-2 * Math.PI).endAngle(-7 * Math.PI / 2)(), "M0,-100A100,100,0,1,0,100,0L50,0A50,50,0,1,1,0,-50Z");
  test.pathEqual(a.startAngle(Math.PI).endAngle(-Math.PI / 2)(), "M0,100A100,100,0,1,0,-100,0L-50,0A50,50,0,1,1,0,50Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(0).cornerRadius(r) renders a point", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(0).cornerRadius(5);
  test.pathEqual(a.startAngle(0).endAngle(2 * Math.PI)(), "M0,0Z");
  test.pathEqual(a.startAngle(0).endAngle(0)(), "M0,0Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁).cornerRadius(rᵧ) renders a clockwise circle if r > 0 and θ₁ - θ₀ ≥ τ", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100).cornerRadius(5);
  test.pathEqual(a.startAngle(0).endAngle(2 * Math.PI)(), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100Z");
  test.pathEqual(a.startAngle(0).endAngle(3 * Math.PI)(), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100Z");
  test.pathEqual(a.startAngle(-2 * Math.PI).endAngle(0)(), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100Z");
  test.pathEqual(a.startAngle(-Math.PI).endAngle(Math.PI)(), "M0,100A100,100,0,1,1,0,-100A100,100,0,1,1,0,100Z");
  test.pathEqual(a.startAngle(-3 * Math.PI).endAngle(0)(), "M0,100A100,100,0,1,1,0,-100A100,100,0,1,1,0,100Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁).cornerRadius(rᵧ) renders an anticlockwise circle if r > 0 and θ₀ - θ₁ ≥ τ", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100).cornerRadius(5);
  test.pathEqual(a.startAngle(0).endAngle(-2 * Math.PI)(), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100Z");
  test.pathEqual(a.startAngle(0).endAngle(-3 * Math.PI)(), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100Z");
  test.pathEqual(a.startAngle(2 * Math.PI).endAngle(0)(), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100Z");
  test.pathEqual(a.startAngle(Math.PI).endAngle(-Math.PI)(), "M0,100A100,100,0,1,0,0,-100A100,100,0,1,0,0,100Z");
  test.pathEqual(a.startAngle(3 * Math.PI).endAngle(0)(), "M0,100A100,100,0,1,0,0,-100A100,100,0,1,0,0,100Z");
  test.end();
});

// Note: The outer ring starts and ends at θ₀, but the inner ring starts and ends at θ₁.
// Note: The outer ring is clockwise, but the inner ring is anticlockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁).cornerRadius(rᵧ) renders a clockwise annulus if r₀ > 0, r₁ > 0 and θ₀ - θ₁ ≥ τ", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100).cornerRadius(5);
  test.pathEqual(a.startAngle(0).endAngle(2 * Math.PI)(), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100M0,-50A50,50,0,1,0,0,50A50,50,0,1,0,0,-50Z");
  test.pathEqual(a.startAngle(0).endAngle(3 * Math.PI)(), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100M0,50A50,50,0,1,0,0,-50A50,50,0,1,0,0,50Z");
  test.pathEqual(a.startAngle(-2 * Math.PI).endAngle(0)(), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100M0,-50A50,50,0,1,0,0,50A50,50,0,1,0,0,-50Z");
  test.pathEqual(a.startAngle(-Math.PI).endAngle(Math.PI)(), "M0,100A100,100,0,1,1,0,-100A100,100,0,1,1,0,100M0,50A50,50,0,1,0,0,-50A50,50,0,1,0,0,50Z");
  test.pathEqual(a.startAngle(-3 * Math.PI).endAngle(0)(), "M0,100A100,100,0,1,1,0,-100A100,100,0,1,1,0,100M0,-50A50,50,0,1,0,0,50A50,50,0,1,0,0,-50Z");
  test.end();
});

// Note: The outer ring starts and ends at θ₀, but the inner ring starts and ends at θ₁.
// Note: The outer ring is anticlockwise, but the inner ring is clockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁).cornerRadius(rᵧ) renders an anticlockwise annulus if r₀ > 0, r₁ > 0 and θ₁ - θ₀ ≥ τ", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100).cornerRadius(5);
  test.pathEqual(a.startAngle(0).endAngle(-2 * Math.PI)(), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100M0,-50A50,50,0,1,1,0,50A50,50,0,1,1,0,-50Z");
  test.pathEqual(a.startAngle(0).endAngle(-3 * Math.PI)(), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100M0,50A50,50,0,1,1,0,-50A50,50,0,1,1,0,50Z");
  test.pathEqual(a.startAngle(2 * Math.PI).endAngle(0)(), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100M0,-50A50,50,0,1,1,0,50A50,50,0,1,1,0,-50Z");
  test.pathEqual(a.startAngle(Math.PI).endAngle(-Math.PI)(), "M0,100A100,100,0,1,0,0,-100A100,100,0,1,0,0,100M0,50A50,50,0,1,1,0,-50A50,50,0,1,1,0,50Z");
  test.pathEqual(a.startAngle(3 * Math.PI).endAngle(0)(), "M0,100A100,100,0,1,0,0,-100A100,100,0,1,0,0,100M0,-50A50,50,0,1,1,0,50A50,50,0,1,1,0,-50Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁).cornerRadius(rᵧ) renders a small clockwise sector if r > 0 and π > θ₁ - θ₀ ≥ 0", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100).cornerRadius(5);
  test.pathEqual(a.startAngle(0).endAngle(Math.PI / 2)(), "M0,-94.868330A5,5,0,0,1,5.263158,-99.861400A100,100,0,0,1,99.861400,-5.263158A5,5,0,0,1,94.868330,0L0,0Z");
  test.pathEqual(a.startAngle(2 * Math.PI).endAngle(5 * Math.PI / 2)(), "M0,-94.868330A5,5,0,0,1,5.263158,-99.861400A100,100,0,0,1,99.861400,-5.263158A5,5,0,0,1,94.868330,0L0,0Z");
  test.pathEqual(a.startAngle(-Math.PI).endAngle(-Math.PI / 2)(), "M0,94.868330A5,5,0,0,1,-5.263158,99.861400A100,100,0,0,1,-99.861400,5.263158A5,5,0,0,1,-94.868330,0L0,0Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁).cornerRadius(rᵧ) renders a small anticlockwise sector if r > 0 and π > θ₀ - θ₁ ≥ 0", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100).cornerRadius(5);
  test.pathEqual(a.startAngle(0).endAngle(-Math.PI / 2)(), "M0,-94.868330A5,5,0,0,0,-5.263158,-99.861400A100,100,0,0,0,-99.861400,-5.263158A5,5,0,0,0,-94.868330,0L0,0Z");
  test.pathEqual(a.startAngle(-2 * Math.PI).endAngle(-5 * Math.PI / 2)(), "M0,-94.868330A5,5,0,0,0,-5.263158,-99.861400A100,100,0,0,0,-99.861400,-5.263158A5,5,0,0,0,-94.868330,0L0,0Z");
  test.pathEqual(a.startAngle(Math.PI).endAngle(Math.PI / 2)(), "M0,94.868330A5,5,0,0,0,5.263158,99.861400A100,100,0,0,0,99.861400,5.263158A5,5,0,0,0,94.868330,0L0,0Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁).cornerRadius(rᵧ) renders a large clockwise sector if r > 0 and τ > θ₁ - θ₀ ≥ π", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100).cornerRadius(5);
  test.pathEqual(a.startAngle(0).endAngle(3 * Math.PI / 2)(), "M0,-94.868330A5,5,0,0,1,5.263158,-99.861400A100,100,0,1,1,-99.861400,5.263158A5,5,0,0,1,-94.868330,0L0,0Z");
  test.pathEqual(a.startAngle(2 * Math.PI).endAngle(7 * Math.PI / 2)(), "M0,-94.868330A5,5,0,0,1,5.263158,-99.861400A100,100,0,1,1,-99.861400,5.263158A5,5,0,0,1,-94.868330,0L0,0Z");
  test.pathEqual(a.startAngle(-Math.PI).endAngle(Math.PI / 2)(), "M0,94.868330A5,5,0,0,1,-5.263158,99.861400A100,100,0,1,1,99.861400,-5.263158A5,5,0,0,1,94.868330,0L0,0Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁).cornerRadius(rᵧ) renders a large anticlockwise sector if r > 0 and τ > θ₀ - θ₁ ≥ π", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100).cornerRadius(5);
  test.pathEqual(a.startAngle(0).endAngle(-3 * Math.PI / 2)(), "M0,-94.868330A5,5,0,0,0,-5.263158,-99.861400A100,100,0,1,0,99.861400,5.263158A5,5,0,0,0,94.868330,0L0,0Z");
  test.pathEqual(a.startAngle(-2 * Math.PI).endAngle(-7 * Math.PI / 2)(), "M0,-94.868330A5,5,0,0,0,-5.263158,-99.861400A100,100,0,1,0,99.861400,5.263158A5,5,0,0,0,94.868330,0L0,0Z");
  test.pathEqual(a.startAngle(Math.PI).endAngle(-Math.PI / 2)(), "M0,94.868330A5,5,0,0,0,5.263158,99.861400A100,100,0,1,0,-99.861400,-5.263158A5,5,0,0,0,-94.868330,0L0,0Z");
  test.end();
});

// Note: The outer ring is clockwise, but the inner ring is anticlockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁).cornerRadius(rᵧ) renders a small clockwise annular sector if r₀ > 0, r₁ > 0 and π > θ₁ - θ₀ ≥ 0", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100).cornerRadius(5);
  test.pathEqual(a.startAngle(0).endAngle(Math.PI / 2)(), "M0,-94.868330A5,5,0,0,1,5.263158,-99.861400A100,100,0,0,1,99.861400,-5.263158A5,5,0,0,1,94.868330,0L54.772256,0A5,5,0,0,1,49.792960,-4.545455A50,50,0,0,0,4.545455,-49.792960A5,5,0,0,1,0,-54.772256Z");
  test.pathEqual(a.startAngle(2 * Math.PI).endAngle(5 * Math.PI / 2)(), "M0,-94.868330A5,5,0,0,1,5.263158,-99.861400A100,100,0,0,1,99.861400,-5.263158A5,5,0,0,1,94.868330,0L54.772256,0A5,5,0,0,1,49.792960,-4.545455A50,50,0,0,0,4.545455,-49.792960A5,5,0,0,1,0,-54.772256Z");
  test.pathEqual(a.startAngle(-Math.PI).endAngle(-Math.PI / 2)(), "M0,94.868330A5,5,0,0,1,-5.263158,99.861400A100,100,0,0,1,-99.861400,5.263158A5,5,0,0,1,-94.868330,0L-54.772256,0A5,5,0,0,1,-49.792960,4.545455A50,50,0,0,0,-4.545455,49.792960A5,5,0,0,1,0,54.772256Z");
  test.end();
});

// Note: The outer ring is anticlockwise, but the inner ring is clockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁).cornerRadius(rᵧ) renders a small anticlockwise annular sector if r₀ > 0, r₁ > 0 and π > θ₀ - θ₁ ≥ 0", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100).cornerRadius(5);
  test.pathEqual(a.startAngle(0).endAngle(-Math.PI / 2)(), "M0,-94.868330A5,5,0,0,0,-5.263158,-99.861400A100,100,0,0,0,-99.861400,-5.263158A5,5,0,0,0,-94.868330,0L-54.772256,0A5,5,0,0,0,-49.792960,-4.545455A50,50,0,0,1,-4.545455,-49.792960A5,5,0,0,0,0,-54.772256Z");
  test.pathEqual(a.startAngle(-2 * Math.PI).endAngle(-5 * Math.PI / 2)(), "M0,-94.868330A5,5,0,0,0,-5.263158,-99.861400A100,100,0,0,0,-99.861400,-5.263158A5,5,0,0,0,-94.868330,0L-54.772256,0A5,5,0,0,0,-49.792960,-4.545455A50,50,0,0,1,-4.545455,-49.792960A5,5,0,0,0,0,-54.772256Z");
  test.pathEqual(a.startAngle(Math.PI).endAngle(Math.PI / 2)(), "M0,94.868330A5,5,0,0,0,5.263158,99.861400A100,100,0,0,0,99.861400,5.263158A5,5,0,0,0,94.868330,0L54.772256,0A5,5,0,0,0,49.792960,4.545455A50,50,0,0,1,4.545455,49.792960A5,5,0,0,0,0,54.772256Z");
  test.end();
});

// Note: The outer ring is clockwise, but the inner ring is anticlockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁).cornerRadius(rᵧ) renders a large clockwise annular sector if r₀ > 0, r₁ > 0 and τ > θ₁ - θ₀ ≥ π", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100).cornerRadius(5);
  test.pathEqual(a.startAngle(0).endAngle(3 * Math.PI / 2)(), "M0,-94.868330A5,5,0,0,1,5.263158,-99.861400A100,100,0,1,1,-99.861400,5.263158A5,5,0,0,1,-94.868330,0L-54.772256,0A5,5,0,0,1,-49.792960,4.545455A50,50,0,1,0,4.545455,-49.792960A5,5,0,0,1,0,-54.772256Z");
  test.pathEqual(a.startAngle(2 * Math.PI).endAngle(7 * Math.PI / 2)(), "M0,-94.868330A5,5,0,0,1,5.263158,-99.861400A100,100,0,1,1,-99.861400,5.263158A5,5,0,0,1,-94.868330,0L-54.772256,0A5,5,0,0,1,-49.792960,4.545455A50,50,0,1,0,4.545455,-49.792960A5,5,0,0,1,0,-54.772256Z");
  test.pathEqual(a.startAngle(-Math.PI).endAngle(Math.PI / 2)(), "M0,94.868330A5,5,0,0,1,-5.263158,99.861400A100,100,0,1,1,99.861400,-5.263158A5,5,0,0,1,94.868330,0L54.772256,0A5,5,0,0,1,49.792960,-4.545455A50,50,0,1,0,-4.545455,49.792960A5,5,0,0,1,0,54.772256Z");
  test.end();
});

// Note: The outer ring is anticlockwise, but the inner ring is clockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁).cornerRadius(rᵧ) renders a large anticlockwise annular sector if r₀ > 0, r₁ > 0 and τ > θ₀ - θ₁ ≥ π", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100).cornerRadius(5);
  test.pathEqual(a.startAngle(0).endAngle(-3 * Math.PI / 2)(), "M0,-94.868330A5,5,0,0,0,-5.263158,-99.861400A100,100,0,1,0,99.861400,5.263158A5,5,0,0,0,94.868330,0L54.772256,0A5,5,0,0,0,49.792960,4.545455A50,50,0,1,1,-4.545455,-49.792960A5,5,0,0,0,0,-54.772256Z");
  test.pathEqual(a.startAngle(-2 * Math.PI).endAngle(-7 * Math.PI / 2)(), "M0,-94.868330A5,5,0,0,0,-5.263158,-99.861400A100,100,0,1,0,99.861400,5.263158A5,5,0,0,0,94.868330,0L54.772256,0A5,5,0,0,0,49.792960,4.545455A50,50,0,1,1,-4.545455,-49.792960A5,5,0,0,0,0,-54.772256Z");
  test.pathEqual(a.startAngle(Math.PI).endAngle(-Math.PI / 2)(), "M0,94.868330A5,5,0,0,0,5.263158,99.861400A100,100,0,1,0,-99.861400,-5.263158A5,5,0,0,0,-94.868330,0L-54.772256,0A5,5,0,0,0,-49.792960,-4.545455A50,50,0,1,1,4.545455,49.792960A5,5,0,0,0,0,54.772256Z");
  test.end();
});

tape("arc().innerRadius(r₀).outerRadius(r₁).cornerRadius(rᵧ) restricts rᵧ to |r₁ - r₀| / 2", function(test) {
  var a = shape.arc().cornerRadius(Infinity).startAngle(0).endAngle(Math.PI / 2);
  test.pathEqual(a.innerRadius(90).outerRadius(100)(), "M0,-94.868330A5,5,0,0,1,5.263158,-99.861400A100,100,0,0,1,99.861400,-5.263158A5,5,0,0,1,94.868330,0L94.868330,0A5,5,0,0,1,89.875260,-4.736842A90,90,0,0,0,4.736842,-89.875260A5,5,0,0,1,0,-94.868330Z");
  test.pathEqual(a.innerRadius(100).outerRadius(90)(), "M0,-94.868330A5,5,0,0,1,5.263158,-99.861400A100,100,0,0,1,99.861400,-5.263158A5,5,0,0,1,94.868330,0L94.868330,0A5,5,0,0,1,89.875260,-4.736842A90,90,0,0,0,4.736842,-89.875260A5,5,0,0,1,0,-94.868330Z");
  test.end();
});

tape("arc().innerRadius(r₀).outerRadius(r₁).cornerRadius(rᵧ) merges adjacent corners when rᵧ is relatively large", function(test) {
  var a = shape.arc().cornerRadius(Infinity).startAngle(0).endAngle(Math.PI / 2);
  test.pathEqual(a.innerRadius(10).outerRadius(100)(), "M0,-41.421356A41.421356,41.421356,0,1,1,41.421356,0L24.142136,0A24.142136,24.142136,0,0,1,0,-24.142136Z");
  test.pathEqual(a.innerRadius(100).outerRadius(10)(), "M0,-41.421356A41.421356,41.421356,0,1,1,41.421356,0L24.142136,0A24.142136,24.142136,0,0,1,0,-24.142136Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(0).startAngle(0).endAngle(τ).padAngle(δ) does not pad a point", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(0).startAngle(0).endAngle(2 * Math.PI).padAngle(0.1);
  test.pathEqual(a(), "M0,0Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(0).endAngle(τ).padAngle(δ) does not pad a circle", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100).startAngle(0).endAngle(2 * Math.PI).padAngle(0.1);
  test.pathEqual(a(), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100Z");
  test.end();
});

tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(0).endAngle(τ).padAngle(δ) does not pad an annulus", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100).startAngle(0).endAngle(2 * Math.PI).padAngle(0.1);
  test.pathEqual(a(), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100M0,-50A50,50,0,1,0,0,50A50,50,0,1,0,0,-50Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁).padAngle(δ) pads the outside of a circular sector", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100).startAngle(0).endAngle(Math.PI / 2).padAngle(0.1);
  test.pathEqual(a(), "M4.997917,-99.875026A100,100,0,0,1,99.875026,-4.997917L0,0Z");
  test.end();
});

tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁).padAngle(δ) pads an annular sector", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100).startAngle(0).endAngle(Math.PI / 2).padAngle(0.1);
  test.pathEqual(a(), "M5.587841,-99.843758A100,100,0,0,1,99.843758,-5.587841L49.686779,-5.587841A50,50,0,0,0,5.587841,-49.686779Z");
  test.end();
});

tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁).padAngle(δ) may collapse the inside of an annular sector", function(test) {
  var a = shape.arc().innerRadius(10).outerRadius(100).startAngle(0).endAngle(Math.PI / 2).padAngle(0.2);
  test.pathEqual(a(), "M10.033134,-99.495408A100,100,0,0,1,99.495408,-10.033134L7.071068,-7.071068Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁).padAngle(δ).cornerRadius(rᵧ) rounds and pads a circular sector", function(test) {
  var a = shape.arc().innerRadius(0).outerRadius(100).startAngle(0).endAngle(Math.PI / 2).padAngle(0.1).cornerRadius(10);
  test.pathEqual(a(), "M4.470273,-89.330939A10,10,0,0,1,16.064195,-98.701275A100,100,0,0,1,98.701275,-16.064195A10,10,0,0,1,89.330939,-4.470273L0,0Z");
  test.end();
});

tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁).padAngle(δ).cornerRadius(rᵧ) rounds and pads an annular sector", function(test) {
  var a = shape.arc().innerRadius(50).outerRadius(100).startAngle(0).endAngle(Math.PI / 2).padAngle(0.1).cornerRadius(10);
  test.pathEqual(a(), "M5.587841,-88.639829A10,10,0,0,1,17.319823,-98.488698A100,100,0,0,1,98.488698,-17.319823A10,10,0,0,1,88.639829,-5.587841L57.939790,-5.587841A10,10,0,0,1,48.283158,-12.989867A50,50,0,0,0,12.989867,-48.283158A10,10,0,0,1,5.587841,-57.939790Z");
  test.end();
});

tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁).padAngle(δ).cornerRadius(rᵧ) rounds and pads a collapsed annular sector", function(test) {
  var a = shape.arc().innerRadius(10).outerRadius(100).startAngle(0).endAngle(Math.PI / 2).padAngle(0.2).cornerRadius(10);
  test.pathEqual(a(), "M9.669396,-88.145811A10,10,0,0,1,21.849183,-97.583878A100,100,0,0,1,97.583878,-21.849183A10,10,0,0,1,88.145811,-9.669396L7.071068,-7.071068Z");
  test.end();
});
