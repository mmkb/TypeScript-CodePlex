//// [sourceMapScopeValidationRenameEnumMembers.ts]
enum enumWithMembers {
  one,
  two,
  three = one
}

//// [sourceMapScopeValidationRenameEnumMembers.js]
var enumWithMembers;
(function (enumWithMembers) {
    enumWithMembers[enumWithMembers["one"] = 0] = "one";
    enumWithMembers[enumWithMembers["two"] = 1] = "two";
    enumWithMembers[enumWithMembers["three"] = enumWithMembers.one] = "three";
})(enumWithMembers || (enumWithMembers = {}));
//# sourceMappingURL=sourceMapScopeValidationRenameEnumMembers.js.map
