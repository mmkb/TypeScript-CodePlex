//// [sourceMapScopeValidationRenameModuleWithConflictingChild.ts]
module conflictingName {
  export function conflictingName() {
  }
}

//// [sourceMapScopeValidationRenameModuleWithConflictingChild.js]
var conflictingName;
(function (_conflictingName) {
    function conflictingName() {
    }
    _conflictingName.conflictingName = conflictingName;
})(conflictingName || (conflictingName = {}));
//# sourceMappingURL=sourceMapScopeValidationRenameModuleWithConflictingChild.js.map
