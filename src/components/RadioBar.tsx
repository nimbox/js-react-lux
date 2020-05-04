import classnames from 'classnames';
import React, { createContext, FC, useContext } from 'react';


//
// RadioBar
//

interface ContextProps {
    value: any,
    onChange: (value?: any) => void
};

const Context = createContext<ContextProps>({ value: null, onChange: () => null });

interface RadioBarComponent extends FC<ContextProps & { className?: string }> {
    className?: string;
    Option: FC<{ value?: any, className?: string }>;
}

export const RadioBar: RadioBarComponent = ({ value, onChange, className, children }) => (
    <Context.Provider value={{ value, onChange }}>
        <div className={classnames('inline-block border border-primary-700 rounded', className)}>
            {children}
        </div>
    </Context.Provider>
);

RadioBar.Option = (({ value, className, children }) => {
    const context = useContext(Context);
    const onClick = () => {
        context.onChange(value);
    }
    return (
        <div onClick={onClick} className={classnames('inline-block px-2 py-0 border-primary-700 border-r last:border-r-0', { 'text-white bg-primary-500': context.value === value }, 'cursor-pointer', className)}>
            {children}
        </div>
    );
}) as FC<{ value?: any, className?: string }>;
