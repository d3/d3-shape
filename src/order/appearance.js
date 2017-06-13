export default function(series) {
  var appearanceIndex = series.map(function(d,i){
    for(var k = 0, n = d.length;k < n;++k){
      if(d[k][1] > 0) break;
    }
    return [k, i];
  });
  appearanceIndex.sort(function(a,b){return a[0] - b[0];})
  return appearanceIndex.map(function(d){return d[1]});
}
