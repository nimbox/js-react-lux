import { useReply } from '../ReplyContext';


export function ReplyBody() {

    const { message: { body} } = useReply();

    return (
        <div className="text-gray-700 line-clamp-2">
            {body || 'Message'}
        </div>
    );

}
