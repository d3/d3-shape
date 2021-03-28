/* Plus */
export default {
    draw: function( g, size ) { if( size > 0 ) {
        let r = Math.sqrt( size / Math.PI );                // radius
        let s = Math.max( 1.5, r * Math.PI / 2 - 0.25 );    // -0.25 accounts for center pixel.
        g.moveTo( -s,  0 );
        g.lineTo(  s,  0 );
        g.closePath();
        g.moveTo(  0,  s );
        g.lineTo(  0, -s );
        g.closePath();
    }}
};
