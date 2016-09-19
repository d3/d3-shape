export function point(that, x, y) {
    that._context.bezierCurveTo(
        that._x1 + that._k * (that._x2 - that._x0),
        that._y1 + that._k * (that._y2 - that._y0),
        that._x2 + that._k * (that._x1 - x),
        that._y2 + that._k * (that._y1 - y),
        that._x2,
        that._y2
    );
}

export function Helix(context, tension, curvature, dx, dy) {
    this._context = context;
    this._k = (1 - tension) /curvature;
    this._dx = dx;
    this._dy = dy;
    this._=[]
}

Helix.prototype = {
    areaStart: noop,
    areaEnd: noop,
    lineStart: function() {
        this._x0 = this._x1 = this._x2 =
            this._y0 = this._y1 = this._y2 = NaN;
        this._point = 0;
    },
    lineEnd: function(backtracked) {
        switch (this._point) {
            case 2: this._context.lineTo(this._x2, this._y2); break;
            case 3: point(this, this._x1, this._y1); break;
        }
        if(backtracked) {
            this._context.closePath();
            return;
        }
        this._line = true;
        this._.reverse();
        this.lineStart();
        this._dx = -this._dx;
        this._dy = -this._dy;
        var n = this._.length;
        for( var i=0; i<n; i++) {
            this.point(this._[i][0], this._[i][1]);
        }
        this.lineEnd(true);
    },
    point: function(x, y) {
        this._.push([x,y]);
        x = +x, y = +y;
        x -= this._dx;
        y -= this._dy;
        switch (this._point) {
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
            case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
            case 2: this._point = 3; // proceed
            default: point(this, x, y); break;
        }
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
};

export default (function custom(tension, curvature, dx, dy) {

    helix._tension = tension;
    helix._dx = dx;
    helix._dy = dy;
    helix._c = curvature;

    function helix(context) {
        return new Helix(context, helix._tension, helix._c, helix._dx, helix._dy);
    }

    helix.curvature = function(c){
        helix._c = c;
        return helix;
    };

    helix.dx = function(dx){
        helix._dx = dx;
        return helix;
    };

    helix.dy = function(dy){
        helix._dy = dy;
        return helix;
    };

    helix.tension = function(tension) {
        helix._tension = tension;
        return helix;
    };

    return helix;
})(0, 3, 10, 5);
