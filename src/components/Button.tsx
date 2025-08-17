import classNames from 'classnames';
import type { ReactElement } from 'react';
import React from 'react';


// Button

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

    variant?: 'filled' | 'text' | 'outlined' | 'link';
    semantic?: 'primary' | 'secondary' | 'danger' | 'muted';
    rounded?: boolean;
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
        rounded = false,
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

            }, 'rounded-full', className)}

            style={{ borderRadius: rounded ? '9999px' : undefined }}

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
