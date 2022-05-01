import classNames from 'classnames';
import React, { FC, ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { AngleRightIcon } from '../icons/components';
import { ComponentColor } from './ComponentColor';


// Button

// 'filled': {
//     'primary': 'text-whiteborder border-primary-500 hover:text-white  hover:border-primary-600 focus:ring-primary-500 rounded filter drop-shadow',
//     'secondary': 'text-secondary-800 bg-secondary-500 border border-secondary-500 hover:text-secondary-900 hover:bg-secondary-600 hover:border-secondary-600 focus:ring-secondary-500 rounded',
//     'danger': 'text-white bg-danger-500 border border-danger-500 hover:text-white hover:bg-danger-600 hover:border-danger-600 focus:ring-danger-500 rounded filter drop-shadow',
//     'muted': 'text-gray-500 bg-gray-300 border border-gray-300 hover:text-gray-600 hover:bg-gray-400 hover:border-gray-400 focus:ring-gray-300 rounded'
// },
// 'text': {
//     'primary': 'text-primary-500 border border-transparent hover:text-primary-600 hover:bg-primary-100 hover:border-primary-100 focus:ring-primary-500 rounded',
//     'secondary': 'text-secondary-500 border border-transparent hover:text-secondary-600 hover:bg-secondary-100 hover:border-secondary-100 focus:ring-secondary-500 rounded',
//     'danger': 'text-danger-500 border border-transparent hover:text-danger-600 hover:bg-danger-100 hover:border-danger-100 focus:ring-danger-500 rounded',
//     'muted': 'text-gray-400 border border-transparent hover:text-gray-500 hover:bg-gray-100 hover:border-gray-100 focus:ring-gray-300 rounded'
// },
// 'outlined': {
//     'primary': 'text-primary-500 border border-primary-300 hover:text-primary-600 hover:bg-primary-100 hover:border-primary-500 focus:ring-primary-500 rounded',
//     'secondary': 'text-secondary-500 border border-secondary-300 hover:text-secondary-600 hover:bg-secondary-100 hover:border-secondary-500 focus:ring-secondary-500 rounded',
//     'danger': 'text-danger-500 border border-danger-300 hover:text-danger-600 hover:bg-danger-100 hover:border-danger-500 focus:ring-danger-500 rounded',
//     'muted': 'text-gray-400 border border-gray-300 hover:text-gray-500 hover:bg-gray-100 hover:border-gray-500 focus:ring-gray-300 rounded'
// },
// 'link': {
//     'primary': 'underline text-primary-500 hover:text-primary-600 focus:ring-primary-500 rounded',
//     'secondary': 'underline text-secondary-500 hover:text-secondary-600 focus:ring-secondary-500 rounded',
//     'danger': 'underline text-danger-500 hover:text-danger-600 focus:ring-danger-500 rounded',
//     'muted': 'underline text-gray-400 hover:text-gray-500 focus:ring-gray-300 rounded'
// }



const CLASSES: { [key: string]: { [key: string]: string } } = {
    'filled': {
        'primary': 'text-white bg-primary-500 border border-primary-500 hover:text-white hover:bg-primary-600 hover:border-primary-600 focus:ring-primary-500 rounded filter drop-shadow',
        'secondary': 'text-secondary-800 bg-secondary-500 border border-secondary-500 hover:text-secondary-900 hover:bg-secondary-600 hover:border-secondary-600 focus:ring-secondary-500 rounded',
        'danger': 'text-white bg-danger-500 border border-danger-500 hover:text-white hover:bg-danger-600 hover:border-danger-600 focus:ring-danger-500 rounded filter drop-shadow',
        'muted': 'text-gray-500 bg-gray-300 border border-gray-300 hover:text-gray-600 hover:bg-gray-400 hover:border-gray-400 focus:ring-gray-300 rounded'
    },
    'text': {
        'primary': 'text-primary-500 border border-transparent hover:text-primary-600 hover:bg-primary-100 hover:border-primary-100 focus:ring-primary-500 rounded',
        'secondary': 'text-secondary-500 border border-transparent hover:text-secondary-600 hover:bg-secondary-100 hover:border-secondary-100 focus:ring-secondary-500 rounded',
        'danger': 'text-danger-500 border border-transparent hover:text-danger-600 hover:bg-danger-100 hover:border-danger-100 focus:ring-danger-500 rounded',
        'muted': 'text-gray-400 border border-transparent hover:text-gray-500 hover:bg-gray-100 hover:border-gray-100 focus:ring-gray-300 rounded'
    },
    'outlined': {
        'primary': 'text-primary-500 border border-primary-300 hover:text-primary-600 hover:bg-primary-100 hover:border-primary-500 focus:ring-primary-500 rounded',
        'secondary': 'text-secondary-500 border border-secondary-300 hover:text-secondary-600 hover:bg-secondary-100 hover:border-secondary-500 focus:ring-secondary-500 rounded',
        'danger': 'text-danger-500 border border-danger-300 hover:text-danger-600 hover:bg-danger-100 hover:border-danger-500 focus:ring-danger-500 rounded',
        'muted': 'text-gray-400 border border-gray-300 hover:text-gray-500 hover:bg-gray-100 hover:border-gray-500 focus:ring-gray-300 rounded'
    },
    'link': {
        'primary': 'underline text-primary-500 hover:text-primary-600 focus:ring-primary-500 rounded',
        'secondary': 'underline text-secondary-500 hover:text-secondary-600 focus:ring-secondary-500 rounded',
        'danger': 'underline text-danger-500 hover:text-danger-600 focus:ring-danger-500 rounded',
        'muted': 'underline text-gray-400 hover:text-gray-500 focus:ring-gray-300 rounded'
    }
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

    variant?: 'filled' | 'text' | 'outlined' | 'link';
    semantic?: 'primary' | 'secondary' | 'danger' | 'muted';

    start?: ReactElement;
    end?: ReactElement;

    className?: string;

}

/**
 * 
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {

    // Properties

    const {

        variant = 'filled',
        semantic = 'primary',

        start,
        end,

        className,
        children,

        ...buttonProps

    } = props;

    // Render

    return (
        <button

            ref={ref}

            className={classNames('lux-crux lux-button', {

                'lux-crux-empty': children == null,

                'lux-button-filled': variant === 'filled',
                'lux-button-outlined': variant === 'outlined',
                'lux-button-text': variant === 'text',
                'lux-button-link': variant === 'link',

                'lux-button-primary drop-shadow': semantic === 'primary',
                'lux-button-secondary': semantic === 'secondary',
                'lux-button-muted': semantic === 'muted',
                'lux-button-danger': semantic === 'danger',

            }, className)}

            {...buttonProps}

        >

            {start &&
                <div className="lux-crux-start">
                    {start}
                </div>
            }

            <div className="lux-crux-content">
                {children || <>&#8203;</>}  {/* Use a zero width space to keep the baseline when no children is present. */}
            </div>

            {end &&
                <div className="lux-crux-end">
                    {end}
                </div>
            }

        </button >
    );

    // return (
    //     <button {...buttonProps} ref={ref}
    //         className={classNames(
    //             CLASSES[variant][semantic],
    //             { 'lux-control-padding': variant !== 'link' },
    //             'focus:ring focus:ring-opacity-50 focus:outline-none',
    //             'disabled:opacity-50 disabled:cursor-not-allowed',
    //             className
    //         )}
    //     >

    //         {(!start && !end) ?
    //             <>{children}</> :
    //             <span className="flex flex-row items-center">
    //                 {start && <span className="flex-none" style={{ marginRight: '0.25em' }}>{start}</span>}
    //                 <span className="flex-grow self-baseline">{children}</span>
    //                 {end && <span className="flex-none" style={{ marginLeft: '0.25em' }}>{end}</span>}
    //             </span>
    //         }

    //     </button>
    // );

});




// RoundButton

export interface RoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    semantic?: ComponentColor;
}

export const RoundButton: FC<RoundButtonProps> = ({ semantic: color = 'primary', className, children, ...props }) => {

    return (
        <button {...props} className={classNames(
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
