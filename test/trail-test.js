var tape = require("tape"),
    shape = require("../");

require("./pathEqual");

tape("trail() returns a default trail shape", function(test){
    var t = shape.trail();
    test.equal(t.x()([10, 20, 30]), 10);
    test.equal(t.y()([10, 20, 30]), 20);
    test.equal(t.size()([10, 20, 30]), 30);
    test.equal(t.defined()([10, 20, 30]), true);
    test.equal(t.context(), null);
    test.pathEqual(t([[10, 10, 20], [50, 50, 50], [90, 90, 20]]), "M14.942945,1.307055L62.357363,28.267637A25,25,0,0,1,71.732363,37.642637L98.692945,85.057055A10,10,0,0,1,85.057055,98.692945L37.642637,71.732363A25,25,0,0,1,28.267637,62.357363L1.307055,14.942945A10,10,0,0,1,14.942945,1.307055Z");
    test.end();
});

tape("trail(x, y, size) sets x, y and size", function(test){
    var x = function() {},
        y = function() {},
        size = function() {};
    test.equal(shape.trail(x).x(), x);
    test.equal(shape.trail(x, y).y(), y);
    test.equal(shape.trail(x, y, size).size(), size);
    test.equal(shape.trail(1, 2, 3).x()("aa"), 1);
    test.equal(shape.trail(1, 2, 3).y()("aa"), 2);
    test.equal(shape.trail(1, 2, 3).size()("aa"), 3);
    test.end();
});

tape("trail.x(f)(data) passes d, i, and data to the specified function f", function(test){
    var data = ["a", "b"], actual = [];
    shape.trail().x(function() { actual.push([].slice.call(arguments)); })(data);
    test.deepEqual(actual, [['a', 0, data], ['b', 1, data], ['a', 0, data], ['b', 1, data], ['b', 1, data], ['a', 0, data], ['a', 0, data], ['b', 1, data]]);
    test.end();
});

tape("trail.y(f)(data) passes d, i and data to the specified function f", function(test) {
    var data = ["a", "b"], actual = [];
    shape.trail().y(function() { actual.push([].slice.call(arguments)); })(data);
    test.deepEqual(actual, [['a', 0, data], ['b', 1, data], ['a', 0, data], ['b', 1, data], ['b', 1, data], ['a', 0, data], ['a', 0, data], ['b', 1, data]]);
    test.end();
});

//two cycles - for(i = 0; i < n; i++){...}
tape("trail.size(f)(data) passes d, i and data to the specified function f", function(test) {
    var data = ["a", "b"], actual = [];
    shape.trail().size(function() { actual.push([].slice.call(arguments)); })(data);
    test.deepEqual(actual, [['a', 0, data], ['b', 1, data], ['a', 0, data], ['b', 1, data], ['b', 1, data], ['a', 0, data], ['a', 0, data], ['b', 1, data]]);
    test.end();
});

tape("trail.defined(f)(data) passes d, i and data to the specified function f", function(test){
    var data = ["a", "b"], actual = [];
    shape.trail().defined(function() { actual.push([].slice.call(arguments)); })(data);
    test.deepEqual(actual, [["a", 0, data], ["b", 1, data], ["a", 0, data], ["b", 1, data]]);
    test.end();
});

tape("trail.x(x)(data) observes the specified function", function(test){
    var t = shape.trail().x(function(d) { return d.x; });
    test.pathEqual(t([{x: 10, 1: 10, 2: 20}, {x: 50, 1: 50, 2: 50}, {x: 90, 1: 90, 2: 20}]), "M14.942945,1.307055L62.357363,28.267637A25,25,0,0,1,71.732363,37.642637L98.692945,85.057055A10,10,0,0,1,85.057055,98.692945L37.642637,71.732363A25,25,0,0,1,28.267637,62.357363L1.307055,14.942945A10,10,0,0,1,14.942945,1.307055Z");
    test.end();
});

tape("trail.x(x)(data) observes the specified constant", function(test){
    var t = shape.trail().x(0);
    test.pathEqual(t([{1: 10, 2: 20}, {1: 50, 2: 50}, {1: 90, 2: 20}]), "M9.270248,6.250000L23.175620,40.625000A25,25,0,0,1,23.175620,59.375000L9.270248,93.750000A10,10,0,0,1,-9.270248,93.750000L-23.175620,59.375000A25,25,0,0,1,-23.175620,40.625000L-9.270248,6.250000A10,10,0,0,1,9.270248,6.250000Z");
    test.end();
});

tape("trail.y(x)(data) observes the specified function", function(test){
    var t = shape.trail().y(function(d) { return d.y; });
    test.pathEqual(t([{0: 10, y: 10, 2: 20}, {0: 50, y: 50, 2: 50}, {0: 90, y: 90, 2: 20}]), "M14.942945,1.307055L62.357363,28.267637A25,25,0,0,1,71.732363,37.642637L98.692945,85.057055A10,10,0,0,1,85.057055,98.692945L37.642637,71.732363A25,25,0,0,1,28.267637,62.357363L1.307055,14.942945A10,10,0,0,1,14.942945,1.307055Z");
    test.end();
});

tape("trail.y(x)(data) observes the specified constant", function(test){
    var t = shape.trail().y(0);
    test.pathEqual(t([{0: 10, 2: 20}, {0: 50, 2: 50}, {0: 90, 2: 20}]), "M6.250000,-9.270248L40.625000,-23.175620A25,25,0,0,1,59.375000,-23.175620L93.750000,-9.270248A10,10,0,0,1,93.750000,9.270248L59.375000,23.175620A25,25,0,0,1,40.625000,23.175620L6.250000,9.270248A10,10,0,0,1,6.250000,-9.270248Z");
    test.end();
});

tape("trail.size(x)(data) observes the specified function", function(test){
    var t = shape.trail().size(function(d) { return d.size; });
    test.pathEqual(t([{0: 10, 1: 10, size: 20}, {0: 50, 1: 50, size: 50}, {0: 90, 1: 90, size: 20}]), "M14.942945,1.307055L62.357363,28.267637A25,25,0,0,1,71.732363,37.642637L98.692945,85.057055A10,10,0,0,1,85.057055,98.692945L37.642637,71.732363A25,25,0,0,1,28.267637,62.357363L1.307055,14.942945A10,10,0,0,1,14.942945,1.307055Z");
    test.end();
});

tape("trail.size(x)(data) observes the specified constant", function(test){
    var t = shape.trail().size(20);
    test.pathEqual(t([{0: 10, 1: 10}, {0: 50, 1: 50}, {0: 90, 1: 10}]), "M17.071068,2.928932L50,35.857864L82.928932,2.928932A10,10,0,1,1,97.071068,17.071068L57.071068,57.071068A10,10,0,0,1,42.928932,57.071068L2.928932,17.071068A10,10,0,1,1,17.071068,2.928932Z");
    test.end();
});