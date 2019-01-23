import none from "./none";

export default function(series) {
  var starts = series.map(start);
  return none(series).sort(function(a, b) { return starts[a] - starts[b]; });
}

function start(series) {
  var i = -1, n = series.length;
  while (++i < n && !+series[i][1]);
  return i;
}
