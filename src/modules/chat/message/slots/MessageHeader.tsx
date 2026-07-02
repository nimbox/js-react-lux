import { type ReactNode } from 'react';


// Push-only: an instance provides already-rendered header content as children.
export function MessageHeader({ children }: { children?: ReactNode }) {

    if (children == null || children === '') {
        return null;
    }

    return (
        <div className="font-bold text-gray-500">
            {children}
        </div>
    );

}
