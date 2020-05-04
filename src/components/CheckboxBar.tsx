import classnames from 'classnames';
import React, { createContext, FC, useContext } from 'react';


//
// CheckboxBar
//

interface ContextProps {
    value: any[],
    onChange: (value?: any) => void
};

const Context = createContext<ContextProps>({ value: [], onChange: () => [] });

interface CheckboxBarComponent extends FC<ContextProps & { className?: string }> {
    Option: FC<{ value?: any, className?: string }>;
}

export const CheckboxBar: CheckboxBarComponent = ({ value, onChange, className, children }) => (
    <Context.Provider value={{ value, onChange }}>
        <div className={classnames('inline border border-primary-700 rounded', className)}>
            {children}
        </div>
    </Context.Provider>
);

CheckboxBar.Option = (({ value, className, children }) => {
    const context = useContext(Context);
    const onClick = () => {
        const i = context.value.indexOf(value);
        if (i < 0) {
            context.onChange([...context.value, value]);
        } else {
            context.onChange([...context.value.slice(0, i), ...context.value.slice(i + 1)]);
        }
    }
    return (
        <div onClick={onClick} className={classnames('inline-block px-2 py-0 border-primary-700 border-r last:border-r-0', { 'text-white bg-primary-500': context.value.indexOf(value) >= 0 }, 'cursor-pointer', className)}>
            {children}
        </div>
    );
}) as FC<{ value?: any, className?: string }>;
