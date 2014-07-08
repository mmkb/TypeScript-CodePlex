//// [sourceMapScopeValidationRenameExportedFunctionInAmd.ts]
export function exportedFunction() {}

//// [sourceMapScopeValidationRenameExportedFunctionInAmd.js]
define(["require", "exports"], function(require, exports) {
    function exportedFunction() {
    }
    exports.exportedFunction = exportedFunction;
});
//# sourceMappingURL=sourceMapScopeValidationRenameExportedFunctionInAmd.js.map
