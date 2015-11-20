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

function sweep(x0, y0, x1, y1) {
  return (x0 - x1) * y0 - (y0 - y1) * x0 > 0 ? 0 : 1;
}

// TODO Optimize signature?
function intersect(c, d, a, b) {
  var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3,
      y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3,
      ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
  return [x1 + ua * x21, y1 + ua * y21];
}

// TODO Optimize signature?
// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(p0, p1, r1, rc, cw) {
  var x01 = p0[0] - p1[0],
      y01 = p0[1] - p1[1],
      lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x1 = p0[0] + ox,
      y1 = p0[1] + oy,
      x2 = p1[0] + ox,
      y2 = p1[1] + oy,
      x3 = (x1 + x2) / 2,
      y3 = (y1 + y2) / 2,
      dx = x2 - x1,
      dy = y2 - y1,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x1 * y2 - x2 * y1,
      d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x3,
      dy0 = cy0 - y3,
      dx1 = cx1 - x3,
      dy1 = cy1 - y3;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x0: -ox,
    y0: -oy,
    x1: cx0 * (r1 / r - 1),
    y1: cy0 * (r1 / r - 1)
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
          rc1 = rc,
          cr = cw ? 0 : 1; // TODO Should be equivalent to r0 < r1 ^ cw since r1 ≥ r0.

      // Apply padding. Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > 0) {
        var p0 = asin(rp / r0 * Math.sin(ap)),
            p1 = asin(rp / r1 * Math.sin(ap));
        if (p0 * 2 >= da) da0 = 0, a00 = a10 = (a0 + a1) / 2;
        else da0 -= p0 * 2, p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        if (p1 * 2 >= da) da1 = 0, a01 = a11 = (a0 + a1) / 2;
        else da1 -= p1 * 2, p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
      }

      var x0 = r1 * Math.cos(a01), // TODO Rename to x01.
          y0 = r1 * Math.sin(a01); // TODO Rename to y01.

      if (rc > 0) {
        var x1 = r1 * Math.cos(a11), // TODO Rename to x11.
            y1 = r1 * Math.sin(a11), // TODO Rename to y11.
            x2 = r0 * Math.cos(a10), // TODO Rename to x10.
            y2 = r0 * Math.sin(a10), // TODO Rename to y10.
            x3 = r0 * Math.cos(a00), // TODO Rename to x00.
            y3 = r0 * Math.sin(a00); // TODO Rename to y00.

        // Restrict the corner radius according to the sector angle.
        if (da < pi) {
          var oc = da0 > 0 ? intersect([x0, y0], [x3, y3], [x1, y1], [x2, y2]) : [x2, y2], // TODO Safe to ignore the da0 = da1 = 0 case?
              ax = x0 - oc[0],
              ay = y0 - oc[1],
              bx = x1 - oc[0],
              by = y1 - oc[1],
              kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2),
              lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
          rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > 0)) context.moveTo(x0, y0);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > 0) {
        var t30 = cornerTangents(da0 > 0 ? [x3, y3] : [x2, y2], [x0, y0], r1, rc1, cw),
            t12 = cornerTangents([x1, y1], [x2, y2], r1, rc1, cw);

        context.moveTo(t30.cx + t30.x0, t30.cy + t30.y0);

        // Are the outer corners separated?
        if (rc === rc1) {
          context.arc(t30.cx, t30.cy, rc1, Math.atan2(t30.y0, t30.x0), Math.atan2(t30.y1, t30.x1), !cw);
          context.arc(0, 0, r1, Math.atan2(t30.cy + t30.y1, t30.cx + t30.x1), Math.atan2(t12.cy + t12.y1, t12.cx + t12.x1), !cw);
          context.arc(t12.cx, t12.cy, rc1, Math.atan2(t12.y1, t12.x1), Math.atan2(t12.y0, t12.x0), !cw);
        }

        // Or have the corners merged?
        else context.arc(t30.cx, t30.cy, rc1, Math.atan2(t30.y0, t30.x0), Math.atan2(t12.y0, t12.x0), !cw);
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
