import React, { type KeyboardEvent, createContext, useContext } from 'react';
import { cn } from './utilities/cn';


//
// Tabs
//

export type TabsVariant = 'underlined' | 'solid';

export interface TabsProps {

    /**
     * The value of the currently selected option.
     */
    value: string | number | undefined;

    /**
     * Called with the value of the option the user moves to.
     */
    setValue: (value: string | number | undefined) => void;

    /**
     * Visual treatment. `underlined` marks the selected option with a bar
     * under it, and expects the strip to sit on a rule of its own — draw that
     * rule through `className`, since where it should stop is a question about
     * the surrounding layout. `solid` marks the selected option with a filled
     * pill and needs no rule.
     *
     * Prefer `solid` wherever the strip shares a line with a `RadioBar` or a
     * `CheckBar`: without its rule an `underlined` strip is drawn exactly as
     * those are, and a reader cannot tell which of them swaps the panel and
     * which only narrows it.
     *
     * `solid` draws every option as a pill, which shows the whole set of
     * choices at rest rather than only under the pointer — worth having on a
     * touch screen, where there is no pointer. It is a treatment for a handful
     * of options though: a dozen pills is a wall, and a dozen labels is not.
     *
     * @default underlined
     */
    variant?: TabsVariant;

    /**
     * Spread the options across the container, growing each in proportion to
     * its content. Options never shrink below their label, so a strip with
     * more of them than fits still scrolls.
     */
    withFullWidth?: boolean;

    /**
     * Give every option the same width. Where the strip spans its container
     * the options split it evenly; where the strip sizes itself to its
     * content, every option takes the width of the widest one.
     */
    withEqualWidthOptions?: boolean;

    className?: string;
    children?: React.ReactNode;

}

export interface TabsOptionProps {

    value?: string | number;

    className?: string;
    children?: React.ReactNode;

}

interface ContextProps {
    value: string | number | undefined;
    setValue: (value: string | number | undefined) => void;
}

const Context = createContext<ContextProps>({ value: undefined, setValue: () => null });

/**
 * The index an option occupies in the strip. It is what lets the first option
 * hold the tab stop when nothing is selected, so the strip is always
 * reachable from the keyboard.
 */
const IndexContext = createContext<number>(0);

/**
 * A tab strip. The selected value is held by the caller, who also renders the
 * panel — mark that panel `role="tabpanel"` to complete the pattern. A rule
 * under the strip is the caller's too, since where it should stop depends on
 * the surrounding layout.
 *
 * Tabs replace what is on the panel. To narrow what is already there, reach
 * for `RadioBar` instead — it draws quieter on purpose, so a heading can hold
 * both without a reader having to guess which one moves them.
 *
 * The strip scrolls horizontally when its options outrun it.
 *
 * @example
 * ```tsx
 * const [tab, setTab] = useState('one');
 * <Tabs value={tab} setValue={setTab} className="border-b border-control-border">
 *     <Tabs.Option value="one">One</Tabs.Option>
 *     <Tabs.Option value="two">Two</Tabs.Option>
 * </Tabs>
 * ```
 */
export function Tabs({
    value,
    setValue,
    variant = 'underlined',
    withFullWidth = false,
    withEqualWidthOptions = false,
    className,
    children
}: TabsProps) {

    return (
        <Context.Provider value={{ value, setValue }}>
            <div
                role="tablist"
                className={cn('lux-tabs', {

                    'lux-tabs-underlined': variant === 'underlined',
                    'lux-tabs-solid': variant === 'solid',

                    'lux-tabs-full-width': withFullWidth,
                    'lux-tabs-equal-width-options': withEqualWidthOptions

                }, className)}
            >
                {React.Children.map(children, (child, index) => (
                    <IndexContext.Provider value={index}>
                        {child}
                    </IndexContext.Provider>
                ))}
            </div>
        </Context.Provider>
    );

}

/**
 * Moves focus and selection to the option `offset` places away, wrapping at
 * both ends. Selection follows focus, which is the expected behaviour when the
 * panels are already rendered.
 *
 * The move is a click rather than a call to `setValue` so the option reports
 * its own value: the strip only knows its options as DOM nodes, and a value
 * read back from an attribute would arrive as a string.
 */
function moveTo(options: HTMLElement[], from: number, offset: number) {
    const option = options[(from + offset + options.length) % options.length];
    option.focus();
    option.click();
}

export function TabsOption({ value, className, children }: TabsOptionProps) {

    const context = useContext(Context);
    const index = useContext(IndexContext);

    const selected = context.value === value;

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {

        const options = Array.from(
            event.currentTarget.parentElement?.querySelectorAll<HTMLElement>('[role="tab"]') ?? []
        );
        const current = options.indexOf(event.currentTarget);
        if (current < 0) { return; }

        switch (event.key) {
            case 'ArrowLeft': moveTo(options, current, -1); break;
            case 'ArrowRight': moveTo(options, current, +1); break;
            case 'Home': moveTo(options, 0, 0); break;
            case 'End': moveTo(options, options.length - 1, 0); break;
            default: return;
        }

        event.preventDefault();

    };

    return (
        <button
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected || (context.value == null && index === 0) ? 0 : -1}
            onClick={() => context.setValue(value)}
            onKeyDown={onKeyDown}
            className={cn('lux-tabs-option', {
                'lux-tabs-option-selected': selected
            }, className)}
        >
            {children}
        </button>
    );

}


Tabs.Option = TabsOption;
