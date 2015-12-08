var sqrt3 = Math.sqrt(3);

export default {
  draw: function(context, size) {
    var y = -Math.sqrt(size * 4 / 27);
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};
