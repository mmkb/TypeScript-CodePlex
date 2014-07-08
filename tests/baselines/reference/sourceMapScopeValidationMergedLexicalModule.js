//// [file1.ts]
module Merged {
  export function functionFromFile1() {}
}//// [file2.ts]
module Merged {
  export function functionFromFile2() {
    functionFromFile1();
  }
}


//// [file1.js]
var Merged;
(function (Merged) {
    function functionFromFile1() {
    }
    Merged.functionFromFile1 = functionFromFile1;
})(Merged || (Merged = {}));
//# sourceMappingURL=file1.js.map
//// [file2.js]
var Merged;
(function (Merged) {
    function functionFromFile2() {
        Merged.functionFromFile1();
    }
    Merged.functionFromFile2 = functionFromFile2;
})(Merged || (Merged = {}));
//# sourceMappingURL=file2.js.map
