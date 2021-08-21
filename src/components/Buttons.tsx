import classnames from 'classnames';
import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { AngleRightIcon } from '../icons';
import { ComponentColor } from './ComponentColor';
import { ComponentScale, controlSize, controlSmallText, controlText } from './ComponentScale';


// Button

const CLASSES: { [key: string]: { [key: string]: string } } = {
    'filled': {
        'primary': 'text-primary-800 bg-primary-500 border border-primary-500 hover:text-primary-900 hover:bg-primary-600 hover:border-primary-600 focus:ring-primary-500 rounded',
        'secondary': 'text-secondary-800 bg-secondary-500 border border-secondary-500 hover:text-secondary-900 hover:bg-secondary-600 hover:border-secondary-600 focus:ring-secondary-500 rounded',
        'muted': 'text-gray-500 bg-gray-300 border border-gray-300 hover:text-gray-600 hover:bg-gray-400 hover:border-gray-400 focus:ring-gray-300 rounded'
    },
    'text': {
        'primary': 'text-primary-500 border border-transparent hover:text-primary-600 hover:bg-primary-100 hover:border-primary-100 focus:ring-primary-500 rounded',
        'secondary': 'text-secondary-500 border border-transparent hover:text-secondary-600 hover:bg-secondary-100 hover:border-secondary-100 focus:ring-secondary-500 rounded',
        'muted': 'text-gray-400 border border-transparent hover:text-gray-500 hover:bg-gray-100 hover:border-gray-100 focus:ring-gray-300 rounded'
    },
    'outlined': {
        'primary': 'text-primary-500 border border-primary-300 hover:text-primary-600 hover:bg-primary-100 hover:border-primary-500 focus:ring-primary-500 rounded',
        'secondary': 'text-secondary-500 border border-secondary-300 hover:text-secondary-600 hover:bg-secondary-100 hover:border-secondary-500 focus:ring-secondary-500 rounded',
        'muted': 'text-gray-400 border border-gray-300 hover:text-gray-500 hover:bg-gray-100 hover:border-gray-500 focus:ring-gray-300 rounded'
    },
    'link': {
        'primary': 'underline text-primary-500 hover:text-primary-600 focus:ring-primary-500 rounded',
        'secondary': 'underline text-secondary-500 hover:text-secondary-600 focus:ring-secondary-500 rounded',
        'muted': 'underline text-gray-400 hover:text-gray-500 focus:ring-gray-300 rounded'
    }
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

    color?: 'primary' | 'secondary' | 'muted';
    variant?: 'filled' | 'text' | 'outlined' | 'link';

    start?: ReactNode;
    end?: ReactNode;

    className?: string;

}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ color = 'primary', variant = 'filled', start, end, children, className, ...props }, ref) => {

    return (
        <button {...props} ref={ref}
            className={classnames(
                CLASSES[variant][color],
                'lux-control-font',
                { 'lux-control-padding': variant !== 'link' },
                'focus:ring focus:ring-opacity-50 focus:outline-none',
                'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
        >

            {(!start && !end) ?
                <>{children}</> :
                <span className="flex flex-row items-center">
                    {start && <span className="flex-none" style={{ marginRight: '0.25em' }}>{start}</span>}
                    <span className="flex-grow self-baseline">{children}</span>
                    {end && <span className="flex-none" style={{ marginLeft: '0.25em' }}>{end}</span>}
                </span>
            }

        </button>
    );

});


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
    ({ scale = 'base', value = false, onChange, className, children, ...props }) => {
        const { t } = useTranslation();
        return (
            <>
                <span className={classnames(
                    controlText[scale],
                    'relative text-primary-500 hover:text-primary-700 cursor-pointer', className)}
                    onClick={() => onChange(!value)} {...props}>

                    <span className="absolute inset-y-0 left-0 flex flex-row justify-center items-center"
                        style={{ width: '1em' }}>
                        <AngleRightIcon width="1em" height="1em"
                            className={classnames('inline stroke-current stroke-2 transform', { 'rotate-90': value }, 'transition duration-150 ease-in-out transtition-transform')} />
                    </span>

                    <span style={{ paddingLeft: '1.25em' }} >
                        {!value ? t('more-options') : t('less-options')}
                    </span>
                </span>
                {value && children}
            </>
        );
    };
