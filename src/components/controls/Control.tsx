import classnames from 'classnames';
import React, { createContext, CSSProperties, FC, useContext } from 'react';
import { ComponentScale, controlSmallText, controlText } from '../ComponentScale';


export interface ControlProps {
    scale?: ComponentScale;
    error?: boolean,
    className?: string;
    style?: CSSProperties;
}

export interface ControlLabelProps {
    badge?: string | React.ComponentType<any>;
    className?: string;
}

type ContextProps = Pick<ControlProps, 'scale' | 'error'>;
export const Context = createContext<ContextProps>({ scale: 'base', error: false });

export interface ControlComponent extends FC<ControlProps> {
    Label: FC<ControlLabelProps>;
    Message: FC<{ className?: string }>;
    Error: FC<{ className?: string }>;
}

export const Control: ControlComponent = ({ scale = 'base', error = false, className, style, children }) => (
    <Context.Provider value={{ error, scale }}>
        <div className={classnames('flex flex-col w-full', className)} style={style}>
            {children}
        </div>
    </Context.Provider>
);

Control.Label = (({ badge, className, children }) => {

    const context = useContext(Context);
    const Badge = badge;
    return (
        <label className={classnames(className,
            'block',
            context.error ? 'text-danger-500' : 'text-control-border',
            controlText[context.scale || 'base'])}>
            <div className="flex flex-row justify-between align-baseline">
                <span className="uppercase tracking-tighter">{children}</span>
                {badge &&
                    (typeof badge === 'string' || badge instanceof String)
                    ?
                    <span>{badge}</span>
                    :
                    Badge ?
                        <Badge />
                        : ''
                }
            </div>
        </label>
    );

}) as FC<ControlLabelProps>;

Control.Message = (({ className, children }) => {

    const context = useContext(Context);

    return (
        <div className={classnames(
            context.error ? 'text-danger-500' : 'text-control-border',
            controlSmallText[context.scale || 'base'],
            className)}>
            {children}
        </div>
    );

}) as FC<{ className?: string }>;

Control.Error = (({ className, children }) => {

    const context = useContext(Context);

    return children ?
        (
            <div className={classnames(
                'text-danger-500',
                controlSmallText[context.scale || 'base'],
                className)}>
                {children}
            </div>
        )
        : null;

}) as FC<{ className?: string }>;;

Control.Label.displayName = 'Control.Label';
Control.Message.displayName = 'Control.Help';
Control.Error.displayName = 'Control.Error';