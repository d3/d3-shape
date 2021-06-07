/* Circle */
export default {
    draw: function( g, size ) { if( size > 0 ) {
        let s = Math.sqrt( size / Math.PI );                // radius
        g.arc( 0, 0, s, 0, 2 * Math.PI );
        g.closePath();
    }}
};
