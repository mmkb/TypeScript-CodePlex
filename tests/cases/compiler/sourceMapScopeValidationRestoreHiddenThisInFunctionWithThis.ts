//@sourcemap: true
var arrowFunctionWithThis = () => this;
function functionDeclarationWithRestoredThis() {
  this.a = 1;
}