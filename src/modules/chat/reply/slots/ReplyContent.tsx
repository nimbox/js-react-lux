export interface ReplyContentProps {
    children: React.ReactNode;
}

export function ReplyContent({ children }: ReplyContentProps) {

    return (
        <div className="flex flex-col gap-1">
            {children}
        </div>
    );

} 