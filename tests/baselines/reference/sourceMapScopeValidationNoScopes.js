//// [sourceMapScopeValidationNoScopes.ts]
var fileScopeVariable = 1;
function funcWithThis() {  
  this.property = 1;
}

//// [sourceMapScopeValidationNoScopes.js]
var fileScopeVariable = 1;
function funcWithThis() {
    this.property = 1;
}
//# sourceMappingURL=sourceMapScopeValidationNoScopes.js.map
