function foo(param: {
    (): number;
    (i: number): number;
}[]) { };

foo([
    function () { return 1; },
    function () {return 4 }
]);