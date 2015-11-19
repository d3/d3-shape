export default {
  draw: function(context, size) {
    var r = Math.sqrt(size / Math.PI);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, 2 * Math.PI);
  }
};
