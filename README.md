# d3-shape

…

## Installing

If you use NPM, `npm install d3-shape`. Otherwise, download the [latest release](https://github.com/d3/d3-shape/releases/latest).

## API Reference

### Arcs

…

<a name="arc" href="#arc">#</a> <b>arc</b>()

…

<a name="_arc" href="#_arc">#</a> <i>arc</i>(…)

…

<a name="arc_centroid" href="#arc_centroid">#</a> <i>arc</i>.<b>centroid</b>(…)

…

Note: to be consistent with [*arc*](#_arc), the arc’s associated accessors must be deterministic.

<a name="arc_innerRadius" href="#arc_innerRadius">#</a> <i>arc</i>.<b>innerRadius</b>([<i>radius</i>])

…

<a name="arc_outerRadius" href="#arc_outerRadius">#</a> <i>arc</i>.<b>outerRadius</b>([<i>radius</i>])

…

<a name="arc_cornerRadius" href="#arc_cornerRadius">#</a> <i>arc</i>.<b>cornerRadius</b>([<i>radius</i>])

…

<a name="arc_padRadius" href="#arc_padRadius">#</a> <i>arc</i>.<b>padRadius</b>([<i>radius</i>])

…

<a name="arc_startAngle" href="#arc_startAngle">#</a> <i>arc</i>.<b>startAngle</b>([<i>angle</i>])

…

<a name="arc_endAngle" href="#arc_endAngle">#</a> <i>arc</i>.<b>endAngle</b>([<i>angle</i>])

…

<a name="arc_padAngle" href="#arc_padAngle">#</a> <i>arc</i>.<b>padAngle</b>([<i>angle</i>])

…

The recommended minimum *innerRadius* when using padding is *outerRadius* \* *padAngle* / sin(θ), where θ is the angle of the smallest arc (without padding). For example, if the *outerRadius* is 200 pixels and the *padAngle* is 0.02 radians, a reasonable θ is 0.04 radians, and a reasonable *innerRadius* is 100 pixels.

See also [*pie*.padAngle](#pie_padAngle).

<a name="arc_context" href="#arc_context">#</a> <i>arc</i>.<b>context</b>([<i>context</i>])

…

### Pies

…

<a name="pie" href="#pie">#</a> <b>pie</b>()

…

<a name="_pie" href="#_pie">#</a> <i>pie</i>(…)

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
