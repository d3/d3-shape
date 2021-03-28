/* Asterisk */
export default {
    draw: function( g, size ) { if( size > 0 ) {
        let r = Math.sqrt( size / Math.PI );                // radius
        let s = Math.max( 1.5, r * Math.PI / 3 + 0.5 );     // +0.5 accounts for overlap.
        let t = s * Math.sin( Math.PI / 6 ),
            u = s * Math.cos( Math.PI / 6 );
        g.moveTo(  0,  s );
        g.lineTo(  0, -s );
        g.closePath();
        g.moveTo( -u, -t );
        g.lineTo(  u,  t );
        g.closePath();
        g.moveTo( -u,  t );
        g.lineTo(  u, -t );
        g.closePath();
    }}
};
