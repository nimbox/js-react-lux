# Forwarding ref to a controlled or uncontrolled input

Many times we want to wrap an input into another component that
behaves like the input. We want to 'hijack' the input but maintain the
controlled and uncontrolled behaviors.

We can usually define the class like this:

```ts
export const MyComponent = forwardRef((
    props: MyComponentProps & InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // Properties


    const {

        defaultValue: propsDefaultValue,
        value: propsValue,
        onChange,

        ...inputProps

    } = props;

    // State

    const internalInputRef = useRef<HTMLInputElement>(null);
    const isControlled = propsValue != null;
    const [internalValue, setInternalValue] = useState<
        string | ReadonlyArray<string> | number | undefined
    >(propsDefaultValue ?? '');
    const value = isControlled ? propsValue : internalValue;

    // Handlers

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setInternalValue(e.target.value);
        }
        onChange?.(e);
    };

    // Render

    return (
        <input 
            ref={internalInputRef}
            defaultValue={propsDefaultValue}
            value={propsValue}
            onChange={handleChange}
        />
    );
});
```
