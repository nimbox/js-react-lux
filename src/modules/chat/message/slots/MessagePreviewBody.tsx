import type { ReactNode } from 'react';


// Preview-chrome body — the clamped compact text of a preview row (docs §6).
export function MessagePreviewBody({ children }: { children: ReactNode }) {
    return (
        <div className="grow min-w-0 text-sm text-gray-600 line-clamp-2">
            {children}
        </div>
    );
}
