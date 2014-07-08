//
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='references.ts' />

module TypeScript {
    export class SourceMapPosition {
        public sourceLine: number;
        public sourceColumn: number;
        public emittedLine: number;
        public emittedColumn: number;
    }

    export class SourceMapping {
        public start = new SourceMapPosition();
        public end = new SourceMapPosition();
        public nameIndex: number = -1;
        public childMappings: SourceMapping[] = [];
    }

    export class SourceMapperOutput {
        constructor(
            public sourceMapEntries: SourceMapEntry[],
            public sourceMapRootScopes: SourceMapScope[]) {
        }
    }

    export class SourceMapEntry {
        constructor(
            public emittedFile: string,
            public emittedLine: number,
            public emittedColumn: number,
            public sourceFile: string,
            public sourceLine: number,
            public sourceColumn: number,
            public sourceName: string) {

            Debug.assert(isFinite(emittedLine));
            Debug.assert(isFinite(emittedColumn));
            Debug.assert(isFinite(sourceColumn));
            Debug.assert(isFinite(sourceLine));
        }
    }

    export interface SourceMap {
        version: number;
        file: string;
        sourceRoot?: string;
        sources: string[];
        names?: string[];
        mappings: string;

        // extensions for media types
        x_ms_mediaTypes?: string[];
        x_ms_sourceMediaTypes?: number[];

        // extensions for compiler flags
        x_ms_compilerFlags?: string;

        // extensions for scopes and locals
        // a VLQ encoded string of scopes in the form VLQ([lineOffset, columnOffset]) '>' or '<', 
        // where '>' denotes entering a scope and '<' denotes exiting a scope
        x_ms_scopes?: string;

        // a VLQ encoded string of local mappings seperated by ';' for each scope and ',' for each 
        // local, in the form VLQ([generatedNameOffset, sourceNameOffset?])
        x_ms_locals?: string;
    }

    /**
     * Contains information about a scope
     */
    export class SourceMapScope {

        // Represents the "index" for a hidden local.
        static HIDDEN_LOCAL = "#hidden";

        // Any nested scopes that have a rename
        public nested: SourceMapScope[] = [];

        private _locals: IIndexable<string> = typeof Object.create === "function" ? Object.create(null) : {};

        constructor(
            public parent: SourceMapScope,

            // The line number for the start of the scope
            public startLine: number,

            // The column number for the start of the scope
            public startColumn: number,

            // The line number for the end of the scope
            public endLine: number = 0,
            
            // The column number for the end of the scope
            public endColumn: number = 0) {

            if (parent) {
                parent.nested.push(this);
            }
        }

        /**
         * Hides a named local
         * @param name The name for the local to hide
         */
        public hideLocal(name: string): void {            
            this.setLocal(name, SourceMapScope.HIDDEN_LOCAL);
        }

        /**
         * Tracks an identifier with the provided name 
         * @param name The name for the local
         */
        public trackLocal(name: string): void {
            this.setLocal(name, name);
        }

        /**
         * Renames/aliases an identifier with the provided name index from the source to the name index for the generated output
         * @param from The name for the local to rename
         * @param to The name or expression to use for the renamed local
         */
        public renameLocal(from: string, to: string): void {
            this.setLocal(from, to);
        }

        /**
         * Executes the supplied callback for each local defined in this current scope
         * @param callback The callback to execute
         * @remarks
         * The callback is only executed if the following conditions are met:
         * - If there is no mapping in an ancestor scope and we're tracking or restoring the local, don't emit
         * - If the name or expression the local is mapped to is the same as the mapping in an ancestor scope, don't emit
         * - If the name is being hidden, but was renamed in an ancestor scope, don't emit
         * - Otherwise, emit
         */
        public forEachLocal(callback: (from: string, to: string) => void): void {
            for (var key in this._locals) {
                var to = this._locals[key];
                if (to) {
                    var from = key.substr(1);
                    var previous = this.parent ? this.parent.getLocal(from) : undefined;

                    // if there's no previous value and we're tracking/restoring, don't emit
                    if (previous == null && from == to) {
                        continue;
                    }

                    // if we haven't changed, don't emit
                    if (to == previous) {
                        continue;
                    }

                    // if we're hiding a name, but its a rename in a parent scope, don't emit
                    if (previous != null && from != previous && to == SourceMapScope.HIDDEN_LOCAL) {
                        continue;
                    }

                    // emit the local
                    callback(from, to);
                }
            }
        }

