# d3-shape

…

## Installing

If you use NPM, `npm install d3-shape`. Otherwise, download the [latest release](https://github.com/d3/d3-shape/releases/latest).

## API Reference

…

## Changes from D3 3.x:

* The behavior of Cardinal interpolation tension has been fixed. The default tension is now 0 (corresponding to a uniform Catmull–Rom spline), not 0.7; the new value of 0 is equivalent to an old value of 2 / 3, so the default behavior is only slightly changed.

* To specify a Cardinal interpolation tension of *t*, use `line.interpolate("cardinal", t)` instead of `line.interpolate("cardinal").tension(t)`.
