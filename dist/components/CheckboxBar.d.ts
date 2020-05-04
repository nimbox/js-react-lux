import { FC } from 'react';
interface ContextProps {
    value: any[];
    onChange: (value?: any) => void;
}
interface CheckboxBarComponent extends FC<ContextProps & {
    className?: string;
}> {
    Option: FC<{
        value?: any;
        className?: string;
    }>;
}
export declare const CheckboxBar: CheckboxBarComponent;
export {};
