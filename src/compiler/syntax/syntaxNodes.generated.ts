///<reference path='references.ts' />

module TypeScript {
    export var nodeMetadata: string[][] = ArrayUtilities.createArray<string[]>(SyntaxKind.LastNode + 1, []);

    nodeMetadata[SyntaxKind.SourceUnit] = ["moduleElements", "endOfFileToken"];
    nodeMetadata[SyntaxKind.QualifiedName] = ["left", "dotToken", "right"];
    nodeMetadata[SyntaxKind.ObjectType] = ["openBraceToken", "typeMembers", "closeBraceToken"];
    nodeMetadata[SyntaxKind.FunctionType] = ["typeParameterList", "parameterList", "equalsGreaterThanToken", "type"];
    nodeMetadata[SyntaxKind.ArrayType] = ["type", "openBracketToken", "closeBracketToken"];
    nodeMetadata[SyntaxKind.ConstructorType] = ["newKeyword", "typeParameterList", "parameterList", "equalsGreaterThanToken", "type"];
    nodeMetadata[SyntaxKind.GenericType] = ["name", "typeArgumentList"];
    nodeMetadata[SyntaxKind.TypeQuery] = ["typeOfKeyword", "name"];
    nodeMetadata[SyntaxKind.InterfaceDeclaration] = ["modifiers", "interfaceKeyword", "identifier", "typeParameterList", "heritageClauses", "body"];
    nodeMetadata[SyntaxKind.FunctionDeclaration] = ["modifiers", "functionKeyword", "identifier", "callSignature", "block", "semicolonToken"];
    nodeMetadata[SyntaxKind.ModuleDeclaration] = ["modifiers", "moduleKeyword", "name", "stringLiteral", "openBraceToken", "moduleElements", "closeBraceToken"];
    nodeMetadata[SyntaxKind.ClassDeclaration] = ["modifiers", "classKeyword", "identifier", "typeParameterList", "heritageClauses", "openBraceToken", "classElements", "closeBraceToken"];
    nodeMetadata[SyntaxKind.EnumDeclaration] = ["modifiers", "enumKeyword", "identifier", "openBraceToken", "enumElements", "closeBraceToken"];
    nodeMetadata[SyntaxKind.ImportDeclaration] = ["modifiers", "importKeyword", "identifier", "equalsToken", "moduleReference", "semicolonToken"];
    nodeMetadata[SyntaxKind.ExportAssignment] = ["exportKeyword", "equalsToken", "identifier", "semicolonToken"];
    nodeMetadata[SyntaxKind.MemberFunctionDeclaration] = ["modifiers", "propertyName", "callSignature", "block", "semicolonToken"];
    nodeMetadata[SyntaxKind.MemberVariableDeclaration] = ["modifiers", "variableDeclarator", "semicolonToken"];
    nodeMetadata[SyntaxKind.ConstructorDeclaration] = ["modifiers", "constructorKeyword", "callSignature", "block", "semicolonToken"];
    nodeMetadata[SyntaxKind.IndexMemberDeclaration] = ["modifiers", "indexSignature", "semicolonToken"];
    nodeMetadata[SyntaxKind.GetAccessor] = ["modifiers", "getKeyword", "propertyName", "parameterList", "typeAnnotation", "block"];
    nodeMetadata[SyntaxKind.SetAccessor] = ["modifiers", "setKeyword", "propertyName", "parameterList", "block"];
    nodeMetadata[SyntaxKind.PropertySignature] = ["propertyName", "questionToken", "typeAnnotation"];
    nodeMetadata[SyntaxKind.CallSignature] = ["typeParameterList", "parameterList", "typeAnnotation"];
    nodeMetadata[SyntaxKind.ConstructSignature] = ["newKeyword", "callSignature"];
    nodeMetadata[SyntaxKind.IndexSignature] = ["openBracketToken", "parameter", "closeBracketToken", "typeAnnotation"];
    nodeMetadata[SyntaxKind.MethodSignature] = ["propertyName", "questionToken", "callSignature"];
    nodeMetadata[SyntaxKind.Block] = ["openBraceToken", "statements", "closeBraceToken"];
    nodeMetadata[SyntaxKind.IfStatement] = ["ifKeyword", "openParenToken", "condition", "closeParenToken", "statement", "elseClause"];
    nodeMetadata[SyntaxKind.VariableStatement] = ["modifiers", "variableDeclaration", "semicolonToken"];
    nodeMetadata[SyntaxKind.ExpressionStatement] = ["expression", "semicolonToken"];
    nodeMetadata[SyntaxKind.ReturnStatement] = ["returnKeyword", "expression", "semicolonToken"];
    nodeMetadata[SyntaxKind.SwitchStatement] = ["switchKeyword", "openParenToken", "expression", "closeParenToken", "openBraceToken", "switchClauses", "closeBraceToken"];
    nodeMetadata[SyntaxKind.BreakStatement] = ["breakKeyword", "identifier", "semicolonToken"];
    nodeMetadata[SyntaxKind.ContinueStatement] = ["continueKeyword", "identifier", "semicolonToken"];
    nodeMetadata[SyntaxKind.ForStatement] = ["forKeyword", "openParenToken", "variableDeclaration", "initializer", "firstSemicolonToken", "condition", "secondSemicolonToken", "incrementor", "closeParenToken", "statement"];
    nodeMetadata[SyntaxKind.ForInStatement] = ["forKeyword", "openParenToken", "variableDeclaration", "left", "inKeyword", "expression", "closeParenToken", "statement"];
    nodeMetadata[SyntaxKind.EmptyStatement] = ["semicolonToken"];
    nodeMetadata[SyntaxKind.ThrowStatement] = ["throwKeyword", "expression", "semicolonToken"];
    nodeMetadata[SyntaxKind.WhileStatement] = ["whileKeyword", "openParenToken", "condition", "closeParenToken", "statement"];
    nodeMetadata[SyntaxKind.TryStatement] = ["tryKeyword", "block", "catchClause", "finallyClause"];
    nodeMetadata[SyntaxKind.LabeledStatement] = ["identifier", "colonToken", "statement"];
    nodeMetadata[SyntaxKind.DoStatement] = ["doKeyword", "statement", "whileKeyword", "openParenToken", "condition", "closeParenToken", "semicolonToken"];
    nodeMetadata[SyntaxKind.DebuggerStatement] = ["debuggerKeyword", "semicolonToken"];
    nodeMetadata[SyntaxKind.WithStatement] = ["withKeyword", "openParenToken", "condition", "closeParenToken", "statement"];
    nodeMetadata[SyntaxKind.PlusExpression] = ["operatorToken", "operand"];
    nodeMetadata[SyntaxKind.NegateExpression] = ["operatorToken", "operand"];
    nodeMetadata[SyntaxKind.BitwiseNotExpression] = ["operatorToken", "operand"];
    nodeMetadata[SyntaxKind.LogicalNotExpression] = ["operatorToken", "operand"];
    nodeMetadata[SyntaxKind.PreIncrementExpression] = ["operatorToken", "operand"];
    nodeMetadata[SyntaxKind.PreDecrementExpression] = ["operatorToken", "operand"];
    nodeMetadata[SyntaxKind.DeleteExpression] = ["deleteKeyword", "expression"];
    nodeMetadata[SyntaxKind.TypeOfExpression] = ["typeOfKeyword", "expression"];
    nodeMetadata[SyntaxKind.VoidExpression] = ["voidKeyword", "expression"];
    nodeMetadata[SyntaxKind.CommaExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.AssignmentExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.AddAssignmentExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.SubtractAssignmentExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.MultiplyAssignmentExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.DivideAssignmentExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.ModuloAssignmentExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.AndAssignmentExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.ExclusiveOrAssignmentExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.OrAssignmentExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.LeftShiftAssignmentExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.SignedRightShiftAssignmentExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.UnsignedRightShiftAssignmentExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.ConditionalExpression] = ["condition", "questionToken", "whenTrue", "colonToken", "whenFalse"];
    nodeMetadata[SyntaxKind.LogicalOrExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.LogicalAndExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.BitwiseOrExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.BitwiseExclusiveOrExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.BitwiseAndExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.EqualsWithTypeConversionExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.NotEqualsWithTypeConversionExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.EqualsExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.NotEqualsExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.LessThanExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.GreaterThanExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.LessThanOrEqualExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.GreaterThanOrEqualExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.InstanceOfExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.InExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.LeftShiftExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.SignedRightShiftExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.UnsignedRightShiftExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.MultiplyExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.DivideExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.ModuloExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.AddExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.SubtractExpression] = ["left", "operatorToken", "right"];
    nodeMetadata[SyntaxKind.PostIncrementExpression] = ["operand", "operatorToken"];
    nodeMetadata[SyntaxKind.PostDecrementExpression] = ["operand", "operatorToken"];
    nodeMetadata[SyntaxKind.MemberAccessExpression] = ["expression", "dotToken", "name"];
    nodeMetadata[SyntaxKind.InvocationExpression] = ["expression", "argumentList"];
    nodeMetadata[SyntaxKind.ArrayLiteralExpression] = ["openBracketToken", "expressions", "closeBracketToken"];
    nodeMetadata[SyntaxKind.ObjectLiteralExpression] = ["openBraceToken", "propertyAssignments", "closeBraceToken"];
    nodeMetadata[SyntaxKind.ObjectCreationExpression] = ["newKeyword", "expression", "argumentList"];
    nodeMetadata[SyntaxKind.ParenthesizedExpression] = ["openParenToken", "expression", "closeParenToken"];
    nodeMetadata[SyntaxKind.ParenthesizedArrowFunctionExpression] = ["callSignature", "equalsGreaterThanToken", "block", "expression"];
    nodeMetadata[SyntaxKind.SimpleArrowFunctionExpression] = ["identifier", "equalsGreaterThanToken", "block", "expression"];
    nodeMetadata[SyntaxKind.CastExpression] = ["lessThanToken", "type", "greaterThanToken", "expression"];
    nodeMetadata[SyntaxKind.ElementAccessExpression] = ["expression", "openBracketToken", "argumentExpression", "closeBracketToken"];
    nodeMetadata[SyntaxKind.FunctionExpression] = ["functionKeyword", "identifier", "callSignature", "block"];
    nodeMetadata[SyntaxKind.OmittedExpression] = [];
    nodeMetadata[SyntaxKind.VariableDeclaration] = ["varKeyword", "variableDeclarators"];
    nodeMetadata[SyntaxKind.VariableDeclarator] = ["propertyName", "typeAnnotation", "equalsValueClause"];
    nodeMetadata[SyntaxKind.ArgumentList] = ["typeArgumentList", "openParenToken", "arguments", "closeParenToken"];
    nodeMetadata[SyntaxKind.ParameterList] = ["openParenToken", "parameters", "closeParenToken"];
    nodeMetadata[SyntaxKind.TypeArgumentList] = ["lessThanToken", "typeArguments", "greaterThanToken"];
    nodeMetadata[SyntaxKind.TypeParameterList] = ["lessThanToken", "typeParameters", "greaterThanToken"];
    nodeMetadata[SyntaxKind.ExtendsHeritageClause] = ["extendsOrImplementsKeyword", "typeNames"];
    nodeMetadata[SyntaxKind.ImplementsHeritageClause] = ["extendsOrImplementsKeyword", "typeNames"];
    nodeMetadata[SyntaxKind.EqualsValueClause] = ["equalsToken", "value"];
    nodeMetadata[SyntaxKind.CaseSwitchClause] = ["caseKeyword", "expression", "colonToken", "statements"];
    nodeMetadata[SyntaxKind.DefaultSwitchClause] = ["defaultKeyword", "colonToken", "statements"];
    nodeMetadata[SyntaxKind.ElseClause] = ["elseKeyword", "statement"];
    nodeMetadata[SyntaxKind.CatchClause] = ["catchKeyword", "openParenToken", "identifier", "typeAnnotation", "closeParenToken", "block"];
    nodeMetadata[SyntaxKind.FinallyClause] = ["finallyKeyword", "block"];
    nodeMetadata[SyntaxKind.TypeParameter] = ["identifier", "constraint"];
    nodeMetadata[SyntaxKind.Constraint] = ["extendsKeyword", "type"];
    nodeMetadata[SyntaxKind.SimplePropertyAssignment] = ["propertyName", "colonToken", "expression"];
    nodeMetadata[SyntaxKind.FunctionPropertyAssignment] = ["propertyName", "callSignature", "block"];
    nodeMetadata[SyntaxKind.Parameter] = ["dotDotDotToken", "modifiers", "identifier", "questionToken", "typeAnnotation", "equalsValueClause"];
    nodeMetadata[SyntaxKind.EnumElement] = ["propertyName", "equalsValueClause"];
    nodeMetadata[SyntaxKind.TypeAnnotation] = ["colonToken", "type"];
    nodeMetadata[SyntaxKind.ExternalModuleReference] = ["requireKeyword", "openParenToken", "stringLiteral", "closeParenToken"];
    nodeMetadata[SyntaxKind.ModuleNameModuleReference] = ["moduleName"];

