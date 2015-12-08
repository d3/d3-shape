var tape = require("tape"),
    shape = require("../"),
    polygonContext = require("./polygonContext");

require("./inDelta");
require("./pathEqual");

tape("symbol() returns a default symbol shape", function(test) {
  var s = shape.symbol();
  test.equal(s.type()(), shape.circle);
  test.equal(s.size()(), 64);
  test.equal(s.context(), null);
  test.pathEqual(s(), "M4.513517,0A4.513517,4.513517,0,1,1,-4.513517,0A4.513517,4.513517,0,1,1,4.513517,0");
  test.end();
});

tape("symbol().size(f)(…) propagates the context and arguments to the specified function", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.symbol().size(function() { actual = {that: this, args: [].slice.call(arguments)}; return 64; }).apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("symbol().type(f)(…) propagates the context and arguments to the specified function", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.symbol().type(function() { actual = {that: this, args: [].slice.call(arguments)}; return shape.circle; }).apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("symbol.size(size) observes the specified size function", function(test) {
  var size = function(d, i) { return d.z * 2 + i; },
      s = shape.symbol().size(size);
  test.equal(s.size(), size);
  test.pathEqual(s({z: 0}, 0), "M0,0");
  test.pathEqual(s({z: Math.PI / 2}, 0), "M1,0A1,1,0,1,1,-1,0A1,1,0,1,1,1,0");
  test.pathEqual(s({z: 2 * Math.PI}, 0), "M2,0A2,2,0,1,1,-2,0A2,2,0,1,1,2,0");
  test.pathEqual(s({z: Math.PI}, 1), "M1.522600,0A1.522600,1.522600,0,1,1,-1.522600,0A1.522600,1.522600,0,1,1,1.522600,0");
  test.pathEqual(s({z: 4 * Math.PI}, 2), "M2.938813,0A2.938813,2.938813,0,1,1,-2.938813,0A2.938813,2.938813,0,1,1,2.938813,0");
  test.end();
});

tape("symbol.size(size) observes the specified size constant", function(test) {
  var s = shape.symbol();
  test.equal(s.size(42).size()(), 42);
  test.pathEqual(s.size(0)(), "M0,0");
  test.pathEqual(s.size(Math.PI)(), "M1,0A1,1,0,1,1,-1,0A1,1,0,1,1,1,0");
  test.pathEqual(s.size(4 * Math.PI)(), "M2,0A2,2,0,1,1,-2,0A2,2,0,1,1,2,0");
  test.end();
});

tape("symbol.type(circle) generates the expected path", function(test) {
  var s = shape.symbol().type(shape.circle).size(function(d) { return d; });
  test.pathEqual(s(0), "M0,0");
  test.pathEqual(s(20), "M2.523133,0A2.523133,2.523133,0,1,1,-2.523133,0A2.523133,2.523133,0,1,1,2.523133,0");
  test.end();
});

tape("symbol.type(cross) generates a polygon with the specified size", function(test) {
  var p = polygonContext(), s = shape.symbol().type(shape.cross).context(p);
  s.size(1)(); test.inDelta(p.area(), 1);
  s.size(240)(); test.inDelta(p.area(), 240);
  test.end();
});

tape("symbol.type(cross) generates the expected path", function(test) {
  var s = shape.symbol().type(shape.cross).size(function(d) { return d; });
  test.pathEqual(s(0), "M0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0Z");
  test.pathEqual(s(20), "M-3,-1L-1,-1L-1,-3L1,-3L1,-1L3,-1L3,1L1,1L1,3L-1,3L-1,1L-3,1Z");
  test.end();
});

tape("symbol.type(diamond) generates a polygon with the specified size", function(test) {
  var p = polygonContext(), s = shape.symbol().type(shape.diamond).context(p);
  s.size(1)(); test.inDelta(p.area(), 1);
  s.size(240)(); test.inDelta(p.area(), 240);
  test.end();
});

tape("symbol.type(diamond) generates the expected path", function(test) {
  var s = shape.symbol().type(shape.diamond).size(function(d) { return d; });
  test.pathEqual(s(0), "M0,0L0,0L0,0L0,0Z");
  test.pathEqual(s(10), "M0,-2.942831L1.699044,0L0,2.942831L-1.699044,0Z");
  test.end();
});

tape("symbol.type(star) generates a polygon with the specified size", function(test) {
  var p = polygonContext(), s = shape.symbol().type(shape.star).context(p);
  s.size(1)(); test.inDelta(p.area(), 1);
  s.size(240)(); test.inDelta(p.area(), 240);
  test.end();
});

tape("symbol.type(star) generates the expected path", function(test) {
  var s = shape.symbol().type(shape.star).size(function(d) { return d; });
  test.pathEqual(s(0), "M0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0Z");
  test.pathEqual(s(10), "M0,-2.984649L0.670095,-0.922307L2.838570,-0.922307L1.084237,0.352290L1.754333,2.414632L0,1.140035L-1.754333,2.414632L-1.084237,0.352290L-2.838570,-0.922307L-0.670095,-0.922307Z");
  test.end();
});

tape("symbol.type(square) generates a polygon with the specified size", function(test) {
  var p = polygonContext(), s = shape.symbol().type(shape.square).context(p);
  s.size(1)(); test.inDelta(p.area(), 1);
  s.size(240)(); test.inDelta(p.area(), 240);
  test.end();
});

tape("symbol.type(square) generates the expected path", function(test) {
  var s = shape.symbol().type(shape.square).size(function(d) { return d; });
  test.pathEqual(s(0), "M0,0h0v0h0Z");
  test.pathEqual(s(4), "M-1,-1h2v2h-2Z");
  test.pathEqual(s(16), "M-2,-2h4v4h-4Z");
  test.end();
});

tape("symbol.type(triangle) generates a polygon with the specified size", function(test) {
  var p = polygonContext(), s = shape.symbol().type(shape.triangle).context(p);
  s.size(1)(); test.inDelta(p.area(), 1);
  s.size(240)(); test.inDelta(p.area(), 240);
  test.end();
});

tape("symbol.type(triangle) generates the expected path", function(test) {
  var s = shape.symbol().type(shape.triangle).size(function(d) { return d; });
  test.pathEqual(s(0), "M0,0L0,0L0,0Z");
  test.pathEqual(s(10), "M0,-2.774528L2.402811,1.387264L-2.402811,1.387264Z");
  test.end();
});

tape("symbol.type(wye) generates a polygon with the specified size", function(test) {
  var p = polygonContext(), s = shape.symbol().type(shape.wye).context(p);
  s.size(1)(); test.inDelta(p.area(), 1);
  s.size(240)(); test.inDelta(p.area(), 240);
  test.end();
});

tape("symbol.type(wye) generates the expected path", function(test) {
  var s = shape.symbol().type(shape.wye).size(function(d) { return d; });
  test.pathEqual(s(0), "M0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0Z");
  test.pathEqual(s(10), "M0.853360,0.492688L0.853360,2.199408L-0.853360,2.199408L-0.853360,0.492688L-2.331423,-0.360672L-1.478063,-1.838735L0,-0.985375L1.478063,-1.838735L2.331423,-0.360672Z");
  test.end();
});
