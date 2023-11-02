import classNames from 'classnames';
import React, { FC, ReactElement } from 'react';
import { ComponentColor } from './ComponentColor';


// Button

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

    variant?: 'filled' | 'text' | 'outlined' | 'link';
    semantic?: 'primary' | 'secondary' | 'danger' | 'muted';
    centered?: boolean;

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
        centered = false,

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

                'lux-button-primary': semantic === 'primary',
                'lux-button-secondary': semantic === 'secondary',
                'lux-button-muted': semantic === 'muted',
                'lux-button-danger': semantic === 'danger',

                'lux-button-centered': centered

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
