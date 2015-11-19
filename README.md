# d3-shape

…

## Installing

If you use NPM, `npm install d3-shape`. Otherwise, download the [latest release](https://github.com/d3/d3-shape/releases/latest).

## API Reference

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

Curves are typically not used directly, instead implementing paths for [lines](#lines) and [areas](#areas). See [*line*.curve](#line_curve) and [*area*.curve](#area_curve).

…

<a name="curveBasis" href="#curveBasis">#</a> <b>curveBasis</b>(<i>context</i>)

…

<a name="curveBasisClosed" href="#curveBasisClosed">#</a> <b>curveBasisClosed</b>(<i>context</i>)

…

<a name="curveBasisOpen" href="#curveBasisOpen">#</a> <b>curveBasisOpen</b>(<i>context</i>)

…

<a name="curveBundle" href="#curveBundle">#</a> <b>curveBundle</b>(<i>context</i>[, <i>beta</i>])

…

<a name="curveCardinal" href="#curveCardinal">#</a> <b>curveCardinal</b>(<i>context</i>[, <i>tension</i>])

…

<a name="curveCardinalClosed" href="#curveCardinalClosed">#</a> <b>curveCardinalClosed</b>(<i>context</i>[, <i>tension</i>])

…

<a name="curveCardinalOpen" href="#curveCardinalOpen">#</a> <b>curveCardinalOpen</b>(<i>context</i>[, <i>tension</i>])

…

<a name="curveCatmullRom" href="#curveCatmullRom">#</a> <b>curveCatmullRom</b>(<i>context</i>[, <i>alpha</i>])

…

<a name="curveCatmullRomClosed" href="#curveCatmullRomClosed">#</a> <b>curveCatmullRomClosed</b>(<i>context</i>[, <i>alpha</i>])

…

<a name="curveCatmullRomOpen" href="#curveCatmullRomOpen">#</a> <b>curveCatmullRomOpen</b>(<i>context</i>[, <i>alpha</i>])

…

<a name="curveLinear" href="#curveLinear">#</a> <b>curveLinear</b>(<i>context</i>)

…

<a name="curveLinearClosed" href="#curveLinearClosed">#</a> <b>curveLinearClosed</b>(<i>context</i>)

…

<a name="curveNatural" href="#curveNatural">#</a> <b>curveNatural</b>(<i>context</i>)

…

<a name="curveStep" href="#curveStep">#</a> <b>curveStep</b>(<i>context</i>)

…

<a name="curveStepAfter" href="#curveStepAfter">#</a> <b>curveStepAfter</b>(<i>context</i>)

…

<a name="curveStepBefore" href="#curveStepBefore">#</a> <b>curveStepBefore</b>(<i>context</i>)

…

<a name="curve_areaStart" href="#curve_areaStart">#</a> <i>curve</i>.<b>areaStart</b>()

…

Note: not implemented by closed curves, such as <a href="#curveLinearClosed">curveLinearClosed</a>.

<a name="curve_areaEnd" href="#curve_areaEnd">#</a> <i>curve</i>.<b>areaEnd</b>()

…

Note: not implemented by closed curves, such as <a href="#curveLinearClosed">curveLinearClosed</a>.

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

<a name="symbol_type" href="#symbol_type">#</a> <i>symbol</i>.<b>type</b>([<i>type</i>])

…

<a name="symbol_size" href="#symbol_size">#</a> <i>symbol</i>.<b>size</b>([<i>size</i>])

…

<a name="symbol_context" href="#symbol_context">#</a> <i>symbol</i>.<b>context</b>([<i>context</i>])

…

### Symbol Types

Symbol types are typically not used directly, instead implementing paths for [symbols](#symbols). See [*symbol*.type](#symbol_type).

…

<a name="symbolTypes" href="#symbolTypes">#</a> <b>symbolTypes</b>

An array containing the set of all built-in symbol types: [circle](#symbolCircle), [cross](#symbolCross), [diamond](#symbolDiamond), [square](#symbolSquare), [downwards triangle](#symbolTriangleDown), and [upwards triangle](#symbolTriangleUp). Useful for constructing the range of an [ordinal scale](https://github.com/d3/d3-scale#ordinal-scales) should you wish to use a shape encoding for categorical data.

<a name="symbolCircle" href="#symbolCircle">#</a> <b>symbolCircle</b>

…

<a name="symbolCross" href="#symbolCross">#</a> <b>symbolCross</b>

…

<a name="symbolDiamond" href="#symbolDiamond">#</a> <b>symbolDiamond</b>

…

<a name="symbolSquare" href="#symbolSquare">#</a> <b>symbolSquare</b>

…

<a name="symbolTriangleDown" href="#symbolTriangleDown">#</a> <b>symbolTriangleDown</b>

…

<a name="symbolTriangleUp" href="#symbolTriangleUp">#</a> <b>symbolTriangleUp</b>

…

<a name="symbolType_draw" href="#symbolType_draw">#</a> <i>symbolType</i>.<b>draw</b>(<i>context</i>, <i>size</i>)

…

## Changes from D3 3.x:

* You can now render shapes to Canvas by specifying a context (e.g., [*line*.context](#line_context))! See [d3-path](https://github.com/d3/d3-path) for how it works.

* The interpretation of the [cardinal](#cardinal) spline tension parameter has been fixed. The default tension is now 0 (corresponding to a uniform Catmull–Rom spline), not 0.7. Due to a bug in 3.x, the tension parameter was previously only valid in the range [2/3, 1]; this corresponds to the new corrected range of [0, 1]. Thus, the new default value of 0 is equivalent to the old value of 2/3, and the default behavior is only slightly changed.

* To specify a [cardinal](#curveCardinal) spline tension of *t*, use `line.curve(curveCardinal, t)` instead of `line.interpolate("cardinal").tension(t)`.

* To specify a custom line or area interpolator, implement a [curve](#curves).

* Added [natural](#curveNatural) cubic splines.

* Added [Catmull–Rom](#curveCatmullRom) splines, parameterized by alpha. If α = 0, produces a uniform Catmull–Rom spline equivalent to a Cardinal spline with zero tension; if α = 0.5, produces a centripetal spline; if α = 1.0, produces a chordal spline.

* By setting [*area*.x1](#area_x1) or [*area*.y1](#area_y1) to null, you can reuse the [*area*.x0](#area_x0) or [*area*.y0](#area_y0) value, rather than computing it twice. This is useful for nondeterministic values (e.g., jitter).

* Accessor functions now always return functions, even if the value was set to a constant.
