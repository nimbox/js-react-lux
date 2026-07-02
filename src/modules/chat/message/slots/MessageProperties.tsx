import { type ReactNode } from 'react';
import { useChat } from '../../ChatContext';
import { useMessage } from '../MessageContext';


// Timestamp + delivery status + an "(edited)" marker, plus any appended children
// (view counts, importance badges, …). Instance-placed and composable — an
// instance passes extra trailing content as children without forking the slot.
export function MessageProperties({ children }: { children?: ReactNode }) {

    const { formatTime, renderStatus } = useChat();
    const { message: { timestamp, status, editedAt } } = useMessage();

    if (!timestamp && !status && !editedAt && !children) {
        return null;
    }

    return (
        <div className="flex flex-row gap-1 justify-end items-center text-xs text-gray-500">
            {children}
            {editedAt && <span>(edited)</span>}
            {timestamp && <span>{formatTime(timestamp)}</span>}
            {status && <span>{renderStatus(status)}</span>}
        </div>
    );

}
