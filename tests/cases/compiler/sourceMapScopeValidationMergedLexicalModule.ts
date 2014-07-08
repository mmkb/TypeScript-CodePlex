// @sourcemap: true
//@Filename: file1.ts
module Merged {
  export function functionFromFile1() {}
}
//@Filename: file2.ts
module Merged {
  export function functionFromFile2() {
    functionFromFile1();
  }
}
