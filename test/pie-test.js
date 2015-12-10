var tape = require("tape"),
    shape = require("../");

tape("pie() returns a default pie shape", function(test) {
  var p = shape.pie();
  test.equal(p.value()(42), 42);
  test.ok(p.sortValues()(1, 2) > 0);
  test.ok(p.sortValues()(2, 1) < 0);
  test.equal(p.sortValues()(1, 1), 0);
  test.equal(p.sort(), null);
  test.equal(p.startAngle()(), 0);
  test.equal(p.endAngle()(), 2 * Math.PI);
  test.equal(p.padAngle()(), 0);
  test.end();
});

tape("pie(data) returns arcs in input order", function(test) {
  var p = shape.pie();
  test.deepEqual(p([1, 3, 2]), [
    {data: 1, value: 1, index: 2, startAngle: 5.235987755982988, endAngle: 6.283185307179585, padAngle: 0},
    {data: 3, value: 3, index: 0, startAngle: 0.000000000000000, endAngle: 3.141592653589793, padAngle: 0},
    {data: 2, value: 2, index: 1, startAngle: 3.141592653589793, endAngle: 5.235987755982988, padAngle: 0}
  ]);
  test.end();
});

tape("pie(data) coerces the specified value to a number", function(test) {
  var p = shape.pie(), three = {valueOf: function() { return 3; }};
  test.deepEqual(p(["1", three, "2"]), [
    {data:   "1", value: 1, index: 2, startAngle: 5.235987755982988, endAngle: 6.283185307179585, padAngle: 0},
    {data: three, value: 3, index: 0, startAngle: 0.000000000000000, endAngle: 3.141592653589793, padAngle: 0},
    {data:   "2", value: 2, index: 1, startAngle: 3.141592653589793, endAngle: 5.235987755982988, padAngle: 0}
  ]);
  test.end();
});

tape("pie(data) treats negative values as zero", function(test) {
  var p = shape.pie();
  test.deepEqual(p([1, 0, -1]), [
    {data:  1, value:  1, index: 0, startAngle: 0.000000000000000, endAngle: 6.283185307179586, padAngle: 0},
    {data:  0, value:  0, index: 1, startAngle: 6.283185307179586, endAngle: 6.283185307179586, padAngle: 0},
    {data: -1, value: -1, index: 2, startAngle: 6.283185307179586, endAngle: 6.283185307179586, padAngle: 0}
  ]);
  test.end();
});

tape("pie(data) treats NaN values as zero", function(test) {
  var p = shape.pie(),
      actual = p([1, NaN, undefined]),
      expected = [
        {data:         1, value:   1, index: 0, startAngle: 0.000000000000000, endAngle: 6.283185307179586, padAngle: 0},
        {data:       NaN, value: NaN, index: 1, startAngle: 6.283185307179586, endAngle: 6.283185307179586, padAngle: 0},
        {data: undefined, value: NaN, index: 2, startAngle: 6.283185307179586, endAngle: 6.283185307179586, padAngle: 0}
      ];
  test.ok(isNaN(actual[1].data));
  test.ok(isNaN(actual[1].value));
  test.ok(isNaN(actual[2].value));
  actual[1].data = actual[1].value = actual[2].value =
  expected[1].data = expected[1].value = expected[2].value = {}; // deepEqual NaN
  test.deepEqual(actual, expected);
  test.end();
});

tape("pie(data) puts everything at the startAngle when the sum is zero", function(test) {
  var p = shape.pie();
  test.deepEqual(p([0, 0]), [
    {data: 0, value: 0, index: 0, startAngle: 0, endAngle: 0, padAngle: 0},
    {data: 0, value: 0, index: 1, startAngle: 0, endAngle: 0, padAngle: 0}
  ]);
  test.deepEqual(p.startAngle(1)([0, 0]), [
    {data: 0, value: 0, index: 0, startAngle: 1, endAngle: 1, padAngle: 0},
    {data: 0, value: 0, index: 1, startAngle: 1, endAngle: 1, padAngle: 0}
  ]);
  test.end();
});

