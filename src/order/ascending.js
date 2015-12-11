import none from "./none";

export default function(series) {
  var sums = series.map(sum);
  return none(series).sort(function(a, b) { return sums[a] - sums[b]; });
};

export function sum(series) {
  return series.reduce(add, 0);
};

function add(p, d) {
  return p + d[1];
}
