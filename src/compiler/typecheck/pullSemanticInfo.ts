// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\references.ts' />

module TypeScript {

    // PULLTODO: Get rid of these
    export var declCacheHit = 0;
    export var declCacheMiss = 0;
    export var symbolCacheHit = 0;
    export var symbolCacheMiss = 0;

    var sentinalEmptyArray: any[] = [];

    export class SemanticInfoChain {
        private documents: Document[] = [];
        private fileNameToDocument = new BlockIntrinsics<Document>();

        public anyTypeSymbol: PullPrimitiveTypeSymbol = null;
        public booleanTypeSymbol: PullPrimitiveTypeSymbol = null;
        public numberTypeSymbol: PullPrimitiveTypeSymbol = null;
        public stringTypeSymbol: PullPrimitiveTypeSymbol = null;
        public nullTypeSymbol: PullPrimitiveTypeSymbol = null;
        public undefinedTypeSymbol: PullPrimitiveTypeSymbol = null;
        public voidTypeSymbol: PullPrimitiveTypeSymbol = null;
        public emptyTypeSymbol: PullTypeSymbol = null;
        public undefinedValueSymbol: PullSymbol = null;

        // <-- Data to clear when we get invalidated
        private astSymbolMap: DataMap<PullSymbol> = null;
        private astAliasSymbolMap = new DataMap<PullTypeAliasSymbol>();
        private astCallResolutionDataMap: Collections.HashTable<number, PullAdditionalCallResolutionData> = null;

        private declSymbolMap = new DataMap<PullSymbol>();
        private declSignatureSymbolMap = new DataMap<PullSignatureSymbol>();

        private declCache: BlockIntrinsics<PullDecl[]> = null;
        private symbolCache: BlockIntrinsics<PullSymbol> = null;
        private fileNameToDiagnostics: BlockIntrinsics<Diagnostic[]> = null;

        private _binder: PullSymbolBinder = null;
        private _resolver: PullTypeResolver = null;

        private _topLevelDecls: PullDecl[] = null;
        private _fileNames: string[] = null;

        constructor(private compiler: TypeScriptCompiler, private logger: ILogger) {
            this.invalidate();
        }

        public getDocument(fileName: string): Document {
            var document = this.fileNameToDocument[fileName];
            return document ? document : null;
        }

        public lineMap(fileName: string): LineMap {
            return this.getDocument(fileName).lineMap();
        }

        // Returns the names of the files we own, in the same order that they were added to us.
        public fileNames(): string[] {
            if (this._fileNames === null) {
                // Skip the first semantic info (the synthesized one for the global decls).
                this._fileNames = this.documents.slice(1).map(s => s.fileName);
            }

            return this._fileNames;
        }

        private bindPrimitiveSymbol(decl: PullDecl, symbol: PullSymbol): PullSymbol {
            decl = decl || symbol.getDeclarations()[0];
            symbol.addDeclaration(decl);
            decl.setSymbol(symbol);

            return symbol;
        }

        // Pass in the name and the global parent decl, or the old symbol. During initialization
        // of the compiler, the symbol passed in will be null, and this method will create both
        // the decl and the symbol. On subsequent edits, the old symbol should be passed in and
        // it will be reused.Because the decl<->symbol caches are cleaned on every edit, an entry
        // is added to each cache using the old decl and the old symbol.
        private addOrBindPrimitiveType(name: string, globalDecl: PullDecl, symbol: PullPrimitiveTypeSymbol): PullPrimitiveTypeSymbol {
            var decl: PullDecl;
            if (!symbol) {
                var span = new TextSpan(0, 0);

                decl = globalDecl
                    ? <PullDecl>new NormalPullDecl(name, name, PullElementKind.Primitive, PullElementFlags.None, globalDecl, span)
                    : new RootPullDecl(name, "", PullElementKind.Primitive, PullElementFlags.None, span, this, /*isExternalModule:*/ false);
                symbol = new PullPrimitiveTypeSymbol(name);
                symbol.setResolved();
            }

            return <PullPrimitiveTypeSymbol>this.bindPrimitiveSymbol(decl, symbol);
        }

