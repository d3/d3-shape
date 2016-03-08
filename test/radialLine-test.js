var tape = require("tape"),
    shape = require("../");

require("./pathEqual");

tape("radialLine() returns a default radial line shape", function(test) {
  var l = shape.radialLine();
  test.equal(l.angle()([42, 34]), 42);
  test.equal(l.radius()([42, 34]), 34);
  test.equal(l.defined()([42, 34]), true);
  test.equal(l.curve(), shape.curveLinear);
  test.equal(l.context(), null);
  test.pathEqual(l([[0, 1], [2, 3], [4, 5]]), "M0,-1L2.727892,1.248441L-3.784012,3.268218");
  test.end();
});
