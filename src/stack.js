import constant from "./constant";
import identity from "./identity";
import orderDefault from "./order/default";
import {x as pointX} from "./point";

function stackY(d, layer) {
  return d[layer];
}

export default function() {
  var keys = constant([1]), // one layer equivalent to pointY by default
      order = null,
      x = pointX,
      dy = stackY;

  function stack(data) {
    var kz = keys.apply(this, arguments),
        m = data.length,
        n = kz.length,
        xz = new Array(m),
        yz = new Array(m),
        sz = new Array(n);

    if (n > 0) for (var j = 0, k0 = kz[0]; j < m; ++j) {
      xz[j] = +x(data[j], k0, j, data);
      yz[j] = 0;
    }

    for (var i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [xz[j], 0, +dy(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }

    for (var oz = (order == null ? orderDefault : order)(sz), i = 0; i < n; ++i) {
      for (var si = sz[oz[i]], sij, j = 0; j < m; ++j) {
        sij = si[j];
        sij[1] = yz[j];
        sij[2] = yz[j] += sij[2];
      }
    }

    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant(Array.prototype.slice.call(_)), stack) : keys;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? null : typeof _ === "function" ? _ : constant(Array.prototype.slice.call(_)), stack) : order;
  };

  stack.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), stack) : x;
  };

  stack.dy = function(_) {
    return arguments.length ? (dy = typeof _ === "function" ? _ : constant(+_), stack) : dy;
  };

  return stack;
};
