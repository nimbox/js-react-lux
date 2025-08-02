import classNames from 'classnames';
import { forwardRef } from 'react';
import { AngleDownIcon } from '../../icons/components';


export const AngleDownMenuTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {

    const { className, ...rest } = props;

    return (
        <button ref={ref} {...rest} className={classNames('bg-white/90 rounded shadow', className)}>
            <AngleDownIcon className="w-5 h-5 text-gray-500" />
        </button>
    );

});
