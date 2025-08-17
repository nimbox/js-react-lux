import classnames from 'classnames';
import React, { type FC, useContext } from 'react';
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
    children?: React.ReactNode;

}

/**
 * Show a placeholder when no children are present.
 * 
 * @param props - Component properties
 * @returns The component
 */
export const Placeholder: FC<PlaceholderProps> = (props) => {

    // Properties

    const {

        error,
        placeholder,

        children

    } = props;

    // State

    const context = useContext(ControlContext);
    const isError = error || context.error;

    // Render

    return (
        <>
            {children ??
                (placeholder ?
                    <div
                        className={classnames(
                            'truncate',
                            isError ?
                                'text-danger-500' :
                                'text-control-placeholder',
                            'opacity-40')}
                        title={placeholder}
                    >
                        {placeholder}
                    </div> :
                    <div>&nbsp;</div>
                )
            }
        </>
    );

};
