import constant from "./constant";
import identity from "./identity";
import offsetZero from "./offset/zero";
import orderDefault from "./order/default";
import {x as pointX} from "./point";

function stackY(d, layer) {
  return d[layer];
}

export default function() {
  var keys = constant([1]), // one layer equivalent to pointY by default
      order = orderDefault,
      offset = offsetZero,
      x = pointX,
      dy = stackY;

  function stack(data) {
    var kz = keys.apply(this, arguments),
        m = data.length,
        n = kz.length,
        xz = new Array(m),
        sz = new Array(n);

    if (n > 0) for (var j = 0, k0 = kz[0]; j < m; ++j) {
      xz[j] = +x(data[j], k0, j, data);
    }

    for (var i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [xz[j], 0, +dy(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }

    offset(sz, order(sz));

    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant(Array.prototype.slice.call(_)), stack) : keys;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? orderDefault : typeof _ === "function" ? _ : constant(Array.prototype.slice.call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? offsetZero : _, stack) : offset;
  };

  stack.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), stack) : x;
  };

  stack.dy = function(_) {
    return arguments.length ? (dy = typeof _ === "function" ? _ : constant(+_), stack) : dy;
  };

  return stack;
};
