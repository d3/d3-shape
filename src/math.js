export var epsilon = 1e-12;
export var pi = Math.PI;
export var halfPi = pi / 2;
export var tau = 2 * pi;

export function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}
