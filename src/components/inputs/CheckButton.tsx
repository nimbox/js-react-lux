import classNames from 'classnames';
import { type FC } from 'react';
import { CheckIcon as SvgCheckIcon, CrossIcon as SvgCrossIcon } from '@nimbox/icons-react';


export interface CheckButtonProps {

    onFulfill: () => void;
    onReject: () => void;

    'data-tooltip'?: string;
    'data-tooltip-fulfill'?: string;
    'data-tooltip-reject'?: string;

    children?: never;

}

export const CheckButton: FC<CheckButtonProps> = (props) => {

    // properties

    const {

        onFulfill,
        onReject,

        'data-tooltip': dataTooltip,
        'data-tooltip-fulfill': dataTooltipFulfill,
        'data-tooltip-reject': dataTooltipReject

    } = props;

    // render

    return (
        <div tabIndex={0}
            data-tooltip={dataTooltip}
            className={classNames(
                'inline-block relative',
                'border border-control-border checked:border-control-border',
                'focus:border-primary-500',
                'focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-0',
                'disabled:opacity-50',
                'rounded'
            )}
            style={{ width: '2.5em', height: '1.25em', verticalAlign: '-0.25em' }}
        >

            <button tabIndex={-1}
                onClick={onFulfill}
                data-tooltip={dataTooltipFulfill}
                className={classNames(
                    'absolute inset-y-0 left-0 w-1/2 box-content -m-px',
                    'hover:bg-primary-600',
                    'border border-control-border checked:border-control-border',
                    'rounded'
                )}
            >
                <SvgCheckIcon className="m-auto hover:text-white hover:stroke-2" style={{ width: '1em', height: '1em' }} />
            </button>

            <button tabIndex={-1}
                onClick={onReject}
                data-tooltip={dataTooltipReject}
                className={classNames(
                    'absolute inset-y-0 right-0 w-1/2',
                    'rounded'
                )}
            >
                <SvgCrossIcon className="m-auto text-transparent stroke-2 hover:text-danger-500" style={{ width: '1em', height: '1em' }} />
            </button>

        </div>
    );

};
