import { type ReactNode } from 'react';


// Push-only: an instance provides already-rendered footer content as children.
export function MessageFooter({ children }: { children?: ReactNode }) {

    if (children == null || children === '') {
        return null;
    }

    return (
        <div className="text-sm text-gray-500">
            {children}
        </div>
    );

}
