var tape = require("tape"),
    shape = require("../");

require("./pathEqual");

tape("arc().innerRadius(0).outerRadius(0) renders a point", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 0, startAngle: 0, endAngle: 2 * Math.PI}), "M0,0Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 0, startAngle: 0, endAngle: 0}), "M0,0Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁) renders a clockwise circle if r > 0 and θ₁ - θ₀ ≥ τ", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: 2 * Math.PI}), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: 3 * Math.PI}), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: -2 * Math.PI, endAngle: 0}), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: -Math.PI, endAngle: Math.PI}), "M0,100A100,100,0,1,1,0,-100A100,100,0,1,1,0,100Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: -3 * Math.PI, endAngle: 0}), "M0,100A100,100,0,1,1,0,-100A100,100,0,1,1,0,100Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁) renders an anticlockwise circle if r > 0 and θ₀ - θ₁ ≥ τ", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: -2 * Math.PI}), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: -3 * Math.PI}), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 2 * Math.PI, endAngle: 0}), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: Math.PI, endAngle: -Math.PI}), "M0,100A100,100,0,1,0,0,-100A100,100,0,1,0,0,100Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 3 * Math.PI, endAngle: 0}), "M0,100A100,100,0,1,0,0,-100A100,100,0,1,0,0,100Z");
  test.end();
});

// Note: The outer ring starts and ends at θ₀, but the inner ring starts and ends at θ₁.
// Note: The outer ring is clockwise, but the inner ring is anticlockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁) renders a clockwise annulus if r₀ > 0, r₁ > 0 and θ₀ - θ₁ ≥ τ", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: 2 * Math.PI}), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100M0,-50A50,50,0,1,0,0,50A50,50,0,1,0,0,-50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: 3 * Math.PI}), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100M0,50A50,50,0,1,0,0,-50A50,50,0,1,0,0,50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: -2 * Math.PI, endAngle: 0}), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100M0,-50A50,50,0,1,0,0,50A50,50,0,1,0,0,-50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: -Math.PI, endAngle: Math.PI}), "M0,100A100,100,0,1,1,0,-100A100,100,0,1,1,0,100M0,50A50,50,0,1,0,0,-50A50,50,0,1,0,0,50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: -3 * Math.PI, endAngle: 0}), "M0,100A100,100,0,1,1,0,-100A100,100,0,1,1,0,100M0,-50A50,50,0,1,0,0,50A50,50,0,1,0,0,-50Z");
  test.end();
});

// Note: The outer ring starts and ends at θ₀, but the inner ring starts and ends at θ₁.
// Note: The outer ring is anticlockwise, but the inner ring is clockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁) renders an anticlockwise annulus if r₀ > 0, r₁ > 0 and θ₁ - θ₀ ≥ τ", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: -2 * Math.PI}), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100M0,-50A50,50,0,1,1,0,50A50,50,0,1,1,0,-50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: -3 * Math.PI}), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100M0,50A50,50,0,1,1,0,-50A50,50,0,1,1,0,50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 2 * Math.PI, endAngle: 0}), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100M0,-50A50,50,0,1,1,0,50A50,50,0,1,1,0,-50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: Math.PI, endAngle: -Math.PI}), "M0,100A100,100,0,1,0,0,-100A100,100,0,1,0,0,100M0,50A50,50,0,1,1,0,-50A50,50,0,1,1,0,50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 3 * Math.PI, endAngle: 0}), "M0,100A100,100,0,1,0,0,-100A100,100,0,1,0,0,100M0,-50A50,50,0,1,1,0,50A50,50,0,1,1,0,-50Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁) renders a small clockwise sector if r > 0 and π > θ₁ - θ₀ ≥ 0", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: Math.PI / 2}), "M0,-100A100,100,0,0,1,100,0L0,0Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 2 * Math.PI, endAngle: 5 * Math.PI / 2}), "M0,-100A100,100,0,0,1,100,0L0,0Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: -Math.PI, endAngle: -Math.PI / 2}), "M0,100A100,100,0,0,1,-100,0L0,0Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁) renders a small anticlockwise sector if r > 0 and π > θ₀ - θ₁ ≥ 0", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: -Math.PI / 2}), "M0,-100A100,100,0,0,0,-100,0L0,0Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: -2 * Math.PI, endAngle: -5 * Math.PI / 2}), "M0,-100A100,100,0,0,0,-100,0L0,0Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: Math.PI, endAngle: Math.PI / 2}), "M0,100A100,100,0,0,0,100,0L0,0Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁) renders a large clockwise sector if r > 0 and τ > θ₁ - θ₀ ≥ π", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: 3 * Math.PI / 2}), "M0,-100A100,100,0,1,1,-100,0L0,0Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 2 * Math.PI, endAngle: 7 * Math.PI / 2}), "M0,-100A100,100,0,1,1,-100,0L0,0Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: -Math.PI, endAngle: Math.PI / 2}), "M0,100A100,100,0,1,1,100,0L0,0Z");
  test.end();
});

