# d3-shape

…

## Installing

If you use NPM, `npm install d3-shape`. Otherwise, download the [latest release](https://github.com/d3/d3-shape/releases/latest).

## API Reference

…

## Changes from D3 3.x:

* The behavior of the cardinal interpolation tension parameter has been standardized. The default tension is now 0, not 0.7.

* To specify cardinal interpolation tension *t*, use `line.interpolate("cardinal", t)` instead of `line.interpolate("cardinal").tension(t)`.