        // Pass in the name, the global parent decl, and the value's type, or just the old symbol.
        // During initialization of the compiler, the symbol passed in will be null, and this
        // method will create both the decl and the symbol.On subsequent edits, the old symbol
        // should be passed in and it will be reused. Because the decl<->symbol caches are cleaned
        // on every edit, an entry is added to each cache using the old decl and the old symbol.
        private addOrBindPrimitiveValue(name: string, globalDecl: PullDecl, type: PullTypeSymbol, symbol: PullSymbol): PullSymbol {
            var decl: PullDecl;
            if (!symbol) {
                var span = new TextSpan(0, 0);
                decl = new NormalPullDecl(name, name, PullElementKind.Variable, PullElementFlags.Ambient, globalDecl, span);
                var symbol = new PullSymbol(name, PullElementKind.Variable);
                symbol.type = type;
                symbol.setResolved();
            }

            return this.bindPrimitiveSymbol(decl, symbol);
        }

        private getGlobalDecl() {
            var globalDecl = this.documents[0] && this.documents[0].topLevelDecl();
            if (!globalDecl) {
                var span = new TextSpan(0, 0);
                globalDecl = new RootPullDecl(/*name:*/ "", /*fileName:*/ "", PullElementKind.Global, PullElementFlags.None, span, this, /*isExternalModule:*/ false);
            }

            // add primitive types
            this.anyTypeSymbol = this.addOrBindPrimitiveType("any", globalDecl, this.anyTypeSymbol);
            this.booleanTypeSymbol = this.addOrBindPrimitiveType("boolean", globalDecl, this.booleanTypeSymbol);
            this.numberTypeSymbol = this.addOrBindPrimitiveType("number", globalDecl, this.numberTypeSymbol);
            this.stringTypeSymbol = this.addOrBindPrimitiveType("string", globalDecl, this.stringTypeSymbol);
            this.voidTypeSymbol = this.addOrBindPrimitiveType("void", globalDecl, this.voidTypeSymbol);

            // add the global primitive values for "null" and "undefined"
            // Because you cannot reference them by name, they're not parented by any actual decl.
            this.nullTypeSymbol = this.addOrBindPrimitiveType("null", null, this.nullTypeSymbol);
            this.undefinedTypeSymbol = this.addOrBindPrimitiveType("undefined", null, this.undefinedTypeSymbol);
            this.undefinedValueSymbol = this.addOrBindPrimitiveValue("undefined", globalDecl, this.undefinedTypeSymbol, this.undefinedValueSymbol);

            // other decls not reachable from the globalDecl
            var emptyTypeDecl = new PullSynthesizedDecl("{}", "{}", PullElementKind.ObjectType, PullElementFlags.None, null, span, this);
            var emptyTypeSymbol = new PullTypeSymbol("{}", PullElementKind.ObjectType);
            emptyTypeDecl.setSymbol(emptyTypeSymbol);
            emptyTypeSymbol.addDeclaration(emptyTypeDecl);
            emptyTypeSymbol.setResolved();
            this.emptyTypeSymbol = emptyTypeSymbol;

            return globalDecl;
        }

        public addDocument(document: Document): void {
            var fileName = document.fileName;

            var existingIndex = ArrayUtilities.indexOf(this.documents, u => u.fileName === fileName);
            if (existingIndex < 0) {
                // Adding the script for the first time.
                this.documents.push(document);
            }
            else {
                this.documents[existingIndex] = document;
            }

            this.fileNameToDocument[fileName] = document;

            // We changed the scripts we're responsible for.  Invalidate all existing cached
            // semantic information.
            this.invalidate();
        }

        public removeDocument(fileName: string): void {
            Debug.assert(fileName !== "", "Can't remove the semantic info for the global decl.");
            var index = ArrayUtilities.indexOf(this.documents, u => u.fileName === fileName);
            if (index > 0) {
                this.fileNameToDocument[fileName] = undefined;
                this.documents.splice(index, 1);
                this.invalidate();
            }
        }

        private getDeclPathCacheID(declPath: string[], declKind: PullElementKind) {
            var cacheID = "";

            for (var i = 0; i < declPath.length; i++) {
                cacheID += "#" + declPath[i];
            }

            return cacheID + "#" + declKind.toString();
        }

