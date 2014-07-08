//// [consumer.ts]
import e = require('./exporter');

var importedVariable = e.w.exportedVariable;


//// [w1.js]
define(["require", "exports"], function(require, exports) {
    exports.exportedVariable = 1;
});
//# sourceMappingURL=w1.js.map
//// [exporter.js]
define(["require", "exports", './w1'], function(require, exports, w) {
    exports.w = w;
    var importedVariable = exports.w.exportedVariable;
});
//# sourceMappingURL=exporter.js.map
//// [consumer.js]
define(["require", "exports", './exporter'], function(require, exports, e) {
    var importedVariable = e.w.exportedVariable;
});
//# sourceMappingURL=consumer.js.map
