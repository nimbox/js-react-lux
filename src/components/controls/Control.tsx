import classnames from 'classnames';
import React, { createContext, CSSProperties, FC, useContext } from 'react';


export interface ControlProps {
    
    withFullWidth?: boolean;
    
    error?: boolean,

    className?: string;
    style?: CSSProperties;

}

export interface ControlLabelProps {
    badge?: string | React.ComponentType<any>;
    className?: string;
}

type ContextProps = Pick<ControlProps, 'error'>;
export const Context = createContext<ContextProps>({ error: false });

export interface ControlComponent extends FC<ControlProps> {
    Label: FC<ControlLabelProps>;
    Message: FC<{ className?: string }>;
    Error: FC<{ className?: string }>;
}

export const Control: ControlComponent = (props) => {

    const {

        withFullWidth = true,
        error = false,
        className,
        style,
        children
    } = props;

    return (
        <Context.Provider value={{ error }}>
            <div
                className={classnames(
                    { 'w-full': withFullWidth },
                    className
                )}
                style={style}
            >
                {children}
            </div>
        </Context.Provider>
    );

}

Control.Label = (({ className, children }) => {

    const context = useContext(Context);

    return (
        <label className={classnames(
            'block truncate',
            'uppercase tracking-tighter',
            context.error ? 'text-danger-500' : 'text-control-border',
            className
        )}>
            {children}
        </label>
    );

}) as FC<ControlLabelProps>;

Control.Message = (({ className, children }) => {

    const context = useContext(Context);

    return (
        <div className={classnames(
            context.error ? 'text-danger-500' : 'text-control-border',
            className
        )}>
            {children}
        </div>
    );

}) as FC<{ className?: string }>;

Control.Error = (({ className, children }) => {

    // const context = useContext(Context);

    return children ? (
        <div className={classnames(
            'text-danger-500',
            className
        )}>
            {children}
        </div>
    ) : null;

}) as FC<{ className?: string }>;;

Control.Label.displayName = 'Control.Label';
Control.Message.displayName = 'Control.Help';
Control.Error.displayName = 'Control.Error';