        // Looks for a top level decl matching the name/kind pair passed in.  This should be used
        // by methods in the binder to see if there is an existing symbol that a declaration should
        // merge into, or if the declaration should create a new symbol.  
        //
        // The doNotGoPastThisDecl argument is important.  it should be the declaration that the
        // binder is currently creating a symbol for.  The chain will search itself from first to
        // last semantic info, and will not go past the file that that decl is declared in.  
        // Furthermore, while searching hte file that that decl is declared in, it will also not
        // consider any decls at a later position in the file.
        //
        // In this manner, it will only find symbols declared 'before' the decl currently being
        // bound.  This gives us a nice ordering guarantee for open ended symbols.  Specifically
        // we'll create a symbol for the first file (in compiler order) that it was found it,
        // and we'll merge all later declarations into that symbol.  This means, for example, that
        // if a consumer tries to augment a lib.d.ts type, that the symbol will be created for
        // lib.d.ts (as that is in the chain prior to all user files).
        public findTopLevelSymbol(name: string, kind: PullElementKind, doNotGoPastThisDecl: PullDecl): PullSymbol {
            var cacheID = this.getDeclPathCacheID([name], kind);

            var symbol = this.symbolCache[cacheID];

            if (!symbol) {

                for (var i = 0, n = this.documents.length; i < n; i++) {
                    var topLevelDecl = this.documents[i].topLevelDecl();

                    var symbol = this.findTopLevelSymbolInDecl(topLevelDecl, name, kind, doNotGoPastThisDecl);
                    if (symbol) {
                        break;
                    }

                    // We finished searching up to the file that included the stopping point decl.  
                    // no need to continue.
                    if (doNotGoPastThisDecl && topLevelDecl.name == doNotGoPastThisDecl.fileName()) {
                        return null;
                    }
                }

                if (symbol) {
                    this.symbolCache[cacheID] = symbol;
                }
            }

            return symbol;
        }

        private findTopLevelSymbolInDecl(topLevelDecl: PullDecl, name: string, kind: PullElementKind, doNotGoPastThisDecl: PullDecl): PullSymbol {
            // If we're currently searching the file that includes the decl we don't want to go 
            // past, then we have to stop searching at the position of that decl.  Otherwise, we
            // search the entire file.
            var doNotGoPastThisPosition = doNotGoPastThisDecl && doNotGoPastThisDecl.fileName() === topLevelDecl.fileName()
                ? doNotGoPastThisDecl.ast().minChar
                : -1

            var foundDecls = topLevelDecl.searchChildDecls(name, kind);

            for (var j = 0; j < foundDecls.length; j++) {
                var foundDecl = foundDecls[j];

                // This decl was at or past the stopping point.  Don't search any further.
                if (doNotGoPastThisPosition !== -1 &&
                    foundDecl.ast() &&
                    foundDecl.ast().minChar > doNotGoPastThisPosition) {

                    break;
                }

                var symbol = foundDecls[j].getSymbol();
                if (symbol) {
                    return symbol;
                }
            }

            return null;
        }

        public findExternalModule(id: string) {
            id = normalizePath(id);

            var dtsFile = id + ".d.ts";
            var dtsCacheID = this.getDeclPathCacheID([dtsFile], PullElementKind.DynamicModule);
            var symbol = <PullContainerSymbol>this.symbolCache[dtsCacheID];
            if (symbol) {
                return symbol;
            }

            var tsFile = id + ".ts"
            var tsCacheID = this.getDeclPathCacheID([tsFile], PullElementKind.DynamicModule);
            symbol = <PullContainerSymbol>this.symbolCache[tsCacheID]
            if (symbol != undefined) {
                return symbol;
            }

            symbol = null;
            for (var i = 0; i < this.documents.length; i++) {
                var document = this.documents[i];
                var topLevelDecl = document.topLevelDecl(); // Script

                if (topLevelDecl.isExternalModule()) {
                    var isDtsFile = document.fileName == dtsFile;
                    if (isDtsFile || document.fileName == tsFile) {
                        var dynamicModuleDecl = topLevelDecl.getChildDecls()[0];
                        symbol = <PullContainerSymbol>dynamicModuleDecl.getSymbol();
                        this.symbolCache[dtsCacheID] = isDtsFile ? symbol : null;
                        this.symbolCache[tsCacheID] = !isDTSFile ? symbol : null;
                        return symbol;
                    }
                }
            }

            this.symbolCache[dtsCacheID] = null;
            this.symbolCache[tsCacheID] = null;

            return symbol;
        }