        /**
         * Executes the supplied callback for each local defined in this current scope and all nested scopes
         * @param callback The callback to execute
         * @remarks
         * The callback is only executed if the following conditions are met:
         * - If there is no mapping in an ancestor scope and we're tracking or restoring the local, don't emit
         * - If the name or expression the local is mapped to is the same as the mapping in an ancestor scope, don't emit
         * - If the name is being hidden, but was renamed in an ancestor scope, don't emit
         * - Otherwise, emit
         */
        public forEachLocalFlat(callback: (scope: SourceMapScope, from: string, to: string) => void): void {
            this.forEachLocal((from, to) => callback(this, from, to));
            this.nested.forEach(nested => nested.forEachLocalFlat(callback));
        }
        
        /**
         * Gets a mapping from one local to another local (or expression) defined in this scope or any ancestor scope
         * @param name The name of the local
         * @returns The mapped name or expression if one was defined; otherwise, undefined.
         */
        private getLocal(name: string): string {
            for (var ancestor = this; ancestor != null; ancestor = ancestor.parent) {
                var value = ancestor._locals["#" + name];
                if (value != null) {
                    return value;
                }
            }
        }

        /**
         * Sets a mapping from one local to another local (or expression)
         * @param from The name from which to map
         * @param to The name to which to map
         */
        private setLocal(from: string, to: string): void {
            this._locals["#" + from] = to;
        }
    }

    export class SourceMapper {
        static MapFileExtension = ".map";

        private static _defaultDocumentMediaType: string[];

        private jsFileName: string;
        private sourceMapPath: string;
        private sourceMapDirectory: string;
        private sourceRoot: string;
        private compilerFlags: string;

        // scoping information
        private topScope: SourceMapScope;
        private currentScope: SourceMapScope;
        private sourceMapRootScopes: SourceMapScope[] = [];

        public names: string[] = [];
        private nameIndices: IdentifierNameHashTable<number> = new IdentifierNameHashTable<number>();

        private mappingLevel: IASTSpan[] = [];

        // Below two arrays represent the information about sourceFile at that index.
        private tsFilePaths: string[] = [];
        private allSourceMappings: SourceMapping[][] = [];

        public currentMappings: SourceMapping[][];
        public currentNameIndex: number[];

        private sourceMapEntries: SourceMapEntry[] = [];

        constructor(private jsFile: TextWriter,
                    private sourceMapOut: TextWriter,
                    document: Document,
                    jsFilePath: string,
                    emitOptions: EmitOptions,
                    resolvePath: (path: string) => string) {
            this.setSourceMapOptions(document, jsFilePath, emitOptions, resolvePath);
            this.setNewSourceFile(document, emitOptions);
            this.setCompilerFlags(emitOptions.compilationSettings());
        }

        // The media type to use for the media type extension
        static defaultDocumentMediaType(): string[] {
            if (!SourceMapper._defaultDocumentMediaType) {
                SourceMapper._defaultDocumentMediaType = ["application/x.typescript;version=" + TypeScript.version];
            }

            return SourceMapper._defaultDocumentMediaType;
        }

        public getOutputFile(): OutputFile {
            var result = this.sourceMapOut.getOutputFile();
            result.sourceMapOutput = new SourceMapperOutput(
                this.sourceMapEntries,
                this.sourceMapRootScopes);
            return result;
        }
        
        public increaseMappingLevel(ast: IASTSpan) {
            this.mappingLevel.push(ast);
        }

        public decreaseMappingLevel(ast: IASTSpan) {
            Debug.assert(this.mappingLevel.length > 0, "Mapping level should never be less than 0. This suggests a missing start call.");
            var expectedAst = this.mappingLevel.pop();
            var expectedAstInfo: any = (<AST>expectedAst).kind ? SyntaxKind[(<AST>expectedAst).kind()] : [expectedAst.start(), expectedAst.end()];
            var astInfo: any = (<AST>ast).kind ? SyntaxKind[(<AST>ast).kind()] : [ast.start(), ast.end()]
            Debug.assert(
                ast === expectedAst,
                "Provided ast is not the expected AST, Expected: " + expectedAstInfo + " Given: " + astInfo)
        }

