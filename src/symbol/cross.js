export default function(context, size) {
  var radius = Math.sqrt(size / 5) / 2;
  context.moveTo(-3 * radius, -radius);
  context.lineTo(-radius, -radius);
  context.lineTo(-radius, -3 * radius);
  context.lineTo(radius, -3 * radius);
  context.lineTo(radius, -radius);
  context.lineTo(3 * radius, -radius);
  context.lineTo(3 * radius, radius);
  context.lineTo(radius, radius);
  context.lineTo(radius, 3 * radius);
  context.lineTo(-radius, 3 * radius);
  context.lineTo(-radius, radius);
  context.lineTo(-3 * radius, radius);
  context.closePath();
};
