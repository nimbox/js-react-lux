import { useContext, type ReactNode } from 'react';
import { cn } from '../utilities/cn';
import { ControlContext } from './ControlContext';


//
// Placeholder
//

export interface PlaceholderProps {

    /**
     * Show the placeholder content as an error (currently danger color). It
     * inherits the error from the previous `Control` context in the component
     * hierarchy if it exists.
     */
    error?: boolean;

    /**
     * Show placeholder string when there are no children to show. Children can
     * be `null` or `undefined`.
     */
    placeholder?: string;

    /**
     * Children.
     */
    children?: ReactNode;

}

/**
 * Show a placeholder when no children are present.
 * 
 * @param props - Component properties
 * @returns The component
 */
export function Placeholder(props: PlaceholderProps) {

    // Properties

    const {

        error,
        placeholder,

        children

    } = props;

    // State

    const context = useContext(ControlContext);
    const isError = error || context?.error;

    // Render

    return (
        <>
            {children ??
                ((placeholder)
                    ? (
                        <div
                            title={placeholder}
                            className={cn('truncate', isError ? 'lux-placeholder-error' : 'lux-placeholder')}
                        >
                            {placeholder}
                        </div>)
                    : (
                        <div>&nbsp;</div>
                    )
                )
            }
        </>
    );

}
