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
  return d && d.padAngle; // Note: optional!
}

function asin(x) {
  return x > 1 ? piHalf : x < -1 ? -piHalf : Math.asin(x);
}

// function sweep(x0, y0, x1, y1) {
//   return (x0 - x1) * y0 > (y0 - y1) * x0 ? 0 : 1;
// }

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
  return [x0 + t * x10, y0 + t * y10];
}

// TODO Optimize signature?
// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };

  // return [
  //   [cx0 - ox, cy0 - oy],
  //   [cx0 * r1 / r, cy0 * r1 / r],
  //   [cx0, cy0]
  // ];
}

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
        r,
        r0 = +innerRadius(d, i),
        r1 = +outerRadius(d, i),
        a0 = startAngle(d, i) - piHalf,
        a1 = endAngle(d, i) - piHalf,
        da = Math.abs(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > 0)) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da >= tau) { // TODO > tauEpsilon?
      context.moveTo(r1 * Math.cos(a0), r1 * Math.sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > 0) {
        context.moveTo(r0 * Math.cos(a1), r0 * Math.sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle(d, i) / 2,
          rp = (ap > 0) && (padRadius ? +padRadius(d, i) : Math.sqrt(r0 * r0 + r1 * r1)),
          rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius(d, i)),
          rc0 = rc,
          rc1 = rc;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > 0) {
        var p0 = asin(rp / r0 * Math.sin(ap)),
            p1 = asin(rp / r1 * Math.sin(ap));
        if ((da0 -= p0 * 2) > 0) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > 0) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * Math.cos(a01),
          y01 = r1 * Math.sin(a01);

      // Apply rounded corners?
      if (rc > 0) {
        var x11 = r1 * Math.cos(a11),
            y11 = r1 * Math.sin(a11),
            x10 = r0 * Math.cos(a10),
            y10 = r0 * Math.sin(a10),
            x00 = r0 * Math.cos(a00),
            y00 = r0 * Math.sin(a00);

        // Restrict the corner radius according to the sector angle.
        if (da < pi) {
          var oc = da0 > 0 ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10], // TODO Safe to ignore the da0 = da1 = 0 case?
              ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2),
              lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
          rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > 0)) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > 0) {
        var t30 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw),
            t12 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t30.cx + t30.x01, t30.cy + t30.y01);

        // Have the outer corners merged?
        if (rc1 < rc) context.arc(t30.cx, t30.cy, rc1, Math.atan2(t30.y01, t30.x01), Math.atan2(t12.y01, t12.x01), !cw);

        // Otherwise, draw the two corners and the outer ring.
        else {
          context.arc(t30.cx, t30.cy, rc1, Math.atan2(t30.y01, t30.x01), Math.atan2(t30.y11, t30.x11), !cw);
          context.arc(0, 0, r1, Math.atan2(t30.cy + t30.y11, t30.cx + t30.x11), Math.atan2(t12.cy + t12.y11, t12.cx + t12.x11), !cw);
          context.arc(t12.cx, t12.cy, rc1, Math.atan2(t12.y11, t12.x11), Math.atan2(t12.y01, t12.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.arc(0, 0, r1, a01, a11, !cw);

      // Is it an annular sector?
      if (r0 > 0) context.arc(0, 0, r0, a10, a00, cw);

      // Or is it a circular sector?
      else context.lineTo(0, 0);
    }

    context.closePath();

    //   // Compute the rounded corners.
    //   if (da > epsilon && ()) > epsilon) { // TODO epsilon = 1e-3?
    //     cr = r0 < r1 ^ cw ? 0 : 1;
    //     var rc1 = rc,
    //         rc0 = rc;
    //
    //     // Compute the angle of the sector formed by the two sides of the arc.
    //     if (da < pi) {
    //       var oc = x00 == null ? [x10, y10] : x11 == null ? [x01, y01] : intersect([x01, y01], [x00, y00], [x11, y11], [x10, y10]),
    //           ax = x01 - oc[0],
    //           ay = y01 - oc[1],
    //           bx = x11 - oc[0],
    //           by = y11 - oc[1],
    //           kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2),
    //           lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
    //       rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
    //       rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
    //     }
    //
    //     // Compute the outer corners.
    //     if (x11 != null) {
    //       var t30 = cornerTangents(x00 == null ? [x10, y10] : [x00, y00], [x01, y01], r1, rc1, cw),
    //           t12 = cornerTangents([x11, y11], [x10, y10], r1, rc1, cw);
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
    //       context.moveTo(x01, y01);
    //     }
    //
    //     // Compute the inner corners.
    //     if (x00 != null) {
    //       var t03 = cornerTangents([x01, y01], [x00, y00], r0, -rc0, cw),
    //           t21 = cornerTangents([x10, y10], x11 == null ? [x01, y01] : [x11, y11], r0, -rc0, cw);
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
    //       context.lineTo(x10, y10);
    //     }
    //   }

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function(d, i) {
    var r = (+innerRadius(d, i) + +outerRadius(d, i)) / 2,
        a = (+startAngle(d, i) + +endAngle(d, i)) / 2 - Math.PI / 2;
    return [Math.cos(a) * r, Math.sin(a) * r];
  };

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

  arc.context = function(_) {
    return arguments.length ? ((context = output = _ == null ? null : _), arc) : context;
  };

  return arc;
};
