import React, { FC } from 'react';

// layout

export const Helium: FC<{}> = ({ children }) => (
    <div className="relative min-h-screen pl-56">{children}</div>
);

//  navigator

interface NavigatorComponent<P> extends FC<P> {
    Header: FC<{}>,
    Body: FC<{}>,
    Footer: FC<{}>,
    Copyright: FC<{}>
}

export const Navigator: NavigatorComponent<{}> = ({ children }) => (
    <div className="fixed inset-y-0 left-0 w-56 flex flex-col bg-navigator-bg text-navigator">{children}</div>
);

Navigator.Header = ({ children }) => (
    <div className="h-16 px-3 flex-none flex flex-row items-center justify-between bg-navigator-bg border-b border-navigator-border">{children}</div>
);

Navigator.Body = ({ children }) => (
    <div className="py-3 flex-grow overflow-scroll">{children}</div>
);

Navigator.Footer = ({ children }) => (
    <div className="h-16 p-3 flex-none flex flex-row items-center border-t border-navigator-border">{children}</div>
);

Navigator.Copyright = ({ children }) => (
    <div className="h-8 p-3 flex-none flex flex-row items-center border-t border-navigator-border">{children}</div>
);

// content

interface ContentComponent<P> extends FC<P> {
    Header: FC<{}>,
    Body: FC<{}>,
    Main: FC<{}>,
    Side: FC<{}>,
}

export const Content: ContentComponent<{}> = ({ children }) => (
    <div className="w-full min-h-screen flex flex-col text-content bg-content-bg">{children}</div>
);

Content.Header = ({ children }) => (
    <div className="h-16 px-3 flex-none flex flex-row items-center justify-between bg-content-fg border-b border-content-border">{children}</div>
);

Content.Body = ({ children }) => (
    <div className="w-full flex-grow flex flex-row items-stretch">{children}</div>
);

Content.Main = ({ children }) => (
    <div className="w-2/3 p-3">{children}</div>
);

Content.Side = ({ children }) => (
    <div className="w-1/3 p-3 bg-content-fg border-l border-content-border">{children}</div>
);
