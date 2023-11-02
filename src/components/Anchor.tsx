import classNames from 'classnames';
import React, { ElementType, ReactElement } from 'react';



interface BaseAnchorProps {

    variant?: 'filled' | 'text' | 'outlined' | 'link';
    semantic?: 'primary' | 'secondary' | 'danger' | 'muted';
    underline?: 'none' | 'hover' | 'always';

    start?: ReactElement;
    end?: ReactElement;

    className?: string;

}

export type AnchorProps<C extends ElementType = ElementType> = BaseAnchorProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement> &
    React.ComponentPropsWithoutRef<C> & {
        component?: C;
    };

export const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>((props, ref) => {

    // Properties

    const {

        component: Component = 'a',

        variant = 'link',
        semantic = 'primary',
        underline = 'hover',

        start,
        end,

        className,
        children,

        ...anchorProps

    } = props;

    // Render

    return (
        <Component

            ref={ref}

            className={classNames('lux-crux lux-button cursor-pointer', {

                'lux-crux-empty': children == null,

                'lux-button-filled': variant === 'filled',
                'lux-button-outlined': variant === 'outlined',
                'lux-button-text': variant === 'text',
                'lux-button-link': variant === 'link',

                'lux-button-primary': semantic === 'primary',
                'lux-button-secondary': semantic === 'secondary',
                'lux-button-muted': semantic === 'muted',
                'lux-button-danger': semantic === 'danger',

                'hover:underline': underline === 'hover',
                'underline': underline === 'always'

            }, className)}

            {...anchorProps}

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

        </Component>
    );

});
