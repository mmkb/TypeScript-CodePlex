//// [sourceMapScopeValidationRenameExportedVariableInAmd.ts]
export var exportedVariable = 1;

//// [sourceMapScopeValidationRenameExportedVariableInAmd.js]
define(["require", "exports"], function(require, exports) {
    exports.exportedVariable = 1;
});
//# sourceMappingURL=sourceMapScopeValidationRenameExportedVariableInAmd.js.map
