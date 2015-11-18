var tape = require("tape"),
    shape = require("../");

tape("area() returns a default area shape", function(test) {
  var a = shape.area();
  test.equal(a.x0()([42, 34]), 42);
  test.equal(a.x1()([42, 34]), 42);
  test.equal(a.y0(), 0);
  test.equal(a.y1()([42, 34]), 34);
  test.equal(a.defined(), true);
  test.equal(a.context(), null);
  test.equal(a([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5L4,0L2,0L0,0Z");
  test.end();
});

tape("area.interpolate(\"linear\")(data) generates the expected path", function(test) {
  var a = shape.area().interpolate("linear");
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [2, 3]]), "M0,1L2,3L2,0L0,0Z");
  test.equal(a([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5L4,0L2,0L0,0Z");
  test.end();
});

tape("area.interpolate(\"basis\")(data) generates the expected path", function(test) {
  var a = shape.area().interpolate("basis");
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.equal(a([[0, 1], [1, 3], [2, 1]]), "M0,1L0.16666666666666666,1.3333333333333333C0.3333333333333333,1.6666666666666667,0.6666666666666666,2.3333333333333335,1,2.3333333333333335C1.3333333333333333,2.3333333333333335,1.6666666666666667,1.6666666666666667,1.8333333333333333,1.3333333333333333L2,1L2,0L1.8333333333333333,0C1.6666666666666667,0,1.3333333333333333,0,1,0C0.6666666666666666,0,0.3333333333333333,0,0.16666666666666666,0L0,0Z");
  test.end();
});

tape("area.interpolate(\"cardinal\")(data) generates the expected path", function(test) {
  var a = shape.area().interpolate("cardinal");
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.equal(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.6666666666666667,3,1,3C1.3333333333333333,3,2,1,2,1L2,0C2,0,1.3333333333333333,0,1,0C0.6666666666666667,0,0,0,0,0Z");
  test.equal(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.6666666666666667,3,1,3C1.3333333333333333,3,1.6666666666666667,1,2,1C2.3333333333333335,1,3,3,3,3L3,0C3,0,2.3333333333333335,0,2,0C1.6666666666666667,0,1.3333333333333333,0,1,0C0.6666666666666667,0,0,0,0,0Z");
  test.end();
});

tape("area.interpolate(\"step\")(data) generates the expected path", function(test) {
  var a = shape.area().interpolate("step");
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [2, 3]]), "M0,1L1,1L1,3L2,3L2,0L1,0L1,0L0,0Z");
  test.equal(a([[0, 1], [2, 3], [4, 5]]), "M0,1L1,1L1,3L3,3L3,5L4,5L4,0L3,0L3,0L1,0L1,0L0,0Z");
  test.end();
});

tape("area.interpolate(\"step-before\")(data) generates the expected path", function(test) {
  var a = shape.area().interpolate("step-before");
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [2, 3]]), "M0,1L0,3L2,3L2,0L2,0L0,0Z");
  test.equal(a([[0, 1], [2, 3], [4, 5]]), "M0,1L0,3L2,3L2,5L4,5L4,0L4,0L2,0L2,0L0,0Z");
  test.end();
});

tape("area.interpolate(\"step-after\")(data) generates the expected path", function(test) {
  var a = shape.area().interpolate("step-after");
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [2, 3]]), "M0,1L2,1L2,3L2,0L0,0L0,0Z");
  test.equal(a([[0, 1], [2, 3], [4, 5]]), "M0,1L2,1L2,3L4,3L4,5L4,0L2,0L2,0L0,0L0,0Z");
  test.end();
});

tape("area.interpolate(\"natural\")(data) generates the expected path", function(test) {
  var a = shape.area().interpolate("natural");
  test.equal(a([]), null);
  test.equal(a([[0, 1]]), "M0,1L0,0Z");
  test.equal(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  test.equal(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0.33333333333333337,2,0.6666666666666667,3,1,3C1.3333333333333333,3,1.6666666666666665,2,2,1L2,0C1.6666666666666667,0,1.3333333333333335,0,1,0C0.6666666666666666,0,0.3333333333333333,0,0,0Z");
  test.equal(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0.33333333333333326,2.111111111111111,0.6666666666666665,3.2222222222222223,1,3C1.3333333333333335,2.7777777777777777,1.666666666666667,1.2222222222222223,2,1C2.333333333333333,0.7777777777777778,2.6666666666666665,1.8888888888888888,3,3L3,0C2.666666666666667,0,2.3333333333333335,0,2,0C1.6666666666666665,0,1.3333333333333333,0,1,0C0.6666666666666667,0,0.33333333333333337,0,0,0Z");
  test.end();
});
