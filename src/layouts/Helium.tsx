import React, { FC } from 'react';

// layout

export const Helium: FC<{}> = ({ children }) => (
    <div className="h-screen flex flex-row">{children}</div>
);

//  navigator

interface NavigatorComponent<P> extends FC<P> {
    Header: FC<{}>,
    Body: FC<{}>,
    Footer: FC<{}>
}

export const Navigator: NavigatorComponent<{}> = ({ children }) => (
    <div className="w-56 flex-shrink-0 flex flex-col bg-navigator-bg">{children}</div>
);

Navigator.Header = ({ children }) => (
    <div className="h-16 px-3 flex flex-row items-center justify-between border-b border-navigator-border">{children}</div>
);

Navigator.Body = ({ children }) => (
    <div className="py-3 flex-grow">{children}</div>
);

Navigator.Footer = ({ children }) => (
    <div className="h-16 p-3 flex flex-row items-center border-t border-navigator-border">{children}</div>
);

// content

interface ContentComponent<P> extends FC<P> {
    Header: FC<{}>,
    Body: FC<{}>,
    Main: FC<{}>,
    Side: FC<{}>,
}

export const Content: ContentComponent<{}> = ({ children }) => (
    <div className="w-full bg-content-bg">{children}</div>
);

Content.Header = ({ children }) => (
    <div className="h-16 px-3 flex flex-row items-center justify-between bg-content-fg border-b border-content-border">{children}</div>
);

Content.Body = ({ children }) => (
    <div className="w-full h-full flex flex-row">{children}</div>
);

Content.Main = ({ children }) => (
    <div className="w-2/3 p-3 flex-grow">{children}</div>
);

Content.Side = ({ children }) => (
    <div className="w-1/3 h-full p-3 bg-content-fg border-l border-content-border">{children}</div>
);
