import classnames from 'classnames';
import React, { FC } from 'react';
import { SearchIcon } from '../icons';


//
// form
//

export const Group: FC<{ className?: string }> = ({ className, children }) => (
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

export const SearchInput: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({ className, ...props }) => (
    <div className={className}>
        <div className="relative">
            <input {...props} type="search" placeholder="Search" className="w-56 pl-10 pr-4 py-2 border border-content-border rounded-lg" />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center">
                <SearchIcon className="text-content h-5 w-5 stroke-current stroke-2" />
            </div>
        </div>
    </div>
);

