/**
 * 
 * @param query 
 * @returns 
 */

export function createSearchMatcher(query?: string | null): (value?: string | null) => boolean {

    if (query == null || query.trim().length === 0) {
        return () => false;
    }

    // tokenize  query

    const tokens = query.split(' ');
    const expression = new RegExp(tokens.join(' | '), 'i');

    return (value?: string | null) => Boolean(value && expression.test(value));

}