        public findAmbientExternalModuleInGlobalContext(id: string) {
            var cacheID = this.getDeclPathCacheID([id], PullElementKind.DynamicModule);

            var symbol = <PullContainerSymbol>this.symbolCache[cacheID];
            if (symbol == undefined) {
                symbol = null;
                for (var i = 0; i < this.documents.length; i++) {
                    var document = this.documents[i];
                    var topLevelDecl = document.topLevelDecl();

                    if (!topLevelDecl.isExternalModule()) {
                        var dynamicModules = topLevelDecl.searchChildDecls(id, PullElementKind.DynamicModule);
                        if (dynamicModules.length) {
                            symbol = <PullContainerSymbol>dynamicModules[0].getSymbol();
                            break;
                        }
                    }
                }

                this.symbolCache[cacheID] = symbol;
            }

            return symbol;
        }

        // a decl path is a list of decls that reference the components of a declaration from the global scope down
        // E.g., string would be "['string']" and "A.B.C" would be "['A','B','C']"
        public findDecls(declPath: string[], declKind: PullElementKind): PullDecl[] {

            var cacheID = this.getDeclPathCacheID(declPath, declKind);

            if (declPath.length) {
                var cachedDecls = this.declCache[cacheID];

                if (cachedDecls && cachedDecls.length) {
                    declCacheHit++;
                    return <PullDecl[]> cachedDecls;
                }
            }

            declCacheMiss++;

            var declsToSearch = this.topLevelDecls();

            var decls: PullDecl[] = sentinelEmptyArray;
            var path: string;
            var foundDecls: PullDecl[] = sentinelEmptyArray;
            var keepSearching = (declKind & PullElementKind.SomeContainer) || (declKind & PullElementKind.Interface);

            for (var i = 0; i < declPath.length; i++) {
                path = declPath[i];
                decls = sentinelEmptyArray;

                for (var j = 0; j < declsToSearch.length; j++) {
                    //var kind = (i === declPath.length - 1) ? declKind : PullElementKind.SomeType;
                    foundDecls = declsToSearch[j].searchChildDecls(path, declKind);

                    for (var k = 0; k < foundDecls.length; k++) {
                        if (decls == sentinelEmptyArray) {
                            decls = [];
                        }
                        decls[decls.length] = foundDecls[k];
                    }

                    // Unless we're searching for an interface or module, we've found the one true
                    // decl, so don't bother searching the rest of the top-level decls
                    if (foundDecls.length && !keepSearching) {
                        break;
                    }
                }

                declsToSearch = decls;

                if (!declsToSearch) {
                    break;
                }
            }

            if (decls.length) {
                this.declCache[cacheID] = decls;
            }

            return decls;
        }

        public findDeclsFromPath(declPath: PullDecl[], declKind: PullElementKind): PullDecl[]{
            var declString: string[] = [];

            for (var i = 0, n = declPath.length; i < n; i++) {
                if (declPath[i].kind & PullElementKind.Script) {
                    continue;
                }

                declString.push(declPath[i].name);
            }
            
            return this.findDecls(declString, declKind);
        }

        public findSymbol(declPath: string[], declType: PullElementKind): PullSymbol {
            var cacheID = this.getDeclPathCacheID(declPath, declType);

            if (declPath.length) {

                var cachedSymbol = this.symbolCache[cacheID];

                if (cachedSymbol) {
                    symbolCacheHit++;
                    return cachedSymbol;
                }
            }

            symbolCacheMiss++;

            // symbol wasn't cached, so get the decl
            var decls: PullDecl[] = this.findDecls(declPath, declType);
            var symbol: PullSymbol = null;

            if (decls.length) {

                symbol = decls[0].getSymbol();

                if (symbol) {
                    this.symbolCache[cacheID] = symbol;
                }
            }

            return symbol;
        }

        public cacheGlobalSymbol(symbol: PullSymbol, kind: PullElementKind) {
            var cacheID1 = this.getDeclPathCacheID([symbol.name], kind);
            var cacheID2 = this.getDeclPathCacheID([symbol.name], symbol.kind);

            if (!this.symbolCache[cacheID1]) {
                this.symbolCache[cacheID1] = symbol;
            }

            if (!this.symbolCache[cacheID2]) {
                this.symbolCache[cacheID2] = symbol;
            }
        }

