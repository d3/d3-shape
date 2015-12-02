# d3-shape

Visualizations typically consist of discrete graphical marks, such as [symbols](#symbols), [arcs](#arcs), [pies](#pies), [lines](#lines) and [areas](#areas). While the rectangles of a bar chart may be easy enough to generate directly using [SVG](http://www.w3.org/TR/SVG/paths.html#PathData) or [Canvas](http://www.w3.org/TR/2dcontext/#canvaspathmethods), other shapes are complex, such as rounded annular sectors and centripetal Catmull–Rom splines. This module provides a variety of shape generators for your convenience.

As with other aspects of D3, these shapes are driven by data: each shape generator exposes accessors that control how the input data are mapped to a visual representation. For example, you might define a line generator for a time series by [linearly scaling](https://github.com/d3/d3-scale) the `date` and `value` fields of your data to fit the chart:

```js
var l = line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); })
    .curve(shape.catmullRom);
```

The line generator can then be used to set the `d` attribute of an SVG path element:

```js
path.datum(data).attr("d", l);
```

Or you can use it to render to a Canvas 2D context:

```js
l.context(context)(data);
```

## Installing

If you use NPM, `npm install d3-shape`. Otherwise, download the [latest release](https://github.com/d3/d3-shape/releases/latest).

## API Reference

### Arcs

[<img src="https://cloud.githubusercontent.com/assets/230541/11412848/bb915934-9396-11e5-8a87-44ce0ab4a157.png" width="295" height="295">](http://bl.ocks.org/mbostock/3887235)[<img src="https://cloud.githubusercontent.com/assets/230541/11412847/bb89bcec-9396-11e5-85a0-ee4dfa4aa021.png" width="295" height="295">](http://bl.ocks.org/mbostock/3887193)

The arc generator produces a [circular](https://en.wikipedia.org/wiki/Circular_sector) or [annular](https://en.wikipedia.org/wiki/Annulus_\(mathematics\)) sector, as in a pie or donut chart. If the difference between the [start](#arc_startAngle) and [end](#arc_endAngle) angles (the *angular span*) is greater than [τ](https://en.wikipedia.org/wiki/Turn_\(geometry\)#Tau_proposal), the arc generator will produce a complete circle or annulus. If it is less than τ, arcs may have [rounded corners](#arc_cornerRadius) and [angular padding](#arc_padAngle). Arcs are always centered at ⟨0,0⟩; use a transform (see: [SVG](http://www.w3.org/TR/SVG/coords.html#TransformAttribute), [Canvas](http://www.w3.org/TR/2dcontext/#transformations)) to move the arc to a different position.

See also the [pie generator](#pies), which computes the necessary angles to represent an array of data as a pie or donut chart; these angles can then be passed to an arc generator.

<a name="arc" href="#arc">#</a> <b>arc</b>()

Constructs a new arc generator with the default settings.

<a name="_arc" href="#_arc">#</a> <i>arc</i>(<i>arguments…</i>)

Generates an arc for the given *arguments*. The *arguments* are arbitrary; they are simply propagated to the arc generator’s accessor functions along with the `this` object. For example, with the default settings, an object with radii and angles is expected:

```js
var a = arc();

a({
  innerRadius: 0,
  outerRadius: 100,
  startAngle: 0,
  endAngle: Math.PI / 2
}); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
```

If the radii and angles are instead defined as constants, you can generate an arc without any arguments:

```js
var a = arc()
    .innerRadius(0)
    .outerRadius(100)
    .startAngle(0)
    .endAngle(Math.PI / 2);

a(); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
```

If the arc generator has a [context](#arc_context), then the arc is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

<a name="arc_centroid" href="#arc_centroid">#</a> <i>arc</i>.<b>centroid</b>(<i>arguments…</i>)

Computes the midpoint [*x*, *y*] of the center line of the arc that would be [generated](#_arc) by the given *arguments*. The *arguments* are arbitrary; they are simply propagated to the arc generator’s accessor functions along with the `this` object. To be consistent with the generated arc, the accessors must be deterministic, *i.e.*, return the same value given the same arguments. The midpoint is defined as ([startAngle](#arc_startAngle) + [endAngle](#arc_endAngle)) / 2 and ([innerRadius](#arc_innerRadius) + [outerRadius](#arc_outerRadius)) / 2. For example:

<img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/centroid-circular-sector.png" width="250" height="250"><img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/centroid-annular-sector.png" width="250" height="250">

This is **not the geometric center** of the arc, which may be outside the arc; this method is merely a convenience for positioning labels.

<a name="arc_innerRadius" href="#arc_innerRadius">#</a> <i>arc</i>.<b>innerRadius</b>([<i>radius</i>])

If *radius* is specified, sets the inner radius to the specified function or number and returns this arc generator. If *radius* is not specified, returns the current inner radius accessor, which defaults to:

```js
function innerRadius(d) {
  return d.innerRadius;
}
```

Specifying the inner radius as a function is useful for constructing a stacked polar bar chart, often in conjunction with a [sqrt scale](https://github.com/d3/d3-scale#sqrt). More commonly, a constant inner radius is used for a donut or pie chart. If the outer radius is smaller than the inner radius, the inner and outer radii are swapped. A negative value is treated as zero.

<a name="arc_outerRadius" href="#arc_outerRadius">#</a> <i>arc</i>.<b>outerRadius</b>([<i>radius</i>])

If *radius* is specified, sets the outer radius to the specified function or number and returns this arc generator. If *radius* is not specified, returns the current outer radius accessor, which defaults to:

```js
function outerRadius(d) {
  return d.outerRadius;
}
```

Specifying the outer radius as a function is useful for constructing a coxcomb or polar bar chart, often in conjunction with a [sqrt scale](https://github.com/d3/d3-scale#sqrt). More commonly, a constant outer radius is used for a pie or donut chart. If the outer radius is smaller than the inner radius, the inner and outer radii are swapped. A negative value is treated as zero.

<a name="arc_cornerRadius" href="#arc_cornerRadius">#</a> <i>arc</i>.<b>cornerRadius</b>([<i>radius</i>])

If *radius* is specified, sets the corner radius to the specified function or number and returns this arc generator. If *radius* is not specified, returns the current corner radius accessor, which defaults to:

```js
function cornerRadius() {
  return 0;
}
```

If the corner radius is greater than zero, the corners of the arc are rounded using circles of the given radius. For a circular sector, the two outer corners are rounded; for an annular sector, all four corners are rounded. The corner circles are shown in this diagram:

<img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/rounded-circular-sector.png" width="250" height="250"><img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/rounded-annular-sector.png" width="250" height="250">

The corner radius may not be larger than ([outerRadius](#arc_outerRadius) - [innerRadius](#arc_innerRadius)) / 2. In addition, for arcs whose angular span is less than π, the corner radius may be reduced as two adjacent rounded corners intersect. This is occurs more often with the inner corners. See the [arc corners animation](http://bl.ocks.org/mbostock/b7671cb38efdfa5da3af) for illustration.

<a name="arc_startAngle" href="#arc_startAngle">#</a> <i>arc</i>.<b>startAngle</b>([<i>angle</i>])

If *angle* is specified, sets the start angle to the specified function or number and returns this arc generator. If *angle* is not specified, returns the current start angle accessor, which defaults to:

```js
function startAngle(d) {
  return d.startAngle;
}
```

The *angle* is specified in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise. If |endAngle - startAngle| ≥ τ, a complete circle or annulus is generated rather than a sector.

<a name="arc_endAngle" href="#arc_endAngle">#</a> <i>arc</i>.<b>endAngle</b>([<i>angle</i>])

If *angle* is specified, sets the end angle to the specified function or number and returns this arc generator. If *angle* is not specified, returns the current end angle accessor, which defaults to:

```js
function endAngle(d) {
  return d.endAngle;
}
```

The *angle* is specified in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise. If |endAngle - startAngle| ≥ τ, a complete circle or annulus is generated rather than a sector.

<a name="arc_padAngle" href="#arc_padAngle">#</a> <i>arc</i>.<b>padAngle</b>([<i>angle</i>])

If *angle* is specified, sets the pad angle to the specified function or number and returns this arc generator. If *angle* is not specified, returns the current pad angle accessor, which defaults to:

```js
function padAngle() {
  return d && d.padAngle;
}
```

The pad angle is converted to a fixed linear distance separating adjacent arcs, defined as [padRadius](#arc_padRadius) * padAngle. This distance is subtracted equally from the [start](#arc_startAngle) and [end](#arc_endAngle) of the arc. If the arc forms a complete circle or annulus, as when |endAngle - startAngle| ≥ τ, the pad angle is ignored.

If the [inner radius](#arc_innerRadius) or angular span is small relative to the pad angle, it may not be possible to maintain parallel edges between adjacent arcs. In this case, the inner edge of the arc may collapse to a point, similar to a circular sector. For this reason, padding is typically only applied to annular sectors (*i.e.*, when innerRadius is positive), as shown in this diagram:

<img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/padded-circular-sector.png" width="250" height="250"><img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/padded-annular-sector.png" width="250" height="250">

The recommended minimum inner radius when using padding is outerRadius \* padAngle / sin(θ), where θ is the angular span of the smallest arc before padding. For example, if the outer radius is 200 pixels and the pad angle is 0.02 radians, a reasonable θ is 0.04 radians, and a reasonable inner radius is 100 pixels. See the [arc padding animation](http://bl.ocks.org/mbostock/31ec1817b2be2660c453) for illustration.

Often, the pad angle is not set directly on the arc generator, but is instead computed by the [pie generator](#pies) so as to ensure that the area of padded arcs is proportional to their value; see [*pie*.padAngle](#pie_padAngle). If you apply a constant pad angle to the arc generator directly, it tends to subtract disproportionately from smaller arcs, introducing distortion.

<a name="arc_padRadius" href="#arc_padRadius">#</a> <i>arc</i>.<b>padRadius</b>([<i>radius</i>])

If *radius* is specified, sets the pad radius to the specified function or number and returns this arc generator. If *radius* is not specified, returns the current pad radius accessor, which defaults to null, indicating that the pad radius should be automatically computed as sqrt([innerRadius](#arc_innerRadius) * innerRadius + [outerRadius](#arc_outerRadius) * outerRadius). The pad radius determines the fixed linear distance separating adjacent arcs, defined as padRadius * [padAngle](#arc_padAngle).

<a name="arc_context" href="#arc_context">#</a> <i>arc</i>.<b>context</b>([<i>context</i>])

If *context* is specified, sets the context and returns this arc generator. If *context* is not specified, returns the current context, which defaults to null. If the context is not null, then the [generated arc](#_arc) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated arc is returned.

### Pies

The pie generator does not produce a shape directly, but instead computes the necessary angles to represent a tabular dataset as a pie or donut chart; these angles can then be passed to an [arc generator](#arcs).

<a name="pie" href="#pie">#</a> <b>pie</b>()

Constructs a new pie generator with the default settings.

<a name="_pie" href="#_pie">#</a> <i>pie</i>(<i>data</i>[, <i>arguments…</i>])

Generates a pie for the given array of *data*, returning an array of objects representing each datum’s arc angles. Any additional *arguments* are arbitrary; they are simply propagated to the pie generator’s accessor functions along with the `this` object. The length of the returned array is the same as *data*, and each element *i* in the returned array corresponds to the element *i* in the input data. Each object in the returned array has the following properties:

* `data` - the input datum; the corresponding element in the input data array.
* `value` - the numeric [value](#pie_value) of the arc.
* `startAngle` - the [start angle](#pie_startAngle) of the arc.
* `endAngle` - the [end angle](#pie_endAngle) of the arc.
* `padAngle` - the [pad angle](#pie_padAngle) of the arc.

This representation is designed to work with the arc generator’s default [startAngle](#arc_startAngle), [endAngle](#arc_endAngle) and [padAngle](#arc_padAngle) accessors. The angular units are arbitrary, but if you plan to use the pie generator in conjunction with an [arc generator](#arcs), you should specify angles in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise.

Given a small dataset of numbers, here is how to compute the arc angles to render this data as a pie chart:

```js
var data = [1, 1, 2, 3, 5, 8, 13, 21];
var arcs = pie()(data);
```

The first pair of parens, `pie()`, [constructs](#pie) a default pie generator. The second, `pie()(data)`, [invokes](#_pie) this generator on the dataset, returning an array of objects:

```json
[
  {"data":  1, "value":  1, "startAngle": 6.050474740247008, "endAngle": 6.166830023713296, "padAngle": 0},
  {"data":  1, "value":  1, "startAngle": 6.166830023713296, "endAngle": 6.283185307179584, "padAngle": 0},
  {"data":  2, "value":  2, "startAngle": 5.817764173314431, "endAngle": 6.050474740247008, "padAngle": 0},
  {"data":  3, "value":  3, "startAngle": 5.468698322915565, "endAngle": 5.817764173314431, "padAngle": 0},
  {"data":  5, "value":  5, "startAngle": 4.886921905584122, "endAngle": 5.468698322915565, "padAngle": 0},
  {"data":  8, "value":  8, "startAngle": 3.956079637853813, "endAngle": 4.886921905584122, "padAngle": 0},
  {"data": 13, "value": 13, "startAngle": 2.443460952792061, "endAngle": 3.956079637853813, "padAngle": 0},
  {"data": 21, "value": 21, "startAngle": 0.000000000000000, "endAngle": 2.443460952792061, "padAngle": 0}
]
```

Note that the returned array is in the same order as the data, even though this pie chart is [sorted](#pie_sortValues) by descending value, starting with the arc for the last datum (value 21) at 12 o’clock.

<a name="pie_value" href="#pie_value">#</a> <i>pie</i>.<b>value</b>([<i>value</i>])

If *value* is specified, sets the value accessor to the specified function or number and returns this pie generator. If *value* is not specified, returns the current value accessor, which defaults to:

```js
function value(d) {
  return d;
}
```

When a pie is [generated](#_pie), the value accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. The default value accessor assumes that the input data are numbers, or that they are coercible to numbers using [valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf). If your data are not simply numbers, then you should specify an accessor that returns the corresponding numeric value for a given datum. For example:

```js
var data = [
  {"number":  4, "name": Locke},
  {"number":  8, "name": Reyes},
  {"number": 15, "name": Ford},
  {"number": 16, "name": Jarrah},
  {"number": 23, "name": Shephard},
  {"number": 42, "name": Kwon}
];

var arcs = pie()
    .value(function(d) { return d.number; })
    (data);
```

This is similar to [mapping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) your data to values before invoking the pie generator:

```js
var arcs = pie()(data.map(function(d) { return d.number; }));
```

The benefit of an accessor is that the input data remains associated with the returned objects, thereby making it easier to access other fields of the data, for example to set the color or to add text labels.

<a name="pie_sort" href="#pie_sort">#</a> <i>pie</i>.<b>sort</b>([<i>compare</i>])

If *compare* is specified, sets the data comparator to the specified function and returns this pie generator. If *compare* is not specified, returns the current data comparator, which defaults to null. If both the data comparator and the value comparator are null, then arcs are positioned in the original input order. Otherwise, the data is sorted according to the data comparator, and the resulting order is used. Setting the data comparator implicitly sets the [value comparator](#pie_sortValues) to null.

The *compare* function takes two arguments *a* and *b*, each elements from the input data array. If the arc for *a* should be before the arc for *b*, then the comparator must return a number less than zero; if the arc for *a* should be after the arc for *b*, then the comparator must return a number greater than zero; returning zero means that the relative order of *a* and *b* is unspecified. For example, to sort arcs by their associated name:

```js
pie.sort(function(a, b) { return a.name.localeCompare(b.name); });
```

Sorting does not affect the order of the [generated arc array](#_pie) which is always in the same order as the input data array; it merely affects the computed angles of each arc. The first arc starts at the [start angle](#pie_startAngle) and the last arc ends at the [end angle](#pie_endAngle).

<a name="pie_sortValues" href="#pie_sortValues">#</a> <i>pie</i>.<b>sortValues</b>([<i>compare</i>])

If *compare* is specified, sets the value comparator to the specified function and returns this pie generator. If *compare* is not specified, returns the current value comparator, which defaults to descending value. The default value comparator is implemented as:

```js
function compare(a, b) {
  return b - a;
}
```

If both the data comparator and the value comparator are null, then arcs are positioned in the original input order. Otherwise, the data is sorted according to the data comparator, and the resulting order is used. Setting the value comparator implicitly sets the [data comparator](#pie_sort) to null.

The value comparator is similar to the [data comparator](#pie_sort), except the two arguments *a* and *b* are values derived from the input data array using the [value accessor](#pie_value), not the data elements. If the arc for *a* should be before the arc for *b*, then the comparator must return a number less than zero; if the arc for *a* should be after the arc for *b*, then the comparator must return a number greater than zero; returning zero means that the relative order of *a* and *b* is unspecified. For example, to sort arcs by ascending value:

```js
pie.sortValues(function(a, b) { return a - b; });
```

Sorting does not affect the order of the [generated arc array](#_pie) which is always in the same order as the input data array; it merely affects the computed angles of each arc. The first arc starts at the [start angle](#pie_startAngle) and the last arc ends at the [end angle](#pie_endAngle).

<a name="pie_startAngle" href="#pie_startAngle">#</a> <i>pie</i>.<b>startAngle</b>([<i>angle</i>])

If *angle* is specified, sets the overall start angle of the pie to the specified function or number and returns this pie generator. If *angle* is not specified, returns the current start angle accessor, which defaults to:

```js
function startAngle() {
  return 0;
}
```

The start angle here means the *overall* start angle of the pie, *i.e.*, the start angle of the first arc. The start angle accessor is invoked once, being passed the same arguments and `this` context as the [pie generator](#_pie). The units of *angle* are arbitrary, but if you plan to use the pie generator in conjunction with an [arc generator](#arcs), you should specify an angle in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise.

<a name="pie_endAngle" href="#pie_endAngle">#</a> <i>pie</i>.<b>endAngle</b>([<i>angle</i>])

If *angle* is specified, sets the overall end angle of the pie to the specified function or number and returns this pie generator. If *angle* is not specified, returns the current end angle accessor, which defaults to:

```js
function endAngle() {
  return 2 * Math.PI;
}
```

The end angle here means the *overall* end angle of the pie, *i.e.*, the end angle of the last arc. The end angle accessor is invoked once, being passed the same arguments and `this` context as the [pie generator](#_pie). The units of *angle* are arbitrary, but if you plan to use the pie generator in conjunction with an [arc generator](#arcs), you should specify an angle in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise.

The value of the end angle is constrained to [startAngle](#pie_startAngle) ± τ, such that |endAngle - startAngle| ≤ τ.

<a name="pie_padAngle" href="#pie_padAngle">#</a> <i>pie</i>.<b>padAngle</b>([<i>angle</i>])

If *angle* is specified, sets the pad angle to the specified function or number and returns this pie generator. If *angle* is not specified, returns the current pad angle accessor, which defaults to:

```js
function padAngle() {
  return 0;
}
```

The pad angle here means the angular separation between each adjacent arc. The total amount of padding reserved is the specified *angle* times the number of elements in the input data array, and at most |endAngle - startAngle|; the remaining space is then divided proportionally by [value](#pie_value) such that the relative area of each arc is preserved. The pad angle accessor is invoked once, being passed the same arguments and `this` context as the [pie generator](#_pie). The units of *angle* are arbitrary, but if you plan to use the pie generator in conjunction with an [arc generator](#arcs), you should specify an angle in radians.

### Lines

[<img width="295" alt="3883245" src="https://cloud.githubusercontent.com/assets/230541/11463879/5cb30d28-96dd-11e5-98ed-3e8eeaa91b94.png">](http://bl.ocks.org/mbostock/3883245)[<img width="295" alt="3884955" src="https://cloud.githubusercontent.com/assets/230541/11463882/613da6d2-96dd-11e5-8d81-ec3c28b40f99.png">](http://bl.ocks.org/mbostock/3884955)[<img width="295" alt="3969722" src="https://cloud.githubusercontent.com/assets/230541/11463881/6110ff42-96dd-11e5-94b7-75313b28dcbf.png">](http://bl.ocks.org/mbostock/3969722)

The line generator produces a [spline](https://en.wikipedia.org/wiki/Spline_\(mathematics\)) or [polyline](https://en.wikipedia.org/wiki/Polygonal_chain), as in a line chart. Lines also appear in many other visualization types, such as the links in [hierarchical edge bundling](http://bl.ocks.org/mbostock/7607999).

<a name="line" href="#line">#</a> <b>line</b>()

Constructs a new line generator with the default settings.

<a name="_line" href="#_line">#</a> <i>line</i>(<i>data</i>)

Generates a line for the given array of *data*. Depending on this line generator’s associated [curve](#line_curve), the given input *data* may need to be sorted by *x*-value before being passed to the line generator. If the line generator has a [context](#line_context), then the line is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

<a name="line_x" href="#line_x">#</a> <i>line</i>.<b>x</b>([<i>x</i>])

If *x* is specified, sets the x accessor to the specified function or number and returns this line generator. If *x* is not specified, returns the current x accessor, which defaults to:

```js
function x(d) {
  return d[0];
}
```

When a line is [generated](#_line), the x accessor will be invoked for each [defined](#line_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. The default x accessor assumes that the input data are two-element arrays of numbers. If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor. For example, if `x` is a [time scale](https://github.com/d3/d3-scale#time-scales) and `y` is a [linear scale](https://github.com/d3/d3-scale#linear-scales):

```js
var data = [
  {date: new Date(2007, 3, 24), value: 93.24},
  {date: new Date(2007, 3, 25), value: 95.35},
  {date: new Date(2007, 3, 26), value: 98.84},
  {date: new Date(2007, 3, 27), value: 99.92},
  {date: new Date(2007, 3, 30), value: 99.80},
  {date: new Date(2007, 4,  1), value: 99.47},
  …
];

var l = line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });
```

This is similar to [mapping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) your data to values before invoking the line generator:

```js
line()(data.map(function(d) { return [x(d.date), y(d.value)]; }));
```

The benefit of an accessor is that the input data remains associated with the returned objects, thereby making it easier to access other fields of the data, for example to set the color or to add text labels.

<a name="line_y" href="#line_y">#</a> <i>line</i>.<b>y</b>([<i>y</i>])

If *y* is specified, sets the y accessor to the specified function or number and returns this line generator. If *y* is not specified, returns the current y accessor, which defaults to:

```js
function y(d) {
  return d[1];
}
```

When a line is [generated](#_line), the y accessor will be invoked for each [defined](#line_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. The default y accessor assumes that the input data are two-element arrays of numbers. See [*line*.x](#line_x) for more information.

<a name="line_defined" href="#line_defined">#</a> <i>line</i>.<b>defined</b>([<i>defined</i>])

If *defined* is specified, sets the defined accessor to the specified function or boolean and returns this line generator. If *defined* is not specified, returns the current defined accessor, which defaults to:

```js
function defined() {
  return true;
}
```

The default accessor thus assumes that the input data is always defined. When a line is [generated](#_line), the defined accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. If the given element is defined (*i.e.*, if the defined accessor returns a truthy value for this element), the [x](#line_x) and [y](#line_y) accessors will subsequently be evaluated and the point will be added to the current line segment. Otherwise, the element will be skipped, the current line segment will be ended, and a new line segment will be generated for the next defined point. As a result, the generated line may have several discrete segments. For example:

[<img src="https://cloud.githubusercontent.com/assets/230541/11515272/f4f3b4fc-9831-11e5-9530-54adbaa4d896.png" width="480" height="250" alt="Line with Missing Data">](http://bl.ocks.org/mbostock/0533f44f2cfabecc5e3a)

Note that if a line segment consists of only a single point, it may appear invisible unless rendered with rounded or square [line caps](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap). In addition, some curves such as [cardinalOpen](#cardinalOpen) only render a visible segment if it contains multiple points.

<a name="line_curve" href="#line_curve">#</a> <i>line</i>.<b>curve</b>([<i>curve</i>[, <i>parameters…</i>]])

If *curve* is specified, sets the [curve factory](#curves) and returns this line generator. Any optional *parameters*, if specified, will be bound to the specified *curve*. If *curve* is not specified, returns the current curve factory, which defaults to [linear](#linear).

<a name="line_context" href="#line_context">#</a> <i>line</i>.<b>context</b>([<i>context</i>])

If *context* is specified, sets the context and returns this line generator. If *context* is not specified, returns the current context, which defaults to null. If the context is not null, then the [generated line](#_line) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated line is returned.

### Areas

[<img alt="Area Chart" width="295" src="https://cloud.githubusercontent.com/assets/230541/11519082/d7e49088-984b-11e5-974b-2097b59643cc.png">](http://bl.ocks.org/mbostock/3883195)[<img alt="Stacked Area Chart" width="295" src="https://cloud.githubusercontent.com/assets/230541/11519081/d7e3f358-984b-11e5-81e5-2fd75f655f3c.png">](http://bl.ocks.org/mbostock/3885211)[<img alt="Difference Chart" width="295" src="https://cloud.githubusercontent.com/assets/230541/11519080/d7e22406-984b-11e5-95b8-d3323b146ee4.png">](http://bl.ocks.org/mbostock/3894205)

The area generator produces an area, as in an area chart. An area is defined by two bounding [lines](#lines), either splines or polylines. Typically, the two lines share the same [*x*-values](#area_x) ([x0](#area_x0) = [x1](#area_x1)), differing only in *y*-value ([y0](#area_y0) and [y1](#area_y1)); most commonly, y0 is defined as a constant representing [zero](http://www.vox.com/2015/11/19/9758062/y-axis-zero-chart). The first line (the <i>topline</i>) is defined by x1 and y1 and is rendered first; the second line (the <i>baseline</i>) is defined by x0 and y0 and is rendered second, with the points in reverse order. With a [linear](#linear) [curve](#area_curve), this produces a clockwise polygon.

<a name="area" href="#area">#</a> <b>area</b>()

Constructs a new area generator with the default settings.

<a name="_area" href="#_area">#</a> <i>area</i>(<i>data</i>)

Generates an area for the given array of *data*. Depending on this area generator’s associated [curve](#area_curve), the given input *data* may need to be sorted by *x*-value before being passed to the area generator. If the area generator has a [context](#line_context), then the area is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

<a name="area_x" href="#area_x">#</a> <i>area</i>.<b>x</b>([<i>x</i>])

If *x* is specified, sets [x0](#area_x0) to *x* and [x1](#area_x1) to null and returns this area generator. If *x* is not specified, returns the current x0 accessor.

<a name="area_x0" href="#area_x0">#</a> <i>area</i>.<b>x0</b>([<i>x</i>])

If *x* is specified, sets the x0 accessor to the specified function or number and returns this area generator. If *x* is not specified, returns the current x0 accessor, which defaults to:

```js
function x(d) {
  return d[0];
}
```

When an area is [generated](#_area), the x0 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. The default x0 accessor assumes that the input data are two-element arrays of numbers. If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor. For example, if `x` is a [time scale](https://github.com/d3/d3-scale#time-scales) and `y` is a [linear scale](https://github.com/d3/d3-scale#linear-scales):

```js
var data = [
  {date: new Date(2007, 3, 24), value: 93.24},
  {date: new Date(2007, 3, 25), value: 95.35},
  {date: new Date(2007, 3, 26), value: 98.84},
  {date: new Date(2007, 3, 27), value: 99.92},
  {date: new Date(2007, 3, 30), value: 99.80},
  {date: new Date(2007, 4,  1), value: 99.47},
  …
];

var a = area()
    .x(function(d) { return x(d.date); })
    .y1(function(d) { return y(d.value); })
    .y0(y(0));
```

<a name="area_x1" href="#area_x1">#</a> <i>area</i>.<b>x1</b>([<i>x</i>])

If *x* is specified, sets the x1 accessor to the specified function or number and returns this area generator. If *x* is not specified, returns the current x1 accessor, which defaults to null, indicating that the previously-computed [x0](#area_x0) value should be reused for the x1 value.

When an area is [generated](#_area), the x1 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. See [*area*.x0](#area_x0) for more information.

<a name="area_y" href="#area_y">#</a> <i>area</i>.<b>y</b>([<i>y</i>])

If *y* is specified, sets [y0](#area_y0) to *y* and [y1](#area_y1) to null and returns this area generator. If *y* is not specified, returns the current y0 accessor.

<a name="area_y0" href="#area_y0">#</a> <i>area</i>.<b>y0</b>([<i>y</i>])

If *y* is specified, sets the y0 accessor to the specified function or number and returns this area generator. If *y* is not specified, returns the current y0 accessor, which defaults to:

```js
function y() {
  return 0;
}
```

When an area is [generated](#_area), the y0 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. See [*area*.x0](#area_x0) for more information.

<a name="area_y1" href="#area_y1">#</a> <i>area</i>.<b>y1</b>([<i>y</i>])

If *y* is specified, sets the y1 accessor to the specified function or number and returns this area generator. If *y* is not specified, returns the current y1 accessor, which defaults to:

```js
function y(d) {
  return d[1];
}
```

A null accessor is also allowed, indicating that the previously-computed [y0](#area_y0) value should be reused for the y1 value. When an area is [generated](#_area), the y1 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. See [*area*.x0](#area_x0) for more information.

<a name="area_defined" href="#area_defined">#</a> <i>area</i>.<b>defined</b>([<i>defined</i>])

If *defined* is specified, sets the defined accessor to the specified function or boolean and returns this area generator. If *defined* is not specified, returns the current defined accessor, which defaults to:

```js
function defined() {
  return true;
}
```

The default accessor thus assumes that the input data is always defined. When an area is [generated](#_area), the defined accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. If the given element is defined (*i.e.*, if the defined accessor returns a truthy value for this element), the [x0](#area_x0), [x1](#area_x1), [y0](#area_y0) and [y1](#area_y1) accessors will subsequently be evaluated and the point will be added to the current area segment. Otherwise, the element will be skipped, the current area segment will be ended, and a new area segment will be generated for the next defined point. As a result, the generated area may have several discrete segments. For example:

[<img src="https://cloud.githubusercontent.com/assets/230541/11519352/61a6ed50-984e-11e5-9b2c-d3950693fbdd.png" width="480" height="250" alt="Area with Missing Data">](http://bl.ocks.org/mbostock/3035090)

Note that if an area segment consists of only a single point, it may appear invisible unless rendered with rounded or square [line caps](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap). In addition, some curves such as [cardinalOpen](#cardinalOpen) only render a visible segment if it contains multiple points.

<a name="area_curve" href="#area_curve">#</a> <i>area</i>.<b>curve</b>([<i>curve</i>[, <i>parameters…</i>]])

If *curve* is specified, sets the [curve factory](#curves) and returns this area generator. Any optional *parameters*, if specified, will be bound to the specified *curve*. If *curve* is not specified, returns the current curve factory, which defaults to [linear](#linear).

Unlike [*line*.curve](#line_curve), this method **requires** that the curve implement [*curve*.areaStart](#curve_areaStart) and [*curve*.areaEnd](#curve_areaEnd); you cannot use closed curves such as [cardinalClosed](#cardinalClosed) with an area generator. Instead, a closed shape is produced by first rendering the topline and then rendering the baseline.

<a name="area_context" href="#area_context">#</a> <i>area</i>.<b>context</b>([<i>context</i>])

If *context* is specified, sets the context and returns this area generator. If *context* is not specified, returns the current context, which defaults to null. If the context is not null, then the [generated area](#_area) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated area is returned.

### Curves

Curves are typically not used directly, instead implementing paths for [lines](#lines) and [areas](#areas); they are passed to [*line*.curve](#line_curve) and [*area*.curve](#area_curve).

…

<a name="basis" href="#basis">#</a> <b>basis</b>(<i>context</i>)

![basis](https://raw.githubusercontent.com/d3/d3-shape/master/img/basis.png)

…

<a name="basisClosed" href="#basisClosed">#</a> <b>basisClosed</b>(<i>context</i>)

![basisClosed](https://raw.githubusercontent.com/d3/d3-shape/master/img/basisClosed.png)

…

<a name="basisOpen" href="#basisOpen">#</a> <b>basisOpen</b>(<i>context</i>)

![basisOpen](https://raw.githubusercontent.com/d3/d3-shape/master/img/basisOpen.png)

…

<a name="bundle" href="#bundle">#</a> <b>bundle</b>(<i>context</i>[, <i>beta</i>])

![bundle](https://raw.githubusercontent.com/d3/d3-shape/master/img/bundle.png)

…

<a name="cardinal" href="#cardinal">#</a> <b>cardinal</b>(<i>context</i>[, <i>tension</i>])

![cardinal](https://raw.githubusercontent.com/d3/d3-shape/master/img/cardinal.png)

…

<a name="cardinalClosed" href="#cardinalClosed">#</a> <b>cardinalClosed</b>(<i>context</i>[, <i>tension</i>])

![cardinalClosed](https://raw.githubusercontent.com/d3/d3-shape/master/img/cardinalClosed.png)

…

<a name="cardinalOpen" href="#cardinalOpen">#</a> <b>cardinalOpen</b>(<i>context</i>[, <i>tension</i>])

![cardinalOpen](https://raw.githubusercontent.com/d3/d3-shape/master/img/cardinalOpen.png)

…

<a name="catmullRom" href="#catmullRom">#</a> <b>catmullRom</b>(<i>context</i>[, <i>alpha</i>])

![catmullRom](https://raw.githubusercontent.com/d3/d3-shape/master/img/catmullRom.png)

…

<a name="catmullRomClosed" href="#catmullRomClosed">#</a> <b>catmullRomClosed</b>(<i>context</i>[, <i>alpha</i>])

![catmullRomClosed](https://raw.githubusercontent.com/d3/d3-shape/master/img/catmullRomClosed.png)

…

<a name="catmullRomOpen" href="#catmullRomOpen">#</a> <b>catmullRomOpen</b>(<i>context</i>[, <i>alpha</i>])

![catmullRomOpen](https://raw.githubusercontent.com/d3/d3-shape/master/img/catmullRomOpen.png)

…

<a name="linear" href="#linear">#</a> <b>linear</b>(<i>context</i>)

![linear](https://raw.githubusercontent.com/d3/d3-shape/master/img/linear.png)

…

<a name="linearClosed" href="#linearClosed">#</a> <b>linearClosed</b>(<i>context</i>)

![linearClosed](https://raw.githubusercontent.com/d3/d3-shape/master/img/linearClosed.png)

…

<a name="monotone" href="#monotone">#</a> <b>monotone</b>(<i>context</i>)

![monotone](https://raw.githubusercontent.com/d3/d3-shape/master/img/monotone.png)

…

<a name="natural" href="#natural">#</a> <b>natural</b>(<i>context</i>)

![natural](https://raw.githubusercontent.com/d3/d3-shape/master/img/natural.png)

…

<a name="step" href="#step">#</a> <b>step</b>(<i>context</i>)

![step](https://raw.githubusercontent.com/d3/d3-shape/master/img/step.png)

…

<a name="stepAfter" href="#stepAfter">#</a> <b>stepAfter</b>(<i>context</i>)

![stepAfter](https://raw.githubusercontent.com/d3/d3-shape/master/img/stepAfter.png)

…

<a name="stepBefore" href="#stepBefore">#</a> <b>stepBefore</b>(<i>context</i>)

![stepBefore](https://raw.githubusercontent.com/d3/d3-shape/master/img/stepBefore.png)

…

<a name="curve_areaStart" href="#curve_areaStart">#</a> <i>curve</i>.<b>areaStart</b>()

…

Note: not implemented by closed curves, such as <a href="#linearClosed">linearClosed</a>.

<a name="curve_areaEnd" href="#curve_areaEnd">#</a> <i>curve</i>.<b>areaEnd</b>()

…

Note: not implemented by closed curves, such as <a href="#linearClosed">linearClosed</a>.

<a name="curve_lineStart" href="#curve_lineStart">#</a> <i>curve</i>.<b>lineStart</b>()

…

<a name="curve_lineEnd" href="#curve_lineEnd">#</a> <i>curve</i>.<b>lineEnd</b>()

…

<a name="curve_point" href="#curve_point">#</a> <i>curve</i>.<b>point</b>(<i>x</i>, <i>y</i>)

…

### Symbols

…

<a name="symbol" href="#symbol">#</a> <b>symbol</b>()

…

<a name="_symbol" href="#_symbol">#</a> <i>symbol</i>(…)

…

<a name="symbol_type" href="#symbol_type">#</a> <i>symbol</i>.<b>type</b>([<i>type</i>])

…

<a name="symbol_size" href="#symbol_size">#</a> <i>symbol</i>.<b>size</b>([<i>size</i>])

…

<a name="symbol_context" href="#symbol_context">#</a> <i>symbol</i>.<b>context</b>([<i>context</i>])

…

<a name="symbols" href="#symbols">#</a> <b>symbols</b>

An array containing the set of all built-in symbol types: [circle](#circle), [cross](#cross), [diamond](#diamond), [square](#square), [downwards triangle](#triangleDown), and [upwards triangle](#triangleUp). Useful for constructing the range of an [ordinal scale](https://github.com/d3/d3-scale#ordinal-scales) should you wish to use a shape encoding for categorical data.

<a name="circle" href="#circle">#</a> <b>circle</b>

…

<a name="cross" href="#cross">#</a> <b>cross</b>

…

<a name="diamond" href="#diamond">#</a> <b>diamond</b>

…

<a name="square" href="#square">#</a> <b>square</b>

…

<a name="triangleDown" href="#triangleDown">#</a> <b>triangleDown</b>

…

<a name="triangleUp" href="#triangleUp">#</a> <b>triangleUp</b>

…

<a name="symbolType_draw" href="#symbolType_draw">#</a> <i>symbolType</i>.<b>draw</b>(<i>context</i>, <i>size</i>)

Symbol types are typically not used directly, instead implementing paths for [symbols](#symbols); they are passed to [*symbol*.type](#symbol_type).

…

## Changes from D3 3.x:

* You can now render shapes to Canvas by specifying a context (e.g., [*line*.context](#line_context))! See [d3-path](https://github.com/d3/d3-path) for how it works.

* The interpretation of the [cardinal](#cardinal) spline tension parameter has been fixed. The default cardinal tension is now 0 (corresponding to a uniform Catmull–Rom spline), not 0.7. Due to a bug in 3.x, the tension parameter was previously only valid in the range [2/3, 1]; this corresponds to the new corrected range of [0, 1]. Thus, the new default value of 0 is equivalent to the old value of 2/3, and the default behavior is only slightly changed.

* To specify a [cardinal](#cardinal) spline tension of *t*, use `line.curve(cardinal, t)` instead of `line.interpolate("cardinal").tension(t)`.

* To specify a custom line or area interpolator, implement a [curve](#curves).

* Added [natural](#natural) cubic splines.

* Added [Catmull–Rom](#catmullRom) splines, parameterized by alpha. If α = 0, produces a uniform Catmull–Rom spline equivalent to a Cardinal spline with zero tension; if α = 0.5, produces a centripetal spline; if α = 1.0, produces a chordal spline.

* By setting [*area*.x1](#area_x1) or [*area*.y1](#area_y1) to null, you can reuse the [*area*.x0](#area_x0) or [*area*.y0](#area_y0) value, rather than computing it twice. This is useful for nondeterministic values (e.g., jitter).

* Accessor functions now always return functions, even if the value was set to a constant.
