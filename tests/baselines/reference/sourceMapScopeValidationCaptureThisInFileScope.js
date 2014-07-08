//// [sourceMapScopeValidationCaptureThisInFileScope.ts]
var arrowFunctionWithThis = () => this.a = 1;

//// [sourceMapScopeValidationCaptureThisInFileScope.js]
var _this = this;
var arrowFunctionWithThis = function () {
    return _this.a = 1;
};
//# sourceMappingURL=sourceMapScopeValidationCaptureThisInFileScope.js.map
