import { useMessage } from '../MessageContext';


export function MessageFooter() {

    const { message: { footer } } = useMessage();

    if (!footer || footer.length === 0) {
        return null;
    }

    return (
        <div className="text-sm text-gray-500">
            {footer}
        </div>
    );

}
