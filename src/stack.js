import constant from "./constant";
import identity from "./identity";
import {x as pointX} from "./point";

function stackY(d, layer) {
  return d[layer];
}

export default function() {
  var layers = constant([1]), // one layer equivalent to pointY by default
      x = pointX,
      dy = stackY;

  function stack(data) {
    var l = layers.apply(this, arguments),
        m = data.length,
        n = l.length,
        xz = new Array(m),
        yz = new Array(m),
        s = new Array(n);

    if (n > 0) for (var j = 0, l0 = l[0]; j < m; ++j) {
      xz[j] = +x(data[j], l0, j, data);
      yz[j] = 0;
    }

    for (var i = 0; i < n; ++i) {
      for (var li = l[i], si = s[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [xz[j], yz[j], yz[j] += +dy(data[j], li, j, data)];
        sij.data = data[j];
      }
      si.data = li;
    }

    return s;
  }

  stack.layers = function(_) {
    return arguments.length ? (layers = typeof _ === "function" ? _ : constant(Array.prototype.slice.call(_)), stack) : layers;
  };

  stack.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), stack) : x;
  };

  stack.dy = function(_) {
    return arguments.length ? (dy = typeof _ === "function" ? _ : constant(+_), stack) : dy;
  };

  return stack;
};
