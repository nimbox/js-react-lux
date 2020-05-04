import classnames from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AngleRightIcon } from '../icons';


//
// Buttons
//

type Size = 'xs' | 'base' | 'xl';

export const PrimaryButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { size?: Size }> = ({ size = 'base', children, className, ...props }) => (
    <button {...props} className={classnames({ 'px-2 py-0 text-xs': size === 'xs', 'px-4 py-2': size === 'base', 'px-4 py-2 text-xl': size === 'xl' }, 'text-white font-bold bg-primary-500 hover:bg-primary-700 border border-primary-600 hover:border-primary-700 rounded focus:outline-none', className)}>{children}</button>
);

export const SecondaryButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { size?: Size }> = ({ size = 'base', children, className, ...props }) => (
    <button {...props} className={classnames({ 'px-2 py-0 text-xs': size === 'xs', 'px-4 py-2': size === 'base', 'px-6 py-3 text-xl': size === 'xl' }, 'text-primary-500 hover:text-white font-bold bg-transparent hover:bg-primary-700 border border-primary-600 hover:border-primary-700 rounded focus:outline-none', className)}>{children}</button>
);

export const LinkButton: FC<React.HTMLAttributes<HTMLSpanElement> & { size?: Size }> = ({ size = 'base', children, className, ...props }) => (
    <button {...props} className={classnames('text-primary-500 hover:text-primary-700 hover:underline rounded cursor-pointer focus:outline-none', className)}>{children}</button>
);

export const MoreOptionsButton: FC<{ value: boolean, onChange: (value: boolean) => void, className?: string }> = ({ value, onChange, className, children }) => {

    const { t } = useTranslation();

    return (
        <>
            <LinkButton onClick={() => onChange(!value)} className={className}>
                <AngleRightIcon className={classnames('inline w-4 h-4 mr-1 stroke-current stroke-2 transform', { 'rotate-90': value }, 'transition duration-150 ease-in-out transtition-transform')} />
                {!value ? t('more-options') : t('less-options')}
            </LinkButton>
            {value && children}
        </>
    );

};
