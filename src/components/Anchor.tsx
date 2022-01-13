import classnames from 'classnames';
import React from 'react';


export type AnchorUnderline = 'none' | 'hover' | 'always';

export interface AnchorProps<C extends React.ElementType> {

    underline?: AnchorUnderline;

    component?: C;

    className?: string;

}

export const Anchor = React.forwardRef((
    props: any,
    ref: any
) => {

    // Properties

    const {

        underline = 'none',

        component: C = 'a',

        className,
        children,

        ...anchorProps

    } = props;

    // Render

    return (
        <C className={classnames(
            'max-w-full',
            {
                'hover:underline text-primary-500 hover:text-primary-600 focus:ring-primary-500 rounded': underline === 'hover',
                'underline text-primary-500 hover:text-primary-600 focus:ring-primary-500 rounded': underline === 'always'
            },
            className
        )} {...anchorProps}
        >
            {children}
        </C>
    );

});
