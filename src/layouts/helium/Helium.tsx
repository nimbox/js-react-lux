import classnames from 'classnames';
import React, { createContext, FC, MouseEventHandler, useContext, useEffect, useState } from 'react';
import { ShowTransition } from '../../components/transitions/ShowTransition';
import { useViewport } from '../../hooks/useViewport';
import { AngleLeftIcon, CrossIcon, HamburgerIcon } from '../../icons/components';


//
// helium
//

// context

export interface ContextProps {

    isCompact: boolean;

    showNavigator: boolean;
    setShowNavigator: (show: boolean) => void;

    showMainSide: boolean;
    setShowMainSide: (show: boolean) => void;

}

export const HeliumContext = createContext<ContextProps>({

    isCompact: false,

    showNavigator: true,
    setShowNavigator: () => null,

    showMainSide: true,
    setShowMainSide: () => null

});


// layout

interface Props {
    navigator?: boolean;
    setNavigator?: (show: boolean) => void;
    children?: React.ReactNode;
}

/**
 * 
 * 
 * The `html` structure for the layout should look like this. 
 * 
 * ```
 * <Helium>
 *   <Header/>
 *   <Navigator/>
 *   <Main>
 *     <Main.Content/>
 *     <Main.Sice/>
 *   </Main
 * </Helium>
 * ```
 * 
 * @param param0 
 * @returns 
 */
export const Helium: FC<Props> = ({ children }) => {

    const { width } = useViewport();
    const isCompact = width <= 768;

    const [showNavigator, setShowNavigator] = useState<boolean>(!isCompact);
    const [showMainSide, setShowMainSide] = useState<boolean>(false);

    useEffect(() => {
        if (isCompact) {
            setShowNavigator(false);
            setShowMainSide(false);
        }
    }, [isCompact]);

    return (
        <HeliumContext.Provider value={{ isCompact, showNavigator, setShowNavigator, showMainSide, setShowMainSide }}>
            <div className="relative min-h-screen flex flex-col">
                {children}
            </div>
        </HeliumContext.Provider>
    );

};

// header


export const Toggle: FC<{ onClick?: MouseEventHandler<HTMLDivElement>, children?: React.ReactNode }> = ({ onClick, children }) => (
    <div onClick={onClick} className={'h-16 w-16 text-center hover:text-white hover:bg-primary-500 flex-none flex flex-row items-center justify-center cursor-pointer'}>
        {children}
    </div>
);

export const Header: FC<{ className?: string, children?: React.ReactNode }> = ({ className, children }) => {

    const { isCompact, showNavigator } = useContext(HeliumContext);

    return (
        <header className={classnames(
            'fixed z-10 inset-x-0 top-0 h-16 flex-none',
            showNavigator ? 'pl-0 md:pl-56' : 'pl-0',
            'flex flex-row justify-between items-stretch',
            'text-content bg-content-fg border-b border-content-border',
            'transition-spacing duration-700 ease-in-out '
        )}>
            <ToggleNavigator />
            <div className={classnames('flex-1 h-full', className)}>
                {children}
            </div>
            {isCompact && <ToggleMainSide />}
        </header>
    );

};

// toggle

export const ToggleNavigator: FC = () => {

    const { showNavigator, setShowNavigator, setShowMainSide } = useContext(HeliumContext);

    return (
        <Toggle onClick={() => { setShowNavigator!(!showNavigator); if (!showNavigator) { setShowMainSide(false); } }}>
            <HamburgerIcon className="w-8 h-8 fill-current" />
        </Toggle>
    );

};

export const ToggleMainSide: FC = () => {

    const { showMainSide, setShowMainSide } = useContext(HeliumContext);

    return (
        <Toggle onClick={() => setShowMainSide(!showMainSide)}>
            <AngleLeftIcon className={classnames(
                'w-8 h-8 stroke-current',
                'transform', { 'rotate-180': showMainSide },
                'transition-transform duration-700 ease-in-out'
            )} />
        </Toggle>
    );

};

//  navigator

interface NavigatorComponent<P> extends FC<P> {
    Header: FC<{ className?: string, children?: React.ReactNode }>,
    Content: FC<{ className?: string, children?: React.ReactNode }>
    Footer: FC<{ className?: string, children?: React.ReactNode }>
}

