import classnames from 'classnames';
import React, { createContext, FC, useContext } from 'react';
import { ComponentSize } from './ComponentSize';


export interface ControlProps {
    error?: boolean,
    size?: ComponentSize;
    className?: string;
}

export interface ControlLabelProps {
    badge?: any;
    className?: string;
}


type ContextProps = Pick<ControlProps, 'error' | 'size'>;
const Context = createContext<ContextProps>({ error: false, size: 'base' });

interface ControlComponent extends ControlProps {
    Label: FC<ControlLabelProps>;
    Message: FC<{ className?: string }>;
    Error: FC<{ className?: string }>;
}

export const Control: FC<ControlComponent> = (({ error = false, size = 'base', className, children }) => {

    return (
        <Context.Provider value={{ error, size }}>
            <div className={classnames('flex flex-col w-full', className)}>
                {children}
            </div>
        </Context.Provider>
    );
});

Control.Label = (({ badge, className, children }) => {
    const context = useContext(Context);
    return (
        <label className={classnames(
            'inline space-y-0.5 text-control-border',
            { 'text-danger-500 font-bold': context.error },
            {
                'text-xs': context.size === 'sm',
                'text-base': context.size === 'base',
                'text-lg': context.size === 'lg',
            }, className)}>
            <div className="flex flex-row justify-between">
                <span>{children}</span>
                <span>{badge}</span>
            </div>

        </label>
    );
}) as FC<ControlLabelProps>;

Control.Message = (({ className, children }) => {
    const context = useContext(Context);
    return (
        <div className={classnames(
            { 'text-danger-500': context.error },
            {
                'text-xs': context.size === 'sm',
                'text-base': context.size === 'base',
                'text-lg': context.size === 'lg',
            },
            'space-y-0.5 text-xs text-control-border', className)}>
            {children}
        </div>
    );
}) as FC<{ className?: string }>;

Control.Error = (({ className, children }) => {
    const context = useContext(Context);
    return (
        <div className={classnames(
            'space-y-0.5 text-xs text-danger-500',
            {
                'text-xs': context.size === 'sm',
                'text-base': context.size === 'base',
                'text-lg': context.size === 'lg',
            }, className)}>
            {children}
        </div>
    );
}) as FC<{ className?: string }>;;

Control.Label.displayName = 'Control.Label';
Control.Message.displayName = 'Control.Help';
Control.Error.displayName = 'Control.Error';