import React, { FC } from 'react';

// cards

export const Cards: FC<{}> = ({ children }) => (
    <div className="grid grid-cols-1 gap-3">{children}</div>
);

// card

interface CardComponent<P> extends FC<P> {
    Header: FC<{}>,
    Body: FC<{}>
}

export const Card: CardComponent<{}> = ({ children }) => (
    <div className="bg-content-fg border border-content-border rounded">{children}</div>
);

Card.Header = ({ children }) => (
    <div className="border-b border-content-border p-3">{children}</div>
);

Card.Body = ({ children }) => (
    <div className="p-3">{children}</div>
);