define(["require", "exports"], function(require, exports) {
    (function (a) {
        (function (weekend) {
            weekend[weekend["Friday"] = 0] = "Friday";
            weekend[weekend["Saturday"] = 1] = "Saturday";
            weekend[weekend["Sunday"] = 2] = "Sunday";
        })(a.weekend || (a.weekend = {}));
        var weekend = a.weekend;
    })(exports.a || (exports.a = {}));
    var a = exports.a;

    var b = a.weekend;
    exports.b = b;
    exports.bVal = exports.b.Sunday;
});