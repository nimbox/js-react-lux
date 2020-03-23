import classnames from 'classnames';
import React, { createContext, FC, useContext } from 'react';


//
// helium
//

// context

interface ContextProps {
    side: boolean,
    onSide: (s: boolean) => void
};

const Context = createContext<Partial<ContextProps>>({});

// layout

interface Props {
    side: boolean,
    onSide: (side: boolean) => void
}

export const Helium: FC<Props> = ({ side, onSide, children }) => (
    <Context.Provider value={{ side, onSide }}>
        <div className="relative z-0 min-h-screen flex flex-col">
            {children}
        </div>
    </Context.Provider>
);

// header

interface HeaderComponent<P> extends FC<P> {
    Navigator: FC<{}>,
    Content: FC<{}>
}

export const Header: HeaderComponent<{}> = ({ children }) => (
    <header className="fixed z-10 inset-x-0 top-0 h-16 flex-none flex flex-row items-stretch bg-content-fg">
        {children}
    </header>
);

const HeaderSide: FC<{}> = ({ children }) => {
    const context = useContext(Context);
    return (
        <div className={classnames(!context.side ? 'w-16 md:w-56' : 'w-16', 'px-3 z-20 flex flex-row items-center justify-between text-navigator bg-navigator-bg border-b border-navigator-border')}>
            {children}
        </div>
    );
}

const HeaderContent: FC<{}> = ({ children }) => (
    <div className="flex-grow flex flex-row items-center px-3 border-b border-content-border">{children}</div>
);

Header.Navigator = HeaderSide;
Header.Content = HeaderContent;

// toggle

export const Toggle: FC<{}> = ({ children }) => {
    const context = useContext(Context);
    return (
        <span className="w-16 text-center bg-navigator-bg md:hidden">
            <button onClick={() => context.onSide!(!context.side)}>{children}</button>
        </span>
    );
}

//  navigator

export const Navigator: FC<{}> = ({ children }) => {
    const context = useContext(Context);
    return (
        <>
            {context.side && <div className={classnames('fixed z-10 inset-0 bg-gray-800 opacity-50')} onClick={() => context.onSide!(false)}></div>}
            <div className={classnames('fixed z-20 inset-y-0 left-0 w-56 mt-16 text-navigator bg-navigator-bg transform', !context.side ? '-translate-x-56 md:translate-x-0' : 'translate-x-0', 'transition duration-150 ease-in-out transition-transform')}>
                {children}
            </div >
        </>
    );
}

// main

interface MainComponent<P> extends FC<P> {
    Content: FC<{ className?: string }>,
    Side: FC<{ className?: string }>
}

export const Main: MainComponent<{}> = ({ children }) => {
    const context = useContext(Context);
    return (
        <main className={classnames('pt-16', !context.side ? 'pl-0 md:pl-56' : 'pl-0', 'flex-grow flex flex-row items-stretch overflow-y-auto text-content bg-content-bg')}>
            {children}
        </main>
    );
}

Main.Content = ({ className, children }) => (
    <div className={classnames('w-2/3', className)}>{children}</div>
);

Main.Side = ({ className, children }) => (
    <div className={classnames('w-1/3 bg-content-bg border-l border-content-border', className)}>{children}</div>
);