        /**
         * Looks up the name associated with the provided index
         * @param nameIndex the index of the name in the source map's names array
         * @returns The name for the index, or undefined
         */
        public lookupName(nameIndex: number): string {
            return this.names[nameIndex];
        }

        /**
         * Looks up the index associated with the provided name
         * @param name the name to look up
         * @returns The index of the name
         */
        public lookupNameIndex(name: string): number {
            var nameIndex = this.nameIndices.lookup(name);
            if (nameIndex !== null) {
                return nameIndex;
            }

            return -1;
        }

        /**
         * Adds a name to the names collection, or returns the index of the name if already present
         * @param name The name to add
         * @returns The index of the name
         */
        public getOrAddName(name: string): number {
            var nameIndex = this.lookupNameIndex(name);
            if (nameIndex === -1) {
                nameIndex = this.names.length;
                this.names.push(name);
                this.nameIndices.add(name, nameIndex);
            }

            return nameIndex;
        }

        /**
         * Enter a new scope at the provided position
         * @param startLine the line number of the start of this scope
         * @param startColumn the column number of the start of this scope
         */
        public pushScope(startLine: number, startColumn: number): void {
            this.currentScope = new SourceMapScope(this.currentScope, startLine, startColumn);
        }

        /**
         * Exit and save the current scope at the provided position
         * @param endLine the line number of the end of this scope
         * @param endColumn the column number of the end of this scope
         */
        public popScope(endLine: number, endColumn: number): void {
            var scope = this.currentScope;
            this.currentScope = scope.parent;
            scope.endLine = endLine;
            scope.endColumn = endColumn;
            if (!this.currentScope) {
                this.topScope = scope;
            }
        }
        
        /**
         * Tracks a local that is the same in both the source and generated files
         * @param name The name of the identifier in the source file
         */
        public trackLocal(name: string): void {
            if (!name) throw Errors.argumentNull("name");
            this.currentScope.trackLocal(name);
        }

        /**
         * Hides a local identifier in the current scope
         * @param name The name of the identifier in the generated output
         */
        public hideLocal(name: string): void {
            if (!name) throw Errors.argumentNull("name");
            this.currentScope.hideLocal(name);
        }

        /**
         * Renames (or restores the name) of a local identifier in the current scope
         * @param fromName The name of the identifier in the source file
         * @param toName The name of the identifier in the generated output
         */
        public renameLocal(from: string, to: string): void {
            if (!from) throw Errors.argumentNull("from");
            if (!to) throw Errors.argumentNull("to");
            this.currentScope.renameLocal(from, to);
        }

        public setNewSourceFile(document: Document, emitOptions: EmitOptions) {
            // Set new mappings
            var sourceMappings: SourceMapping[] = [];
            this.allSourceMappings.push(sourceMappings);
            this.currentMappings = [sourceMappings];
            this.currentNameIndex = [];

            // Set new source file path
            this.setNewSourceFilePath(document, emitOptions);
        }

        private setSourceMapOptions(document: Document, jsFilePath: string, emitOptions: EmitOptions, resolvePath: (path: string) => string) {
            // Decode mapRoot and sourceRoot

            // Js File Name = pretty name of js file
            var prettyJsFileName = TypeScript.getPrettyName(jsFilePath, false, true);
            var prettyMapFileName = prettyJsFileName + SourceMapper.MapFileExtension;
            this.jsFileName = prettyJsFileName;

            // Figure out sourceMapPath and sourceMapDirectory
            if (emitOptions.sourceMapRootDirectory()) {
                // Get the sourceMap Directory
                this.sourceMapDirectory = emitOptions.sourceMapRootDirectory();
                if (document.emitToOwnOutputFile()) {
                    // For modules or multiple emit files the mapRoot will have directory structure like the sources
                    // So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
                    this.sourceMapDirectory = this.sourceMapDirectory + switchToForwardSlashes(getRootFilePath((document.fileName)).replace(emitOptions.commonDirectoryPath(), ""));
                }

                if (isRelative(this.sourceMapDirectory)) {
                    // The relative paths are relative to the common directory
                    this.sourceMapDirectory = emitOptions.commonDirectoryPath() + this.sourceMapDirectory;
                    this.sourceMapDirectory = convertToDirectoryPath(switchToForwardSlashes(resolvePath(this.sourceMapDirectory)));
                    this.sourceMapPath = getRelativePathToFixedPath(getRootFilePath(jsFilePath), this.sourceMapDirectory + prettyMapFileName);
                }
                else {
                    this.sourceMapPath = this.sourceMapDirectory + prettyMapFileName;
                }
            }
            else {
                this.sourceMapPath = prettyMapFileName;
                this.sourceMapDirectory = getRootFilePath(jsFilePath);
            }
            this.sourceRoot = emitOptions.sourceRootDirectory();
        }

