export class MockStore<T> {

    items: T[];

    getter: (value: string) => (item: T) => boolean;
    searcher: (q: string) => (item: T) => boolean;

    constructor(items: T[], getter: (value: string) => (item: T) => boolean, searcher: (q: string) => (item: T) => boolean) {
        this.items = items;
        this.getter = getter;
        this.searcher = searcher;
    }

    async create(item: T, timeout: number = 0) {
        await new Promise(resolve => setTimeout(resolve, timeout));
        this.items.push(item);
        return item;
    }

    get(q: string) {
        return this.items.find(this.getter(q));
    }

    async search(q: string, timeout: number = 0) {
        await new Promise(resolve => setTimeout(resolve, timeout));
        return this.items.filter(this.searcher(q));
    }

}