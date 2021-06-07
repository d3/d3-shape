/* Diamond */
export default {
    draw: function( g, size ) { if( size > 0 ) {
        let r = Math.sqrt( size / Math.PI );                // radius
        let s = r * Math.PI / ( 2 * Math.SQRT2 ) + 0.5;     // +0.5 accounts for overlap.
        let t = 1 / ( 2 * Math.SQRT2 );                     // t accounts for line width.
        g.moveTo(      -t, - s - t );
        g.lineTo(   s + t,       t );
        g.closePath();
        g.moveTo(   s + t,      -t );
        g.lineTo(      -t,   s + t );
        g.closePath();
        g.moveTo(       t,   s + t );
        g.lineTo( - s - t,      -t );
        g.closePath();
        g.moveTo( - s - t,       t );
        g.lineTo(       t, - s - t );
        g.closePath();
    }}
};
