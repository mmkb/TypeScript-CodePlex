///<reference path='..\..\..\..\src\compiler\typescript.ts' />
///<reference path='..\..\..\..\src\harness\harness.ts' />

describe('Compiling tests\\compiler\\sourceMapperExtensionsTests.ts', function () {
    describe('x_ms_mediaTypes extension', function () {

        // resuable mocks
        var mockJsFile: TypeScript.TextWriter = <any>{
            WriteLine() { }
        };
        var mockDocument0: TypeScript.Document = <any>{
            fileName: "test0.ts"
        };
        var mockDocument1: TypeScript.Document = <any>{
            fileName: "test1.ts"
        };
        var mockDocumentWithDifferentMediaType: TypeScript.Document = <any>{
            fileName: "test2.ts"
        };
        var mockEmitOptions: TypeScript.EmitOptions = <any>{
            sourceMapRootDirectory() { },
            sourceRootDirectory() { },
            commonDirectoryPath() { },
            compilationSettings() {
                return {
                    propagateEnumConstants() { },
                    removeComments() { },
                    noResolve() { },
                    noLib() { },
                    codeGenTarget() { },
                    moduleGenTarget() { },
                    useCaseSensitiveFileResolution() { },
                    noImplicitAny() { },
                    codepage() { },
                    outFileOption() { }
                }
            }
        };

        it("map for one document with media type has 'x_ms_mediaTypes' extension", function () {
            // arrange
            var sourceMap: TypeScript.SourceMap;
            var mockSourceMapOut: TypeScript.TextWriter = <any>{
                Write(value: string) { sourceMap = JSON.parse(value); },
                Close() { }
            };

            // act
            var mapper = new TypeScript.SourceMapper(
                mockJsFile,
                mockSourceMapOut,
                mockDocument0,
                "test.js",
                mockEmitOptions,
                null);
            mapper.emitSourceMapping();

            // assert
            assert.is("x_ms_mediaTypes" in sourceMap, "missing 'x_ms_mediaTypes' extension");
        });

        it("map for one document with media type has matching media type in 'x_ms_mediaTypes' extension", function () {
            // arrange
            var expectedMediaType = "application/x.typescript;version=" + TypeScript.version;
            var sourceMap: TypeScript.SourceMap;
            var mockSourceMapOut: TypeScript.TextWriter = <any>{
                Write(value: string) { sourceMap = JSON.parse(value); },
                Close() { }
            };

            // act
            var mapper = new TypeScript.SourceMapper(
                mockJsFile,
                mockSourceMapOut,
                mockDocument0,
                "test.js",
                mockEmitOptions,
                null);
            mapper.emitSourceMapping();

            // assert
            assert.arrayLengthIs(sourceMap.x_ms_mediaTypes, 1);
            assert.is(sourceMap.x_ms_mediaTypes[0] === expectedMediaType);
        });

        it("map for two documents with same media type has only one entry in 'x_ms_mediaTypes' extension", function () {
            // arrange
            var expectedMediaType = "application/x.typescript;version=" + TypeScript.version;
            var sourceMap: TypeScript.SourceMap;
            var mockSourceMapOut: TypeScript.TextWriter = <any>{
                Write(value: string) { sourceMap = JSON.parse(value); },
                Close() { }
            };

            // act
            var mapper = new TypeScript.SourceMapper(
                mockJsFile,
                mockSourceMapOut,
                mockDocument0,
                "test.js",
                mockEmitOptions,
                null);
            mapper.setNewSourceFile(
                mockDocument1,
                mockEmitOptions);
            mapper.emitSourceMapping();

            // assert
            assert.arrayLengthIs(sourceMap.x_ms_mediaTypes, 1);
            assert.is(sourceMap.x_ms_mediaTypes[0] === expectedMediaType);
        });
    });

    describe('x_ms_compilerFlags extension', function () {
        // resuable mocks
        var mockJsFile: TypeScript.TextWriter = <any>{
            WriteLine() { }
        };
        var mockDocument0: TypeScript.Document = <any>{
            fileName: "test0.ts"
        };
        var mockEmitOptions: TypeScript.EmitOptions = <any>{
            sourceMapRootDirectory() { },
            sourceRootDirectory() { },
            commonDirectoryPath() { },
            compilationSettings() {
                return {
                    propagateEnumConstants() { },
                    removeComments() { },
                    noResolve() { },
                    noLib() { },
                    codeGenTarget() { },
                    moduleGenTarget() { },
                    useCaseSensitiveFileResolution() { },
                    noImplicitAny() { },
                    codepage() { },
                    outFileOption() { }
                }
            }
        };
        var mockEmitOptions2: TypeScript.EmitOptions = <any>{
            sourceMapRootDirectory() { },
            sourceRootDirectory() { },
            commonDirectoryPath() { },
            compilationSettings() {
                return {
                    propagateEnumConstants() { return true; },
                    removeComments() { return true; },
                    noResolve() { return true; },
                    noLib() { return true; },
                    codeGenTarget() { return TypeScript.LanguageVersion.EcmaScript5; },
                    moduleGenTarget() { return TypeScript.ModuleGenTarget.Asynchronous; },
                    useCaseSensitiveFileResolution() { return true },
                    noImplicitAny() { return true },
                    codepage() { return 1033; },
                    outFileOption() { return "test.js"; }
                }
            }
        };

        it("no 'x_ms_compilerFlags' extension when using defaults", function () {
            // arrange
            var sourceMap: TypeScript.SourceMap;
            var mockSourceMapOut: TypeScript.TextWriter = <any>{
                Write(value: string) { sourceMap = JSON.parse(value); },
                Close() { }
            };

            // act
            var mapper = new TypeScript.SourceMapper(
                mockJsFile,
                mockSourceMapOut,
                mockDocument0,
                "test.js",
                mockEmitOptions,
                null);
            mapper.emitSourceMapping();

            // assert
            assert.is(!("x_ms_compilerFlags" in sourceMap), "unexpected 'x_ms_compilerFlags' extension");
        });

        it("has 'x_ms_compilerFlags' extension when non-default flags", function () {
            // arrange
            var sourceMap: TypeScript.SourceMap;
            var mockSourceMapOut: TypeScript.TextWriter = <any>{
                Write(value: string) { sourceMap = JSON.parse(value); },
                Close() { }
            };

            // act
            var mapper = new TypeScript.SourceMapper(
                mockJsFile,
                mockSourceMapOut,
                mockDocument0,
                "test.js",
                mockEmitOptions2,
                null);
            mapper.emitSourceMapping();

            // assert
            assert.is("x_ms_compilerFlags" in sourceMap, "missing 'x_ms_compilerFlags' extension");
        });

        it("correct values for 'x_ms_compilerFlags' extension when non-default flags", function () {
            // arrange
            var sourceMap: TypeScript.SourceMap;
            var mockSourceMapOut: TypeScript.TextWriter = <any>{
                Write(value: string) { sourceMap = JSON.parse(value); },
                Close() { }
            };

            // act
            var mapper = new TypeScript.SourceMapper(
                mockJsFile,
                mockSourceMapOut,
                mockDocument0,
                "test.js",
                mockEmitOptions2,
                null);
            mapper.emitSourceMapping();

            // assert
            assert.equal(sourceMap.x_ms_compilerFlags, "--propagateEnumConstants --removeComments --noResolve --noLib --target ES5 --module amd --useCaseSensitiveFileResolution --noImplicitAny --codepage 1033");
        });
    });

    describe('x_ms_scopes extension', function () {
        // resuable mocks
        var mockJsFile: TypeScript.TextWriter = <any>{
            WriteLine() { }
        };
        var mockDocument0: TypeScript.Document = <any>{
            fileName: "test0.ts"
        };
        var mockDocument1: TypeScript.Document = <any>{
            fileName: "test1.ts"
        };
        var mockDocumentWithDifferentMediaType: TypeScript.Document = <any>{
            fileName: "test2.ts"
        };
        var mockEmitOptions: TypeScript.EmitOptions = <any>{
            sourceMapRootDirectory() { },
            sourceRootDirectory() { },
            commonDirectoryPath() { },
            compilationSettings() {
                return {
                    propagateEnumConstants() { },
                    removeComments() { },
                    noResolve() { },
                    noLib() { },
                    codeGenTarget() { },
                    moduleGenTarget() { },
                    useCaseSensitiveFileResolution() { },
                    noImplicitAny() { },
                    codepage() { },
                    outFileOption() { }
                }
            }
        };

        it("add local in global scope does nothing", function () {
            // arrange
            var sourceMap: TypeScript.SourceMap;
            var mockSourceMapOut: TypeScript.TextWriter = <any>{
                Write(value: string) { sourceMap = JSON.parse(value); },
                Close() { }
            };

            // act
            var mapper = new TypeScript.SourceMapper(
                mockJsFile,
                mockSourceMapOut,
                mockDocument0,
                "test.js",
                mockEmitOptions,
                null);
            mapper.pushScope(0, 0);
            mapper.trackLocal("a");
            mapper.popScope(0, 0);
            mapper.emitSourceMapping();

            // assert
            assert.is(!("x_ms_scopes" in sourceMap), "unexpected 'x_ms_scopes' extension");
            assert.is(!("x_ms_locals" in sourceMap), "unexpected 'x_ms_locals' extension");
        });

        it("hide local in global scope adds only one value to names", function () {
            // arrange
            var sourceMap: TypeScript.SourceMap;
            var mockSourceMapOut: TypeScript.TextWriter = <any>{
                Write(value: string) { sourceMap = JSON.parse(value); },
                Close() { }
            };

            // act
            var mapper = new TypeScript.SourceMapper(
                mockJsFile,
                mockSourceMapOut,
                mockDocument0,
                "test.js",
                mockEmitOptions,
                null);
            mapper.pushScope(0, 0);
            mapper.hideLocal("a");
            mapper.popScope(0, 0);
            mapper.emitSourceMapping();

            // assert
            assert.is(sourceMap.names.length === 1, "names array has wrong length");
            assert.is(sourceMap.names[0] === "a", "names array has wrong name");
        });

        it("hide local in global scope adds only one scope", function () {
            // arrange
            var sourceMap: TypeScript.SourceMap;
            var mockSourceMapOut: TypeScript.TextWriter = <any>{
                Write(value: string) { sourceMap = JSON.parse(value); },
                Close() { }
            };

            // act
            var mapper = new TypeScript.SourceMapper(
                mockJsFile,
                mockSourceMapOut,
                mockDocument0,
                "test.js",
                mockEmitOptions,
                null);
            mapper.pushScope(0, 0);
            mapper.hideLocal("a");
            mapper.popScope(0, 0);
            mapper.emitSourceMapping();

            // assert
            assert.is(sourceMap.x_ms_scopes === "AA>AA<", "names array has wrong length");
        });

        it("hide local in global scope adds only one local without source value", function () {
            // arrange
            var sourceMap: TypeScript.SourceMap;
            var mockSourceMapOut: TypeScript.TextWriter = <any>{
                Write(value: string) { sourceMap = JSON.parse(value); },
                Close() { }
            };

            // act
            var mapper = new TypeScript.SourceMapper(
                mockJsFile,
                mockSourceMapOut,
                mockDocument0,
                "test.js",
                mockEmitOptions,
                null);
            mapper.pushScope(0, 0);
            mapper.hideLocal("a");
            mapper.popScope(0, 0);
            mapper.emitSourceMapping();

            // assert
            assert.is(sourceMap.x_ms_locals === "A", "names array has wrong length");
        });

        it("rename local in global scope adds both values to names", function () {
            // arrange
            var sourceMap: TypeScript.SourceMap;
            var mockSourceMapOut: TypeScript.TextWriter = <any>{
                Write(value: string) { sourceMap = JSON.parse(value); },
                Close() { }
            };

            // act
            var mapper = new TypeScript.SourceMapper(
                mockJsFile,
                mockSourceMapOut,
                mockDocument0,
                "test.js",
                mockEmitOptions,
                null);
            mapper.pushScope(0, 0);
            mapper.renameLocal("this", "this_");
            mapper.popScope(0, 0);
            mapper.emitSourceMapping();

            // assert
            assert.is(sourceMap.names.length === 2, "names array has wrong length");
            assert.is(sourceMap.names[0] === "this", "names[0] was not 'this'");
            assert.is(sourceMap.names[1] === "this_", "names[1] was not 'this_'");
        });


        it("rename local in global scope, add local in nested scope, reverts name", function () {
            // arrange
            var sourceMap: TypeScript.SourceMap;
            var mockSourceMapOut: TypeScript.TextWriter = <any>{
                Write(value: string) { sourceMap = JSON.parse(value); },
                Close() { }
            };

            // act
            var mapper = new TypeScript.SourceMapper(
                mockJsFile,
                mockSourceMapOut,
                mockDocument0,
                "test.js",
                mockEmitOptions,
                null);
            mapper.pushScope(0, 0);
            mapper.renameLocal("this", "this_");
            mapper.pushScope(1, 0);
            mapper.trackLocal("this");
            mapper.popScope(2, 0);
            mapper.popScope(3, 0);
            mapper.emitSourceMapping();

            // assert
            assert.equal(sourceMap.x_ms_scopes, "AA>CA>CA<CA<");
            assert.equal(sourceMap.x_ms_locals, "AC;DA");
        });

        it("rename local in global scope, add local in deep-nested scope, reverts name and simplifies scopes", function () {
            // arrange
            var sourceMap: TypeScript.SourceMap;
            var mockSourceMapOut: TypeScript.TextWriter = <any>{
                Write(value: string) { sourceMap = JSON.parse(value); },
                Close() { }
            };

            // act
            var mapper = new TypeScript.SourceMapper(
                mockJsFile,
                mockSourceMapOut,
                mockDocument0,
                "test.js",
                mockEmitOptions,
                null);

            mapper.pushScope(0, 0);
            mapper.renameLocal("this", "this_");
            mapper.pushScope(1, 0);
            mapper.pushScope(2, 0);
            mapper.trackLocal("this");
            mapper.popScope(3, 0);
            mapper.popScope(4, 0);
            mapper.popScope(5, 0);
            mapper.emitSourceMapping();

            // assert
            assert.equal(sourceMap.x_ms_scopes, "AA>EA>CA<EA<");
            assert.equal(sourceMap.x_ms_locals, "AC;DA");
        });

        it("restore then rename in nested scope has only one result", function () {
            // arrange
            var sourceMap: TypeScript.SourceMap;
            var mockSourceMapOut: TypeScript.TextWriter = <any>{
                Write(value: string) { sourceMap = JSON.parse(value); },
                Close() { }
            };

            // act
            var mapper = new TypeScript.SourceMapper(
                mockJsFile,
                mockSourceMapOut,
                mockDocument0,
                "test.js",
                mockEmitOptions,
                null);

            mapper.pushScope(0, 0);
            mapper.hideLocal("a");
            mapper.pushScope(1, 0);
            mapper.trackLocal("a");
            mapper.renameLocal("a", "b");
            mapper.popScope(3, 0);
            mapper.popScope(4, 0);
            mapper.emitSourceMapping();

            // assert
            assert.equal(sourceMap.x_ms_locals, "A;AC");
        });
    });
});

