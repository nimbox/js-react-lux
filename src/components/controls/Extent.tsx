import { ElementType, FC } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export interface ExtentProps {

    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */

    component?: ElementType;

    variant?: 'outlined' | 'inlined' | 'plain';

    label?: string;
    labelPosition?: 'legend' | 'placeholder';

    start?: React.ReactElement;
    end?: React.ReactElement;

    className?: string;

}

export const Extent: FC<ExtentProps> = (props) => {

    const {

        component: Component = 'div',

        variant = 'plain',

        label,
        labelPosition = 'legend',

        start,
        end,

        className,
        children

    } = props;

    return (
        <Component className={classnames('relative', className)}>

            {label &&
                <label
                    className={classnames(
                        'absolute inline-flex',
                        'transition-all ease-in-out duration-100', {
                        'ml-2 px-2 top-[-10px] text-[0.75em]': labelPosition === 'legend',
                        'p-8 top-0 ': labelPosition === 'placeholder',
                    })}
                >
                    {start &&
                        <div className={classnames(
                            'flex-none self-center', 
                            'transition-[max-width] ease-in-out duration-1000', 
                            'invisible', {
                            'max-w-0': labelPosition === 'legend'
                        })}>
                            {start}
                        </div>
                    }
                    {label}
                </label>
            }

            <div className="relative inline-flex p-8">

                {start && <div className="flex-none self-center">{start}</div>}
                {children}

                <fieldset className="absolute left-0 top-[-10px] right-0 bottom-0 border border-control-border rounded mouse pointer-events-none">
                    <legend className={classnames(
                        'ml-2 invisible overflow-hidden', {
                        'max-w-0': labelPosition === 'placeholder'
                    })}>
                        <div className="px-2 text-[0.75em]">{label}</div>
                    </legend>
                </fieldset>

            </div>

        </Component >
    );

    // return (
    //     <Component className={classnames('relative', className)}>
    //         {label && <label className="absolute left-[1em] -top-[1em] lux-px-1em text-[0.75em] bg-white">{label}</label>}
    //         <div className={classnames(
    //             'inline-flex items-baseline',
    //             'lux-control-padding bg-red-100', {
    //             '': 'plain',
    //             'border border-control-border rounded': variant === 'outlined'
    //         }
    //         )}>
    //             {left && <div className="flex-none self-center">{left}</div>}
    //             <div className="flex-1 self-end">
    //                 {children}
    //             </div>
    //             {right && <div className="flex-none self-center border-2 border-blue-500">{right}</div>}
    //         </div>
    //     </Component>
    // );

};
