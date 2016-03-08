var tape = require("tape"),
    shape = require("../");

require("./pathEqual");

tape("radialArea() returns a default radial area shape", function(test) {
  var a = shape.radialArea();
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