export const Navigator: NavigatorComponent<{ className?: string, children?: React.ReactNode }> = ({ className, children }) => {

    const { isCompact, showNavigator, setShowNavigator, setShowMainSide } = useContext(HeliumContext);

    return (
        <>
            {showNavigator && isCompact &&
                <div
                    onClick={() => { setShowNavigator(false); setShowMainSide(false); }}
                    className={
                        classnames(
                            'fixed z-10 inset-0 bg-gray-800 opacity-50'
                        )}
                />
            }
            <div className={classnames(
                'fixed z-20 inset-y-0 left-0 w-56',
                'transform', showNavigator ? 'translate-x-0' : '-translate-x-56',
                'transition-transform duration-700 ease-in-out'
            )}>
                <div className={classnames('h-full flex flex-col text-navigator bg-navigator-bg', className)}>
                    {children}
                </div >
            </div>
        </>
    );

};

const NavigatorHeader: FC<{ className?: string, children?: React.ReactNode }> = ({ className, children }) => {

    const { isCompact, showNavigator, setShowNavigator } = useContext(HeliumContext);

    return (
        <div className="flex-none h-16 flex flex-row justify-between items-stretch border-b border-navigator-border">
            <div className={classnames('w-full h-full', className)}>
                {children}
            </div>
            {(isCompact && showNavigator) &&
                <Toggle onClick={() => setShowNavigator(false)}>
                    <CrossIcon className="w-8 h-8 stroke-2" />
                </Toggle>
            }
        </div>
    );

};

const NavigatorContent: FC<{ className?: string, children?: React.ReactNode }> = ({ className, children }) => (
    <div className={classnames('flex-grow overflow-y-scroll', className)}>
        {children}
    </div>
);

const NavigatorFooter: FC<{ className?: string, children?: React.ReactNode }> = ({ className, children }) => (
    <div className={classnames('flex-none border-t border-navigator-border', className)}>
        {children}
    </div>
);

Navigator.Header = NavigatorHeader;
Navigator.Content = NavigatorContent;
Navigator.Footer = NavigatorFooter;

// main

interface MainComponent<P> extends FC<P> {
    Content: FC<{ className?: string, children?: React.ReactNode }>,
    Side: FC<{ className?: string, children?: React.ReactNode }>
}

export const Main: MainComponent<{ children?: React.ReactNode }> = ({ children }) => {

    const { showNavigator } = useContext(HeliumContext);

    return (
        <main
            className={classnames(
                'h-full',
                showNavigator ? 'pl-0 md:pl-56' : 'pl-0',
                'pt-16',
                'flex-grow flex flex-row items-stretch overflow-y-auto ',
                'text-content bg-content-bg',
                'transition-spacing duration-700 ease-in-out'
            )}
        >
            {children}
        </main>
    );


};

Main.Content = ({ className, children }) => (
    <div className={classnames('w-2/3 flex-grow', className)}>{children}</div>
);

const MainSide: FC<{ className?: string, children?: React.ReactNode }> = ({ className, children }) => {

    const { isCompact, showMainSide, setShowMainSide } = useContext(HeliumContext);

    return (
        isCompact ?
            <>
                {showMainSide &&
                    <div
                        onClick={() => { setShowMainSide(false); }}
                        className={
                            classnames(
                                'fixed inset-0 bg-gray-800 opacity-50'
                            )}
                    />
                }
                <ShowTransition show={showMainSide} className={classnames(
                    'absolute left-0 top-0 right-0 h-full ml-16 mt-16',
                    'bg-content-fg', 'border-l border-content-border',
                    'transform',
                    'transition duration-700 ease-in-out transition-transform'
                )}
                    mountClassName="translate-x-full"
                    showClassName="translate-0"
                >
                    <div className={className}>
                        {children}
                        <div>side</div>
                    </div>
                </ShowTransition>
            </>
            :
            <div className={classnames(
                'w-1/3', 'max-w-[400px]',
                'bg-content-fg1', 'border-l border-content-border'
            )}>
                <div className={className}>
                    {children}
                </div>
            </div>
    );

};
Main.Side = MainSide;

// panel

interface PanelComponent<P> extends FC<P> {
    Group: FC<{ className?: string, children?: React.ReactNode }>;
    Item: FC<{ active: boolean, className?: string, children?: React.ReactNode }>;
}

export const Panel: PanelComponent<{ className?: string, children?: React.ReactNode }> = ({ className, children }) => (
    <div className={classnames('flex flex-col text-gray-100', className)}>
        {children}
    </div>
);

Panel.Group = ({ className, children }) => (
    <div className={classnames('px-3 py-2 text-xs text-gray-400 uppercase', className)}>
        {children}
    </div>
);

Panel.Item = ({ active, className, children }) => (
    <div className={classnames('-px-3 pl-6 py-2 cursor-pointer', { 'bg-primary-500': active }, className)}>
        {children}
    </div>
);
