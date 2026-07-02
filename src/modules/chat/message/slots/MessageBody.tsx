import { type ReactNode } from 'react';


// Push-only: an instance provides already-rendered body content as children. The
// base owns the styled container; the kit/consumer owns the content.
export function MessageBody({ children }: { children?: ReactNode }) {

    if (children == null || children === '') {
        return null;
    }

    return (
        <div className="text-gray-500">
            {children}
        </div>
    );

}
