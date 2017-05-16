var tape = require("tape"),
    shape = require("../");

require("./pathEqual");

tape("areaRadial() returns a default radial area shape", function(test) {
  var a = shape.areaRadial();
  test.equal(a.startAngle()([42, 34]), 42);
  test.equal(a.endAngle(), null);
  test.equal(a.innerRadius()([42, 34]), 0);
  test.equal(a.outerRadius()([42, 34]), 34);
  test.equal(a.defined()([42, 34]), true);
  test.equal(a.curve(), shape.curveLinear);
  test.equal(a.context(), null);
  test.pathEqual(a([[0, 1], [2, 3], [4, 5]]), "M0,-1L2.727892,1.248441L-3.784012,3.268218L0,0L0,0L0,0Z");
  test.end();
});

tape("areaRadial.lineStartAngle() returns a line derived from the area", function(test) {
  var defined = function() { return true; },
      curve = shape.curveCardinal,
      context = {},
      startAngle = function() {},
      endAngle = function() {},
      radius = function() {},
      a = shape.areaRadial().defined(defined).curve(curve).context(context).radius(radius).startAngle(startAngle).endAngle(endAngle),
      l = a.lineStartAngle();
  test.equal(l.defined(), defined);
  test.equal(l.curve(), curve);
  test.equal(l.context(), context);
  test.equal(l.angle(), startAngle);
  test.equal(l.radius(), radius);
  test.end();
});

tape("areaRadial.lineEndAngle() returns a line derived from the area", function(test) {
  var defined = function() { return true; },
      curve = shape.curveCardinal,
      context = {},
      startAngle = function() {},
      endAngle = function() {},
      radius = function() {},
      a = shape.areaRadial().defined(defined).curve(curve).context(context).radius(radius).startAngle(startAngle).endAngle(endAngle),
      l = a.lineEndAngle();
  test.equal(l.defined(), defined);
  test.equal(l.curve(), curve);
  test.equal(l.context(), context);
  test.equal(l.angle(), endAngle);
  test.equal(l.radius(), radius);
  test.end();
});

tape("areaRadial.lineInnerRadius() returns a line derived from the area", function(test) {
  var defined = function() { return true; },
      curve = shape.curveCardinal,
      context = {},
      angle = function() {},
      innerRadius = function() {},
      outerRadius = function() {},
      a = shape.areaRadial().defined(defined).curve(curve).context(context).angle(angle).innerRadius(innerRadius).outerRadius(outerRadius),
      l = a.lineInnerRadius();
  test.equal(l.defined(), defined);
  test.equal(l.curve(), curve);
  test.equal(l.context(), context);
  test.equal(l.angle(), angle);
  test.equal(l.radius(), innerRadius);
  test.end();
});

tape("areaRadial.lineOuterRadius() returns a line derived from the area", function(test) {
  var defined = function() { return true; },
      curve = shape.curveCardinal,
      context = {},
      angle = function() {},
      innerRadius = function() {},
      outerRadius = function() {},
      a = shape.areaRadial().defined(defined).curve(curve).context(context).angle(angle).innerRadius(innerRadius).outerRadius(outerRadius),
      l = a.lineOuterRadius();
  test.equal(l.defined(), defined);
  test.equal(l.curve(), curve);
  test.equal(l.context(), context);
  test.equal(l.angle(), angle);
  test.equal(l.radius(), outerRadius);
  test.end();
});
