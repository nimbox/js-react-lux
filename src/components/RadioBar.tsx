import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { cn } from './utilities/cn';


export interface RadioBarProps {

    value: string | number;
    onChange: (value: string | number) => void;

    className?: string;
    children?: ReactNode;
}

export interface RadioBarOptionProps {

    value: string | number;

    className?: string;
    children?: ReactNode;

}

type ContextProps = Pick<RadioBarProps, 'value' | 'onChange'>;
const Context = createContext<ContextProps>({ value: '', onChange: () => null });


/**
 * One choice from a short row of them.
 *
 * Plain labels, the chosen one darkened with a rule beneath it. Nothing is
 * boxed or filled: these rows mostly live in headings, next to a title, and a
 * filled segment there outshouts the thing it belongs to — the control ends up
 * reading as the subject of the panel rather than as a way to narrow it.
 */
export function RadioBar({ value, onChange, className, children }: RadioBarProps) {

    return (
        <Context.Provider value={{ value, onChange }}>
            <div className={cn('max-w-full inline-flex flex-row items-baseline gap-4', className)}>
                {children}
            </div>
        </Context.Provider>
    );

}


export function RadioBarOption({ value, className, children }: RadioBarOptionProps) {

    const context = useContext(Context);
    const onClick = () => context.onChange(value);
    const isChosen = context.value === value;

    return (
        <div
            onClick={onClick}
            className={cn(
                'min-w-0 lux-bar-rule truncate cursor-pointer',
                isChosen
                    ? 'border-content text-content'
                    : 'border-transparent text-unchosen hover:text-content',
                className)}
        >
            {children}
        </div>
    );

}


RadioBar.Option = RadioBarOption;
