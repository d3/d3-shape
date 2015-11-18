var tape = require("tape"),
    shape = require("../");

tape("symbol() returns a default symbol shape", function(test) {
  var s = shape.symbol();
  test.equal(s.type()(), "circle");
  test.equal(s.size()(), 64);
  test.equal(s.context(), null);
  test.equal(s(), "M0,4.51351666838205L4.51351666838205,0A4.51351666838205,4.51351666838205,0,1,1,-4.51351666838205,0A4.51351666838205,4.51351666838205,0,1,1,4.51351666838205,0Z");
  test.end();
});
