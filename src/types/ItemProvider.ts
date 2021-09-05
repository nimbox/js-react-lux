export interface ItemProvider<V, T> {

    /** Return the value of a given item. */
    value: (item: T) => V;

    /** Get one or many items associated to the given ids. */
    get: (...values: V[]) => Promise<T[]> | T[];

    /** Find items with the query string q. */
    find: (items: T[], q: V) => T[];

    /** Search items based on query string q and return at most n items. */
    search: (q: V, n?: number) => Promise<T[]> | T[];

}
