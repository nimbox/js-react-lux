/**
 * Get the document active element or null if none. Checks that
 * `document.activeElement` is not the body element according to:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement.
 *
 * @returns the active element or null if none.
 */
export const getActiveElement = () => {
    return document.activeElement && document.activeElement.tagName !== 'BODY' ? document.activeElement : null;
};
