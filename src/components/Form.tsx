import classnames from 'classnames';
import React, { FC } from 'react';
import { SearchIcon } from '../icons';


//
// Form
//

export interface LuxInput {
    error?: boolean
}

export const Group: FC<{ className?: string }> = ({ className, children }) => (
    <div className={className}>
        {children}
    </div>
);

export const Label: FC<{}> = ({ children }) => (
    <label className="block text-sm uppercase tracking-wide font-bold mb-1">
        {children}
    </label>
);

export const Input: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & LuxInput> = ({ error, className, ...props }) => (
    <input {...props} className={classnames('form-input w-full', { 'border-danger-500': error }, className)} />
);

export const TextArea: FC<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & LuxInput> = ({ error, className, ...props }) => (
    <textarea {...props} className={classnames('form-input w-full', { 'border-danger-500': error }, className)} />
);

export const SearchInput: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & LuxInput> = ({ error, className, ...props }) => (
    <div className={className}>
        <div className="relative">
            <input {...props} type="search" placeholder="Search" className="form-input w-full pl-10" />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center">
                <SearchIcon className="text-content h-5 w-5 stroke-current stroke-2" />
            </div>
        </div>
    </div>
);

export const Error: FC<{ error: boolean, className?: string }> = ({ error, className, children }) => (
    <>{error && <p className={classnames('mt-1 text-danger-500 text-xs italic truncate', className)}>{children}</p>}</>
);

export const Checkbox: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & LuxInput> = ({ checked, error, type, className, children, ...props }) => (
    <label className="block flex flex-row items-center">
        <input {...props} type="checkbox" className={classnames('form-checkbox text-primary-500', className)} />
        <span className={classnames('ml-2', className)}>{children}</span>
    </label>
);

export const Radio: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & LuxInput> = ({ checked, error, type, className, children, ...props }) => (
    <label className="block flex flex-row items-center">
        <input {...props} type="radio" className={classnames('form-radio text-primary-500', className)} />
        <span className="ml-2">{children}</span>
    </label>
);

// select

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
};

interface SelectComponent extends FC<{ className?: String } & SelectProps> {
    Option: FC<{ value?: any, className?: string }>;
}

export const Select: SelectComponent = ({ value, onChange, className, children }) => (
    <select className={classnames('form-select py-0', className)} >
        {children}
    </select>
);

Select.Option = ({ value, children }) => (
    // <option>uno</option>
    <option value={value}>{children}</option>
); //  as FC<{ value?: any, className?: string }>;