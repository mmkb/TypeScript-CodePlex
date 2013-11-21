//super.publicInstanceMemberFunction in constructor of derived class
//super.publicInstanceMemberFunction in instance member function of derived class
//super.publicInstanceMemberFunction in instance member accessor(get and set) of derived class
//super.publicStaticMemberFunction in static member function of derived class
//super.publicStaticMemberFunction in static member accessor(get and set) of derived class

class SomeBaseClass {
    public func() {
        return '';
    }

    static func() {
        return 3;
    }

}

class SomeDerivedClass extends SomeBaseClass {
    constructor() {
        super();
        var x = super.func();
        var x: string;
    }

    fn() {
        var x = super.func();
        var x: string;
    }

    get a() {
        var x = super.func();
        var x: string;
        return null;
    }

    set a(n) {
        var x = super.func();
        var x: string;
    }

    static fn() {
        var x = super.func();
        var x: number;
    }

    static get a() {
        var x = super.func();
        var x: number;
        return null;
    }

    static set a(n) {
        var x = super.func();
        var x: number;
    }

}