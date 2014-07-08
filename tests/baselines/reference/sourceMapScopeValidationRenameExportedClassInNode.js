//// [sourceMapScopeValidationRenameExportedClassInNode.ts]
export class exportedClass {}

//// [sourceMapScopeValidationRenameExportedClassInNode.js]
var exportedClass = (function () {
    function exportedClass() {
    }
    return exportedClass;
})();
exports.exportedClass = exportedClass;
//# sourceMappingURL=sourceMapScopeValidationRenameExportedClassInNode.js.map
