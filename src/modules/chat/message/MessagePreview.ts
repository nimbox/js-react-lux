import { MessagePreviewBody } from './slots/MessagePreviewBody';
import { MessagePreviewContainer } from './slots/MessagePreviewContainer';
import { MessagePreviewThumbnail } from './slots/MessagePreviewThumbnail';


// Slots for the compact preview surface, grouped as a namespace so
// callsites read `MessagePreview.Body`. Instances compose these
// inside the context supplied by `MessageProvider`. See `Message` for
// the parallel full surface.

export const MessagePreview = {
    Container: MessagePreviewContainer,
    Body: MessagePreviewBody,
    Thumbnail: MessagePreviewThumbnail
};
