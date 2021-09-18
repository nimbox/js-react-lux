/**
 * 
 * @param query 
 * @returns 
 */

export function createQueryMatcher(query: string) {

    if (query == null || query.trim().length === 0) {
        return (value: string) => false;
    }

    // tokenize  query

    const tokens = query.split(' ');
    const expression = new RegExp(tokens.join(' | '), 'i');

    return (value: string) => expression.test(value);

}
