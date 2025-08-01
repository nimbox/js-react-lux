import classnames from 'classnames';
import React, { FC, createContext, useContext } from 'react';


//
// Tabs
//

interface ContextProps {
    value: string | number | undefined,
    setValue: (value: string | number | undefined) => void
}

const Context = createContext<ContextProps>({ value: undefined, setValue: () => null });

interface TabsComponent extends FC<ContextProps & { className?: string, children?: React.ReactNode; }> {
    Option: FC<{ value?: string | number, className?: string, children?: React.ReactNode }>;
}

export const Tabs: TabsComponent = ({ value, setValue, className, children }) => (
    <Context.Provider value={{ value, setValue }}>
        <ul className={classnames('flex flex-row', className)}>
            {children}
        </ul>
    </Context.Provider>
);

const TabsOption: FC<{ value?: string | number | undefined, className?: string, children?: React.ReactNode }> = ({ value, className, children }) => {
    const context = useContext(Context);
    return (
        <li
            onClick={() => context.setValue(value)}
            className={classnames('px-2 py-2 text-control-border hover:text-primary-700', {
                'text-primary-500 border-b-2 border-primary-500': context.value === value
            }, 'cursor-pointer', className)}
        >
            {children}
        </li>
    );
};

Tabs.Option = TabsOption;
