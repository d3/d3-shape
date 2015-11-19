import {path} from "d3-path";
import circle from "./symbol/circle";
import cross from "./symbol/cross";
import diamond from "./symbol/diamond";
import square from "./symbol/square";
import {triangleDown, triangleUp} from "./symbol/triangle";
import constant from "./constant";

export var symbolTypes = [
  circle,
  cross,
  diamond,
  square,
  triangleDown,
  triangleUp
];

export default function() {
  var type = constant(circle),
      size = constant(64),
      context = null;

  function symbol(d, i) {
    var buffer;
    if (!context) context = buffer = path();
    type(d, i).draw(context, +size(d, i));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
};
