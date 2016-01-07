var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveBundle) uses a default beta of 0.85", function(test) {
  var l = shape.line().curve(shape.curveBundle, 0.85);
  test.equal(shape.line().curve(shape.curveBundle)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.line().curve(shape.curveBundle, null)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.equal(shape.line().curve(shape.curveBundle, undefined)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});
