//// [sourceMapScopeValidationRenameExportedVariableInLexicalModule.ts]
module LexicalModule {
  export var exportedVariable = 1;
}

//// [sourceMapScopeValidationRenameExportedVariableInLexicalModule.js]
var LexicalModule;
(function (LexicalModule) {
    LexicalModule.exportedVariable = 1;
})(LexicalModule || (LexicalModule = {}));
//# sourceMappingURL=sourceMapScopeValidationRenameExportedVariableInLexicalModule.js.map
