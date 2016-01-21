var slice = Array.prototype.slice;

export default function(curve, args) {
  if (args.length < 2) return curve;
  args = slice.call(args);
  args[0] = null;
  return function(context) {
    args[0] = context;
    return curve.apply(null, args);
  };
}
