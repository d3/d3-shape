import bind from "./bind";
import {halfPi} from "../math";

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    a -= halfPi, this._curve.point(r * Math.cos(a), r * Math.sin(a));
  }
};

export default function(curve, args) {
  curve = bind(curve, args);

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}