        public invalidate(oldSettings: ImmutableCompilationSettings = null, newSettings: ImmutableCompilationSettings = null) {
            // A file has changed, increment the type check phase so that future type chech
            // operations will proceed.
            PullTypeResolver.globalTypeCheckPhase++;

            this.logger.log("Invalidating SemanticInfoChain...");
            var cleanStart = new Date().getTime();

            this.astSymbolMap = new DataMap<PullSymbol>();
            this.astAliasSymbolMap = new DataMap<PullTypeAliasSymbol>();
            this.astCallResolutionDataMap = Collections.createHashTable<number, PullAdditionalCallResolutionData>(Collections.DefaultHashTableCapacity, k => k);

            this.declCache = new BlockIntrinsics();
            this.symbolCache = new BlockIntrinsics();
            this.fileNameToDiagnostics = new BlockIntrinsics();
            this._binder = null;
            this._resolver = null;
            this._topLevelDecls = null;
            this._fileNames = null;

            this.declSymbolMap = new DataMap<PullSymbol>();
            this.declSignatureSymbolMap = new DataMap<PullSignatureSymbol>();

            if (oldSettings && newSettings) {
                // Depending on which options changed, our cached syntactic data may not be valid
                // anymore.
                // Note: It is important to start at 1 in this loop because documents[0] is the
                // global decl with the primitive decls in it. Since documents[0] is the only
                // document that does not represent an editable file, there is no reason to ever
                // invalidate its decls. Doing this would break the invariant that all decls of
                // unedited files should persist across edits.
                if (this.settingsChangeAffectsSyntax(oldSettings, newSettings)) {
                    for (var i = 1, n = this.documents.length; i < n; i++) {
                        this.documents[i].invalidate();
                    }
                }
            }

            var globalDocument = new Document(this.compiler, this, /*fileName:*/ "", /*referencedFiles:*/[], /*scriptSnapshot:*/null, ByteOrderMark.None, /*version:*/0, /*isOpen:*/ false, /*syntaxTree:*/null, this.getGlobalDecl());
            this.documents[0] = globalDocument;

            var cleanEnd = new Date().getTime();
            this.logger.log("   time to invalidate: " + (cleanEnd - cleanStart));
        }

        private settingsChangeAffectsSyntax(before: ImmutableCompilationSettings, after: ImmutableCompilationSettings): boolean {
            // If the automatic semicolon insertion option has changed, then we have to dump all
            // syntax trees in order to reparse them with the new option.
            //
            // If the language version changed, then that affects what types of things we parse. So
            // we have to dump all syntax trees.
            //
            // If propagateEnumConstants changes, then that affects the constant value data we've 
            // stored in the AST.
            return before.allowAutomaticSemicolonInsertion() !== after.allowAutomaticSemicolonInsertion() ||
                before.codeGenTarget() !== after.codeGenTarget() ||
                before.propagateEnumConstants() != after.propagateEnumConstants();
        }

        public setSymbolForAST(ast: AST, symbol: PullSymbol): void {
            this.astSymbolMap.link(ast.astIDString, symbol);
        }

        public getSymbolForAST(ast: IAST): PullSymbol {
            return this.astSymbolMap.read(ast.astIDString);
        }

        public setAliasSymbolForAST(ast: AST, symbol: PullTypeAliasSymbol): void {
            this.astAliasSymbolMap.link(ast.astIDString, symbol);
        }

        public getAliasSymbolForAST(ast: IAST): PullTypeAliasSymbol {
            return this.astAliasSymbolMap.read(ast.astIDString);
        }

        public getCallResolutionDataForAST(ast: AST): PullAdditionalCallResolutionData {
            return <PullAdditionalCallResolutionData>this.astCallResolutionDataMap.get(ast.astID);
        }

        public setCallResolutionDataForAST(ast: AST, callResolutionData: PullAdditionalCallResolutionData) {
            if (callResolutionData) {
                this.astCallResolutionDataMap.set(ast.astID, callResolutionData);
            }
        }

        public setSymbolForDecl(decl: PullDecl, symbol: PullSymbol): void {
            this.declSymbolMap.link(decl.declIDString, symbol);
        }

        public getSymbolForDecl(decl: PullDecl): PullSymbol {
            return this.declSymbolMap.read(decl.declIDString);
        }

