import { FC, FormEvent, useState } from 'react';
import { AngleRightIcon } from '../../icons/components';
import classNames from 'classnames';


export interface ChatMessageInputProps {


    onSubmit: (message: string) => void;

    className?: string;

}

export const ChatMessageInput: FC<ChatMessageInputProps> = ({ onSubmit, className }) => {

    const [message, setMessage] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSubmit(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={classNames('flex flex-row items-center space-x-2', className)}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 p-2 rounded-full bg-gray-200 focus:outline-none"
            />
            <button type="submit" className="p-2 rounded-full bg-primary-500 text-white">
                <AngleRightIcon />
            </button>
        </form>
    );

};