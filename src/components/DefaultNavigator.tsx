import classnames from 'classnames';
import React, { FC } from 'react';


// default navigator

interface DefaultNavigatorComponent<P> extends FC<P> {
    Content: FC<{}>,
    Group: FC<{}>,
    Item: FC<{ active: boolean }>,
    Footer: FC<{}>,
    Copyright: FC<{}>
}

export const DefaultNavigator: DefaultNavigatorComponent<{}> = ({ children }) => (
    <div className="h-full flex-grow flex flex-col">
        {children}
    </div>
);

DefaultNavigator.Content = ({ children }) => (
    <div className="flex-grow overflow-y-scroll">
        {children}
    </div>
);

DefaultNavigator.Group = ({ children }) => (
    <div className="px-3 py-2 text-xs text-muted uppercase">
        {children}
    </div>
);

DefaultNavigator.Item = ({ active, children }) => (
    <div className={classnames('px-3 pl-6 py-2 cursor-pointer', { 'bg-primary-500': active })}>
        {children}
    </div>
);

DefaultNavigator.Footer = ({ children }) => (
    <div className="px-3 py-2 flex-none border-t border-navigator-border">
        {children}
    </div>
);

DefaultNavigator.Copyright = ({ children }) => (
    <div className="">
        {children}
    </div>
); 