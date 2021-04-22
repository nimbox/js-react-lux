import classnames from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AngleRightIcon } from '../icons';
import { ComponentScale, paddings } from './ComponentSize';


export interface ButtonProps {
    link?: boolean;
    secondary?: boolean;
    scale?: ComponentScale;
}

export const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> =
    ({ link = false, secondary = false, scale = 'base', children, className, ...props }) => {

        return link ?
            (<button {...props} className={classnames(
                paddings[scale],
                {
                    'text-primary-500 hover:text-primary-700': !secondary,
                    'text-gray-500 hover:text-gray-700': secondary
                },
                ' hover:underline rounded cursor-pointer focus:outline-none', className)}>
                { children}
            </button >)
            :
            (<button {...props} className={classnames(
                paddings[scale],
                {
                    'text-white font-bold bg-primary-500 hover:bg-primary-600 border border-control-border': !secondary,
                    'text-primary-500 hover:text-white font-bold bg-transparent hover:bg-primary-600 border border-control-border': secondary
                },
                'rounded focus:outline-none', className)}>
                { children}
            </button >);
    };

export interface MoreOptionsButtonProps {
    scale?: ComponentScale;
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
