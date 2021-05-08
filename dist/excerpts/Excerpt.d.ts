import { FC } from 'react';
export declare const colors: {
    invoice: {
        color: string;
        background: string;
    };
    note: {
        color: string;
        background: string;
    };
    payment: {
        color: string;
        background: string;
    };
};
export declare const labels: {
    invoice: string;
    note: string;
    payment: string;
};
export interface Props {
    kind: string;
    full?: boolean;
    name?: string;
    value?: boolean;
    onChange?: (value: boolean) => void;
}
export declare const Excerpt: FC<Props>;
export declare const Creation: FC<{}>;
export declare const Relation: FC<{
    full?: boolean;
}>;
export declare const Actions: FC<{
    className?: string;
}>;
export declare const Action: FC<{
    onClick?: () => void;
}>;
export declare const Comment: FC<{
    className?: string;
}>;
