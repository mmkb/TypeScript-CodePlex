//// [sourceMapScopeValidationRestoreHiddenThisInFunction.ts]
var arrowFunctionWithThis = () => this;
function functionDeclarationWithRestoredThis() {
  this.a = 1;
}

//// [sourceMapScopeValidationRestoreHiddenThisInFunction.js]
var _this = this;
var arrowFunctionWithThis = function () {
    return _this;
};
function functionDeclarationWithRestoredThis() {
    this.a = 1;
}
//# sourceMappingURL=sourceMapScopeValidationRestoreHiddenThisInFunction.js.map