        private setNewSourceFilePath(document: Document, emitOptions: EmitOptions) {
            var tsFilePath = switchToForwardSlashes(document.fileName);
            if (emitOptions.sourceRootDirectory()) {
                // Use the relative path corresponding to the common directory path
                tsFilePath = getRelativePathToFixedPath(emitOptions.commonDirectoryPath(), tsFilePath);
            }
            else {
                // Source locations relative to map file location
                tsFilePath = getRelativePathToFixedPath(this.sourceMapDirectory, tsFilePath);
            }
            this.tsFilePaths.push(tsFilePath);
        }
        
        // Generate source mapping.
        // Creating files can cause exceptions, they will be caught higher up in TypeScriptCompiler.emit
        public emitSourceMapping(): void {
            Debug.assert(
                this.mappingLevel.length === 0,
                "Mapping level is not 0. This suggest a missing end call. Value: " +
                this.mappingLevel.map(item => ['Node of type', SyntaxKind[(<AST>item).kind()], 'at', item.start(), 'to', item.end()].join(' ')).join(', '));
            // Output map file name into the js file
            this.jsFile.WriteLine("//# sourceMappingURL=" + this.sourceMapPath);

            // Now output map file
            var mappingsString = "";

            var prevEmittedColumn = 0;
            var prevEmittedLine = 0;
            var prevSourceColumn = 0;
            var prevSourceLine = 0;
            var prevSourceIndex = 0;
            var prevNameIndex = 0;
            var emitComma = false;

            var recordedPosition: SourceMapPosition = null;
            for (var sourceIndex = 0; sourceIndex < this.tsFilePaths.length; sourceIndex++) {
                var recordSourceMapping = (mappedPosition: SourceMapPosition, nameIndex: number) => {

                    if (recordedPosition !== null &&
                        recordedPosition.emittedColumn === mappedPosition.emittedColumn &&
                        recordedPosition.emittedLine === mappedPosition.emittedLine) {
                        // This position is already recorded
                        return;
                    }

                    // Record this position
                    if (prevEmittedLine !== mappedPosition.emittedLine) {
                        while (prevEmittedLine < mappedPosition.emittedLine) {
                            prevEmittedColumn = 0;
                            mappingsString = mappingsString + ";";
                            prevEmittedLine++;
                        }
                        emitComma = false;
                    }
                    else if (emitComma) {
                        mappingsString = mappingsString + ",";
                    }

                    this.sourceMapEntries.push(new SourceMapEntry(
                        this.jsFileName,
                        mappedPosition.emittedLine + 1,
                        mappedPosition.emittedColumn + 1,
                        this.tsFilePaths[sourceIndex],
                        mappedPosition.sourceLine,
                        mappedPosition.sourceColumn + 1,
                        nameIndex >= 0 ? this.names[nameIndex] : undefined));

                    // 1. Relative Column
                    mappingsString = mappingsString + Base64VLQFormat.encode(mappedPosition.emittedColumn - prevEmittedColumn);
                    prevEmittedColumn = mappedPosition.emittedColumn;

                    // 2. Relative sourceIndex 
                    mappingsString = mappingsString + Base64VLQFormat.encode(sourceIndex - prevSourceIndex);
                    prevSourceIndex = sourceIndex;

                    // 3. Relative sourceLine 0 based
                    mappingsString = mappingsString + Base64VLQFormat.encode(mappedPosition.sourceLine - 1 - prevSourceLine);
                    prevSourceLine = mappedPosition.sourceLine - 1;

                    // 4. Relative sourceColumn 0 based 
                    mappingsString = mappingsString + Base64VLQFormat.encode(mappedPosition.sourceColumn - prevSourceColumn);
                    prevSourceColumn = mappedPosition.sourceColumn;

                    // 5. Relative namePosition 0 based
                    if (nameIndex >= 0) {
                        mappingsString = mappingsString + Base64VLQFormat.encode(nameIndex - prevNameIndex);
                        prevNameIndex = nameIndex;
                    }

                    emitComma = true;
                    recordedPosition = mappedPosition;
                };

                // Record starting spans
                var recordSourceMappingSiblings = (sourceMappings: SourceMapping[]) => {
                    for (var i = 0; i < sourceMappings.length; i++) {
                        var sourceMapping = sourceMappings[i];
                        recordSourceMapping(sourceMapping.start, sourceMapping.nameIndex);
                        recordSourceMappingSiblings(sourceMapping.childMappings);
                        recordSourceMapping(sourceMapping.end, sourceMapping.nameIndex);
                    }
                };

                recordSourceMappingSiblings(this.allSourceMappings[sourceIndex]);
            }

            var sourceMap: SourceMap = {
                version: 3,
                file: this.jsFileName,
                sourceRoot: this.sourceRoot,
                sources: this.tsFilePaths,
                names: this.names,
                mappings: mappingsString
            };
            
            // add source-map extensions
            this.addExtensions(sourceMap);

            // Write the actual map file
            this.sourceMapOut.Write(JSON.stringify(sourceMap));

            // Closing files could result in exceptions, report them if they occur
            this.sourceMapOut.Close();
        }

