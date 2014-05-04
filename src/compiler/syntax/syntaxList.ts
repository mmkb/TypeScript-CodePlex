///<reference path='references.ts' />

module TypeScript {
    export interface ISyntaxList<T extends ISyntaxNodeOrToken> extends ISyntaxElement {
        childAt(index: number): T;
        setChildAt(index: number, value: T): void;
    }

    export interface ISeparatedSyntaxList<T extends ISyntaxNodeOrToken> extends ISyntaxElement {
        childAt(index: number): ISyntaxNodeOrToken;
        setChildAt(index: number, value: ISyntaxNodeOrToken): void;

        separatorCount(): number;
        separatorAt(index: number): ISyntaxToken;

        nonSeparatorCount(): number;
        nonSeparatorAt(index: number): T;
    }
}

interface Array<T> {
    kind(): TypeScript.SyntaxKind;
    parent: TypeScript.ISyntaxElement;

    childCount(): number;

    childAt(index: number): T;
    setChildAt(index: number, value: T): void;

    separatorCount(): number;
    separatorAt(index: number): TypeScript.ISyntaxToken;

    nonSeparatorCount(): number;
    nonSeparatorAt(index: number): T;
}

module TypeScript.Syntax {
    var _emptyList: ISyntaxNodeOrToken[] = [];
    var _emptySeparatedList: ISyntaxNodeOrToken[] = [];
    var _emptySeparators: ISyntaxToken[] = [];

    (<any>_emptySeparatedList).separators = _emptySeparators;

    function assertEmptyLists() {
        // Debug.assert(_emptyList.length === 0);
        var separators = (<any>_emptySeparatedList).separators;
        // Debug.assert(!separators || separators.length === 0);
    }

    Array.prototype.kind = function (): SyntaxKind {
        assertEmptyLists();
        return this.separators !== undefined ? SyntaxKind.SeparatedList : SyntaxKind.List;
    }

    Array.prototype.setChildAt = function (index: number, value: any): void {
        assertEmptyLists();
        // Debug.assert(index >= 0 && index < this.childCount());
        if (this.kind() === SyntaxKind.SeparatedList) {
            if (index % 2 === 0) {
                // Even elements are the non-separators.
                this[index / 2] = value;
            }
            else {
                // Odd elements are the separators.  1 is the first separator, 3 is the second, 5 is the third.
                this.separators[(index - 1) / 2] = value;
            }
        }
        else {
            this[index] = value;
        }

        // Clear any cached data we may have.  We'll need to recompute it.
        this._data = 0;
        value.parent = this;
    }

    Array.prototype.childCount = function (): number {
        assertEmptyLists();
        if (this.separators) {
            return this.length + this.separators.length;
        }
        else {
            return this.length;
        }
    }

    Array.prototype.childAt = function (index: number): any {
        assertEmptyLists();
        // Debug.assert(index >= 0 && index < this.childCount());
        if (this.kind() === SyntaxKind.SeparatedList) {
            if (index % 2 === 0) {
                // Even elements are the non-separators.
                return this[index / 2];
            }
            else {
                // Odd elements are the separators.  1 is the first separator, 3 is the second, 5 is the third.
                return this.separators[(index - 1) / 2];
            }
        }
        else {
            return this[index];
        }
    }

    Array.prototype.separatorCount = function (): number {
        assertEmptyLists();
        // Debug.assert(this.kind() === SyntaxKind.SeparatedList);
        return this.separators.length;
    }

    Array.prototype.separatorAt = function (index: number): ISyntaxToken {
        assertEmptyLists();
        // Debug.assert(this.kind() === SyntaxKind.SeparatedList);
        // Debug.assert(index >= 0 && index < this.separators.length);
        return this.separators[index];
    }

    Array.prototype.nonSeparatorCount = function () {
        assertEmptyLists();
        // Debug.assert(this.kind() === SyntaxKind.SeparatedList);
        return this.length;
    }

    Array.prototype.nonSeparatorAt = function (index: number) {
        assertEmptyLists();
        // Debug.assert(this.kind() === SyntaxKind.SeparatedList);
        // Debug.assert(index >= 0 && index < this.length);
        return this[index];
    }

    export function emptyList<T extends ISyntaxNodeOrToken>(): ISyntaxList<T> {
        return <ISyntaxList<T>><any>_emptyList;
    }

    export function emptySeparatedList<T extends ISyntaxNodeOrToken>(): ISeparatedSyntaxList<T> {
        return <ISeparatedSyntaxList<T>><any>_emptySeparatedList;
    }

    export function list<T extends ISyntaxNodeOrToken>(nodes: T[]): ISyntaxList<T> {
        if (nodes === undefined || nodes === null || nodes.length === 0) {
            return emptyList<T>();
        }

        for (var i = 0, n = nodes.length; i < n; i++) {
            nodes[i].parent = nodes;
        }

        return nodes;
    }

    export function separatedList<T extends ISyntaxNodeOrToken>(nodes: T[], separators: ISyntaxToken[]): ISeparatedSyntaxList<T> {
        if (nodes === undefined || nodes === null || nodes.length === 0) {
            return emptySeparatedList<T>();
        }

        // Debug.assert(separators.length === nodes.length || separators.length == (nodes.length - 1));

        for (var i = 0, n = nodes.length; i < n; i++) {
            nodes[i].parent = nodes;
        }

        for (var i = 0, n = separators.length; i < n; i++) {
            separators[i].parent = nodes;
        }

        (<any>nodes).separators = separators.length === 0 ? _emptySeparators : separators;

        return nodes;
    }

    export function nonSeparatorIndexOf<T extends ISyntaxNodeOrToken>(list: ISeparatedSyntaxList<T>, ast: ISyntaxNodeOrToken): number {
        for (var i = 0, n = list.nonSeparatorCount(); i < n; i++) {
            if (list.nonSeparatorAt(i) === ast) {
                return i;
            }
        }

        return -1;
    }
}