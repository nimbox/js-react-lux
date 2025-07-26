import { useReply } from '../ReplyContext';


export function ReplyAuthor() {

    const { message: { author } } = useReply();

    if (!author) {
        return null;
    }

    return (
        <div className="flex flex-row justify-between items-center gap-2">
            <div className="truncate font-bold" style={{ color: author.color }}>
                {author.name}
            </div>
        </div>
    );

} 