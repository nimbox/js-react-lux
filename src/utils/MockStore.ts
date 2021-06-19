export class MockStore<T> {

    items: T[];

    creator: (q: string) => T;
    getter: (value: string) => (item: T) => boolean;
    searcher: (q: string) => (item: T) => boolean;

    constructor(items: T[], getter: (value: string) => (item: T) => boolean, creator: (q: string) => T, searcher: (q: string) => (item: T) => boolean) {
        this.items = items;
        this.creator = creator;
        this.getter = getter;
        this.searcher = searcher;
    }

    async create(q: string, timeout: number = 0, error = false) {
        await new Promise(resolve => setTimeout(resolve, timeout));
        const item = this.creator(q);
        this.items.push(item);
        return item;
    }

    get(q: string) {
        return this.items.find(this.getter(q));
    }

    async search(q: string, timeout: number = 0, error = false) {
        await new Promise(resolve => setTimeout(resolve, timeout));
        return this.items.filter(this.searcher(q));
    }

}