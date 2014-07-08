//// [sourceMapScopeValidationRenameExportedEnumInLexicalModule.ts]
module LexicalModule {
  export enum exportedEnum {
    one,
    two
  }
}

//// [sourceMapScopeValidationRenameExportedEnumInLexicalModule.js]
var LexicalModule;
(function (LexicalModule) {
    (function (exportedEnum) {
        exportedEnum[exportedEnum["one"] = 0] = "one";
        exportedEnum[exportedEnum["two"] = 1] = "two";
    })(LexicalModule.exportedEnum || (LexicalModule.exportedEnum = {}));
    var exportedEnum = LexicalModule.exportedEnum;
})(LexicalModule || (LexicalModule = {}));
//# sourceMappingURL=sourceMapScopeValidationRenameExportedEnumInLexicalModule.js.map
