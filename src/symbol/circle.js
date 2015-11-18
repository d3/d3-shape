export default function(context, size) {
  var radius = Math.sqrt(size / Math.PI);
  context.moveTo(0, radius);
  context.arc(0, 0, radius, 0, 2 * Math.PI);
  context.closePath(); // TODO Is this necessary?
};
