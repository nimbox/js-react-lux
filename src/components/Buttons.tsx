import classnames from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AngleRightIcon } from '../icons';
import { ComponentScale, controlScale, controlSize, controlSmallText, controlText } from './ComponentScale';
import { ComponentColor } from './ComponentColor';


// Button

export interface ButtonProps {
    link?: boolean;
    secondary?: boolean;
    scale?: ComponentScale;
}

export const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> =
    ({ link = false, secondary = false, scale = 'base', children, className, ...props }) => {

        return link ?
            (<button {...props} className={classnames(
                controlText[scale],
                {
                    'text-primary-500 hover:text-primary-700': !secondary,
                    'text-gray-500 hover:text-gray-700': secondary
                },
                ' hover:underline rounded cursor-pointer focus:outline-none', className)}
                style={{ padding: '0.5em 0.75em 0.5em 0.75em' }} >
                { children}
            </button >)
            :
            (<button {...props} className={classnames(
                controlText[scale],
                {
                    'text-white font-bold bg-primary-500 hover:bg-primary-600 border border-control-border': !secondary,
                    'text-primary-500 hover:text-white font-bold bg-transparent hover:bg-primary-600 border border-control-border': secondary
                },
                'rounded focus:outline-none', className)}
                style={{ padding: '0.5em 0.75em 0.5em 0.75em' }}>
                { children}
            </button >);
    };


// RoundButton

export interface RoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    scale?: ComponentScale;
    color?: ComponentColor;
}

export const RoundButton: FC<RoundButtonProps> = ({ scale = 'base', color = 'primary', className, children, ...props }) => {

    return (
        <button {...props} className={classnames(
            controlSize[scale], controlSmallText[scale],
            'flex flex-row justify-center items-center',
            'text-white font-bold',
            { 'bg-primary-500 hover:bg-primary-600': color === 'primary' },
            { 'bg-info-500 hover:bg-info-600': color === 'info' },
            { 'bg-danger-500 hover:bg-danger-600': color === 'danger' },
            'border border-control-border',
            'rounded-full focus:outline-none', className)}>
            {children}
        </button>
    );

};

export interface MoreOptionsButtonProps {
    scale?: ComponentScale;
    value: boolean;
    onChange: (value: boolean) => void;
    className?: string;
}

export const MoreOptionsButton: FC<MoreOptionsButtonProps> =
    ({ value = false, onChange, className, children, ...props }) => {
        const { t } = useTranslation();
        return (
            <>
                <Button type="button" link={true} onClick={() => onChange(!value)} {...props}>
                    <AngleRightIcon className={classnames('inline w-4 h-4 mr-1 stroke-current stroke-2 transform', { 'rotate-90': value }, 'transition duration-150 ease-in-out transtition-transform')} />
                    {!value ? t('more-options') : t('less-options')}
                </Button>
                {value && children}
            </>
        );
    };
