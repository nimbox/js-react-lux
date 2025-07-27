import { useMessage } from '../MessageContext';


export function MessageHeader() {

    const { message: { header } } = useMessage();

    if (!header || header.length === 0) {
        return null;
    }

    return (
        <div className="font-bold text-gray-500">
            {header}
        </div>
    );

}
