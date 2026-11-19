import React, { type FC } from 'react';
import { cn } from './utilities/cn';


//
// cards
//

interface CardComponent extends FC<{ className?: string, children: React.ReactNode }> {
    Header: FC<{ noBorder?: boolean, className?: string, children: React.ReactNode }>,
    Body: FC<{ className?: string, children: React.ReactNode }>,
    Footer: FC<{ noBorder?: boolean, className?: string, children: React.ReactNode }>
}

/**
 * A box on `content-fg` with `Card.Header`, `Card.Body` and `Card.Footer`.
 *
 * The card is the exception, not the default container: use it for one object among comparable others. Bands inside a card run to its edges with no padding (see Standards/Layouts/Bands).
 */
export const Card: CardComponent = ({ className, children }) => (
    <div className={cn('bg-content-fg border rounded', className)}>{children}</div>
);

Card.Header = ({ noBorder, className, children }) => (
    <div className={cn({ 'border-b': !noBorder }, className)}>{children}</div>
);

Card.Body = ({ className, children }) => (
    <div className={className}>{children}</div>
);

Card.Footer = ({ noBorder, className, children }) => (
    <div className={cn({ 'border-t': !noBorder }, className)}>{children}</div>
);