        private addExtensions(sourceMap: SourceMap): void {
            this.addMediaTypeExtension(sourceMap);
            this.addCompilerFlagsExtension(sourceMap);
            this.addScopesExtension(sourceMap);
        }

        private addMediaTypeExtension(sourceMap: SourceMap): void {
            // emit the media types
            sourceMap.x_ms_mediaTypes = SourceMapper.defaultDocumentMediaType();
        }

        private setCompilerFlags(compilationSettings: ImmutableCompilationSettings): void {
            var compilerFlags: string[] = [];
            if (compilationSettings.propagateEnumConstants()) {
                compilerFlags.push("--propagateEnumConstants");
            }

            if (compilationSettings.removeComments()) {
                compilerFlags.push("--removeComments");
            }

            if (compilationSettings.noResolve()) {
                compilerFlags.push("--noResolve");
            }

            if (compilationSettings.noLib()) {
                compilerFlags.push("--noLib");
            }

            switch (compilationSettings.codeGenTarget()) {
                case LanguageVersion.EcmaScript3:
                    compilerFlags.push("--target ES3");
                    break;

                case LanguageVersion.EcmaScript5:
                    compilerFlags.push("--target ES5");
                    break;
            }

            switch (compilationSettings.moduleGenTarget()) {
                case ModuleGenTarget.Asynchronous:
                    compilerFlags.push("--module amd");
                    break;

                case ModuleGenTarget.Synchronous:
                    compilerFlags.push("--module commonjs");
                    break;
            }

            if (compilationSettings.useCaseSensitiveFileResolution()) {
                compilerFlags.push("--useCaseSensitiveFileResolution");
            }

            if (compilationSettings.noImplicitAny()) {
                compilerFlags.push("--noImplicitAny");
            }

            var codepage = compilationSettings.codepage();
            if (codepage) {
                compilerFlags.push("--codepage " + codepage);
            }

            this.compilerFlags = compilerFlags.join(" ");
        }

        private addCompilerFlagsExtension(sourceMap: SourceMap): void {
            if (this.compilerFlags) {
                sourceMap.x_ms_compilerFlags = this.compilerFlags;
            }
        }

