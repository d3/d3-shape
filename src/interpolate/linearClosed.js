import Linear from "./linear";

function LinearClosed(context) {
  Linear.call(this, context);
}

LinearClosed.prototype = Object.create(Linear.prototype);

LinearClosed.prototype.lineEnd = function() {
  this._context.closePath();
};

export default LinearClosed;
