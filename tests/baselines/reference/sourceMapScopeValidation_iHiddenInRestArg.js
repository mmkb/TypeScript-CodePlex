//// [sourceMapScopeValidation_iHiddenInRestArg.ts]
function functionWithRest(...args: any[]) {
}

//// [sourceMapScopeValidation_iHiddenInRestArg.js]
function functionWithRest() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
}
//# sourceMappingURL=sourceMapScopeValidation_iHiddenInRestArg.js.map
