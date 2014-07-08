//// [sourceMapScopeValidationRestoreHiddenThisInFunctionWithThis.ts]
var arrowFunctionWithThis = () => this;
function functionDeclarationWithRestoredThis() {
  this.a = 1;
}

//// [sourceMapScopeValidationRestoreHiddenThisInFunctionWithThis.js]
var _this = this;
var arrowFunctionWithThis = function () {
    return _this;
};
function functionDeclarationWithRestoredThis() {
    this.a = 1;
}
//# sourceMappingURL=sourceMapScopeValidationRestoreHiddenThisInFunctionWithThis.js.map
