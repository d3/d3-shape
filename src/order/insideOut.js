import none from "./none";
import {sum} from "./ascending";

export default function(series) {
  var n = series.length,
      i,
      j,
      onset = series.map(getFirst),
      order = none(series).sort(function(a, b) { return onset[a] - onset[b]; }),
      sums = series.map(sum),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }
  return bottoms.reverse().concat(tops);
}

export function getFirst(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) {
    if (series[i][1] - series[i][0]> 0) {
      return i;
    }
  }
  return n-1;
}
