import classnames from 'classnames';
import React, { FC } from 'react';

export const Group: FC<{className?: string }> = ({ className, children }) => (
    <div className={className}>
        {children}
    </div>
);

export const Label: FC<{}> = ({ children }) => (
    <label className="block text-sm font-bold mb-0">
        {children}
    </label>
);

export const Input: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({ className, ...props }) => (
    <input {...props} className={classnames('w-full px-2 py-1 border border-content-border rounded-lg', className)} />
);

export const TextArea: FC<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>> = ({ className, ...props }) => (
    <textarea {...props} className={classnames('w-full px-2 py-1 border border-content-border rounded-lg', className)} />
);
