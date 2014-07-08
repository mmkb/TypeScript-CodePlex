//// [sourceMapScopeValidationRenameExportedClassInLexicalModule.ts]
module LexicalModule {
  export class exportedClass {}
}

//// [sourceMapScopeValidationRenameExportedClassInLexicalModule.js]
var LexicalModule;
(function (LexicalModule) {
    var exportedClass = (function () {
        function exportedClass() {
        }
        return exportedClass;
    })();
    LexicalModule.exportedClass = exportedClass;
})(LexicalModule || (LexicalModule = {}));
//# sourceMappingURL=sourceMapScopeValidationRenameExportedClassInLexicalModule.js.map
