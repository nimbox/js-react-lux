import { ItemProvider } from './ItemProvider';


export class ArrayItemProvider<I, T> implements ItemProvider<I, T> {

    items: T[];

    identifier: (item: T) => I;
    finder: (items: T[], q: I) => T[];

    constructor(items: T[], identifier: (item: T) => I, finder: (items: T[], q: I) => T[]) {
        this.items = items;
        this.identifier = identifier;
        this.finder = finder;
    }

    value(item: T): I {
        return this.identifier(item);
    }

    get(...value: I[]): T[] {
        const set = new Set(value);
        return this.items.filter(item => set.has(this.identifier(item)));
    }

    find(items: T[], q: I): T[] {
        return this.finder(items, q);
    }

    search(q: I, n?: number | undefined): T[] {
        return this.finder(this.items, q);
    }

}