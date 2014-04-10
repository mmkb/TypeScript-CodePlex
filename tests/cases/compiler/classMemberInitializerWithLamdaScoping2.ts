// @Filename: classMemberInitializerWithLamdaScoping2_0.ts
var field1: string;

// @Filename: classMemberInitializerWithLamdaScoping2_1.ts
declare var console: {
    log(msg?: any): void;
};
class Test1 {
    constructor(private field1: string) {
    }
    messageHandler = () => {
        console.log(field1); // But this should be error as the field1 will resolve to var field1 
                             // but since this code would be generated inside constructor, in generated js
                             // it would resolve to private field1 and thats not what user intended here. 
    };
}