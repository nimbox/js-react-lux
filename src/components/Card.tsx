import classnames from 'classnames';
import React, { type FC } from 'react';


//
// cards
//

interface CardComponent extends FC<{ className?: string, children: React.ReactNode }> {
    Header: FC<{ noBorder?: boolean, className?: string, children: React.ReactNode }>,
    Body: FC<{ className?: string, children: React.ReactNode }>,
    Footer: FC<{ noBorder?: boolean, className?: string, children: React.ReactNode }>
}

export const Card: CardComponent = ({ className, children }) => (
    <div className={classnames('bg-content-fg border rounded', className)}>{children}</div>
);

Card.Header = ({ noBorder, className, children }) => (
    <div className={classnames({ 'border-b': !noBorder }, className)}>{children}</div>
);

Card.Body = ({ className, children }) => (
    <div className={className}>{children}</div>
);

Card.Footer = ({ noBorder, className, children }) => (
    <div className={classnames({ 'border-t': !noBorder }, className)}>{children}</div>
);
