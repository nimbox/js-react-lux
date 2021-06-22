export declare class MockStore<T> {
    items: T[];
    getter: (value: string) => (item: T) => boolean;
    searcher: (q: string) => (item: T) => boolean;
    constructor(items: T[], getter: (value: string) => (item: T) => boolean, searcher: (q: string) => (item: T) => boolean);
    create(item: T, timeout?: number, error?: boolean): Promise<T>;
    get(q: string): T | undefined;
    search(q: string, timeout?: number, error?: boolean): Promise<T[]>;
}
