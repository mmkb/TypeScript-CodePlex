//// [sourceMapScopeValidationDoNotRestoreHiddenThisInFunctionWithoutThis.ts]
var arrowFunctionWithThis = () => this;
function functionDeclarationWithRestoredThis() {
}

//// [sourceMapScopeValidationDoNotRestoreHiddenThisInFunctionWithoutThis.js]
var _this = this;
var arrowFunctionWithThis = function () {
    return _this;
};
function functionDeclarationWithRestoredThis() {
}
//# sourceMappingURL=sourceMapScopeValidationDoNotRestoreHiddenThisInFunctionWithoutThis.js.map