        private addScopesExtension(sourceMap: SourceMap): void {
            if (!this.topScope) {
                return;
            }

            // x_ms_scopes:
            //
            //   The "x_ms_scopes" property consists of a string that contains the line 
            //   and column offsets of the beginning and end of any lexical scope that contains
            //   renamed or hidden locals.
            // 
            //   The format consists of a Base64VLQ encoded tuple of <line offset><column offset> 
            //   followed by either a single greater-than ('>') character that indicates the start 
            //   of a new nested scope, or a single less-than ('<') character that indicates 
            //   the end of the current nested scope.
            //
            //   As each nested scope is defined it is assigned an ordinal index, starting from 0.
            //
            //   Example:
            //
            //     ...
            //     "x_ms_scopes": "AA>CA<"
            //     ...
            //
            //   This indicates a new nested scope with index 0 from 0,0 to 1,0.
            //
            // x_ms_locals:
            //
            //   This string consists of a series of Base64VLQ encoded records delimited by a 
            //   semi-colon (';') when the scope index should be incremented, and a comma (',') when 
            //   a new local record starts for the same scope index.
            //
            //   Each record consists of one or two fields encoded using the Base64 VLQ format that 
            //   contain. Offsets into the "names" array, starting from 0.
            //
            //   A record that contains a single field indicates a local that should be hidden
            //   from a debugger in watches and locals.
            //
            //   A record that contains two fields indicates a local within the current scope in the 
            //   source file and the identifier or expression that should be used in its place within
            //   that scope for watches and locals.
            //
            //   Whether the record contains one or two fields, both offsets apply to the current
            //   index into the "names" array.
            //
            //   Example:
            //
            //     ...
            //     "names": ["__extends", "_super", "this", "_this"],
            //     "x_ms_scopes": "AA>CA>CA>CA<8BK<CA",
            //     "x_ms_locals": "A,C,C;AC,A;CA"
            //     ...
            //
            //   This indicates:
            //     - "__extends" should be hidden in scope 0. 
            //     - "_super" should be hidden in scope 0.
            //     - "this" should use "_this" in scope 1.
            //     - "_this" should be hidden in scope 1.
            //     - "this" source should use "this" in scope 2 (restored).

            var prevLine = 0;
            var prevColumn = 0;
            var prevNameIndex = 0;
            var scopesBuilder: string[] = [];
            var localsBuilder: string[] = [];
            var needsSemicolon = false;
            var emitScope = false;
            var enclosingScope: SourceMapScope;
            var recordScope = (scope: SourceMapScope) => {
                var emitScope = false;
                var savedEnclosingScope = enclosingScope;
                scope.forEachLocal((from, to) => {
                    if (!emitScope) {
                        emitScope = true;

                        enclosingScope = new SourceMapScope(
                            enclosingScope,
                            scope.startLine + 1,
                            scope.startColumn + 1,
                            scope.endLine + 1,
                            scope.endColumn + 1);

                        if (!savedEnclosingScope) {
                            this.sourceMapRootScopes.push(enclosingScope);
                        }

                        var startLineOffset = scope.startLine - prevLine;
                        var startColumnOffset = scope.startColumn - prevColumn;
                        prevLine = scope.startLine;
                        prevColumn = scope.startColumn;

                        scopesBuilder.push(Base64VLQFormat.encode(startLineOffset));
                        scopesBuilder.push(Base64VLQFormat.encode(startColumnOffset));
                        scopesBuilder.push('>');

                        if (needsSemicolon) {
                            localsBuilder.push(";");
                        }
                        else {
                            needsSemicolon = true;
                        }
                    }
                    else {
                        localsBuilder.push(",");
                    }

                    enclosingScope.renameLocal(from, to);

                    var nameIndex = this.getOrAddName(from);
                    localsBuilder.push(Base64VLQFormat.encode(nameIndex - prevNameIndex));
                    prevNameIndex = nameIndex;

                    if (to != SourceMapScope.HIDDEN_LOCAL) {
                        nameIndex = this.getOrAddName(to);
                        localsBuilder.push(Base64VLQFormat.encode(nameIndex - prevNameIndex));
                        prevNameIndex = nameIndex;
                    }
                });

                recordNestedScopes(scope.nested);

                if (emitScope) {
                    var endLineOffset = scope.endLine - prevLine;
                    var endColumnOffset = scope.endColumn - prevColumn;
                    prevLine = scope.endLine;
                    prevColumn = scope.endColumn;

                    scopesBuilder.push(Base64VLQFormat.encode(endLineOffset));
                    scopesBuilder.push(Base64VLQFormat.encode(endColumnOffset));
                    scopesBuilder.push('<');
                }

                enclosingScope = savedEnclosingScope;
            };

            var recordNestedScopes = (scopes: SourceMapScope[]) => {
                for (var i = 0, l = scopes.length; i < l; i++) {
                    var scope = scopes[i];
                    recordScope(scope);
                }
            };

            recordScope(this.topScope);

            var scopes: string = scopesBuilder.join("");
            var locals: string = localsBuilder.join("");
            if (scopes || locals) {
                sourceMap.x_ms_scopes = scopes;
                sourceMap.x_ms_locals = locals;
            }
        }
    }
}