        public setSignatureSymbolForDecl(decl: PullDecl, signatureSymbol: PullSignatureSymbol): void {
            this.declSignatureSymbolMap.link(decl.declIDString, signatureSymbol);
        }

        public getSignatureSymbolForDecl(decl: PullDecl): PullSignatureSymbol {
            return this.declSignatureSymbolMap.read(decl.declIDString);
        }

        public addDiagnostic(diagnostic: Diagnostic): void {
            var fileName = diagnostic.fileName();
            var diagnostics = this.fileNameToDiagnostics[fileName];
            if (!diagnostics) {
                diagnostics = [];
                this.fileNameToDiagnostics[fileName] = diagnostics;
            }

            diagnostics.push(diagnostic);
        }

        public getDiagnostics(fileName: string): Diagnostic[] {
            var diagnostics = this.fileNameToDiagnostics[fileName];
            return diagnostics ? diagnostics : [];
        }

        public getBinder(): PullSymbolBinder {
            if (!this._binder) {
                this._binder = new PullSymbolBinder(this);
            }

            return this._binder;
        }

        public getResolver(): PullTypeResolver {
            if (!this._resolver) {
                this._resolver = new PullTypeResolver(this.compiler.compilationSettings(), this);
            }

            return this._resolver;
        }

        public addSyntheticIndexSignature(containingDecl: PullDecl, containingSymbol: PullTypeSymbol, ast: AST,
            indexParamName: string, indexParamType: PullTypeSymbol, returnType: PullTypeSymbol): void {

            var indexSignature = new PullSignatureSymbol(PullElementKind.IndexSignature);
            var indexParameterSymbol = new PullSymbol(indexParamName, PullElementKind.Parameter);
            indexParameterSymbol.type = indexParamType;
            indexSignature.addParameter(indexParameterSymbol);
            indexSignature.returnType = returnType;
            indexSignature.setResolved();
            indexParameterSymbol.setResolved();

            containingSymbol.addIndexSignature(indexSignature);

            var span = TextSpan.fromBounds(ast.minChar, ast.limChar);
            var indexSigDecl = new PullSynthesizedDecl("", "", PullElementKind.IndexSignature, PullElementFlags.Signature, containingDecl, span, containingDecl.semanticInfoChain());
            var indexParamDecl = new PullSynthesizedDecl(indexParamName, indexParamName, PullElementKind.Parameter, PullElementFlags.None, indexSigDecl, span, containingDecl.semanticInfoChain());
            indexSigDecl.setSignatureSymbol(indexSignature);
            indexParamDecl.setSymbol(indexParameterSymbol);
            indexSignature.addDeclaration(indexSigDecl);
            indexParameterSymbol.addDeclaration(indexParamDecl);
        }

        public getDeclForAST(ast: AST): PullDecl {
            var document = this.getDocument(ast.fileName());

            if (document) {
                return document._getDeclForAST(ast);
            }

            return null;
        }

        public setDeclForAST(ast: AST, decl: PullDecl): void {
            this.getDocument(decl.fileName())._setDeclForAST(ast, decl);
        }

        public getASTForDecl(decl: PullDecl): AST {
            var document = this.getDocument(decl.fileName());
            if (document) {
                return document._getASTForDecl(decl);
            }

            return null;
        }

        public setASTForDecl(decl: PullDecl, ast: AST): void {
            this.getDocument(decl.fileName())._setASTForDecl(decl, ast);
        }

        public topLevelDecl(fileName: string): PullDecl {
            var document = this.getDocument(fileName);
            if (document) {
                return document.topLevelDecl();
            }

            return null;
        }

        public topLevelDecls(): PullDecl[] {
            if (!this._topLevelDecls) {
                this._topLevelDecls = ArrayUtilities.select(this.documents, u => u.topLevelDecl());
            }

            return this._topLevelDecls;
        }

        public addDiagnosticFromAST(ast: AST, diagnosticKey: string, arguments: any[]= null): void {
            this.addDiagnostic(this.diagnosticFromAST(ast, diagnosticKey, arguments));
        }

        public diagnosticFromAST(ast: AST, diagnosticKey: string, arguments: any[]= null): Diagnostic {
            return new Diagnostic(ast.fileName(), this.lineMap(ast.fileName()), ast.minChar, ast.getLength(), diagnosticKey, arguments);
        }
    }
}