tape("arc().innerRadius(0).outerRadius(r).startAngle(θ₀).endAngle(θ₁) renders a large anticlockwise sector if r > 0 and τ > θ₀ - θ₁ ≥ π", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: -3 * Math.PI / 2}), "M0,-100A100,100,0,1,0,100,0L0,0Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: -2 * Math.PI, endAngle: -7 * Math.PI / 2}), "M0,-100A100,100,0,1,0,100,0L0,0Z");
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: Math.PI, endAngle: -Math.PI / 2}), "M0,100A100,100,0,1,0,-100,0L0,0Z");
  test.end();
});

// Note: The outer ring is clockwise, but the inner ring is anticlockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁) renders a small clockwise annular sector if r₀ > 0, r₁ > 0 and π > θ₁ - θ₀ ≥ 0", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: Math.PI / 2}), "M0,-100A100,100,0,0,1,100,0L50,0A50,50,0,0,0,0,-50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 2 * Math.PI, endAngle: 5 * Math.PI / 2}), "M0,-100A100,100,0,0,1,100,0L50,0A50,50,0,0,0,0,-50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: -Math.PI, endAngle: -Math.PI / 2}), "M0,100A100,100,0,0,1,-100,0L-50,0A50,50,0,0,0,0,50Z");
  test.end();
});

// Note: The outer ring is anticlockwise, but the inner ring is clockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁) renders a small anticlockwise annular sector if r₀ > 0, r₁ > 0 and π > θ₀ - θ₁ ≥ 0", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: -Math.PI / 2}), "M0,-100A100,100,0,0,0,-100,0L-50,0A50,50,0,0,1,0,-50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: -2 * Math.PI, endAngle: -5 * Math.PI / 2}), "M0,-100A100,100,0,0,0,-100,0L-50,0A50,50,0,0,1,0,-50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: Math.PI, endAngle: Math.PI / 2}), "M0,100A100,100,0,0,0,100,0L50,0A50,50,0,0,1,0,50Z");
  test.end();
});

// Note: The outer ring is clockwise, but the inner ring is anticlockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁) renders a large clockwise annular sector if r₀ > 0, r₁ > 0 and τ > θ₁ - θ₀ ≥ π", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: 3 * Math.PI / 2}), "M0,-100A100,100,0,1,1,-100,0L-50,0A50,50,0,1,0,0,-50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 2 * Math.PI, endAngle: 7 * Math.PI / 2}), "M0,-100A100,100,0,1,1,-100,0L-50,0A50,50,0,1,0,0,-50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: -Math.PI, endAngle: Math.PI / 2}), "M0,100A100,100,0,1,1,100,0L50,0A50,50,0,1,0,0,50Z");
  test.end();
});

// Note: The outer ring is anticlockwise, but the inner ring is clockwise.
tape("arc().innerRadius(r₀).outerRadius(r₁).startAngle(θ₀).endAngle(θ₁) renders a large anticlockwise annular sector if r₀ > 0, r₁ > 0 and τ > θ₀ - θ₁ ≥ π", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: -3 * Math.PI / 2}), "M0,-100A100,100,0,1,0,100,0L50,0A50,50,0,1,1,0,-50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: -2 * Math.PI, endAngle: -7 * Math.PI / 2}), "M0,-100A100,100,0,1,0,100,0L50,0A50,50,0,1,1,0,-50Z");
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: Math.PI, endAngle: -Math.PI / 2}), "M0,100A100,100,0,1,0,-100,0L-50,0A50,50,0,1,1,0,50Z");
  test.end();
});
