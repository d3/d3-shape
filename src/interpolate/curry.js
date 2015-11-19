var slice = Array.prototype.slice;

export default function(interpolate, args) {
  args = slice.call(args);
  args[0] = null;
  return function(context) {
    args[0] = context;
    return interpolate.apply(null, args);
  };
};
