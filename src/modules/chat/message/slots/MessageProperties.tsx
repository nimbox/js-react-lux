import { type ReactNode } from 'react';
import { cn } from '../../../../components/utilities/cn';
import { useChat } from '../../ChatContext';
import { useMessage } from '../MessageContext';


export interface MessagePropertiesProps {
    children?: ReactNode;

    /**
     * Styles the row to sit over media (white text) instead of over the
     * bubble's background; the instance provides what keeps it readable,
     * such as a gradient behind it.
     */
    overlay?: boolean;
}

// Timestamp + delivery status + an "(edited)" marker, plus any appended children
// (view counts, importance badges, …). Instance-placed and composable — an
// instance passes extra trailing content as children without forking the slot.
export function MessageProperties({ children, overlay = false }: MessagePropertiesProps) {

    const { formatTime, renderStatus } = useChat();
    const { message: { timestamp, status, editedAt } } = useMessage();

    if (!timestamp && !status && !editedAt && !children) {
        return null;
    }

    return (
        <div className={cn('flex flex-row gap-1 justify-end items-center text-xs', overlay ? 'text-white' : 'text-gray-500')}>
            {children}
            {editedAt && <span>(edited)</span>}
            {timestamp && <span>{formatTime(timestamp)}</span>}
            {status && <span>{renderStatus(status)}</span>}
        </div>
    );

}
