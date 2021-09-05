import classnames from 'classnames';
import React, { FC } from 'react';
import SvgCheckIcon from '../../icons/CheckIcon';
import SvgCrossIcon from '../../icons/CrossIcon';
// import check from '../../icons/check-icon.svg';


const check = 'data:image/svg+xml;base64,' + window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="25,9 13.3,23 7,15.3 "/></svg>');
const cross = 'data:image/svg+xml;base64,' + window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="8" x2="24" y2="24"/><line x1="24" y1="8" x2="8" y2="24"/></svg>');


export interface CheckButtonProps {

    onFulfill: () => void;
    onReject: () => void;

    'data-tooltip'?: string;
    'data-tooltip-fulfill'?: string;
    'data-tooltip-reject'?: string;

    children?: never;

}

export const CheckButton: FC<CheckButtonProps> = ({ onFulfill, onReject, ['data-tooltip']: dataTooltip, ['data-tooltip-fulfill']: dataTooltipFulfill, ['data-tooltip-reject']: dataTooltipReject }) => {

    return (
        <div tabIndex={0}
            data-tooltip={dataTooltip}
            className={classnames(
                'inline-block relative',
                'border border-control-border checked:border-control-border',
                'focus:border-primary-500',
                'focus:ring focus:ring-primary-500 focus:ring-opacity-50 focus:ring-offset-0',
                'disabled:opacity-50',
                'rounded'
            )}
            style={{ width: '2.5em', height: '1.25em', verticalAlign: '-0.25em' }}
        >

            <button tabIndex={-1}
                onClick={onFulfill}
                data-tooltip={dataTooltipFulfill}
                className={classnames(
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
                className={classnames(
                    'absolute inset-y-0 right-0 w-1/2',
                    'rounded'
                )}
            >
                <SvgCrossIcon className="m-auto text-transparent stroke-2 hover:text-danger-500" style={{ width: '1em', height: '1em' }} />
            </button>

        </div>
    );

};
