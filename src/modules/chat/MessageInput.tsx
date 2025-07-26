import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/inputs/Input';
import { SendIcon } from '../../icons/components';


export interface MessageInputProps {

    startButtons?: ReactNode;
    endButtons?: ReactNode;

    onSubmit?: (message: string) => void;
    className?: string;

}

export function MessageInput({ className, onSubmit, startButtons, endButtons }: MessageInputProps) {

    const [body, setBody] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBody(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (body.trim()) {
            onSubmit?.(body.trim());
            setBody('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={classNames('flex flex-row items-center gap-2 bg-white mx-4 mb-4 p-4 rounded-full', className)}>
            {startButtons}
            <Input variant="plain" placeholder="Type a message..." value={body} onChange={handleChange} className="ml-4" />
            {endButtons}
            <Button type='submit' semantic="primary" rounded={true}><SendIcon /></Button>
        </form>
    );

}
