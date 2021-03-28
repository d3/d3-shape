/* X */
export default {
    draw: function( g, size ) { if( size > 0 ) {
        let r = Math.sqrt( size / Math.PI );                // radius
        let s = r * Math.PI / 2 + 0.25;                     // +0.25 accounts for center pixel and line width.
        let t = Math.max( 1, s / Math.SQRT2 );
        g.moveTo( -t, -t );
        g.lineTo(  t,  t );
        g.closePath();
        g.moveTo( -t,  t );
        g.lineTo(  t, -t );
        g.closePath();
    }}
};
