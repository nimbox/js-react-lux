import classnames from 'classnames';
import React from 'react';


// MessageSeparator

export interface MessageSeparatorProps {
    showLine?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export function MessageSeparator(props: MessageSeparatorProps) {

    const { showLine = true, className, children } = props;

    return (
        <div className={classnames(
            'flex items-center justify-center py-2 px-4',
            className
        )}>

            {showLine && (
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
            )}

            {children}

            {showLine && (
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
            )}

        </div>
    );

}

// MessageSeparatorPill

export interface MessageSeparatorPillProps {
    className?: string;
    children?: React.ReactNode;
}

export function MessageSeparatorPill(props: MessageSeparatorPillProps) {

    const { className, children } = props;

    return (
        <div className={classnames(
            'px-3 py-1 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-full',
            'border border-gray-200 dark:border-gray-700',
            'mx-3',
            className
        )}>
            {children || 'New messages'}
        </div>
    );
}

// Slots

MessageSeparator.Pill = MessageSeparatorPill;
