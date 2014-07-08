//// [sourceMapScopeValidationCaptureThisInFuncDecl.ts]
function functionStatementWithCapturedThis() {
  var arrowFunctionWithThis = () => this.a = 1;
}

//// [sourceMapScopeValidationCaptureThisInFuncDecl.js]
function functionStatementWithCapturedThis() {
    var _this = this;
    var arrowFunctionWithThis = function () {
        return _this.a = 1;
    };
}
//# sourceMappingURL=sourceMapScopeValidationCaptureThisInFuncDecl.js.map
