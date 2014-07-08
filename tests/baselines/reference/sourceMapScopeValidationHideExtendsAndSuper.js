//// [sourceMapScopeValidationHideExtendsAndSuper.ts]
class SuperClass {}
class SubClass extends SuperClass {} 

//// [sourceMapScopeValidationHideExtendsAndSuper.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SuperClass = (function () {
    function SuperClass() {
    }
    return SuperClass;
})();
var SubClass = (function (_super) {
    __extends(SubClass, _super);
    function SubClass() {
        _super.apply(this, arguments);
    }
    return SubClass;
})(SuperClass);
//# sourceMappingURL=sourceMapScopeValidationHideExtendsAndSuper.js.map
