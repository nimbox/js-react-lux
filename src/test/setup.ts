// Registers @testing-library/jest-dom matchers (toBeInTheDocument,
// toHaveClass, …) on Vitest's `expect` and augments its type declarations.
import '@testing-library/jest-dom/vitest';

// jsdom does not implement scrollIntoView; several components call it during
// keyboard navigation. Provide a no-op so those paths don't throw under test.
if (typeof Element !== 'undefined') {
    Element.prototype.scrollIntoView = () => { };
}
