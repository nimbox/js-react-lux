import { useMessage } from '../MessageContext';


export interface MessageFloatingBodyProps {
    className?: string;
}

export function MessageFloatingBody(props: MessageFloatingBodyProps) {

    const { message: { body } } = useMessage();
    const { className = 'p-2 text-xl'} = props;

    if (!body || body.length === 0) {
        return null;
    }

    return (
        <div className={className}>
            {body}
        </div>
    );

}
