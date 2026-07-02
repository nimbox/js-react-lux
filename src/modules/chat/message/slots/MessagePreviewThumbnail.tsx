import type { ReactNode } from 'react';


// Preview-chrome thumbnail — a small fixed-size media square in a preview row
// (docs §6). Composed by media `preview` instances (image/video); text previews omit it.
export function MessagePreviewThumbnail({ children }: { children: ReactNode }) {
    return (
        <div className="flex-none w-10 h-10 rounded overflow-hidden">
            {children}
        </div>
    );
}
