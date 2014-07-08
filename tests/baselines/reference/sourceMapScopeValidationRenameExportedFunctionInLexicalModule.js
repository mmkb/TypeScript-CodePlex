//// [sourceMapScopeValidationRenameExportedFunctionInLexicalModule.ts]
module LexicalModule {
  export function exportedFunction() {}
}

//// [sourceMapScopeValidationRenameExportedFunctionInLexicalModule.js]
var LexicalModule;
(function (LexicalModule) {
    function exportedFunction() {
    }
    LexicalModule.exportedFunction = exportedFunction;
})(LexicalModule || (LexicalModule = {}));
//# sourceMappingURL=sourceMapScopeValidationRenameExportedFunctionInLexicalModule.js.map
