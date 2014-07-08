//// [sourceMapScopeValidationCaptureThisInNamedFuncExpr.ts]
(function functionStatementWithCapturedThis() {
  var arrowFunctionWithThis = () => this.a = 1;
})

//// [sourceMapScopeValidationCaptureThisInNamedFuncExpr.js]
(function functionStatementWithCapturedThis() {
    var _this = this;
    var arrowFunctionWithThis = function () {
        return _this.a = 1;
    };
});
//# sourceMappingURL=sourceMapScopeValidationCaptureThisInNamedFuncExpr.js.map
