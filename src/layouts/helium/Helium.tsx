import classnames from 'classnames';
import React, { createContext, FC, useContext } from 'react';


//
// helium
//

// context

interface ContextProps {
    navigator: boolean,
    setNavigator: (show: boolean) => void
};

const Context = createContext<Partial<ContextProps>>({});

// layout

interface Props {
    navigator?: boolean,
    setNavigator?: (show: boolean) => void
}

export const Helium: FC<Props> = ({ navigator = false, setNavigator = (show: boolean) => null, children }) => (
    <Context.Provider value={{ navigator, setNavigator }}>
        <div className="relative min-h-screen flex flex-col">
            {children}
        </div>
    </Context.Provider>
);

// header

export const Header: FC<{ className?: string }> = ({ className, children }) => {
    const context = useContext(Context);
    return (
        <header className={classnames(context.navigator ? 'pl-0 md:pl-56' : 'pl-0', 'fixed z-10 inset-x-0 top-0 h-16 flex-none text-content bg-content-fg border-b border-content-border transition duration-700 ease-in-out transition-spacing')}>
            <div className={classnames('h-full', className)}>
                {children}
            </div>
        </header>
    );
}

// toggle

export const Toggle: FC<{ always: boolean }> = ({ always, children }) => {
    const context = useContext(Context);
    return (
        <div className={classnames('h-16 w-16 text-center hover:text-white hover:bg-primary-500', always ? 'flex' : 'flex md:hidden', 'flex-row items-center justify-center')}>
            <button onClick={() => context.setNavigator!(!context.navigator)} className="focus:outline-none">{children}</button>
        </div>
    );
}

//  navigator

interface NavigatorComponent<P> extends FC<P> {
    Header: FC<{ className?: string }>,
    Content: FC<{ className?: string }>
    Footer: FC<{ className?: string }>
}

export const Navigator: NavigatorComponent<{ className?: string }> = ({ className, children }) => {
    const context = useContext(Context);
    return (
        <>
            {context.navigator && <div className={classnames('fixed z-10 inset-0 bg-gray-800 opacity-50 md:hidden')} onClick={() => context.setNavigator!(false)}></div>}
            <div className={classnames('fixed z-20 inset-y-0 left-0 w-56 transform', context.navigator ? 'translate-x-0' : '-translate-x-56', 'transition duration-700 ease-in-out transition-transform')}>
                <div className={classnames('h-full flex flex-col text-navigator bg-navigator-bg', className)}>
                    {children}
                </div >
            </div>
        </>
    );
}

const NavigatorHeader: FC<{ className?: string }> = ({ className, children }) => (
    <div className="flex-none h-16 border-b border-navigator-border">
        <div className={classnames('w-full h-full', className)}>
            {children}
        </div>
    </div>
);

const NavigatorContent: FC<{ className?: string }> = ({ className, children }) => (
    <div className={classnames('flex-grow overflow-y-scroll', className)}>
        {children}
    </div>
);

const NavigatorFooter: FC<{ className?: string }> = ({ className, children }) => (
    <div className={classnames('flex-none flex-none border-t border-navigator-border', className)}>
        {children}
    </div>
);

Navigator.Header = NavigatorHeader;
Navigator.Content = NavigatorContent;
Navigator.Footer = NavigatorFooter;

// main

interface MainComponent<P> extends FC<P> {
    Content: FC<{ className?: string }>,
    Side: FC<{ className?: string }>
}

export const Main: MainComponent<{}> = ({ children }) => {
    const context = useContext(Context);
    return (
        <main className={classnames('h-full', context.navigator ? 'pl-0 md:pl-56' : 'pl-0', 'pt-16 flex-grow flex flex-row items-stretch overflow-y-auto text-content bg-content-bg transition duration-700 ease-in-out transition-spacing')}>
            {children}
        </main>
    );
}

Main.Content = ({ className, children }) => (
    <div className={classnames('w-2/3 flex-grow', className)}>{children}</div>
);

Main.Side = ({ className, children }) => (
    <div className={classnames('w-1/3 bg-content-fg border-l border-content-border', className)}>{children}</div>
);

// panel

interface PanelComponent<P> extends FC<P> {
    Group: FC<{ className?: string }>,
    Item: FC<{ active: boolean, className?: string }>,
}

export const Panel: PanelComponent<{ className?: string }> = ({ className, children }) => (
    <div className={classnames('flex flex-col', className)}>
        {children}
    </div>
);

Panel.Group = ({ className, children }) => (
    <div className={classnames('px-3 py-2 text-xs text-muted uppercase', className)}>
        {children}
    </div>
);

Panel.Item = ({ active, className, children }) => (
    <div className={classnames('-px-3 pl-6 py-2 cursor-pointer', { 'bg-primary-500': active }, className)}>
        {children}
    </div>
);
