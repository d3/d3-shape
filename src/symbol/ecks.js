export default {
  draw: function(context, size) {
    var root2 = Math.sqrt(2),
        r = Math.sqrt(size / 5) / 2,
        rRoot2 = r * root2;

    context.moveTo( 0 * rRoot2, -1 * rRoot2);
    context.lineTo( 1 * rRoot2, -2 * rRoot2);
    context.lineTo( 2 * rRoot2, -1 * rRoot2);
    
    context.lineTo( 1 * rRoot2,  0 * rRoot2);
    context.lineTo( 2 * rRoot2,  1 * rRoot2);
    context.lineTo( 1 * rRoot2,  2 * rRoot2);
    
    context.lineTo( 0 * rRoot2,  1 * rRoot2);
    context.lineTo(-1 * rRoot2,  2 * rRoot2);
    context.lineTo(-2 * rRoot2,  1 * rRoot2);
    
    context.lineTo(-1 * rRoot2,  0 * rRoot2);
    context.lineTo(-2 * rRoot2, -1 * rRoot2);
    context.lineTo(-1 * rRoot2, -2 * rRoot2);
    context.closePath();
  }
};
