//// [sourceMapScopeValidationRenameExportedClassInAmd.ts]
export class exportedClass {}

//// [sourceMapScopeValidationRenameExportedClassInAmd.js]
define(["require", "exports"], function(require, exports) {
    var exportedClass = (function () {
        function exportedClass() {
        }
        return exportedClass;
    })();
    exports.exportedClass = exportedClass;
});
//# sourceMappingURL=sourceMapScopeValidationRenameExportedClassInAmd.js.map