tape("pie(data) restricts |endAngle - startAngle| to τ", function(test) {
  var p = shape.pie();
  test.deepEqual(p.startAngle(0).endAngle(7)([1, 2]), [
    {data: 1, value: 1, index: 1, startAngle: 4.1887902047863905, endAngle: 6.2831853071795860, padAngle: 0},
    {data: 2, value: 2, index: 0, startAngle: 0.0000000000000000, endAngle: 4.1887902047863905, padAngle: 0}
  ]);
  test.deepEqual(p.startAngle(7).endAngle(0)([1, 2]), [
    {data: 1, value: 1, index: 1, startAngle: 2.8112097952136095, endAngle: 0.7168146928204142, padAngle: 0},
    {data: 2, value: 2, index: 0, startAngle: 7.0000000000000000, endAngle: 2.8112097952136095, padAngle: 0}
  ]);
  test.deepEqual(p.startAngle(1).endAngle(8)([1, 2]), [
    {data: 1, value: 1, index: 1, startAngle: 5.1887902047863905, endAngle: 7.2831853071795860, padAngle: 0},
    {data: 2, value: 2, index: 0, startAngle: 1.0000000000000000, endAngle: 5.1887902047863905, padAngle: 0}
  ]);
  test.deepEqual(p.startAngle(8).endAngle(1)([1, 2]), [
    {data: 1, value: 1, index: 1, startAngle: 3.8112097952136095, endAngle: 1.7168146928204142, padAngle: 0},
    {data: 2, value: 2, index: 0, startAngle: 8.0000000000000000, endAngle: 3.8112097952136095, padAngle: 0}
  ]);
  test.end();
});

tape("pie.value(value)(data) observes the specified value function", function(test) {
  test.deepEqual(shape.pie().value(function(d, i) { return i; })(new Array(3)), [
    {data: undefined, value: 0, index: 2, startAngle: 6.2831853071795860, endAngle: 6.2831853071795860, padAngle: 0},
    {data: undefined, value: 1, index: 1, startAngle: 4.1887902047863905, endAngle: 6.2831853071795860, padAngle: 0},
    {data: undefined, value: 2, index: 0, startAngle: 0.0000000000000000, endAngle: 4.1887902047863905, padAngle: 0}
  ]);
  test.end();
});

tape("pie.value(f)(data) passes d, i and data to the specified function f", function(test) {
  var data = ["a", "b"], actual = [];
  shape.pie().value(function() { actual.push([].slice.call(arguments)); })(data);
  test.deepEqual(actual, [["a", 0, data], ["b", 1, data]]);
  test.end();
});

