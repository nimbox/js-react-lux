import classnames from 'classnames';
import React from 'react';


export interface RadioProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({ error, className, children, ...props }, ref) => {

    // const context = useContext(Context);

    return children ?
        (
            <div className="flex flex-row items-center">
                <input type="radio" ref={ref} {...props} className={classnames(className,
                    'border border-control-border checked:border-control-border text-primary-500',
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                    'focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50')}
                />
                <span className={classnames('ml-2', className)}>{children}</span>
            </div>
        )
        :
        (
            <input type="radio" ref={ref} {...props} className={classnames(className,
                'border border-control-border checked:border-control-border text-primary-500',
                'focus:border-primary-500 focus:ring focus:ring-primary-500',
                'focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50')}
            />
        );

});
