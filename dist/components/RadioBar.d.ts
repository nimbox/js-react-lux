import { FC } from 'react';
interface ContextProps {
    value: any;
    onChange: (value?: any) => void;
}
interface RadioBarComponent extends FC<ContextProps & {
    className?: string;
}> {
    className?: string;
    Option: FC<{
        value?: any;
        className?: string;
    }>;
}
export declare const RadioBar: RadioBarComponent;
export {};
