# d3-shape

Visualizations typically consist of many graphical marks, such as [symbols](#symbols), [arcs](#arcs), [pies](#pies), [lines](#lines) and [areas](#areas). While some marks are easy enough to generate using [SVG path data](http://www.w3.org/TR/SVG/paths.html#PathData) or [Canvas path methods](http://www.w3.org/TR/2dcontext/#canvaspathmethods) directly, such as the rectangles of a bar chart, other shapes are complex, such as rounded annular sectors and centripetal Catmull–Rom splines. This module provides a variety of shape generators for your convenience.

As with other aspects of D3, these shapes are driven by data: each shape generator exposes accessors that control how input data is transformed into a visual representation. For example, you might define a line shape by [linearly scaling](https://github.com/d3/d3-scale) the `time` and `value` fields of your data to fit the chart:

```javascript
var x = d3_scale.time()
    .domain([new Date(2015, 0, 1), new Date(2016, 0, 1)])
    .range([0, width]);

var y = d3_scale.linear()
    .domain([0, 100])
    .range([height, 0]);

var l = d3_shape.line()
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.value); })
    .curve(shape.catmullRom, 0.5);
```

The line shape can then be used to create an SVG path element:

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

[<img src="https://cloud.githubusercontent.com/assets/230541/11412848/bb915934-9396-11e5-8a87-44ce0ab4a157.png" width="250" height="250">](http://bl.ocks.org/mbostock/3887235)[<img src="https://cloud.githubusercontent.com/assets/230541/11412847/bb89bcec-9396-11e5-85a0-ee4dfa4aa021.png" width="250" height="250">](http://bl.ocks.org/mbostock/3887193)[<img src="https://cloud.githubusercontent.com/assets/230541/11412846/bb760f4e-9396-11e5-8252-1b8f74bc09f9.png" width="250" height="250">](http://bl.ocks.org/mbostock/aff9e559c5c9968b7ac6)

The arc shape generates a [circular](https://en.wikipedia.org/wiki/Circular_sector) or [annular](https://en.wikipedia.org/wiki/Annulus_\(mathematics\)) sector for the given datum, as is common in pie or donut charts. (If the difference between the [start](#arc_startAngle) and [end](#arc_endAngle) angles is greater than τ, the arc shape will generate a complete circle or annulus.) Arcs may be optionally have [rounded corners](#arc_cornerRadius) and [angular padding](#arc_padAngle).

See also the [pie shape](#pies), which computes the appropriate angles to represent an array of data as a pie or donut chart; these angles are then passed to the arc shape.

<a name="arc" href="#arc">#</a> <b>arc</b>()

Constructs a new arc generator with the default settings.

<a name="_arc" href="#_arc">#</a> <i>arc</i>(<i>arguments…</i>)

Generates an arc for the given *arguments*. The *arguments* are arbitrary; they are simply propagated to the associated accessor functions along with the `this` object. If there is a [context](#arc_context), then the arc is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns undefined. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated arc is returned.

<a name="arc_centroid" href="#arc_centroid">#</a> <i>arc</i>.<b>centroid</b>(<i>arguments…</i>)

Computes the midpoint of the center line of the arc that would be [generated](#_arc) by the given *arguments*. The *arguments* are arbitrary; they are simply propagated to the associated accessor functions along with the `this` object. To be consistent, the accessors must be deterministic (*i.e.*, return the same value given the same arguments). The midpoint is defined as ([startAngle](#arc_startAngle) + [endAngle](#arc_endAngle)) / 2 and ([innerRadius](#arc_innerRadius) + [outerRadius](#arc_outerRadius)) / 2. This is **not the true geometric center** of the arc, which may be outside the arc; this method is intended as a convenience for positioning a text label.

<a name="arc_innerRadius" href="#arc_innerRadius">#</a> <i>arc</i>.<b>innerRadius</b>([<i>radius</i>])

If *radius* is specified, sets the inner radius to the specified function or constant. If *radius* is not specified, returns the current inner radius accessor, which defaults to:

```js
function innerRadius(d) {
  return d.innerRadius;
}
```

Specifying the inner radius as a function is useful for constructing a stacked polar bar chart, particularly in conjunction with a [sqrt scale](https://github.com/d3/d3-scale#sqrt). More commonly, a constant inner radius is used for a donut chart, or a constant zero for a pie chart. If the outer radius is smaller than the inner radius, the inner and outer radii are swapped.

<a name="arc_outerRadius" href="#arc_outerRadius">#</a> <i>arc</i>.<b>outerRadius</b>([<i>radius</i>])

If *radius* is specified, sets the outer radius to the specified function or constant. If *radius* is not specified, returns the current outer radius accessor, which defaults to:

```js
function outerRadius(d) {
  return d.outerRadius;
}
```

Specifying the outer radius as a function is useful for constructing a coxcomb or polar bar chart, particularly in conjunction with a [sqrt scale](https://github.com/d3/d3-scale#sqrt). More commonly, a constant outer radius is used for a pie or donut chart. If the outer radius is smaller than the inner radius, the inner and outer radii are swapped.

<a name="arc_cornerRadius" href="#arc_cornerRadius">#</a> <i>arc</i>.<b>cornerRadius</b>([<i>radius</i>])

If *radius* is specified, sets the corner radius to the specified function or constant. If *radius* is not specified, returns the current corner radius accessor, which defaults to:

```js
function cornerRadius() {
  return 0;
}
```

The corner radius may not be larger than ([outerRadius](#arc_outerRadius) - [innerRadius](#arc_innerRadius)) / 2. In addition, for arcs whose angular span is less than π, the corner radius may be reduced as two adjacent rounded corners intersect. See the [arc corners animation](http://bl.ocks.org/mbostock/b7671cb38efdfa5da3af) for a visual demonstration.

<a name="arc_startAngle" href="#arc_startAngle">#</a> <i>arc</i>.<b>startAngle</b>([<i>angle</i>])

…

<a name="arc_endAngle" href="#arc_endAngle">#</a> <i>arc</i>.<b>endAngle</b>([<i>angle</i>])

…

<a name="arc_padAngle" href="#arc_padAngle">#</a> <i>arc</i>.<b>padAngle</b>([<i>angle</i>])

If *angle* is specified, sets the pad angle to the specified function or constant. If *angle* is not specified, returns the current pad angle accessor, which defaults to:

```js
function padAngle() {
  return d && d.padAngle;
}
```

If the [innerRadius](#arc_innerRadius) or angular span is small relative to the pad angle, it may not be possible to maintain parallel edges between adjacent arcs. In this case, the inner edge of the arc may collapse to a point, similar to a circular sector. The recommended minimum innerRadius when using padding is outerRadius \* padAngle / sin(θ), where θ is the angular span of the smallest arc before padding. For example, if the outerRadius is 200 pixels and the padAngle is 0.02 radians, a reasonable θ is 0.04 radians, and a reasonable innerRadius is 100 pixels. See the [arc padding animation](http://bl.ocks.org/mbostock/31ec1817b2be2660c453) for a visual demonstration.

Often, the pad angle is not set directly on the arc shape, but is instead computed by the [pie shape](#pies) so as to ensure that the relative area of padded arcs is preserved; see [*pie*.padAngle](#pie_padAngle).

<a name="arc_padRadius" href="#arc_padRadius">#</a> <i>arc</i>.<b>padRadius</b>([<i>radius</i>])

If *radius* is specified, sets the pad radius to the specified function or constant. If *radius* is not specified, returns the current pad radius accessor, which defaults to `null`, indicating that the pad radius should be automatically computed as sqrt([innerRadius](#arc_innerRadius) * innerRadius + [outerRadius](#arc_outerRadius) * outerRadius). The pad radius affects the fixed linear distance separating adjacent arcs, defined as padRadius * [padAngle](#arc_padAngle).

<a name="arc_context" href="#arc_context">#</a> <i>arc</i>.<b>context</b>([<i>context</i>])

…

### Pies

…

<a name="pie" href="#pie">#</a> <b>pie</b>()

…

<a name="_pie" href="#_pie">#</a> <i>pie</i>(<i>data</i>)

…

<a name="pie_value" href="#pie_value">#</a> <i>pie</i>.<b>value</b>([<i>value</i>])

…

<a name="pie_sort" href="#pie_sort">#</a> <i>pie</i>.<b>sort</b>([<i>compare</i>])

…

<a name="pie_sortValues" href="#pie_sortValues">#</a> <i>pie</i>.<b>sortValues</b>([<i>compare</i>])

…

<a name="pie_startAngle" href="#pie_startAngle">#</a> <i>pie</i>.<b>startAngle</b>([<i>angle</i>])

…

<a name="pie_endAngle" href="#pie_endAngle">#</a> <i>pie</i>.<b>endAngle</b>([<i>angle</i>])

…

<a name="pie_padAngle" href="#pie_padAngle">#</a> <i>pie</i>.<b>padAngle</b>([<i>angle</i>])

…

### Lines

…

<a name="line" href="#line">#</a> <b>line</b>()

…

<a name="_line" href="#_line">#</a> <i>line</i>(<i>data</i>)

…

<a name="line_x" href="#line_x">#</a> <i>line</i>.<b>x</b>([<i>x</i>])

…

<a name="line_y" href="#line_y">#</a> <i>line</i>.<b>y</b>([<i>y</i>])

…

<a name="line_defined" href="#line_defined">#</a> <i>line</i>.<b>defined</b>([<i>defined</i>])

…

<a name="line_curve" href="#line_curve">#</a> <i>line</i>.<b>curve</b>([<i>curve</i>[, <i>parameters…</i>]])

…

<a name="line_context" href="#line_context">#</a> <i>line</i>.<b>context</b>([<i>context</i>])

…

### Areas

…

<a name="area" href="#area">#</a> <b>area</b>()

…

<a name="_area" href="#_area">#</a> <i>area</i>(<i>data</i>)

…

<a name="area_x" href="#area_x">#</a> <i>area</i>.<b>x</b>([<i>x</i>])

…

<a name="area_x0" href="#area_x0">#</a> <i>area</i>.<b>x0</b>([<i>x0</i>])

…

<a name="area_x1" href="#area_x1">#</a> <i>area</i>.<b>x1</b>([<i>x1</i>])

…

<a name="area_y" href="#area_y">#</a> <i>area</i>.<b>y</b>([<i>y</i>])

…

<a name="area_y0" href="#area_y0">#</a> <i>area</i>.<b>y0</b>([<i>y0</i>])

…

<a name="area_y1" href="#area_y1">#</a> <i>area</i>.<b>y1</b>([<i>y1</i>])

…

<a name="area_defined" href="#area_defined">#</a> <i>area</i>.<b>defined</b>([<i>defined</i>])

…

<a name="area_curve" href="#area_curve">#</a> <i>area</i>.<b>curve</b>([<i>curve</i>[, <i>parameters…</i>]])

…

<a name="area_context" href="#area_context">#</a> <i>area</i>.<b>context</b>([<i>context</i>])

…

### Curves

Curves are typically not used directly, instead implementing paths for [lines](#lines) and [areas](#areas); they are passed to [*line*.curve](#line_curve) and [*area*.curve](#area_curve).

…

<a name="basis" href="#basis">#</a> <b>basis</b>(<i>context</i>)

…

<a name="basisClosed" href="#basisClosed">#</a> <b>basisClosed</b>(<i>context</i>)

…

<a name="basisOpen" href="#basisOpen">#</a> <b>basisOpen</b>(<i>context</i>)

…

<a name="bundle" href="#bundle">#</a> <b>bundle</b>(<i>context</i>[, <i>beta</i>])

…

<a name="cardinal" href="#cardinal">#</a> <b>cardinal</b>(<i>context</i>[, <i>tension</i>])

…

<a name="cardinalClosed" href="#cardinalClosed">#</a> <b>cardinalClosed</b>(<i>context</i>[, <i>tension</i>])

…

<a name="cardinalOpen" href="#cardinalOpen">#</a> <b>cardinalOpen</b>(<i>context</i>[, <i>tension</i>])

…

<a name="catmullRom" href="#catmullRom">#</a> <b>catmullRom</b>(<i>context</i>[, <i>alpha</i>])

…

<a name="catmullRomClosed" href="#catmullRomClosed">#</a> <b>catmullRomClosed</b>(<i>context</i>[, <i>alpha</i>])

…

<a name="catmullRomOpen" href="#catmullRomOpen">#</a> <b>catmullRomOpen</b>(<i>context</i>[, <i>alpha</i>])

…

<a name="linear" href="#linear">#</a> <b>linear</b>(<i>context</i>)

…

<a name="linearClosed" href="#linearClosed">#</a> <b>linearClosed</b>(<i>context</i>)

…

<a name="natural" href="#natural">#</a> <b>natural</b>(<i>context</i>)

…

<a name="step" href="#step">#</a> <b>step</b>(<i>context</i>)

…

<a name="stepAfter" href="#stepAfter">#</a> <b>stepAfter</b>(<i>context</i>)

…

<a name="stepBefore" href="#stepBefore">#</a> <b>stepBefore</b>(<i>context</i>)

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

### Symbol Types

Symbol types are typically not used directly, instead implementing paths for [symbols](#symbols); they are passed to [*symbol*.type](#symbol_type).

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

…

## Changes from D3 3.x:

* You can now render shapes to Canvas by specifying a context (e.g., [*line*.context](#line_context))! See [d3-path](https://github.com/d3/d3-path) for how it works.

* The interpretation of the [cardinal](#cardinal) spline tension parameter has been fixed. The default tension is now 0 (corresponding to a uniform Catmull–Rom spline), not 0.7. Due to a bug in 3.x, the tension parameter was previously only valid in the range [2/3, 1]; this corresponds to the new corrected range of [0, 1]. Thus, the new default value of 0 is equivalent to the old value of 2/3, and the default behavior is only slightly changed.

* To specify a [cardinal](#cardinal) spline tension of *t*, use `line.curve(cardinal, t)` instead of `line.interpolate("cardinal").tension(t)`.

* To specify a custom line or area interpolator, implement a [curve](#curves).

* Added [natural](#natural) cubic splines.

* Added [Catmull–Rom](#catmullRom) splines, parameterized by alpha. If α = 0, produces a uniform Catmull–Rom spline equivalent to a Cardinal spline with zero tension; if α = 0.5, produces a centripetal spline; if α = 1.0, produces a chordal spline.

* By setting [*area*.x1](#area_x1) or [*area*.y1](#area_y1) to null, you can reuse the [*area*.x0](#area_x0) or [*area*.y0](#area_y0) value, rather than computing it twice. This is useful for nondeterministic values (e.g., jitter).

* Accessor functions now always return functions, even if the value was set to a constant.
