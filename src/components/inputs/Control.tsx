import classnames from 'classnames';
import React, { createContext, CSSProperties, FC, useContext } from 'react';


export interface ControlProps {

    error?: boolean,

    className?: string;
    style?: CSSProperties;

    children?: React.ReactNode

}

export interface ControlLabelProps {

    badge?: string | React.ReactNode;
    className?: string;

    children?: React.ReactNode;

}

type ContextProps = Pick<ControlProps, 'error'>;
export const ControlContext = createContext<ContextProps>({ error: false });

export interface ControlComponent extends FC<ControlProps> {
    Label: FC<ControlLabelProps>;
    Message: FC<{ className?: string, children?: React.ReactNode }>;
    Error: FC<{ className?: string, children?: React.ReactNode }>;
}

export const Control: ControlComponent = (props) => {

    const {

        error = false,

        className = 'block w-full',
        style,
        children

    } = props;

    return (
        <ControlContext.Provider value={{ error }}>
            <div
                className={className}
                style={style}
            >
                {children}
            </div>
        </ControlContext.Provider>
    );

};

Control.Label = (({ className, children }) => {

    const context = useContext(ControlContext);

    return (
        <label className={classnames(
            'block truncate',
            'text-xs uppercase tracking-tighter',
            context.error ? 'text-danger-500' : 'text-control-border',
            className
        )}>
            {children}
        </label>
    );

}) as FC<ControlLabelProps>;

Control.Message = (({ className, children }) => {

    const context = useContext(ControlContext);

    return (
        <div className={classnames(
            context.error ? 'text-danger-500' : 'text-control-border',
            className
        )}>
            {children}
        </div>
    );

}) as FC<{ className?: string, children?: React.ReactNode }>;

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

}) as FC<{ className?: string, children?: React.ReactNode }>;

Control.Label.displayName = 'Control.Label';
Control.Message.displayName = 'Control.Help';
Control.Error.displayName = 'Control.Error';
