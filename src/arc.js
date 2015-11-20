import {path} from "d3-path";
import constant from "./constant";

var pi = Math.PI,
    piHalf = pi / 2,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d.padAngle; // TODO d && ?
}

// function asin(x) {
//   return x > 1 ? piHalf : x < -1 ? -piHalf : Math.asin(x);
// }
//
// // Note: similar to d3_cross2d, d3_geom_polygonInside
// function sweep(x0, y0, x1, y1) {
//   return (x0 - x1) * y0 - (y0 - y1) * x0 > 0 ? 0 : 1;
// }
//
// // TODO Optimize signature?
// function intersect(c, d, a, b) {
//   var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3,
//       y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3,
//       ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
//   return [x1 + ua * x21, y1 + ua * y21];
// }
//
// // TODO Optimize signature?
// // Compute perpendicular offset line of length rc.
// // http://mathworld.wolfram.com/Circle-LineIntersection.html
// function cornerTangents(p0, p1, r1, rc, cw) {
//   var x01 = p0[0] - p1[0],
//       y01 = p0[1] - p1[1],
//       lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01),
//       ox = lo * y01,
//       oy = -lo * x01,
//       x1 = p0[0] + ox,
//       y1 = p0[1] + oy,
//       x2 = p1[0] + ox,
//       y2 = p1[1] + oy,
//       x3 = (x1 + x2) / 2,
//       y3 = (y1 + y2) / 2,
//       dx = x2 - x1,
//       dy = y2 - y1,
//       d2 = dx * dx + dy * dy,
//       r = r1 - rc,
//       D = x1 * y2 - x2 * y1,
//       d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)),
//       cx0 = (D * dy - dx * d) / d2,
//       cy0 = (-D * dx - dy * d) / d2,
//       cx1 = (D * dy + dx * d) / d2,
//       cy1 = (-D * dx + dy * d) / d2,
//       dx0 = cx0 - x3,
//       dy0 = cy0 - y3,
//       dx1 = cx1 - x3,
//       dy1 = cy1 - y3;

//   // Pick the closer of the two intersection points.
//   // TODO Is there a faster way to determine which intersection to use?
//   if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

//   return [
//     [cx0 - ox, cy0 - oy],
//     [cx0 * r1 / r, cy0 * r1 / r]
//   ];
// }

