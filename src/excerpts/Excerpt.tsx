import classnames from 'classnames';
import React, { FC, useState } from 'react';
import { Button } from '../components/Buttons';
import { Kind } from './Kind';

export const colors = {
    invoice: { color: "white", background: "#2e86c1" },
    note: { color: "black", background: "#ffff88" },
    payment: { color: 'white', background: '#229954' }
};

export const labels = {
    invoice: 'F',
    note: 'N',
    payment: 'P'
}


//
// excerpt
//

export interface Props {
    kind: string,
    full?: boolean,
    name?: string,
    value?: boolean,
    onChange?: (value: boolean) => void
}

export const Excerpt: FC<Props> = ({ kind, full = true, value, onChange, children }) => {
    const [v, setV] = useState(false);
    return (
        <div className="-mx-3 px-3 py-2  flex flex-row border-b last:border-b-0 border-content-border">
            <div>
                <Kind text={labels[kind]} {...colors[kind]} value={v} onChange={(v) => setV(v)} />
            </div>
            <div className="min-w-0 flex-grow ml-2">
                {children}
            </div>
        </div>
    );
}

export const Creation: FC<{}> = () => (
    <div className="flex flex-row justify-between">
        <div className="font-bold truncate">Creator</div>
        <div className="text-muted truncate">hace 2 días</div>
    </div>
);

export const Relation: FC<{ full?: boolean }> = ({ full }) => (
    full ? <div className="font-bold truncate">Customer Name</div> : null
);

export const Actions: FC<{ className?: string }> = ({ className, children }) => (
    <span className={classnames('block -mr-4', className)}>
        {children}
    </span>
);

export const Action: FC<{ onClick?: () => void }> = ({ onClick, children }) => (
    <span onClick={onClick} className="inline mr-4"><Button link>{children}</Button></span>
);

export const Comment: FC<{ className?: string }> = ({ className, children }) => (
    children ? <div className={classnames('text-sm leading-tight text-muted', className)}>{children}</div> : null
);