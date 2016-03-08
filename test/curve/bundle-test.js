var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveBundle) uses a default beta of 0.85", function(test) {
  var l = shape.line().curve(shape.curveBundle.beta(0.85));
  test.equal(shape.line().curve(shape.curveBundle)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});

tape("line.curve(curveBundle.beta(beta)) uses the specified beta", function(test) {
  test.equal(shape.line().curve(shape.curveBundle.beta(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1L0.16666666666666666,1.222222222222222C0.3333333333333333,1.4444444444444444,0.6666666666666666,1.8888888888888886,1,1.9999999999999998C1.3333333333333333,2.1111111111111107,1.6666666666666667,1.8888888888888886,2,2C2.3333333333333335,2.111111111111111,2.6666666666666665,2.5555555555555554,2.8333333333333335,2.7777777777777772L3,3");
  test.end();
});

tape("line.curve(curveBundle.beta(beta)) coerces the specified beta to a number", function(test) {
  var l = shape.line().curve(shape.curveBundle.beta("0.5"));
  test.equal(shape.line().curve(shape.curveBundle.beta(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
  test.end();
});
