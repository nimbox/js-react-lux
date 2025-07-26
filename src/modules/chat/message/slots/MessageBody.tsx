import { useMessage } from '../MessageContext';


export function MessageBody() {

    const { message: { body } } = useMessage();

    if (!body || body.length === 0) {
        return null;
    }

    return (
        <div className="text-sm text-gray-500">
            {body}
        </div>
    );

}
