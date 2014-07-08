//// [sourceMapScopeValidationRenameExportedEnumInNode.ts]
export enum exportedEnum {
  one,
  two
}

//// [sourceMapScopeValidationRenameExportedEnumInNode.js]
(function (exportedEnum) {
    exportedEnum[exportedEnum["one"] = 0] = "one";
    exportedEnum[exportedEnum["two"] = 1] = "two";
})(exports.exportedEnum || (exports.exportedEnum = {}));
var exportedEnum = exports.exportedEnum;
//# sourceMappingURL=sourceMapScopeValidationRenameExportedEnumInNode.js.map
