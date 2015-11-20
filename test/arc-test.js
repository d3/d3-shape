var tape = require("tape"),
    shape = require("../");

require("./pathEqual");

tape("arc() can render a point", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 0, startAngle: 0, endAngle: 2 * Math.PI}), "M0,0Z");
  test.end();
});

tape("arc() can render a clockwise circle", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: 2 * Math.PI}), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100L0,0Z");
  test.end();
});

tape("arc() can render an anticlockwise circle", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: -2 * Math.PI}), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100L0,0Z");
  test.end();
});

tape("arc() can render a clockwise annulus", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: 2 * Math.PI}), "M0,-100A100,100,0,1,1,0,100A100,100,0,1,1,0,-100M0,-50A50,50,0,1,0,0,50A50,50,0,1,0,0,-50Z");
  test.end();
});

tape("arc() can render an anticlockwise annulus", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: -2 * Math.PI}), "M0,-100A100,100,0,1,0,0,100A100,100,0,1,0,0,-100M0,-50A50,50,0,1,1,0,50A50,50,0,1,1,0,-50Z");
  test.end();
});

tape("arc() can render a small clockwise sector", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: Math.PI / 2}), "M0,-100A100,100,0,0,1,100,0L0,0Z");
  test.end();
});

tape("arc() can render a small anticlockwise sector", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: -Math.PI / 2}), "M0,-100A100,100,0,0,0,-100,0L0,0Z");
  test.end();
});

tape("arc() can render a large clockwise sector", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: 3 * Math.PI / 2}), "M0,-100A100,100,0,1,1,-100,0L0,0Z");
  test.end();
});

tape("arc() can render a large anticlockwise sector", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 0, outerRadius: 100, startAngle: 0, endAngle: -3 * Math.PI / 2}), "M0,-100A100,100,0,1,0,100,0L0,0Z");
  test.end();
});

tape("arc() can render a small clockwise annular sector", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: Math.PI / 2}), "M0,-100A100,100,0,0,1,100,0L50,0A50,50,0,0,0,0,-50Z");
  test.end();
});

tape("arc() can render a small anticlockwise annular sector", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: -Math.PI / 2}), "M0,-100A100,100,0,0,0,-100,0L-50,0A50,50,0,0,1,0,-50Z");
  test.end();
});

tape("arc() can render a large clockwise annular sector", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: 3 * Math.PI / 2}), "M0,-100A100,100,0,1,1,-100,0L-50,0A50,50,0,1,0,0,-50Z");
  test.end();
});

tape("arc() can render a large anticlockwise annular sector", function(test) {
  var a = shape.arc();
  test.pathEqual(a({innerRadius: 50, outerRadius: 100, startAngle: 0, endAngle: -3 * Math.PI / 2}), "M0,-100A100,100,0,1,0,100,0L50,0A50,50,0,1,1,0,-50Z");
  test.end();
});