    export class SourceUnitSyntax extends SyntaxNode {
        public syntaxTree: SyntaxTree = null;
        public moduleElements: IModuleElementSyntax[];
        public endOfFileToken: ISyntaxToken;
        constructor(data: number, moduleElements: IModuleElementSyntax[], endOfFileToken: ISyntaxToken) {
            super(data);
            this.parent = null,
            this.moduleElements = moduleElements,
            this.endOfFileToken = endOfFileToken,
            !isShared(moduleElements) && (moduleElements.parent = this),
            endOfFileToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.SourceUnit; }
    }

    export class QualifiedNameSyntax extends SyntaxNode implements INameSyntax {
        public left: INameSyntax;
        public dotToken: ISyntaxToken;
        public right: ISyntaxToken;
        public _isName: any; public _isType: any;
        constructor(data: number, left: INameSyntax, dotToken: ISyntaxToken, right: ISyntaxToken) {
            super(data);
            this.left = left,
            this.dotToken = dotToken,
            this.right = right,
            left.parent = this,
            dotToken.parent = this,
            right.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.QualifiedName; }
    }

    export class ObjectTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public openBraceToken: ISyntaxToken;
        public typeMembers: ITypeMemberSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _isType: any;
        constructor(data: number, openBraceToken: ISyntaxToken, typeMembers: ITypeMemberSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.openBraceToken = openBraceToken,
            this.typeMembers = typeMembers,
            this.closeBraceToken = closeBraceToken,
            openBraceToken.parent = this,
            !isShared(typeMembers) && (typeMembers.parent = this),
            closeBraceToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ObjectType; }
    }

    export class FunctionTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public _isType: any;
        constructor(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) {
            super(data);
            this.typeParameterList = typeParameterList,
            this.parameterList = parameterList,
            this.equalsGreaterThanToken = equalsGreaterThanToken,
            this.type = type,
            typeParameterList && (typeParameterList.parent = this),
            parameterList.parent = this,
            equalsGreaterThanToken.parent = this,
            type.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.FunctionType; }
    }

    export class ArrayTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public type: ITypeSyntax;
        public openBracketToken: ISyntaxToken;
        public closeBracketToken: ISyntaxToken;
        public _isType: any;
        constructor(data: number, type: ITypeSyntax, openBracketToken: ISyntaxToken, closeBracketToken: ISyntaxToken) {
            super(data);
            this.type = type,
            this.openBracketToken = openBracketToken,
            this.closeBracketToken = closeBracketToken,
            type.parent = this,
            openBracketToken.parent = this,
            closeBracketToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ArrayType; }
    }

    export class ConstructorTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public newKeyword: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public _isType: any;
        constructor(data: number, newKeyword: ISyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax) {
            super(data);
            this.newKeyword = newKeyword,
            this.typeParameterList = typeParameterList,
            this.parameterList = parameterList,
            this.equalsGreaterThanToken = equalsGreaterThanToken,
            this.type = type,
            newKeyword.parent = this,
            typeParameterList && (typeParameterList.parent = this),
            parameterList.parent = this,
            equalsGreaterThanToken.parent = this,
            type.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ConstructorType; }
    }

    export class GenericTypeSyntax extends SyntaxNode implements ITypeSyntax {
        public name: INameSyntax;
        public typeArgumentList: TypeArgumentListSyntax;
        public _isType: any;
        constructor(data: number, name: INameSyntax, typeArgumentList: TypeArgumentListSyntax) {
            super(data);
            this.name = name,
            this.typeArgumentList = typeArgumentList,
            name.parent = this,
            typeArgumentList.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.GenericType; }
    }

    export class TypeQuerySyntax extends SyntaxNode implements ITypeSyntax {
        public typeOfKeyword: ISyntaxToken;
        public name: INameSyntax;
        public _isType: any;
        constructor(data: number, typeOfKeyword: ISyntaxToken, name: INameSyntax) {
            super(data);
            this.typeOfKeyword = typeOfKeyword,
            this.name = name,
            typeOfKeyword.parent = this,
            name.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.TypeQuery; }
    }

    export class InterfaceDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public interfaceKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public heritageClauses: HeritageClauseSyntax[];
        public body: ObjectTypeSyntax;
        public _isModuleElement: any;
        constructor(data: number, modifiers: ISyntaxToken[], interfaceKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], body: ObjectTypeSyntax) {
            super(data);
            this.modifiers = modifiers,
            this.interfaceKeyword = interfaceKeyword,
            this.identifier = identifier,
            this.typeParameterList = typeParameterList,
            this.heritageClauses = heritageClauses,
            this.body = body,
            !isShared(modifiers) && (modifiers.parent = this),
            interfaceKeyword.parent = this,
            identifier.parent = this,
            typeParameterList && (typeParameterList.parent = this),
            !isShared(heritageClauses) && (heritageClauses.parent = this),
            body.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.InterfaceDeclaration; }
    }

    export class FunctionDeclarationSyntax extends SyntaxNode implements IStatementSyntax {
        public modifiers: ISyntaxToken[];
        public functionKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, modifiers: ISyntaxToken[], functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.functionKeyword = functionKeyword,
            this.identifier = identifier,
            this.callSignature = callSignature,
            this.block = block,
            this.semicolonToken = semicolonToken,
            !isShared(modifiers) && (modifiers.parent = this),
            functionKeyword.parent = this,
            identifier.parent = this,
            callSignature.parent = this,
            block && (block.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.FunctionDeclaration; }
    }

    export class ModuleDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public moduleKeyword: ISyntaxToken;
        public name: INameSyntax;
        public stringLiteral: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public moduleElements: IModuleElementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _isModuleElement: any;
        constructor(data: number, modifiers: ISyntaxToken[], moduleKeyword: ISyntaxToken, name: INameSyntax, stringLiteral: ISyntaxToken, openBraceToken: ISyntaxToken, moduleElements: IModuleElementSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.moduleKeyword = moduleKeyword,
            this.name = name,
            this.stringLiteral = stringLiteral,
            this.openBraceToken = openBraceToken,
            this.moduleElements = moduleElements,
            this.closeBraceToken = closeBraceToken,
            !isShared(modifiers) && (modifiers.parent = this),
            moduleKeyword.parent = this,
            name && (name.parent = this),
            stringLiteral && (stringLiteral.parent = this),
            openBraceToken.parent = this,
            !isShared(moduleElements) && (moduleElements.parent = this),
            closeBraceToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ModuleDeclaration; }
    }

    export class ClassDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public classKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeParameterList: TypeParameterListSyntax;
        public heritageClauses: HeritageClauseSyntax[];
        public openBraceToken: ISyntaxToken;
        public classElements: IClassElementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _isModuleElement: any;
        constructor(data: number, modifiers: ISyntaxToken[], classKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], openBraceToken: ISyntaxToken, classElements: IClassElementSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.classKeyword = classKeyword,
            this.identifier = identifier,
            this.typeParameterList = typeParameterList,
            this.heritageClauses = heritageClauses,
            this.openBraceToken = openBraceToken,
            this.classElements = classElements,
            this.closeBraceToken = closeBraceToken,
            !isShared(modifiers) && (modifiers.parent = this),
            classKeyword.parent = this,
            identifier.parent = this,
            typeParameterList && (typeParameterList.parent = this),
            !isShared(heritageClauses) && (heritageClauses.parent = this),
            openBraceToken.parent = this,
            !isShared(classElements) && (classElements.parent = this),
            closeBraceToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ClassDeclaration; }
    }

    export class EnumDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public enumKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public enumElements: EnumElementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _isModuleElement: any;
        constructor(data: number, modifiers: ISyntaxToken[], enumKeyword: ISyntaxToken, identifier: ISyntaxToken, openBraceToken: ISyntaxToken, enumElements: EnumElementSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.enumKeyword = enumKeyword,
            this.identifier = identifier,
            this.openBraceToken = openBraceToken,
            this.enumElements = enumElements,
            this.closeBraceToken = closeBraceToken,
            !isShared(modifiers) && (modifiers.parent = this),
            enumKeyword.parent = this,
            identifier.parent = this,
            openBraceToken.parent = this,
            !isShared(enumElements) && (enumElements.parent = this),
            closeBraceToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.EnumDeclaration; }
    }

    export class ImportDeclarationSyntax extends SyntaxNode implements IModuleElementSyntax {
        public modifiers: ISyntaxToken[];
        public importKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public equalsToken: ISyntaxToken;
        public moduleReference: IModuleReferenceSyntax;
        public semicolonToken: ISyntaxToken;
        public _isModuleElement: any;
        constructor(data: number, modifiers: ISyntaxToken[], importKeyword: ISyntaxToken, identifier: ISyntaxToken, equalsToken: ISyntaxToken, moduleReference: IModuleReferenceSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.importKeyword = importKeyword,
            this.identifier = identifier,
            this.equalsToken = equalsToken,
            this.moduleReference = moduleReference,
            this.semicolonToken = semicolonToken,
            !isShared(modifiers) && (modifiers.parent = this),
            importKeyword.parent = this,
            identifier.parent = this,
            equalsToken.parent = this,
            moduleReference.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.ImportDeclaration; }
    }

    export class ExportAssignmentSyntax extends SyntaxNode implements IModuleElementSyntax {
        public exportKeyword: ISyntaxToken;
        public equalsToken: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _isModuleElement: any;
        constructor(data: number, exportKeyword: ISyntaxToken, equalsToken: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
            this.exportKeyword = exportKeyword,
            this.equalsToken = equalsToken,
            this.identifier = identifier,
            this.semicolonToken = semicolonToken,
            exportKeyword.parent = this,
            equalsToken.parent = this,
            identifier.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.ExportAssignment; }
    }

    export class MemberFunctionDeclarationSyntax extends SyntaxNode implements IMemberDeclarationSyntax {
        public modifiers: ISyntaxToken[];
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _isMemberDeclaration: any; public _isClassElement: any;
        constructor(data: number, modifiers: ISyntaxToken[], propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.propertyName = propertyName,
            this.callSignature = callSignature,
            this.block = block,
            this.semicolonToken = semicolonToken,
            !isShared(modifiers) && (modifiers.parent = this),
            propertyName.parent = this,
            callSignature.parent = this,
            block && (block.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.MemberFunctionDeclaration; }
    }

    export class MemberVariableDeclarationSyntax extends SyntaxNode implements IMemberDeclarationSyntax {
        public modifiers: ISyntaxToken[];
        public variableDeclarator: VariableDeclaratorSyntax;
        public semicolonToken: ISyntaxToken;
        public _isMemberDeclaration: any; public _isClassElement: any;
        constructor(data: number, modifiers: ISyntaxToken[], variableDeclarator: VariableDeclaratorSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.variableDeclarator = variableDeclarator,
            this.semicolonToken = semicolonToken,
            !isShared(modifiers) && (modifiers.parent = this),
            variableDeclarator.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.MemberVariableDeclaration; }
    }

    export class ConstructorDeclarationSyntax extends SyntaxNode implements IClassElementSyntax {
        public modifiers: ISyntaxToken[];
        public constructorKeyword: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public semicolonToken: ISyntaxToken;
        public _isClassElement: any;
        constructor(data: number, modifiers: ISyntaxToken[], constructorKeyword: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.constructorKeyword = constructorKeyword,
            this.callSignature = callSignature,
            this.block = block,
            this.semicolonToken = semicolonToken,
            !isShared(modifiers) && (modifiers.parent = this),
            constructorKeyword.parent = this,
            callSignature.parent = this,
            block && (block.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.ConstructorDeclaration; }
    }

    export class IndexMemberDeclarationSyntax extends SyntaxNode implements IClassElementSyntax {
        public modifiers: ISyntaxToken[];
        public indexSignature: IndexSignatureSyntax;
        public semicolonToken: ISyntaxToken;
        public _isClassElement: any;
        constructor(data: number, modifiers: ISyntaxToken[], indexSignature: IndexSignatureSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.indexSignature = indexSignature,
            this.semicolonToken = semicolonToken,
            !isShared(modifiers) && (modifiers.parent = this),
            indexSignature.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.IndexMemberDeclaration; }
    }

    export class GetAccessorSyntax extends SyntaxNode implements IMemberDeclarationSyntax, IPropertyAssignmentSyntax {
        public modifiers: ISyntaxToken[];
        public getKeyword: ISyntaxToken;
        public propertyName: ISyntaxToken;
        public parameterList: ParameterListSyntax;
        public typeAnnotation: TypeAnnotationSyntax;
        public block: BlockSyntax;
        public _isMemberDeclaration: any; public _isPropertyAssignment: any; public _isClassElement: any;
        constructor(data: number, modifiers: ISyntaxToken[], getKeyword: ISyntaxToken, propertyName: ISyntaxToken, parameterList: ParameterListSyntax, typeAnnotation: TypeAnnotationSyntax, block: BlockSyntax) {
            super(data);
            this.modifiers = modifiers,
            this.getKeyword = getKeyword,
            this.propertyName = propertyName,
            this.parameterList = parameterList,
            this.typeAnnotation = typeAnnotation,
            this.block = block,
            !isShared(modifiers) && (modifiers.parent = this),
            getKeyword.parent = this,
            propertyName.parent = this,
            parameterList.parent = this,
            typeAnnotation && (typeAnnotation.parent = this),
            block.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.GetAccessor; }
    }

    export class SetAccessorSyntax extends SyntaxNode implements IMemberDeclarationSyntax, IPropertyAssignmentSyntax {
        public modifiers: ISyntaxToken[];
        public setKeyword: ISyntaxToken;
        public propertyName: ISyntaxToken;
        public parameterList: ParameterListSyntax;
        public block: BlockSyntax;
        public _isMemberDeclaration: any; public _isPropertyAssignment: any; public _isClassElement: any;
        constructor(data: number, modifiers: ISyntaxToken[], setKeyword: ISyntaxToken, propertyName: ISyntaxToken, parameterList: ParameterListSyntax, block: BlockSyntax) {
            super(data);
            this.modifiers = modifiers,
            this.setKeyword = setKeyword,
            this.propertyName = propertyName,
            this.parameterList = parameterList,
            this.block = block,
            !isShared(modifiers) && (modifiers.parent = this),
            setKeyword.parent = this,
            propertyName.parent = this,
            parameterList.parent = this,
            block.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.SetAccessor; }
    }

    export class PropertySignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public propertyName: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public _isTypeMember: any;
        constructor(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax) {
            super(data);
            this.propertyName = propertyName,
            this.questionToken = questionToken,
            this.typeAnnotation = typeAnnotation,
            propertyName.parent = this,
            questionToken && (questionToken.parent = this),
            typeAnnotation && (typeAnnotation.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.PropertySignature; }
    }

    export class CallSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public typeParameterList: TypeParameterListSyntax;
        public parameterList: ParameterListSyntax;
        public typeAnnotation: TypeAnnotationSyntax;
        public _isTypeMember: any;
        constructor(data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, typeAnnotation: TypeAnnotationSyntax) {
            super(data);
            this.typeParameterList = typeParameterList,
            this.parameterList = parameterList,
            this.typeAnnotation = typeAnnotation,
            typeParameterList && (typeParameterList.parent = this),
            parameterList.parent = this,
            typeAnnotation && (typeAnnotation.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.CallSignature; }
    }

    export class ConstructSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public newKeyword: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public _isTypeMember: any;
        constructor(data: number, newKeyword: ISyntaxToken, callSignature: CallSignatureSyntax) {
            super(data);
            this.newKeyword = newKeyword,
            this.callSignature = callSignature,
            newKeyword.parent = this,
            callSignature.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ConstructSignature; }
    }

    export class IndexSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public openBracketToken: ISyntaxToken;
        public parameter: ParameterSyntax;
        public closeBracketToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public _isTypeMember: any;
        constructor(data: number, openBracketToken: ISyntaxToken, parameter: ParameterSyntax, closeBracketToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax) {
            super(data);
            this.openBracketToken = openBracketToken,
            this.parameter = parameter,
            this.closeBracketToken = closeBracketToken,
            this.typeAnnotation = typeAnnotation,
            openBracketToken.parent = this,
            parameter.parent = this,
            closeBracketToken.parent = this,
            typeAnnotation && (typeAnnotation.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.IndexSignature; }
    }

    export class MethodSignatureSyntax extends SyntaxNode implements ITypeMemberSyntax {
        public propertyName: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public _isTypeMember: any;
        constructor(data: number, propertyName: ISyntaxToken, questionToken: ISyntaxToken, callSignature: CallSignatureSyntax) {
            super(data);
            this.propertyName = propertyName,
            this.questionToken = questionToken,
            this.callSignature = callSignature,
            propertyName.parent = this,
            questionToken && (questionToken.parent = this),
            callSignature.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.MethodSignature; }
    }

    export class BlockSyntax extends SyntaxNode implements IStatementSyntax {
        public openBraceToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, openBraceToken: ISyntaxToken, statements: IStatementSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.openBraceToken = openBraceToken,
            this.statements = statements,
            this.closeBraceToken = closeBraceToken,
            openBraceToken.parent = this,
            !isShared(statements) && (statements.parent = this),
            closeBraceToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.Block; }
    }

    export class IfStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public ifKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public elseClause: ElseClauseSyntax;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, ifKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax, elseClause: ElseClauseSyntax) {
            super(data);
            this.ifKeyword = ifKeyword,
            this.openParenToken = openParenToken,
            this.condition = condition,
            this.closeParenToken = closeParenToken,
            this.statement = statement,
            this.elseClause = elseClause,
            ifKeyword.parent = this,
            openParenToken.parent = this,
            condition.parent = this,
            closeParenToken.parent = this,
            statement.parent = this,
            elseClause && (elseClause.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.IfStatement; }
    }

    export class VariableStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public modifiers: ISyntaxToken[];
        public variableDeclaration: VariableDeclarationSyntax;
        public semicolonToken: ISyntaxToken;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, modifiers: ISyntaxToken[], variableDeclaration: VariableDeclarationSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.modifiers = modifiers,
            this.variableDeclaration = variableDeclaration,
            this.semicolonToken = semicolonToken,
            !isShared(modifiers) && (modifiers.parent = this),
            variableDeclaration.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.VariableStatement; }
    }

    export class ExpressionStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.expression = expression,
            this.semicolonToken = semicolonToken,
            expression.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.ExpressionStatement; }
    }

    export class ReturnStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public returnKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, returnKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.returnKeyword = returnKeyword,
            this.expression = expression,
            this.semicolonToken = semicolonToken,
            returnKeyword.parent = this,
            expression && (expression.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.ReturnStatement; }
    }

    export class SwitchStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public switchKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public openBraceToken: ISyntaxToken;
        public switchClauses: ISwitchClauseSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, switchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, openBraceToken: ISyntaxToken, switchClauses: ISwitchClauseSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.switchKeyword = switchKeyword,
            this.openParenToken = openParenToken,
            this.expression = expression,
            this.closeParenToken = closeParenToken,
            this.openBraceToken = openBraceToken,
            this.switchClauses = switchClauses,
            this.closeBraceToken = closeBraceToken,
            switchKeyword.parent = this,
            openParenToken.parent = this,
            expression.parent = this,
            closeParenToken.parent = this,
            openBraceToken.parent = this,
            !isShared(switchClauses) && (switchClauses.parent = this),
            closeBraceToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.SwitchStatement; }
    }

    export class BreakStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public breakKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, breakKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
            this.breakKeyword = breakKeyword,
            this.identifier = identifier,
            this.semicolonToken = semicolonToken,
            breakKeyword.parent = this,
            identifier && (identifier.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.BreakStatement; }
    }

    export class ContinueStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public continueKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, continueKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
            this.continueKeyword = continueKeyword,
            this.identifier = identifier,
            this.semicolonToken = semicolonToken,
            continueKeyword.parent = this,
            identifier && (identifier.parent = this),
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.ContinueStatement; }
    }

    export class ForStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public forKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public variableDeclaration: VariableDeclarationSyntax;
        public initializer: IExpressionSyntax;
        public firstSemicolonToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public secondSemicolonToken: ISyntaxToken;
        public incrementor: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, initializer: IExpressionSyntax, firstSemicolonToken: ISyntaxToken, condition: IExpressionSyntax, secondSemicolonToken: ISyntaxToken, incrementor: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
            this.forKeyword = forKeyword,
            this.openParenToken = openParenToken,
            this.variableDeclaration = variableDeclaration,
            this.initializer = initializer,
            this.firstSemicolonToken = firstSemicolonToken,
            this.condition = condition,
            this.secondSemicolonToken = secondSemicolonToken,
            this.incrementor = incrementor,
            this.closeParenToken = closeParenToken,
            this.statement = statement,
            forKeyword.parent = this,
            openParenToken.parent = this,
            variableDeclaration && (variableDeclaration.parent = this),
            initializer && (initializer.parent = this),
            firstSemicolonToken.parent = this,
            condition && (condition.parent = this),
            secondSemicolonToken.parent = this,
            incrementor && (incrementor.parent = this),
            closeParenToken.parent = this,
            statement.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ForStatement; }
    }

    export class ForInStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public forKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public variableDeclaration: VariableDeclarationSyntax;
        public left: IExpressionSyntax;
        public inKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, left: IExpressionSyntax, inKeyword: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
            this.forKeyword = forKeyword,
            this.openParenToken = openParenToken,
            this.variableDeclaration = variableDeclaration,
            this.left = left,
            this.inKeyword = inKeyword,
            this.expression = expression,
            this.closeParenToken = closeParenToken,
            this.statement = statement,
            forKeyword.parent = this,
            openParenToken.parent = this,
            variableDeclaration && (variableDeclaration.parent = this),
            left && (left.parent = this),
            inKeyword.parent = this,
            expression.parent = this,
            closeParenToken.parent = this,
            statement.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ForInStatement; }
    }

    export class EmptyStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public semicolonToken: ISyntaxToken;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, semicolonToken: ISyntaxToken) {
            super(data);
            this.semicolonToken = semicolonToken,
            semicolonToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.EmptyStatement; }
    }

    export class ThrowStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public throwKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public semicolonToken: ISyntaxToken;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, throwKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken) {
            super(data);
            this.throwKeyword = throwKeyword,
            this.expression = expression,
            this.semicolonToken = semicolonToken,
            throwKeyword.parent = this,
            expression.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.ThrowStatement; }
    }

    export class WhileStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public whileKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
            this.whileKeyword = whileKeyword,
            this.openParenToken = openParenToken,
            this.condition = condition,
            this.closeParenToken = closeParenToken,
            this.statement = statement,
            whileKeyword.parent = this,
            openParenToken.parent = this,
            condition.parent = this,
            closeParenToken.parent = this,
            statement.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.WhileStatement; }
    }

    export class TryStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public tryKeyword: ISyntaxToken;
        public block: BlockSyntax;
        public catchClause: CatchClauseSyntax;
        public finallyClause: FinallyClauseSyntax;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, tryKeyword: ISyntaxToken, block: BlockSyntax, catchClause: CatchClauseSyntax, finallyClause: FinallyClauseSyntax) {
            super(data);
            this.tryKeyword = tryKeyword,
            this.block = block,
            this.catchClause = catchClause,
            this.finallyClause = finallyClause,
            tryKeyword.parent = this,
            block.parent = this,
            catchClause && (catchClause.parent = this),
            finallyClause && (finallyClause.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.TryStatement; }
    }

    export class LabeledStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public identifier: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, identifier: ISyntaxToken, colonToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
            this.identifier = identifier,
            this.colonToken = colonToken,
            this.statement = statement,
            identifier.parent = this,
            colonToken.parent = this,
            statement.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.LabeledStatement; }
    }

    export class DoStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public doKeyword: ISyntaxToken;
        public statement: IStatementSyntax;
        public whileKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, doKeyword: ISyntaxToken, statement: IStatementSyntax, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
            this.doKeyword = doKeyword,
            this.statement = statement,
            this.whileKeyword = whileKeyword,
            this.openParenToken = openParenToken,
            this.condition = condition,
            this.closeParenToken = closeParenToken,
            this.semicolonToken = semicolonToken,
            doKeyword.parent = this,
            statement.parent = this,
            whileKeyword.parent = this,
            openParenToken.parent = this,
            condition.parent = this,
            closeParenToken.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.DoStatement; }
    }

    export class DebuggerStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public debuggerKeyword: ISyntaxToken;
        public semicolonToken: ISyntaxToken;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, debuggerKeyword: ISyntaxToken, semicolonToken: ISyntaxToken) {
            super(data);
            this.debuggerKeyword = debuggerKeyword,
            this.semicolonToken = semicolonToken,
            debuggerKeyword.parent = this,
            semicolonToken && (semicolonToken.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.DebuggerStatement; }
    }

    export class WithStatementSyntax extends SyntaxNode implements IStatementSyntax {
        public withKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public condition: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public statement: IStatementSyntax;
        public _isStatement: any; public _isModuleElement: any;
        constructor(data: number, withKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
            this.withKeyword = withKeyword,
            this.openParenToken = openParenToken,
            this.condition = condition,
            this.closeParenToken = closeParenToken,
            this.statement = statement,
            withKeyword.parent = this,
            openParenToken.parent = this,
            condition.parent = this,
            closeParenToken.parent = this,
            statement.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.WithStatement; }
    }

    export class PrefixUnaryExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public operatorToken: ISyntaxToken;
        public operand: IUnaryExpressionSyntax;
        public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, operatorToken: ISyntaxToken, operand: IUnaryExpressionSyntax) {
            super(data);
            this.operatorToken = operatorToken,
            this.operand = operand,
            operatorToken.parent = this,
            operand.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxFacts.getPrefixUnaryExpressionFromOperatorToken(this.operatorToken.kind()); }
    }

    export class DeleteExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public deleteKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, deleteKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            super(data);
            this.deleteKeyword = deleteKeyword,
            this.expression = expression,
            deleteKeyword.parent = this,
            expression.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.DeleteExpression; }
    }

    export class TypeOfExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public typeOfKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, typeOfKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            super(data);
            this.typeOfKeyword = typeOfKeyword,
            this.expression = expression,
            typeOfKeyword.parent = this,
            expression.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.TypeOfExpression; }
    }

    export class VoidExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public voidKeyword: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, voidKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            super(data);
            this.voidKeyword = voidKeyword,
            this.expression = expression,
            voidKeyword.parent = this,
            expression.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.VoidExpression; }
    }

    export class ConditionalExpressionSyntax extends SyntaxNode implements IExpressionSyntax {
        public condition: IExpressionSyntax;
        public questionToken: ISyntaxToken;
        public whenTrue: IExpressionSyntax;
        public colonToken: ISyntaxToken;
        public whenFalse: IExpressionSyntax;
        public _isExpression: any;
        constructor(data: number, condition: IExpressionSyntax, questionToken: ISyntaxToken, whenTrue: IExpressionSyntax, colonToken: ISyntaxToken, whenFalse: IExpressionSyntax) {
            super(data);
            this.condition = condition,
            this.questionToken = questionToken,
            this.whenTrue = whenTrue,
            this.colonToken = colonToken,
            this.whenFalse = whenFalse,
            condition.parent = this,
            questionToken.parent = this,
            whenTrue.parent = this,
            colonToken.parent = this,
            whenFalse.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ConditionalExpression; }
    }

    export class BinaryExpressionSyntax extends SyntaxNode implements IExpressionSyntax {
        public left: IExpressionSyntax;
        public operatorToken: ISyntaxToken;
        public right: IExpressionSyntax;
        public _isExpression: any;
        constructor(data: number, left: IExpressionSyntax, operatorToken: ISyntaxToken, right: IExpressionSyntax) {
            super(data);
            this.left = left,
            this.operatorToken = operatorToken,
            this.right = right,
            left.parent = this,
            operatorToken.parent = this,
            right.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxFacts.getBinaryExpressionFromOperatorToken(this.operatorToken.kind()); }
    }

    export class PostfixUnaryExpressionSyntax extends SyntaxNode implements IPostfixExpressionSyntax {
        public operand: ILeftHandSideExpressionSyntax;
        public operatorToken: ISyntaxToken;
        public _isPostfixExpression: any; public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, operand: ILeftHandSideExpressionSyntax, operatorToken: ISyntaxToken) {
            super(data);
            this.operand = operand,
            this.operatorToken = operatorToken,
            operand.parent = this,
            operatorToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxFacts.getPostfixUnaryExpressionFromOperatorToken(this.operatorToken.kind()); }
    }

    export class MemberAccessExpressionSyntax extends SyntaxNode implements IMemberExpressionSyntax, ICallExpressionSyntax {
        public expression: ILeftHandSideExpressionSyntax;
        public dotToken: ISyntaxToken;
        public name: ISyntaxToken;
        public _isMemberExpression: any; public _isCallExpression: any; public _isLeftHandSideExpression: any; public _isPostfixExpression: any; public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, dotToken: ISyntaxToken, name: ISyntaxToken) {
            super(data);
            this.expression = expression,
            this.dotToken = dotToken,
            this.name = name,
            expression.parent = this,
            dotToken.parent = this,
            name.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.MemberAccessExpression; }
    }

    export class InvocationExpressionSyntax extends SyntaxNode implements ICallExpressionSyntax {
        public expression: ILeftHandSideExpressionSyntax;
        public argumentList: ArgumentListSyntax;
        public _isCallExpression: any; public _isLeftHandSideExpression: any; public _isPostfixExpression: any; public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, argumentList: ArgumentListSyntax) {
            super(data);
            this.expression = expression,
            this.argumentList = argumentList,
            expression.parent = this,
            argumentList.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.InvocationExpression; }
    }

    export class ArrayLiteralExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public openBracketToken: ISyntaxToken;
        public expressions: IExpressionSyntax[];
        public closeBracketToken: ISyntaxToken;
        public _isPrimaryExpression: any; public _isMemberExpression: any; public _isLeftHandSideExpression: any; public _isPostfixExpression: any; public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, openBracketToken: ISyntaxToken, expressions: IExpressionSyntax[], closeBracketToken: ISyntaxToken) {
            super(data);
            this.openBracketToken = openBracketToken,
            this.expressions = expressions,
            this.closeBracketToken = closeBracketToken,
            openBracketToken.parent = this,
            !isShared(expressions) && (expressions.parent = this),
            closeBracketToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ArrayLiteralExpression; }
    }

    export class ObjectLiteralExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public openBraceToken: ISyntaxToken;
        public propertyAssignments: IPropertyAssignmentSyntax[];
        public closeBraceToken: ISyntaxToken;
        public _isPrimaryExpression: any; public _isMemberExpression: any; public _isLeftHandSideExpression: any; public _isPostfixExpression: any; public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, openBraceToken: ISyntaxToken, propertyAssignments: IPropertyAssignmentSyntax[], closeBraceToken: ISyntaxToken) {
            super(data);
            this.openBraceToken = openBraceToken,
            this.propertyAssignments = propertyAssignments,
            this.closeBraceToken = closeBraceToken,
            openBraceToken.parent = this,
            !isShared(propertyAssignments) && (propertyAssignments.parent = this),
            closeBraceToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ObjectLiteralExpression; }
    }

    export class ObjectCreationExpressionSyntax extends SyntaxNode implements IMemberExpressionSyntax {
        public newKeyword: ISyntaxToken;
        public expression: IMemberExpressionSyntax;
        public argumentList: ArgumentListSyntax;
        public _isMemberExpression: any; public _isLeftHandSideExpression: any; public _isPostfixExpression: any; public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, newKeyword: ISyntaxToken, expression: IMemberExpressionSyntax, argumentList: ArgumentListSyntax) {
            super(data);
            this.newKeyword = newKeyword,
            this.expression = expression,
            this.argumentList = argumentList,
            newKeyword.parent = this,
            expression.parent = this,
            argumentList && (argumentList.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.ObjectCreationExpression; }
    }

    export class ParenthesizedExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public openParenToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public closeParenToken: ISyntaxToken;
        public _isPrimaryExpression: any; public _isMemberExpression: any; public _isLeftHandSideExpression: any; public _isPostfixExpression: any; public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken) {
            super(data);
            this.openParenToken = openParenToken,
            this.expression = expression,
            this.closeParenToken = closeParenToken,
            openParenToken.parent = this,
            expression.parent = this,
            closeParenToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ParenthesizedExpression; }
    }

    export class ParenthesizedArrowFunctionExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public callSignature: CallSignatureSyntax;
        public equalsGreaterThanToken: ISyntaxToken;
        public block: BlockSyntax;
        public expression: IExpressionSyntax;
        public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, callSignature: CallSignatureSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax) {
            super(data);
            this.callSignature = callSignature,
            this.equalsGreaterThanToken = equalsGreaterThanToken,
            this.block = block,
            this.expression = expression,
            callSignature.parent = this,
            equalsGreaterThanToken.parent = this,
            block && (block.parent = this),
            expression && (expression.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.ParenthesizedArrowFunctionExpression; }
    }

    export class SimpleArrowFunctionExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public identifier: ISyntaxToken;
        public equalsGreaterThanToken: ISyntaxToken;
        public block: BlockSyntax;
        public expression: IExpressionSyntax;
        public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, identifier: ISyntaxToken, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax) {
            super(data);
            this.identifier = identifier,
            this.equalsGreaterThanToken = equalsGreaterThanToken,
            this.block = block,
            this.expression = expression,
            identifier.parent = this,
            equalsGreaterThanToken.parent = this,
            block && (block.parent = this),
            expression && (expression.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.SimpleArrowFunctionExpression; }
    }

    export class CastExpressionSyntax extends SyntaxNode implements IUnaryExpressionSyntax {
        public lessThanToken: ISyntaxToken;
        public type: ITypeSyntax;
        public greaterThanToken: ISyntaxToken;
        public expression: IUnaryExpressionSyntax;
        public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, lessThanToken: ISyntaxToken, type: ITypeSyntax, greaterThanToken: ISyntaxToken, expression: IUnaryExpressionSyntax) {
            super(data);
            this.lessThanToken = lessThanToken,
            this.type = type,
            this.greaterThanToken = greaterThanToken,
            this.expression = expression,
            lessThanToken.parent = this,
            type.parent = this,
            greaterThanToken.parent = this,
            expression.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.CastExpression; }
    }

    export class ElementAccessExpressionSyntax extends SyntaxNode implements IMemberExpressionSyntax, ICallExpressionSyntax {
        public expression: ILeftHandSideExpressionSyntax;
        public openBracketToken: ISyntaxToken;
        public argumentExpression: IExpressionSyntax;
        public closeBracketToken: ISyntaxToken;
        public _isMemberExpression: any; public _isCallExpression: any; public _isLeftHandSideExpression: any; public _isPostfixExpression: any; public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, expression: ILeftHandSideExpressionSyntax, openBracketToken: ISyntaxToken, argumentExpression: IExpressionSyntax, closeBracketToken: ISyntaxToken) {
            super(data);
            this.expression = expression,
            this.openBracketToken = openBracketToken,
            this.argumentExpression = argumentExpression,
            this.closeBracketToken = closeBracketToken,
            expression.parent = this,
            openBracketToken.parent = this,
            argumentExpression.parent = this,
            closeBracketToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ElementAccessExpression; }
    }

    export class FunctionExpressionSyntax extends SyntaxNode implements IPrimaryExpressionSyntax {
        public functionKeyword: ISyntaxToken;
        public identifier: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _isPrimaryExpression: any; public _isMemberExpression: any; public _isLeftHandSideExpression: any; public _isPostfixExpression: any; public _isUnaryExpression: any; public _isExpression: any;
        constructor(data: number, functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
            super(data);
            this.functionKeyword = functionKeyword,
            this.identifier = identifier,
            this.callSignature = callSignature,
            this.block = block,
            functionKeyword.parent = this,
            identifier && (identifier.parent = this),
            callSignature.parent = this,
            block.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.FunctionExpression; }
    }

    export class OmittedExpressionSyntax extends SyntaxNode implements IExpressionSyntax {
        public _isExpression: any;
        constructor(data: number) {
            super(data);
        }
        public kind(): SyntaxKind { return SyntaxKind.OmittedExpression; }
    }

    export class VariableDeclarationSyntax extends SyntaxNode {
        public varKeyword: ISyntaxToken;
        public variableDeclarators: VariableDeclaratorSyntax[];
        constructor(data: number, varKeyword: ISyntaxToken, variableDeclarators: VariableDeclaratorSyntax[]) {
            super(data);
            this.varKeyword = varKeyword,
            this.variableDeclarators = variableDeclarators,
            varKeyword.parent = this,
            !isShared(variableDeclarators) && (variableDeclarators.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.VariableDeclaration; }
    }

    export class VariableDeclaratorSyntax extends SyntaxNode {
        public propertyName: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public equalsValueClause: EqualsValueClauseSyntax;
        constructor(data: number, propertyName: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) {
            super(data);
            this.propertyName = propertyName,
            this.typeAnnotation = typeAnnotation,
            this.equalsValueClause = equalsValueClause,
            propertyName.parent = this,
            typeAnnotation && (typeAnnotation.parent = this),
            equalsValueClause && (equalsValueClause.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.VariableDeclarator; }
    }

    export class ArgumentListSyntax extends SyntaxNode {
        public typeArgumentList: TypeArgumentListSyntax;
        public openParenToken: ISyntaxToken;
        public arguments: IExpressionSyntax[];
        public closeParenToken: ISyntaxToken;
        constructor(data: number, typeArgumentList: TypeArgumentListSyntax, openParenToken: ISyntaxToken, _arguments: IExpressionSyntax[], closeParenToken: ISyntaxToken) {
            super(data);
            this.typeArgumentList = typeArgumentList,
            this.openParenToken = openParenToken,
            this.arguments = _arguments,
            this.closeParenToken = closeParenToken,
            typeArgumentList && (typeArgumentList.parent = this),
            openParenToken.parent = this,
            !isShared(_arguments) && (_arguments.parent = this),
            closeParenToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ArgumentList; }
    }

    export class ParameterListSyntax extends SyntaxNode {
        public openParenToken: ISyntaxToken;
        public parameters: ParameterSyntax[];
        public closeParenToken: ISyntaxToken;
        constructor(data: number, openParenToken: ISyntaxToken, parameters: ParameterSyntax[], closeParenToken: ISyntaxToken) {
            super(data);
            this.openParenToken = openParenToken,
            this.parameters = parameters,
            this.closeParenToken = closeParenToken,
            openParenToken.parent = this,
            !isShared(parameters) && (parameters.parent = this),
            closeParenToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ParameterList; }
    }

    export class TypeArgumentListSyntax extends SyntaxNode {
        public lessThanToken: ISyntaxToken;
        public typeArguments: ITypeSyntax[];
        public greaterThanToken: ISyntaxToken;
        constructor(data: number, lessThanToken: ISyntaxToken, typeArguments: ITypeSyntax[], greaterThanToken: ISyntaxToken) {
            super(data);
            this.lessThanToken = lessThanToken,
            this.typeArguments = typeArguments,
            this.greaterThanToken = greaterThanToken,
            lessThanToken.parent = this,
            !isShared(typeArguments) && (typeArguments.parent = this),
            greaterThanToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.TypeArgumentList; }
    }

    export class TypeParameterListSyntax extends SyntaxNode {
        public lessThanToken: ISyntaxToken;
        public typeParameters: TypeParameterSyntax[];
        public greaterThanToken: ISyntaxToken;
        constructor(data: number, lessThanToken: ISyntaxToken, typeParameters: TypeParameterSyntax[], greaterThanToken: ISyntaxToken) {
            super(data);
            this.lessThanToken = lessThanToken,
            this.typeParameters = typeParameters,
            this.greaterThanToken = greaterThanToken,
            lessThanToken.parent = this,
            !isShared(typeParameters) && (typeParameters.parent = this),
            greaterThanToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.TypeParameterList; }
    }

    export class HeritageClauseSyntax extends SyntaxNode {
        public extendsOrImplementsKeyword: ISyntaxToken;
        public typeNames: INameSyntax[];
        constructor(data: number, extendsOrImplementsKeyword: ISyntaxToken, typeNames: INameSyntax[]) {
            super(data);
            this.extendsOrImplementsKeyword = extendsOrImplementsKeyword,
            this.typeNames = typeNames,
            extendsOrImplementsKeyword.parent = this,
            !isShared(typeNames) && (typeNames.parent = this);
        }
        public kind(): SyntaxKind { return this.extendsOrImplementsKeyword.kind() === SyntaxKind.ExtendsKeyword ? SyntaxKind.ExtendsHeritageClause : SyntaxKind.ImplementsHeritageClause; }
    }

    export class EqualsValueClauseSyntax extends SyntaxNode {
        public equalsToken: ISyntaxToken;
        public value: IExpressionSyntax;
        constructor(data: number, equalsToken: ISyntaxToken, value: IExpressionSyntax) {
            super(data);
            this.equalsToken = equalsToken,
            this.value = value,
            equalsToken.parent = this,
            value.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.EqualsValueClause; }
    }

    export class CaseSwitchClauseSyntax extends SyntaxNode implements ISwitchClauseSyntax {
        public caseKeyword: ISyntaxToken;
        public expression: IExpressionSyntax;
        public colonToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public _isSwitchClause: any;
        constructor(data: number, caseKeyword: ISyntaxToken, expression: IExpressionSyntax, colonToken: ISyntaxToken, statements: IStatementSyntax[]) {
            super(data);
            this.caseKeyword = caseKeyword,
            this.expression = expression,
            this.colonToken = colonToken,
            this.statements = statements,
            caseKeyword.parent = this,
            expression.parent = this,
            colonToken.parent = this,
            !isShared(statements) && (statements.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.CaseSwitchClause; }
    }

    export class DefaultSwitchClauseSyntax extends SyntaxNode implements ISwitchClauseSyntax {
        public defaultKeyword: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public statements: IStatementSyntax[];
        public _isSwitchClause: any;
        constructor(data: number, defaultKeyword: ISyntaxToken, colonToken: ISyntaxToken, statements: IStatementSyntax[]) {
            super(data);
            this.defaultKeyword = defaultKeyword,
            this.colonToken = colonToken,
            this.statements = statements,
            defaultKeyword.parent = this,
            colonToken.parent = this,
            !isShared(statements) && (statements.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.DefaultSwitchClause; }
    }

    export class ElseClauseSyntax extends SyntaxNode {
        public elseKeyword: ISyntaxToken;
        public statement: IStatementSyntax;
        constructor(data: number, elseKeyword: ISyntaxToken, statement: IStatementSyntax) {
            super(data);
            this.elseKeyword = elseKeyword,
            this.statement = statement,
            elseKeyword.parent = this,
            statement.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ElseClause; }
    }

    export class CatchClauseSyntax extends SyntaxNode {
        public catchKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public identifier: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public closeParenToken: ISyntaxToken;
        public block: BlockSyntax;
        constructor(data: number, catchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, identifier: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, closeParenToken: ISyntaxToken, block: BlockSyntax) {
            super(data);
            this.catchKeyword = catchKeyword,
            this.openParenToken = openParenToken,
            this.identifier = identifier,
            this.typeAnnotation = typeAnnotation,
            this.closeParenToken = closeParenToken,
            this.block = block,
            catchKeyword.parent = this,
            openParenToken.parent = this,
            identifier.parent = this,
            typeAnnotation && (typeAnnotation.parent = this),
            closeParenToken.parent = this,
            block.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.CatchClause; }
    }

    export class FinallyClauseSyntax extends SyntaxNode {
        public finallyKeyword: ISyntaxToken;
        public block: BlockSyntax;
        constructor(data: number, finallyKeyword: ISyntaxToken, block: BlockSyntax) {
            super(data);
            this.finallyKeyword = finallyKeyword,
            this.block = block,
            finallyKeyword.parent = this,
            block.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.FinallyClause; }
    }

    export class TypeParameterSyntax extends SyntaxNode {
        public identifier: ISyntaxToken;
        public constraint: ConstraintSyntax;
        constructor(data: number, identifier: ISyntaxToken, constraint: ConstraintSyntax) {
            super(data);
            this.identifier = identifier,
            this.constraint = constraint,
            identifier.parent = this,
            constraint && (constraint.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.TypeParameter; }
    }

    export class ConstraintSyntax extends SyntaxNode {
        public extendsKeyword: ISyntaxToken;
        public type: ITypeSyntax;
        constructor(data: number, extendsKeyword: ISyntaxToken, type: ITypeSyntax) {
            super(data);
            this.extendsKeyword = extendsKeyword,
            this.type = type,
            extendsKeyword.parent = this,
            type.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.Constraint; }
    }

    export class SimplePropertyAssignmentSyntax extends SyntaxNode implements IPropertyAssignmentSyntax {
        public propertyName: ISyntaxToken;
        public colonToken: ISyntaxToken;
        public expression: IExpressionSyntax;
        public _isPropertyAssignment: any;
        constructor(data: number, propertyName: ISyntaxToken, colonToken: ISyntaxToken, expression: IExpressionSyntax) {
            super(data);
            this.propertyName = propertyName,
            this.colonToken = colonToken,
            this.expression = expression,
            propertyName.parent = this,
            colonToken.parent = this,
            expression.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.SimplePropertyAssignment; }
    }

    export class FunctionPropertyAssignmentSyntax extends SyntaxNode implements IPropertyAssignmentSyntax {
        public propertyName: ISyntaxToken;
        public callSignature: CallSignatureSyntax;
        public block: BlockSyntax;
        public _isPropertyAssignment: any;
        constructor(data: number, propertyName: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax) {
            super(data);
            this.propertyName = propertyName,
            this.callSignature = callSignature,
            this.block = block,
            propertyName.parent = this,
            callSignature.parent = this,
            block.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.FunctionPropertyAssignment; }
    }

    export class ParameterSyntax extends SyntaxNode {
        public dotDotDotToken: ISyntaxToken;
        public modifiers: ISyntaxToken[];
        public identifier: ISyntaxToken;
        public questionToken: ISyntaxToken;
        public typeAnnotation: TypeAnnotationSyntax;
        public equalsValueClause: EqualsValueClauseSyntax;
        constructor(data: number, dotDotDotToken: ISyntaxToken, modifiers: ISyntaxToken[], identifier: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax) {
            super(data);
            this.dotDotDotToken = dotDotDotToken,
            this.modifiers = modifiers,
            this.identifier = identifier,
            this.questionToken = questionToken,
            this.typeAnnotation = typeAnnotation,
            this.equalsValueClause = equalsValueClause,
            dotDotDotToken && (dotDotDotToken.parent = this),
            !isShared(modifiers) && (modifiers.parent = this),
            identifier.parent = this,
            questionToken && (questionToken.parent = this),
            typeAnnotation && (typeAnnotation.parent = this),
            equalsValueClause && (equalsValueClause.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.Parameter; }
    }

    export class EnumElementSyntax extends SyntaxNode {
        public propertyName: ISyntaxToken;
        public equalsValueClause: EqualsValueClauseSyntax;
        constructor(data: number, propertyName: ISyntaxToken, equalsValueClause: EqualsValueClauseSyntax) {
            super(data);
            this.propertyName = propertyName,
            this.equalsValueClause = equalsValueClause,
            propertyName.parent = this,
            equalsValueClause && (equalsValueClause.parent = this);
        }
        public kind(): SyntaxKind { return SyntaxKind.EnumElement; }
    }

    export class TypeAnnotationSyntax extends SyntaxNode {
        public colonToken: ISyntaxToken;
        public type: ITypeSyntax;
        constructor(data: number, colonToken: ISyntaxToken, type: ITypeSyntax) {
            super(data);
            this.colonToken = colonToken,
            this.type = type,
            colonToken.parent = this,
            type.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.TypeAnnotation; }
    }

    export class ExternalModuleReferenceSyntax extends SyntaxNode implements IModuleReferenceSyntax {
        public requireKeyword: ISyntaxToken;
        public openParenToken: ISyntaxToken;
        public stringLiteral: ISyntaxToken;
        public closeParenToken: ISyntaxToken;
        public _isModuleReference: any;
        constructor(data: number, requireKeyword: ISyntaxToken, openParenToken: ISyntaxToken, stringLiteral: ISyntaxToken, closeParenToken: ISyntaxToken) {
            super(data);
            this.requireKeyword = requireKeyword,
            this.openParenToken = openParenToken,
            this.stringLiteral = stringLiteral,
            this.closeParenToken = closeParenToken,
            requireKeyword.parent = this,
            openParenToken.parent = this,
            stringLiteral.parent = this,
            closeParenToken.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ExternalModuleReference; }
    }

    export class ModuleNameModuleReferenceSyntax extends SyntaxNode implements IModuleReferenceSyntax {
        public moduleName: INameSyntax;
        public _isModuleReference: any;
        constructor(data: number, moduleName: INameSyntax) {
            super(data);
            this.moduleName = moduleName,
            moduleName.parent = this;
        }
        public kind(): SyntaxKind { return SyntaxKind.ModuleNameModuleReference; }
    }
}