import {path} from "d3-path";
import circle from "./symbol/circle";
import cross from "./symbol/cross";
import diamond from "./symbol/diamond";
import square from "./symbol/square";
import {triangleDown, triangleUp} from "./symbol/triangle";
import constant from "./constant";

function constantSixtyFour() {
  return 64;
}

function constantCircle() {
  return "circle";
}

export var symbolTypes = [
  "circle",
  "cross",
  "diamond",
  "square",
  "triangle-down",
  "triangle-up"
];

export default function() {
  var type = constantCircle,
      size = constantSixtyFour,
      context = null;

  function symbol(d, i) {
    var buffer;
    if (!context) context = buffer = path();
    var t;
    switch (type(d, i) + "") {
      case "cross": t = cross; break;
      case "diamond": t = diamond; break;
      case "square": t = square; break;
      case "triangle-down": t = triangleDown; break;
      case "triangle-up": t = triangleUp; break;
      default: t = circle; break;
    }
    t(context, +size(d, i));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant(_ + ""), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
};
