export interface ReplyMediaProps {
    children: React.ReactNode;
}

export function ReplyMedia({ children }: ReplyMediaProps) {

    return (
        <div className="flex-shrink-0">
            {children}
        </div>
    );

}