tape("pie().startAngle(f)(…) propagates the context and arguments to the specified function f", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.pie().startAngle(function() { actual = {that: this, args: [].slice.call(arguments)}; }).apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("pie().startAngle(θ)(data) observes the specified start angle", function(test) {
  test.deepEqual(shape.pie().startAngle(Math.PI)([1, 2, 3]), [
    {data: 1, value: 1, index: 2, startAngle: 5.759586531581287, endAngle: 6.283185307179586, padAngle: 0},
    {data: 2, value: 2, index: 1, startAngle: 4.712388980384690, endAngle: 5.759586531581287, padAngle: 0},
    {data: 3, value: 3, index: 0, startAngle: 3.141592653589793, endAngle: 4.712388980384690, padAngle: 0}
  ]);
  test.end();
});

tape("pie().endAngle(θ)(data) observes the specified end angle", function(test) {
  test.deepEqual(shape.pie().endAngle(Math.PI)([1, 2, 3]), [
    {data: 1, value: 1, index: 2, startAngle: 2.6179938779914940, endAngle: 3.1415926535897927, padAngle: 0},
    {data: 2, value: 2, index: 1, startAngle: 1.5707963267948966, endAngle: 2.6179938779914940, padAngle: 0},
    {data: 3, value: 3, index: 0, startAngle: 0.0000000000000000, endAngle: 1.5707963267948966, padAngle: 0}
  ]);
  test.end();
});

tape("pie().padAngle(δ)(data) observes the specified pad angle", function(test) {
  test.deepEqual(shape.pie().padAngle(0.1)([1, 2, 3]), [
    {data: 1, value: 1, index: 2, startAngle: 5.1859877559829880, endAngle: 6.2831853071795850, padAngle: 0.1},
    {data: 2, value: 2, index: 1, startAngle: 3.0915926535897933, endAngle: 5.1859877559829880, padAngle: 0.1},
    {data: 3, value: 3, index: 0, startAngle: 0.0000000000000000, endAngle: 3.0915926535897933, padAngle: 0.1}
  ]);
  test.end();
});

tape("pie().endAngle(f)(…) propagates the context and arguments to the specified function f", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.pie().endAngle(function() { actual = {that: this, args: [].slice.call(arguments)}; }).apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("pie().padAngle(f)(…) propagates the context and arguments to the specified function f", function(test) {
  var expected = {that: {}, args: [42]}, actual;
  shape.pie().padAngle(function() { actual = {that: this, args: [].slice.call(arguments)}; }).apply(expected.that, expected.args);
  test.deepEqual(actual, expected);
  test.end();
});

tape("pie().startAngle(θ₀).endAngle(θ₁).padAngle(δ)(data) restricts the pad angle to |θ₁ - θ₀| / data.length", function(test) {
  test.deepEqual(shape.pie().startAngle(0).endAngle(Math.PI).padAngle(Infinity)([1, 2, 3]), [
    {data: 1, value: 1, index: 2, startAngle:  2.0943951023931953, endAngle:  3.1415926535897930, padAngle: 1.0471975511965976},
    {data: 2, value: 2, index: 1, startAngle:  1.0471975511965976, endAngle:  2.0943951023931953, padAngle: 1.0471975511965976},
    {data: 3, value: 3, index: 0, startAngle:  0.0000000000000000, endAngle:  1.0471975511965976, padAngle: 1.0471975511965976}
  ]);
  test.deepEqual(shape.pie().startAngle(0).endAngle(-Math.PI).padAngle(Infinity)([1, 2, 3]), [
    {data: 1, value: 1, index: 2, startAngle: -2.0943951023931953, endAngle: -3.1415926535897930, padAngle: 1.0471975511965976},
    {data: 2, value: 2, index: 1, startAngle: -1.0471975511965976, endAngle: -2.0943951023931953, padAngle: 1.0471975511965976},
    {data: 3, value: 3, index: 0, startAngle: -0.0000000000000000, endAngle: -1.0471975511965976, padAngle: 1.0471975511965976}
  ]);
  test.end();
});

tape("pie.sortValues(f) sorts arcs by value per the specified comparator function f", function(test) {
  var p = shape.pie();
  test.deepEqual(p.sortValues(function(a, b) { return a - b; })([1, 3, 2]), [
    {data: 1, value: 1, index: 0, startAngle: 0.0000000000000000, endAngle: 1.0471975511965976, padAngle: 0},
    {data: 3, value: 3, index: 2, startAngle: 3.1415926535897930, endAngle: 6.2831853071795860, padAngle: 0},
    {data: 2, value: 2, index: 1, startAngle: 1.0471975511965976, endAngle: 3.1415926535897930, padAngle: 0}
  ]);
  test.deepEqual(p.sortValues(function(a, b) { return b - a; })([1, 3, 2]), [
    {data: 1, value: 1, index: 2, startAngle: 5.2359877559829880, endAngle: 6.2831853071795850, padAngle: 0},
    {data: 3, value: 3, index: 0, startAngle: 0.0000000000000000, endAngle: 3.1415926535897930, padAngle: 0},
    {data: 2, value: 2, index: 1, startAngle: 3.1415926535897930, endAngle: 5.2359877559829880, padAngle: 0}
  ]);
  test.equal(p.sort(), null);
  test.end();
});

tape("pie.sort(f) sorts arcs by data per the specified comparator function f", function(test) {
  var a = {valueOf: function() { return 1; }, name: "a"},
      b = {valueOf: function() { return 2; }, name: "b"},
      c = {valueOf: function() { return 3; }, name: "c"},
      p = shape.pie();
  test.deepEqual(p.sort(function(a, b) { return a.name.localeCompare(b.name); })([a, c, b]), [
    {data: a, value: 1, index: 0, startAngle: 0.0000000000000000, endAngle: 1.0471975511965976, padAngle: 0},
    {data: c, value: 3, index: 2, startAngle: 3.1415926535897930, endAngle: 6.2831853071795860, padAngle: 0},
    {data: b, value: 2, index: 1, startAngle: 1.0471975511965976, endAngle: 3.1415926535897930, padAngle: 0}
  ]);
  test.deepEqual(p.sort(function(a, b) { return b.name.localeCompare(a.name); })([a, c, b]), [
    {data: a, value: 1, index: 2, startAngle: 5.2359877559829880, endAngle: 6.2831853071795850, padAngle: 0},
    {data: c, value: 3, index: 0, startAngle: 0.0000000000000000, endAngle: 3.1415926535897930, padAngle: 0},
    {data: b, value: 2, index: 1, startAngle: 3.1415926535897930, endAngle: 5.2359877559829880, padAngle: 0}
  ]);
  test.equal(p.sortValues(), null);
  test.end();
});
