import classnames from 'classnames';
import React, { FC } from 'react';
import { AngleRightIcon } from '../icons';


//
// buttons
//

export const ButtonBar: FC<{ className?: string }> = ({ className, children }) => (
    <div className={classnames(className)}>{children}</div>
);

export const PrimaryButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
    <button {...props} className="mr-3 last:mr-0 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 border border-primary-500 rounded">{children}</button>
);

export const SecondaryButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
    <button {...props} className="mr-3 last:mr-0 bg-transparent hover:bg-primary-700 font-bold py-2 px-4 border border-content-border rounded">{children}</button>
);

export const LinkButton: FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, className, ...props }) => (
    <button {...props} className={classnames('focus:outline-none -mx-2 px-2 text-sm text-muted hover:bg-gray-200 rounded-full cursor-pointer', className)}>{children}</button>
);

export const MoreOptionsButton: FC<{ value: boolean, onChange: (value: boolean) => void, }> = ({ value, onChange, children, ...props }) => (
    <>
        <LinkButton {...props} onClick={() => onChange(!value)}><AngleRightIcon className={classnames('inline w-4 h-4 mr-1 stroke-current stroke-2 transform', { 'rotate-90': value }, 'transition duration-500 ease-in-out transtition-transform')} />
        más opciones
        </LinkButton>
        {value && children}
    </>
);