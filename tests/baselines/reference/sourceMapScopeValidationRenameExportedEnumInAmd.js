//// [sourceMapScopeValidationRenameExportedEnumInAmd.ts]
export enum exportedEnum {
  one,
  two
}

//// [sourceMapScopeValidationRenameExportedEnumInAmd.js]
define(["require", "exports"], function(require, exports) {
    (function (exportedEnum) {
        exportedEnum[exportedEnum["one"] = 0] = "one";
        exportedEnum[exportedEnum["two"] = 1] = "two";
    })(exports.exportedEnum || (exports.exportedEnum = {}));
    var exportedEnum = exports.exportedEnum;
});
//# sourceMappingURL=sourceMapScopeValidationRenameExportedEnumInAmd.js.map
