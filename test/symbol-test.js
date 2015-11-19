var tape = require("tape"),
    shape = require("../");

tape("symbol() returns a default symbol shape", function(test) {
  var s = shape.symbol();
  test.equal(s.type()(), shape.symbolCircle);
  test.equal(s.size()(), 64);
  test.equal(s.context(), null);
  test.equal(s(), "M4.51351666838205,0A4.51351666838205,4.51351666838205,0,1,1,-4.51351666838205,0A4.51351666838205,4.51351666838205,0,1,1,4.51351666838205,0");
  test.end();
});

tape("symbol.size(size) observes the specified size function", function(test) {
  var size = function(d, i) { return d.z * 2 + i; },
      s = shape.symbol().size(size);
  test.equal(s.size(), size);
  test.equal(s({z: 0}, 0), "M0,0A0,0,0,1,1,0,0A0,0,0,1,1,0,0");
  test.equal(s({z: Math.PI / 2}, 0), "M1,0A1,1,0,1,1,-1,0A1,1,0,1,1,1,0");
  test.equal(s({z: 2 * Math.PI}, 0), "M2,0A2,2,0,1,1,-2,0A2,2,0,1,1,2,0");
  test.equal(s({z: Math.PI}, 1), "M1.5225997130512636,0A1.5225997130512636,1.5225997130512636,0,1,1,-1.5225997130512636,0A1.5225997130512636,1.5225997130512636,0,1,1,1.5225997130512636,0");
  test.equal(s({z: 4 * Math.PI}, 2), "M2.938812646693828,0A2.938812646693828,2.938812646693828,0,1,1,-2.938812646693828,0A2.938812646693828,2.938812646693828,0,1,1,2.938812646693828,0");
  test.end();
});

tape("symbol.size(size) observes the specified size constant", function(test) {
  var s = shape.symbol();
  test.equal(s.size(42).size()(), 42);
  test.equal(s.size(0)(), "M0,0A0,0,0,1,1,0,0A0,0,0,1,1,0,0");
  test.equal(s.size(Math.PI)(), "M1,0A1,1,0,1,1,-1,0A1,1,0,1,1,1,0");
  test.equal(s.size(4 * Math.PI)(), "M2,0A2,2,0,1,1,-2,0A2,2,0,1,1,2,0");
  test.end();
});

tape("symbol.type(symbolCross) generates the expected path", function(test) {
  var s = shape.symbol().type(shape.symbolCross).size(function(d) { return d; });
  test.equal(s(0), "M0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0Z");
  test.equal(s(20), "M-3,-1L-1,-1L-1,-3L1,-3L1,-1L3,-1L3,1L1,1L1,3L-1,3L-1,1L-3,1Z");
  test.end();
});

tape("symbol.type(symbolDiamond) generates the expected path", function(test) {
  var s = shape.symbol().type(shape.symbolDiamond).size(function(d) { return d; });
  test.equal(s(0), "M0,0L0,0L0,0L0,0Z");
  test.equal(s(10), "M0,-2.942830956382712L1.6990442448471226,0L0,2.942830956382712L-1.6990442448471226,0Z");
  test.end();
});

tape("symbol.type(symbolSquare) generates the expected path", function(test) {
  var s = shape.symbol().type(shape.symbolSquare).size(function(d) { return d; });
  test.equal(s(0), "M0,0h0v0h0Z");
  test.equal(s(4), "M-1,-1h2v2h-2Z");
  test.equal(s(16), "M-2,-2h4v4h-4Z");
  test.end();
});

tape("symbol.type(symbolTriangleUp) generates the expected path", function(test) {
  var s = shape.symbol().type(shape.symbolTriangleDown).size(function(d) { return d; });
  test.equal(s(0), "M0,0L0,0L0,0Z");
  test.equal(s(10), "M0,2.0808957251439084L2.4028114141347543,-2.0808957251439084L-2.4028114141347543,-2.0808957251439084Z");
  test.end();
});

tape("symbol.type(symbolTriangleDown) generates the expected path", function(test) {
  var s = shape.symbol().type(shape.symbolTriangleUp).size(function(d) { return d; });
  test.equal(s(0), "M0,0L0,0L0,0Z");
  test.equal(s(10), "M0,-2.0808957251439084L2.4028114141347543,2.0808957251439084L-2.4028114141347543,2.0808957251439084Z");
  test.end();
});
