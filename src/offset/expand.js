import none from "./none";

export default function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, n, m = series[0].length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (var i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  none(series, order);
};
