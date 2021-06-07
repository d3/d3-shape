/**
 * Popular symbols with preattentive features.
 *
 * Preattentive features aid pattern detection and reduce overlap.
 * These symbols are adjusted to have approximately equal weight.
 *
 * Symbols are centered at (0,0).  When translating,
 * round to the center of the pixel to minimize anti-aliasing, e.g.
 *      .attr( "transform", "translate( " + ( Math.floor( x ) + 0.5 ) + ", " + ( Math.floor( y ) + 0.5 ) + " )" )
 */
import circle from "./pSymbol/circle.js";
import plus from "./pSymbol/plus.js";
import x from "./pSymbol/x.js";
import triangle from "./pSymbol/triangle.js";
import asterisk from "./pSymbol/asterisk.js";
import square from "./pSymbol/square.js";
import diamond from "./pSymbol/diamond.js";
export var pSymbols = [
  circle,
  plus,
  x,
  triangle,
  asterisk,
  square,
  diamond
];

/**
 * Symbol sets.
 */
export var symbolSets = [ "geometric": symbols, "preattentive": pSymbols ];
