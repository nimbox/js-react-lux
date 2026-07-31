import type { ReactNode } from 'react';
import { createContext, type FC, useContext } from 'react';
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

export interface RadioBarComponent extends FC<RadioBarProps> {
    Option: FC<RadioBarOptionProps>;
}


/**
 * One choice from a short row of them.
 *
 * Plain labels, the chosen one darkened with a rule beneath it. Nothing is
 * boxed or filled: these rows mostly live in headings, next to a title, and a
 * filled segment there outshouts the thing it belongs to — the control ends up
 * reading as the subject of the panel rather than as a way to narrow it.
 */
export const RadioBar: RadioBarComponent = ({ value, onChange, className, children }) => (
    <Context.Provider value={{ value, onChange }}>
        <div className={cn('max-w-full inline-flex flex-row items-baseline gap-4', className)}>
            {children}
        </div>
    </Context.Provider>
);

RadioBar.Option = (({ value, className, children }) => {

    const context = useContext(Context);
    const onClick = () => context.onChange(value);
    const isChosen = context.value === value;

    // The unchosen options carry a transparent rule of the same weight. Give the
    // border only to the chosen one and every label lifts two pixels as the
    // choice moves along the row.

    // Weight stays put across states. The choice is already carried twice over,
    // by the colour and by the rule, so changing weight as well earned little —
    // and it cost the row its stability, since a heavier face has wider advances
    // and every label shuffles sideways as the choice moves.

    return (
        <div
            onClick={onClick}
            className={cn(
                'min-w-0 truncate cursor-pointer border-b-2 pb-px',
                isChosen
                    ? 'border-content text-content'
                    : 'border-transparent text-muted hover:text-content',
                className)}
        >
            {children}
        </div>
    );

}) as FC<RadioBarOptionProps>;
RadioBar.Option.displayName = 'RadioBar.Option';
