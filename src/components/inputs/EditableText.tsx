import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { WarningIcon } from '../../icons/components';
import { Loading } from '../Loading';
import { PlainInput } from './PlainInput';


export interface EditableTextProps {

    value: string;
    onChange: (newText: string, oldText: string) => void | Promise<void>;

    withFullWidth?: boolean;

}

export const EditableText: FC<EditableTextProps> = (props) => {

    const { value, onChange, withFullWidth } = props;

    const [displayValue, setDisplayValue] = useState(value);
    const [inputValue, setInputValue] = useState(value);

    const [minInputWidth, setMinInputWidth] = useState<string | undefined>();

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const displayRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleTextClick = () => {
        if (displayRef.current && !withFullWidth) {
            const spanWidth = displayRef.current.offsetWidth;
            setMinInputWidth(`${spanWidth + 1}px`);
        }
        setEditing(true);
        setError(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            handleSubmit();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    const handleSubmit = async () => {

        setEditing(false);
        setLoading(true);
        setError(false);

        try {
            await Promise.resolve(onChange(inputValue, value));
            setDisplayValue(inputValue);
        } catch (err) {
            setDisplayValue(value);
            setInputValue(value);
            setError(true);
            setTimeout(() => setError(false), 5000);
        } finally {
            setLoading(false);
        }

    };

    const handleCancel = () => {
        setEditing(false);
        setDisplayValue(value);
        setInputValue(value);
    };

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editing]);

    return (
        <>
            {editing || loading || error ? (
                <div className={classNames('inline-flex items-baseline gap-2',
                    'lux-crux lux-field lux-field-focus lux-field-editable'
                    , {
                        'w-full': withFullWidth
                    })}>

                    <PlainInput
                        ref={inputRef}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleCancel}
                        disabled={loading || error}
                        className={classNames({ 'w-full': withFullWidth })}
                        style={{ minWidth: minInputWidth }}
                    />

                    {loading && <Loading />}
                    {error && <WarningIcon className="text-danger-500" />}

                    <div className="lux-field-border" />
                </div>
            ) : (
                <span
                    ref={displayRef}
                    onClick={handleTextClick}
                    className={classNames(
                        'block cursor-text', {
                        'w-full': withFullWidth
                    })}
                >
                    {displayValue}
                </span>
            )}
        </>
    );

};
