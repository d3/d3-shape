export default function(context, size) {
  var w = Math.sqrt(size),
      x = w / 2;
  context.rect(x, x, w, w);
};
