import classnames from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AngleRightIcon } from '../icons';
import { ComponentSize } from './ComponentSize';


export interface ButtonProps {
    link?: boolean;
    secondary?: boolean;
    size?: ComponentSize;
}

export const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> =
    ({ link = false, secondary = false, size = 'base', children, className, ...props }) => {

        return link ?
            (<button {...props} className={classnames(
                {
                    'text-xs': size === 'sm',
                    '': size === 'base',
                    'text-xl': size === 'lg'
                },
                {
                    'text-primary-500 hover:text-primary-700': !secondary,
                    'text-gray-500 hover:text-gray-700': secondary
                },
                ' hover:underline rounded cursor-pointer focus:outline-none', className)}>
                { children}
            </button >)
            :
            (<button {...props} className={classnames(
                {
                    'px-2 py-0 text-xs': size === 'sm',
                    'px-4 py-2': size === 'base',
                    'px-4 py-2 text-xl': size === 'lg'
                },
                {
                    'text-white font-bold bg-primary-500 hover:bg-primary-700 border border-primary-600 hover:border-primary-700': !secondary,
                    'text-primary-500 hover:text-white font-bold bg-transparent hover:bg-primary-700 border border-primary-600 hover:border-primary-700': secondary
                },
                'rounded focus:outline-none', className)}>
                { children}
            </button >);
    };

export interface MoreOptionsButtonProps {
    size?: ComponentSize;
    value: boolean;
    onChange: (value: boolean) => void;
}

export const MoreOptionsButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & MoreOptionsButtonProps> =
    ({ value = false, onChange, className, children, ...props }) => {
        const { t } = useTranslation();
        return (
            <>
                <Button link={true} onClick={() => onChange(!value)} {...props}>
                    <AngleRightIcon className={classnames('inline w-4 h-4 mr-1 stroke-current stroke-2 transform', { 'rotate-90': value }, 'transition duration-150 ease-in-out transtition-transform')} />
                    {!value ? t('more-options') : t('less-options')}
                </Button>
                {value && children}
            </>
        );
    };
