import { useMessage } from '../MessageContext';


export function MessageAuthor() {

    const { message: { author } } = useMessage();
    const { isFirst } = useMessage();

    if (!author || !isFirst) {
        return null;
    }

    return (
        <div className="flex flex-row justify-between items-center gap-2">
            <div className="truncate font-bold" style={{ color: author.color }}>
                {author.name}
            </div>
            <div className="text-sm truncate" style={{ color: author.color }}>
                {author.remoteId}
            </div>
        </div>
    );

}
