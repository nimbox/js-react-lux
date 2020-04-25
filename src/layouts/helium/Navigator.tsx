import classnames from 'classnames';
import React, { FC } from 'react';


// default navigator

interface DefaultNavigatorComponent<P> extends FC<P> {
    Group: FC<{ className?: string }>,
    Item: FC<{ active: boolean, className?: string }>,
}

export const DefaultNavigator: DefaultNavigatorComponent<{ className?: string }> = ({ className, children }) => (
    <div className={classnames('flex flex-col', className)}>
        {children}
    </div>
);

DefaultNavigator.Group = ({ className, children }) => (
    <div className={classnames('px-3 py-2 text-xs text-muted uppercase', className)}>
        {children}
    </div>
);

DefaultNavigator.Item = ({ active, className, children }) => (
    <div className={classnames('-px-3 pl-6 py-2 cursor-pointer', { 'bg-primary-500': active }, className)}>
        {children}
    </div>
);
