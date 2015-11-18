# d3-shape

…

## Installing

If you use NPM, `npm install d3-shape`. Otherwise, download the [latest release](https://github.com/d3/d3-shape/releases/latest).

## API Reference

### Lines

…

<a name="line" href="#line">#</a> <b>line</b>()

…

<a name="line_x" href="#line_x">#</a> <i>line</i>.<b>x</b>(<i>x</i>)

…

<a name="line_y" href="#line_y">#</a> <i>line</i>.<b>y</b>(<i>y</i>)

…

<a name="line_defined" href="#line_defined">#</a> <i>line</i>.<b>defined</b>(<i>defined</i>)

…

<a name="line_interpolate" href="#line_interpolate">#</a> <i>line</i>.<b>interpolate</b>(<i>interpolate</i>[, <i>t</i>])

…

<a name="line_context" href="#line_context">#</a> <i>line</i>.<b>context</b>(<i>context</i>)

…

### Areas

…

<a name="area" href="#area">#</a> <b>area</b>()

…

<a name="area_x" href="#area_x">#</a> <i>area</i>.<b>x</b>(<i>x</i>)

…

<a name="area_x0" href="#area_x0">#</a> <i>area</i>.<b>x0</b>(<i>x0</i>)

…

<a name="area_x1" href="#area_x1">#</a> <i>area</i>.<b>x1</b>(<i>x1</i>)

…

<a name="area_y" href="#area_y">#</a> <i>area</i>.<b>y</b>(<i>y</i>)

…

<a name="area_y0" href="#area_y0">#</a> <i>area</i>.<b>y0</b>(<i>y0</i>)

…

<a name="area_y1" href="#area_y1">#</a> <i>area</i>.<b>y1</b>(<i>y1</i>)

…

<a name="area_defined" href="#area_defined">#</a> <i>area</i>.<b>defined</b>(<i>defined</i>)

…

<a name="area_interpolate" href="#area_interpolate">#</a> <i>area</i>.<b>interpolate</b>(<i>interpolate</i>[, <i>t</i>])

…

<a name="area_context" href="#area_context">#</a> <i>area</i>.<b>context</b>(<i>context</i>)

…

### Interpolators

…

<a name="interpolate" href="#interpolate">#</a> <i>interpolate</i>(<i>context</i>)

…

<a name="interpolator_areaStart" href="#interpolator_areaStart">#</a> <i>interpolator</i>.<b>areaStart</b>()

…

<a name="interpolator_areaEnd" href="#interpolator_areaEnd">#</a> <i>interpolator</i>.<b>areaEnd</b>()

…

<a name="interpolator_lineStart" href="#interpolator_lineStart">#</a> <i>interpolator</i>.<b>lineStart</b>()

…

<a name="interpolator_lineEnd" href="#interpolator_lineEnd">#</a> <i>interpolator</i>.<b>lineEnd</b>()

…

<a name="interpolator_point" href="#interpolator_point">#</a> <i>interpolator</i>.<b>point</b>(<i>x</i>, <i>y</i>)

…

## Changes from D3 3.x:

* You can now render shapes to Canvas by specifying a context (e.g., [*line*.context](#line_context))!

* The interpretation of the Cardinal spline tension parameter has been fixed. The default tension is now 0 (corresponding to a uniform Catmull–Rom spline), not 0.7. Due to a bug in 3.x, the tension parameter was previously only valid in the range [2/3, 1]; this corresponds to the new corrected range of [0, 1]. Thus, the new default value of 0 is equivalent to the old value of 2/3, and the default behavior is only slightly changed.

* To specify a Cardinal interpolation tension of *t*, use `line.interpolate("cardinal", t)` instead of `line.interpolate("cardinal").tension(t)`.

* The custom interpolator API has changed.

* Added “natural” cubic spline interpolation.

* Added “catmull-rom” spline interpolation, parameterized by alpha. If α = 0, produces a uniform Catmull–Rom spline equivalent to a Cardinal spline with zero tension; if α = 0.5, produces a centripetal spline; if α = 1.0, produces a chordal spline.

* By setting [*area*.x0](#area_x0) or [*area*.y0](#area_y0) to null, you can reuse the [*area*.x1](#area_x1) or [*area*.y1](#area_y1) value, rather than computing it twice. This is useful for nondeterministic values (e.g., jitter).

* Accessor functions now always return functions, even if the value was set to a constant.
