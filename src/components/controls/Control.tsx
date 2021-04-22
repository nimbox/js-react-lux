import classnames from 'classnames';
import React, { createContext, FC, useContext } from 'react';
import { ComponentScale, scales as componentScales, scalesSmall as componentScalesSmall } from '../ComponentSize';


export interface Props {
    scale: ComponentScale;
    error?: boolean,
    className?: string;
}

export interface LabelProps {
    badge?: any;
    className?: string;
}

type ContextProps = Pick<Props, 'scale' | 'error'>;
export const Context = createContext<ContextProps>({ scale: 'base', error: false });

export interface ControlComponent extends FC<Props> {
    Label: FC<LabelProps>;
    Message: FC<{ className?: string }>;
    Error: FC<{ className?: string }>;
}

export const Control: ControlComponent = ({ scale = 'base', error = false, className, children }) => (
    <Context.Provider value={{ error, scale }}>
        <div className={classnames('flex flex-col w-full', className)}>
            {children}
        </div>
    </Context.Provider>
);

Control.Label = (({ badge, className, children }) => {

    const context = useContext(Context);

    return (
        <label className={classnames(
            'block',
            context.error ? 'text-danger-500' : 'text-control-border',
            componentScales[context.scale],
            className)}>
            <div className="flex flex-row justify-between align-baseline">
                <span className="uppercase tracking-tighter">{children}</span>
                {badge && <span>{badge}</span>}
            </div>
        </label>
    );

}) as FC<LabelProps>;

Control.Message = (({ className, children }) => {

    const context = useContext(Context);

    return (
        <div className={classnames(
            context.error ? 'text-danger-500' : 'text-control-border',
            componentScalesSmall[context.scale],
            className)}>
            {children}
        </div>
    );

}) as FC<{ className?: string }>;

Control.Error = (({ className, children }) => {

    const context = useContext(Context);

    return (
        <div className={classnames(
            'text-danger-500',
            componentScalesSmall[context.scale],
            className)}>
            {children}
        </div>
    );

}) as FC<{ className?: string }>;;

Control.Label.displayName = 'Control.Label';
Control.Message.displayName = 'Control.Help';
Control.Error.displayName = 'Control.Error';