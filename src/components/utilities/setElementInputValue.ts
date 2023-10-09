export const setElementInputValue = (inputElement: HTMLInputElement | HTMLSelectElement | null, value: string | ReadonlyArray<string> | number | undefined) => {
    if (inputElement) {
        const setter = Object?.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (setter && value != null) {
            setter.call(inputElement, value);
            inputElement.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }
};
