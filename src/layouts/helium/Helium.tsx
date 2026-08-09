import { AngleLeftIcon, CrossIcon, HamburgerIcon } from '@nimbox/icons-react';
import { type MouseEventHandler, type ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { ShowTransition } from '../../components/transitions/ShowTransition';
import { cn } from '../../components/utilities/cn';
import { useViewport } from '../../hooks/useViewport';
import { HeliumContext } from './HeliumContext';


//
// Helium
//

export interface HeliumProps {

    children?: ReactNode;

}

/**
 * Application shell with a fixed header, a navigator that docks on a wide
 * viewport and slides in as a drawer on a compact one, and a main area
 * pairing content with an optional side panel.
 *
 * Requires a `ViewportProvider` above it: the compact breakpoint is measured
 * from the viewport width, and with no provider the layout reads a width of
 * zero and stays compact forever.
 *
 * ```
 * <Helium>
 *   <Header/>
 *   <Navigator/>
 *   <Main>
 *     <Main.Content/>
 *     <Main.Side/>
 *   </Main>
 * </Helium>
 * ```
 */
export function Helium(props: HeliumProps) {

    // Properties

    const { children } = props;

    // Configuration

    const { width } = useViewport();
    const isCompact = width < 768;

    const [showNavigator, setShowNavigator] = useState<boolean>(!isCompact);
    const [showMainSide, setShowMainSide] = useState<boolean>(false);

    // The navigator docks on a wide viewport and drawers on a compact one.
    // Crossing into compact closes it, so what the user chose for the docked
    // state is kept aside and restored on the way back out. Docked open is
    // the default, so mounting compact must not record a closed preference
    // the user never expressed.
    const wideNavigatorPreference = useRef<boolean>(true);

    const handleSetShowNavigator = (show: boolean) => {
        if (!isCompact) {
            wideNavigatorPreference.current = show;
        }
        setShowNavigator(show);
    };

    useEffect(() => {
        if (isCompact) {
            setShowNavigator(false);
            setShowMainSide(false);
        } else {
            setShowNavigator(wideNavigatorPreference.current);
        }
    }, [isCompact]);

    // Render

    return (
        <HeliumContext.Provider value={{ isCompact, showNavigator, setShowNavigator: handleSetShowNavigator, showMainSide, setShowMainSide }}>
            <div className="relative h-full min-h-screen flex flex-col">
                {children}
            </div>
        </HeliumContext.Provider>
    );

}

// header

export interface ToggleProps {

    onClick?: MouseEventHandler<HTMLDivElement>;

    children?: ReactNode;

}

/** A square hit target sized to the header band, holding a single icon. */
export function Toggle(props: ToggleProps) {

    const { onClick, children } = props;

    return (
        <div onClick={onClick} className={'h-16 w-16 text-center hover:text-white hover:bg-primary-500 flex-none flex flex-row items-center justify-center cursor-pointer'}>
            {children}
        </div>
    );

}

export interface HeaderProps {

    /** Applied to the band between the two toggles. */
    className?: string;
    children?: ReactNode;

}

export function Header(props: HeaderProps) {

    // Properties

    const { className, children } = props;

    // Configuration

    const { isCompact, showNavigator } = useContext(HeliumContext);

    // Render

    return (
        <header className={cn(
            'fixed z-20 inset-x-0 top-0 h-16 flex-none',
            showNavigator ? 'pl-0 md:pl-56' : 'pl-0',
            'flex flex-row justify-between items-stretch',
            'text-content bg-content-fg border-b border-content-border',
            'transition-spacing duration-700 ease-in-out',
            'print:hidden'
        )}>
            <ToggleNavigator />
            <div className={cn('flex-1 h-full', className)}>
                {children}
            </div>
            {isCompact && <ToggleMainSide />}
        </header>
    );

}

// toggle

export function ToggleNavigator() {

    const { showNavigator, setShowNavigator, setShowMainSide } = useContext(HeliumContext);

    return (
        <Toggle onClick={() => { setShowNavigator(!showNavigator); if (!showNavigator) { setShowMainSide(false); } }}>
            <HamburgerIcon className="w-8 h-8 fill-current" />
        </Toggle>
    );

}

export function ToggleMainSide() {

    const { showMainSide, setShowMainSide } = useContext(HeliumContext);

    return (
        <Toggle onClick={() => setShowMainSide(!showMainSide)}>
            <AngleLeftIcon className={cn(
                'w-8 h-8 stroke-current',
                'transform', { 'rotate-180': showMainSide },
                'transition-transform duration-700 ease-in-out'
            )} />
        </Toggle>
    );

}

//  navigator

export interface NavigatorProps {

    /** Applied to the column inside the drawer. */
    className?: string;
    children?: ReactNode;

}

/** The sections stacked inside a `Navigator`. */
export interface NavigatorSectionProps {

    className?: string;
    children?: ReactNode;

}

export function Navigator(props: NavigatorProps) {

    // Properties

    const { className, children } = props;

    // Configuration

    const { isCompact, showNavigator, setShowNavigator, setShowMainSide } = useContext(HeliumContext);

    // Render

    return (
        <div>
            {showNavigator && isCompact &&
                <div
                    onClick={() => { setShowNavigator(false); setShowMainSide(false); }}
                    className={
                        cn(
                            'fixed z-30 inset-0 bg-gray-800 opacity-50'
                        )}
                />
            }
            <div className={cn(
                'fixed z-30 inset-y-0 left-0 w-56',
                'transform', showNavigator ? 'translate-x-0' : '-translate-x-56',
                'transition-transform duration-700 ease-in-out'
            )}>
                <div className={cn('h-full flex flex-col scheme-dark text-navigator bg-navigator-bg', className)}>
                    {children}
                </div >
            </div>
        </div>
    );

}

function NavigatorHeader(props: NavigatorSectionProps) {

    // Properties

    const { className, children } = props;

    // Configuration

    const { isCompact, showNavigator, setShowNavigator } = useContext(HeliumContext);

    // Render

    return (
        <div className="flex-none h-16 flex flex-row justify-between items-stretch border-b border-navigator-border">
            <div className={cn('w-full h-full', className)}>
                {children}
            </div>
            {(isCompact && showNavigator) &&
                <Toggle onClick={() => setShowNavigator(false)}>
                    <CrossIcon className="w-8 h-8 stroke-2" />
                </Toggle>
            }
        </div>
    );

}

function NavigatorContent(props: NavigatorSectionProps) {

    const { className, children } = props;

    return (
        <div className={cn('grow overflow-y-auto', className)}>
            {children}
        </div>
    );

}

function NavigatorFooter(props: NavigatorSectionProps) {

    const { className, children } = props;

    return (
        <div className={cn('flex-none border-t border-navigator-border', className)}>
            {children}
        </div>
    );

}

Navigator.Header = NavigatorHeader;
Navigator.Content = NavigatorContent;
Navigator.Footer = NavigatorFooter;

// main

export interface MainProps {

    children?: ReactNode;

}

/** The panes laid side by side inside a `Main`. */
export interface MainPaneProps {

    /** Scroll the pane itself, rather than leaving that to its content. */
    scroll?: boolean;

    className?: string;
    children?: ReactNode;

}

export function Main(props: MainProps) {

    // Properties

    const { children } = props;

    // Configuration

    const { showNavigator } = useContext(HeliumContext);

    // Render

    return (
        <main
            className={cn(
                'h-full min-h-0',
                showNavigator ? 'pl-0 md:pl-56' : 'pl-0',
                'pt-16',
                'grow flex flex-row items-stretch overflow-hidden',
                'text-content bg-content-bg',
                'transition-spacing duration-700 ease-in-out'
            )}
        >
            {children}
        </main>
    );

}

function MainContent(props: MainPaneProps) {

    const { scroll = true, className, children } = props;

    return (
        <div
            className={cn(
                'w-2/3 grow min-w-0 min-h-0',
                scroll ? 'overflow-y-auto' : 'flex flex-col overflow-hidden',
                className
            )}
        >
            {children}
        </div>
    );

}

/**
 * The detail pane beside `Main.Content`. It docks as a column on a wide
 * viewport and slides in over the content as a drawer on a compact one.
 */
function MainSide(props: MainPaneProps) {

    // Properties

    const { scroll = true, className, children } = props;

    // Configuration

    const { isCompact, showMainSide, setShowMainSide } = useContext(HeliumContext);

    const boundedClassName = cn(
        'min-h-0',
        scroll ? 'overflow-y-auto' : 'flex flex-col overflow-hidden',
        className
    );

    // Render

    return (
        isCompact ?
            <div>
                {showMainSide &&
                    <div
                        onClick={() => { setShowMainSide(false); }}
                        className={
                            cn(
                                'fixed z-10 inset-0 bg-gray-800 opacity-50'
                            )}
                    />
                }
                <ShowTransition show={showMainSide} className={cn(
                    'absolute z-10 left-0 right-0 top-16 bottom-0 ml-16',
                    'bg-content-fg', 'border-l border-content-border',
                    'transform',
                    'transition duration-700 ease-in-out transition-transform'
                )}
                    mountClassName="translate-x-full"
                    showClassName="translate-0"
                >
                    <div className={cn('h-full', boundedClassName)}>
                        {children}
                    </div>
                </ShowTransition>
            </div>
            :
            <div className={cn(
                'w-1/3', 'max-w-[400px]',
                'bg-content-fg', 'border-l border-content-border',
                boundedClassName
            )}>
                {children}
            </div>
    );

}

Main.Content = MainContent;
Main.Side = MainSide;

// panel

export interface PanelProps {

    className?: string;
    children?: ReactNode;

}

export interface PanelGroupProps {

    className?: string;
    children?: ReactNode;

}

export interface PanelItemProps {

    active: boolean;

    className?: string;
    children?: ReactNode;

}

export function Panel(props: PanelProps) {

    const { className, children } = props;

    return (
        <div className={cn('flex flex-col text-gray-100', className)}>
            {children}
        </div>
    );

}

function PanelGroup(props: PanelGroupProps) {

    const { className, children } = props;

    return (
        <div className={cn('px-3 py-2 text-xs text-gray-400 uppercase', className)}>
            {children}
        </div>
    );

}

function PanelItem(props: PanelItemProps) {

    const { active, className, children } = props;

    return (
        <div className={cn('pl-6 py-2 cursor-pointer', { 'bg-primary-500': active }, className)}>
            {children}
        </div>
    );

}

Panel.Group = PanelGroup;
Panel.Item = PanelItem;
