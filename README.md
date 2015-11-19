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

<a name="line_interpolate" href="#line_interpolate">#</a> <i>line</i>.<b>interpolate</b>([<i>interpolate</i>[, <i>parameters…</i>]])

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

<a name="area_interpolate" href="#area_interpolate">#</a> <i>area</i>.<b>interpolate</b>([<i>interpolate</i>[, <i>parameters…</i>]])

…

<a name="area_context" href="#area_context">#</a> <i>area</i>.<b>context</b>([<i>context</i>])

…

### Interpolators

Interpolators are typically not used directly, instead implementing splines for [lines](#lines) and [areas](#areas).

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

<a name="interpolator_areaStart" href="#interpolator_areaStart">#</a> <i>interpolator</i>.<b>areaStart</b>()

…

Note: not implemented by closed interpolators, such as <a href="#linearClosed">linearClosed</a>.

<a name="interpolator_areaEnd" href="#interpolator_areaEnd">#</a> <i>interpolator</i>.<b>areaEnd</b>()

…

Note: not implemented by closed interpolators, such as <a href="#linearClosed">linearClosed</a>.

<a name="interpolator_lineStart" href="#interpolator_lineStart">#</a> <i>interpolator</i>.<b>lineStart</b>()

…

<a name="interpolator_lineEnd" href="#interpolator_lineEnd">#</a> <i>interpolator</i>.<b>lineEnd</b>()

…

<a name="interpolator_point" href="#interpolator_point">#</a> <i>interpolator</i>.<b>point</b>(<i>x</i>, <i>y</i>)

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

Symbol types are typically not used directly, instead implementing paths for [symbols](#symbols).

…

<a name="symbolTypes" href="#symbolTypes">#</a> <b>symbolTypes</b>

An array containing the set of all built-in symbol types: [circle](#circle), [cross](#cross), [diamond](#diamond), [square](#square), [triangleDown](#triangleDown), and [triangleUp](#triangleUp). Useful for constructing the range of an [ordinal scale](https://github.com/d3/d3-scale#ordinal-scales) should you wish to use a shape encoding for categorical data.

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

* You can now render shapes to Canvas by specifying a context (e.g., [*line*.context](#line_context))!

* The interpretation of the [Cardinal](#cardinal) spline tension parameter has been fixed. The default tension is now 0 (corresponding to a uniform Catmull–Rom spline), not 0.7. Due to a bug in 3.x, the tension parameter was previously only valid in the range [2/3, 1]; this corresponds to the new corrected range of [0, 1]. Thus, the new default value of 0 is equivalent to the old value of 2/3, and the default behavior is only slightly changed.

* To specify a [Cardinal](#cardinal) interpolation tension of *t*, use `line.interpolate(cardinal(t))` instead of `line.interpolate("cardinal").tension(t)`.

* The custom [interpolator API](#interpolators) has changed.

* Added [natural](#natural) cubic spline interpolation.

* Added [Catmull–Rom](#catmullRom) spline interpolation, parameterized by alpha. If α = 0, produces a uniform Catmull–Rom spline equivalent to a Cardinal spline with zero tension; if α = 0.5, produces a centripetal spline; if α = 1.0, produces a chordal spline.

* By setting [*area*.x1](#area_x1) or [*area*.y1](#area_y1) to null, you can reuse the [*area*.x0](#area_x0) or [*area*.y0](#area_y0) value, rather than computing it twice. This is useful for nondeterministic values (e.g., jitter).

* Accessor functions now always return functions, even if the value was set to a constant.
