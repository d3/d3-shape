import offsetZero from "./zero";

export default function(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]], s3 = (si[j][2] - si[j - 1][2]) / 2;
      for (var k = 0, sk; k < i; ++k) {
        sk = series[order[k]], s3 += (sk[j][2] - sk[j - 1][2]);
      }
      s2 += s3 * si[j][2];
      s1 += si[j][2];
    }
    s0[j - 1][2] += s0[j - 1][1] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][2] += s0[j - 1][1] = y;
  offsetZero(series, order);
};
