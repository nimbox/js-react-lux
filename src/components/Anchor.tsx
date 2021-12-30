import React from 'react';
import classnames from 'classnames';


export type AnchorUnderline = 'none' | 'hover' | 'underline';

export interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {

    underline: AnchorUnderline;

}

export const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>((props, ref) => {

    const {
        className,
        children,
        ...anchorProps
    } = props;

    return (
        <a ref={ref} className={classnames(
            "",
            className
        )} {...anchorProps}
        >
            {children}
        </a>
    );

});
