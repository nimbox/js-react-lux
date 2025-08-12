export interface ReplyMediaProps {
    children: React.ReactNode;
}

export function ReplyMedia({ children }: ReplyMediaProps) {

    return (
        <div className="flex-none">
            {children}
        </div>
    );

}
