export function isControlled(props: { type?: string, checked?: string, value?: string }) {
    const usesChecked = props.type === 'checkbox' || props.type === 'radio';
    return usesChecked ? props.checked != null : props.value != null;
}
