import type { MouseEvent, ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { cn } from './utilities/cn';


export interface CheckBarProps {

    value: (string | number)[];
    onChange: (value: (string | number)[]) => void;

    className?: string;
    children?: ReactNode;

}

export interface CheckBarOptionProps {

    value: (string | number);

    className?: string;
    children?: ReactNode;

}

export interface CheckBarAllProps {

    className?: string;
    children?: ReactNode;

}

interface ContextProps {

    value: (string | number)[];
    onChange: (value: (string | number)[]) => void;

    /** An option announcing itself; the returned function takes it back out. */
    register: (value: string | number) => () => void;

    /** Every option currently in the bar, in the order they mounted. */
    options: (string | number)[];

}

const Context = createContext<ContextProps>({
    value: [],
    onChange: () => null,
    register: () => () => null,
    options: []
});

const optionClassName = (isChosen: boolean, className?: string) => cn(
    'min-w-0 lux-bar-rule truncate cursor-pointer',
    isChosen
        ? 'border-content text-content'
        : 'border-transparent text-muted hover:text-content',
    className);


/**
 * Any number of choices from a short row of them — the multiple-choice twin of
 * `RadioBar`, and drawn the same way.
 *
 * Plain labels, the chosen ones darkened with a rule beneath. Nothing is boxed
 * or filled: these rows mostly live in headings, next to a title, and a filled
 * segment there outshouts the thing it belongs to.
 *
 * Plain clicks toggle one option. **Alt-click acts on all the others**: on a
 * chosen option it clears them, leaving that one alone; on an unchosen option it
 * takes them all, leaving that one out. Narrowing a row of six to a single
 * choice is otherwise five clicks, and widening it to all-but-one is five more.
 *
 * A row that wants an all-of-them option uses `CheckBar.All`, which is not a
 * value and never appears in `value` — see there for why that matters.
 */
export function CheckBar({ value, onChange, className, children }: CheckBarProps) {

    // The options are children, so the bar only learns the whole set by being
    // told. State rather than a ref: `CheckBar.All` draws itself from this while
    // rendering, so it has to hear about options arriving. The registrations all
    // land in the same commit, so this settles in one extra render.

    const [options, setOptions] = useState<(string | number)[]>([]);

    const register = useCallback((optionValue: string | number) => {
        setOptions(current => [...current, optionValue]);
        return () => setOptions(current => {
            const i = current.indexOf(optionValue);
            return i < 0 ? current : [...current.slice(0, i), ...current.slice(i + 1)];
        });
    }, []);

    return (
        <Context.Provider value={{ value, onChange, register, options }}>
            <div className={cn('max-w-full inline-flex flex-row items-baseline gap-4', className)}>
                {children}
            </div>
        </Context.Provider>
    );

}


export function CheckBarOption({ value, className, children }: CheckBarOptionProps) {

    const context = useContext(Context);
    const isChosen = context.value.indexOf(value) >= 0;

    useEffect(() => context.register(value), [context.register, value]);

    const onClick = (event: MouseEvent) => {

        // Alt sets every other option to the opposite of this one,
        // and leaves this one as it is. Chosen, that isolates it;
        // unchosen, it takes everything else instead.

        if (event.altKey) {
            const others = context.options.filter(current => current !== value);
            context.onChange(isChosen ? [value] : others);
            return;
        }

        const i = context.value.indexOf(value);
        if (i < 0) {
            context.onChange([...context.value, value]);
        } else {
            context.onChange([...context.value.slice(0, i), ...context.value.slice(i + 1)]);
        }

    };

    return (
        <div onClick={onClick} className={optionClassName(isChosen, className)}>
            {children}
        </div>
    );

}


/**
 * An all-of-them option — "Todos" — drawn like the rest of the row.
 *
 * It carries no value and never enters `value`: it is chosen when every option
 * is chosen, and clicking it takes them all or clears them. That is the whole
 * point of it being a component rather than an ordinary option with a value of
 * `'*'`. Such a value is a member of the set, so alt-click's "everything but
 * this one" hands it back along with the rest, and a caller that reads `'*'` as
 * *all* then widens the selection instead of narrowing it. Standing outside the
 * set, it cannot be swept up by a modifier or mistaken for a kind downstream.
 */
export function CheckBarAll({ className, children }: CheckBarAllProps) {

    const context = useContext(Context);

    const isChosen = context.options.length > 0
        && context.options.every(option => context.value.indexOf(option) >= 0);

    const onClick = () => context.onChange(isChosen ? [] : context.options);

    return (
        <div onClick={onClick} className={optionClassName(isChosen, className)}>
            {children}
        </div>
    );

}


CheckBar.Option = CheckBarOption;
CheckBar.All = CheckBarAll;
