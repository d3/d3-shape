/* Square */
export default {
    draw: function( g, size ) { if( size > 0 ) {
        let r = Math.sqrt( size / Math.PI );                // radius
        let s = r * Math.PI / 4 + 0.25;                     // +0.25 accounts for overlap.
        g.moveTo(  s,  s );
        g.lineTo(  s, -s );
        g.lineTo( -s, -s );
        g.lineTo( -s,  s );
        g.closePath();
    }}
};
