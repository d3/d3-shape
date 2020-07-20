import {tau} from "../math.js";
import noop from "../noop.js";

export default function(radius) {
  if (arguments.length === 0) radius = 0.5;
  return function(context) {
    return {
      lineStart: noop,
      lineEnd: noop,
      point: function(x, y) {
        context.moveTo(x + radius, y);
        context.arc(x, y, radius, 0, tau);
      }
    };
  };
}
