var tape = require("tape"),
    shape = require("../../");

require("../pathEqual");

tape("line.curve(curveMonotoneY)(data) generates the expected path", function(test) {
  var l = shape.line().curve(shape.curveMonotoneY);
  test.equal(l([]), null);
  test.pathEqual(l([[0, 1]].map(reflect)), "M1,0Z");
  test.pathEqual(l([[0, 1], [1, 3]].map(reflect)), "M1,0L3,1");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1]].map(reflect)), "M1,0C2,0.333333,3,0.666667,3,1C3,1.333333,2,1.666667,1,2");
  test.pathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]].map(reflect)), "M1,0C2,0.333333,3,0.666667,3,1C3,1.333333,1,1.666667,1,2C1,2.333333,2,2.666667,3,3");
  test.end();
});

tape("line.curve(curveMonotoneY)(data) preserves monotonicity in y", function(test) {
  var l = shape.line().curve(shape.curveMonotoneY);
  test.pathEqual(l([[0, 200], [100, 100], [200, 100], [300, 300], [400, 300]].map(reflect)), "M200,0C150,33.333333,100,66.666667,100,100C100,133.333333,100,166.666667,100,200C100,233.333333,300,266.666667,300,300C300,333.333333,300,366.666667,300,400");
  test.end();
});

tape("line.curve(curveMonotoneY)(data) handles duplicate x-values", function(test) {
  var l = shape.line().curve(shape.curveMonotoneY);
  test.pathEqual(l([[0, 200], [0, 100], [100, 100], [200, 0]].map(reflect)), "M200,0C200,0,100,0,100,0C100,33.333333,100,66.666667,100,100C100,133.333333,50,166.666667,0,200");
  test.pathEqual(l([[0, 200], [100, 100], [100, 0], [200, 0]].map(reflect)), "M200,0C183.333333,33.333333,166.666667,66.666667,100,100C100,100,0,100,0,100C0,133.333333,0,166.666667,0,200");
  test.pathEqual(l([[0, 200], [100, 100], [200, 100], [200, 0]].map(reflect)), "M200,0C150,33.333333,100,66.666667,100,100C100,133.333333,100,166.666667,100,200C100,200,0,200,0,200");
  test.end();
});

tape("line.curve(curveMonotoneY)(data) handles segments of infinite slope", function(test) {
  var l = shape.line().curve(shape.curveMonotoneY);
  test.pathEqual(l([[0, 200], [100, 150], [100, 50], [200, 0]].map(reflect)), "M200,0C191.666667,33.333333,183.333333,66.666667,150,100C150,100,50,100,50,100C16.666667,133.333333,8.333333,166.666667,0,200");
  test.pathEqual(l([[200, 0], [100, 50], [100, 150], [0, 200]].map(reflect)), "M0,200C8.333333,166.666667,16.666667,133.333333,50,100C50,100,150,100,150,100C183.333333,66.666667,191.666667,33.333333,200,0");
  test.end();
});

tape("line.curve(curveMonotoneY)(data) ignores coincident points", function(test) {
  var l = shape.line().curve(shape.curveMonotoneY),
      p = l([[0, 200], [50, 200], [100, 100], [150, 0], [200, 0]].map(reflect));
  test.equal(l([[0, 200], [0, 200], [50, 200], [100, 100], [150, 0], [200, 0]].map(reflect)), p);
  test.equal(l([[0, 200], [50, 200], [50, 200], [100, 100], [150, 0], [200, 0]].map(reflect)), p);
  test.equal(l([[0, 200], [50, 200], [100, 100], [100, 100], [150, 0], [200, 0]].map(reflect)), p);
  test.equal(l([[0, 200], [50, 200], [100, 100], [150, 0], [150, 0], [200, 0]].map(reflect)), p);
  test.equal(l([[0, 200], [50, 200], [100, 100], [150, 0], [200, 0], [200, 0]].map(reflect)), p);
  test.end();
});

tape("area.curve(curveMonotoneY)(data) generates the expected path", function(test) {
  var a = shape.area().curve(shape.curveMonotoneY);
  test.equal(a([].map(reflect)), null);
  test.pathEqual(a([[0, 1]].map(reflect)), "M1,0L1,0Z");
  test.pathEqual(a([[0, 1], [1, 3]].map(reflect)), "M1,0L3,1L3,0L1,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1]].map(reflect)), "M1,0C2,0.333333,3,0.666667,3,1C3,1.333333,2,1.666667,1,2L1,0C1,0,3,0,3,0C3,0,1,0,1,0Z");
  test.pathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]].map(reflect)), "M1,0C2,0.333333,3,0.666667,3,1C3,1.333333,1,1.666667,1,2C1,2.333333,2,2.666667,3,3L3,0C3,0,1,0,1,0C1,0,3,0,3,0C3,0,1,0,1,0Z");
  test.end();
});

function reflect(p) {
  return [p[1], p[0]];
}
