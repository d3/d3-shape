import offsetZero from "./zero";

export default function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][2];
    s0[j][2] += s0[j][1] = -y / 2;
  }
  offsetZero(series, order);
};