export default function() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = constant(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null,
      output = null;

  function arc(d, i) {
    var buffer,
        r0 = +innerRadius(d, i),
        r1 = +outerRadius(d, i),
        rc,
        a0 = startAngle(d, i) - piHalf,
        a1 = endAngle(d, i) - piHalf,
        cw = a1 > a0;

    if (!context) context = buffer = path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) rc = r1, r1 = r0, r0 = rc;

    if (r1 > 0) {
      context.moveTo(r1 * Math.cos(a0), r1 * Math.sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > 0) {
        if (Math.abs(a1 - a0) > tauEpsilon) {
          context.moveTo(r0 * Math.cos(a1), r0 * Math.sin(a1));
        }
        context.arc(0, 0, r0, a1, a0, cw);
      } else {
        context.lineTo(0, 0);
      }
    } else {
      context.moveTo(0, 0);
    }

    context.closePath();

    // // Special case for an arc that spans the full circle.
    // if (da > tauEpsilon) {
    //   context.moveTo(r1, 0);
    //   context.arc(0, 0, r1, 0, tau);
    //   if (r0) {
    //     context.moveTo(r0, 0);
    //     context.arc(0, 0, r0, tau, 0); // TODO ccw flag?
    //   }
    // }
    //
    // else {
    //   var rc,
    //       cr,
    //       rp,
    //       ap,
    //       p0 = 0,
    //       p1 = 0,
    //       x0,
    //       y0,
    //       x1,
    //       y1,
    //       x2,
    //       y2,
    //       x3,
    //       y3;
    //
    //   // The recommended minimum inner radius when using padding is outerRadius
    //   // * padAngle / sin(θ), where θ is the angle of the smallest arc (without
    //   // padding). For example, if the outerRadius is 200 pixels and the
    //   // padAngle is 0.02 radians, a reasonable θ is 0.04 radians, and a
    //   // reasonable innerRadius is 100 pixels.
    //
    //   if (ap = (+padAngle(d, i) || 0) / 2) {
    //     rp = padRadius ? +padRadius(d, i) : Math.sqrt(r0 * r0 + r1 * r1);
    //     if (!cw) p1 *= -1;
    //     if (r1) p1 = asin(rp / r1 * Math.sin(ap));
    //     if (r0) p0 = asin(rp / r0 * Math.sin(ap));
    //   }
    //
    //   // Compute the two outer corners.
    //   if (r1) {
    //     x0 = r1 * Math.cos(a0 + p1);
    //     y0 = r1 * Math.sin(a0 + p1);
    //     x1 = r1 * Math.cos(a1 - p1);
    //     y1 = r1 * Math.sin(a1 - p1);
    //
    //     // Detect whether the outer corners are collapsed.
    //     var l1 = Math.abs(a1 - a0 - 2 * p1) <= pi ? 0 : 1;
    //     if (p1 && sweep(x0, y0, x1, y1) === cw ^ l1) {
    //       var h1 = (a0 + a1) / 2;
    //       x0 = r1 * Math.cos(h1);
    //       y0 = r1 * Math.sin(h1);
    //       x1 = y1 = null;
    //     }
    //   } else {
    //     x0 = y0 = 0;
    //   }
    //
    //   // Compute the two inner corners.
    //   if (r0) {
    //     x2 = r0 * Math.cos(a1 - p0);
    //     y2 = r0 * Math.sin(a1 - p0);
    //     x3 = r0 * Math.cos(a0 + p0);
    //     y3 = r0 * Math.sin(a0 + p0);
    //
    //     // Detect whether the inner corners are collapsed.
    //     var l0 = Math.abs(a0 - a1 + 2 * p0) <= pi ? 0 : 1;
    //     if (p0 && sweep(x2, y2, x3, y3) === (1 - cw) ^ l0) {
    //       var h0 = (a0 + a1) / 2;
    //       x2 = r0 * Math.cos(h0);
    //       y2 = r0 * Math.sin(h0);
    //       x3 = y3 = null;
    //     }
    //   } else {
    //     x2 = y2 = 0;
    //   }
    //
    //   // Compute the rounded corners.
    //   if (da > epsilon && (rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius(d, i))) > epsilon) { // TODO epsilon = 1e-3?
    //     cr = r0 < r1 ^ cw ? 0 : 1;
    //     var rc1 = rc,
    //         rc0 = rc;
    //
    //     // Compute the angle of the sector formed by the two sides of the arc.
    //     if (da < pi) {
    //       var oc = x3 == null ? [x2, y2] : x1 == null ? [x0, y0] : intersect([x0, y0], [x3, y3], [x1, y1], [x2, y2]),
    //           ax = x0 - oc[0],
    //           ay = y0 - oc[1],
    //           bx = x1 - oc[0],
    //           by = y1 - oc[1],
    //           kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2),
    //           lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
    //       rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
    //       rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
    //     }
    //
    //     // Compute the outer corners.
    //     if (x1 != null) {
    //       var t30 = cornerTangents(x3 == null ? [x2, y2] : [x3, y3], [x0, y0], r1, rc1, cw),
    //           t12 = cornerTangents([x1, y1], [x2, y2], r1, rc1, cw);
    //
    //       // Detect whether the outer edge is fully circular.
    //       context.moveTo(t30[0][0], t30[0][1]);
    //       if (rc === rc1) {
    //         path.push(
    //           "A", rc1, ",", rc1, " 0 0,", cr, " ", t30[1],
    //           "A", r1, ",", r1, " 0 ", (1 - cw) ^ sweep(t30[1][0], t30[1][1], t12[1][0], t12[1][1]), ",", cw, " ", t12[1],
    //           "A", rc1, ",", rc1, " 0 0,", cr, " ", t12[0]);
    //       } else {
    //         path.push(
    //           "A", rc1, ",", rc1, " 0 1,", cr, " ", t12[0]);
    //       }
    //     } else {
    //       context.moveTo(x0, y0);
    //     }
    //
    //     // Compute the inner corners.
    //     if (x3 != null) {
    //       var t03 = cornerTangents([x0, y0], [x3, y3], r0, -rc0, cw),
    //           t21 = cornerTangents([x2, y2], x1 == null ? [x0, y0] : [x1, y1], r0, -rc0, cw);
    //
    //       // Detect whether the inner edge is fully circular.
    //       context.lineTo(t21[0][0], t21[0][1]);
    //       if (rc === rc0) {
    //         path.push(
    //           "A", rc0, ",", rc0, " 0 0,", cr, " ", t21[1],
    //           "A", r0, ",", r0, " 0 ", cw ^ sweep(t21[1][0], t21[1][1], t03[1][0], t03[1][1]), ",", 1 - cw, " ", t03[1],
    //           "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
    //       } else {
    //         path.push(
    //           "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
    //       }
    //     } else {
    //       context.lineTo(x2, y2);
    //     }
    //   }
    //
    //   // Compute straight corners.
    //   else {
    //     context.moveTo(x0, y0);
    //     if (x1 != null) path.push("A", r1, ",", r1, " 0 ", l1, ",", cw, " ", x1, ",", y1);
    //     context.lineTo(x2, y2);
    //     if (x3 != null) path.push("A", r0, ",", r0, " 0 ", l0, ",", 1 - cw, " ", x3, ",", y3);
    //   }
    //
    //   context.closePath();
    // }

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
  };

  arc.centroid = function(d, i) {
    var r = (+innerRadius(d, i) + +outerRadius(d, i)) / 2,
        a = (+startAngle(d, i) + +endAngle(d, i)) / 2 - Math.PI / 2;
    return [Math.cos(a) * r, Math.sin(a) * r];
  };

  arc.context = function(_) {
    return arguments.length ? ((context = output = _ == null ? null : _), arc) : context;
  };

  return arc;
};
