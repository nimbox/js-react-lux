import { useReply } from '../ReplyContext';


export interface ReplyContainerProps {
    children: React.ReactNode;
}

export function ReplyContainer({ children }: ReplyContainerProps) {

    const { message } = useReply();

    return (
        <div 
            className="max-h-32 my-1 p-2 flex flex-row justify-between items-center gap-2 bg-gray-100 rounded-lg border-l-4 overflow-hidden"
            style={{ 
                borderLeftColor: message.author?.color || '#6b7280'
            }}
        >
            {children}
        </div>
    );

}
