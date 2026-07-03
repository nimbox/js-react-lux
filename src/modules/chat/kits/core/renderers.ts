import { messageInstance, type MessageRendererRegistry } from '../../message/renderers';
import { AudioMessage, AudioMessagePreview, AudioMessageSummary } from './instances/Audio';
import { DocumentMessage, DocumentMessagePreview, DocumentMessageSummary } from './instances/Document';
import { ImageMessage, ImageMessagePreview, ImageMessageSummary } from './instances/Image';
import { StickerMessage, StickerMessageSummary } from './instances/Sticker';
import { TextMessage, TextMessagePreview, TextMessageSummary } from './instances/Text';
import { VideoMessage, VideoMessagePreview, VideoMessageSummary } from './instances/Video';


// The core kit's default registry. A consumer spreads this into
// ChatProvider's `messageRenderers` and overrides/extends per type.
// Each entry is a `{ full, preview }` pair (docs §6): `full` for the
// timeline bubble, `preview` for the compact form (reply-quote,
// composer banner, conversation line).
//
//   messageRenderers={{ ...coreMessageRenderers, image:
//   MyImageWithLightbox, template: MyTemplate }}
//
// Sticker reuses the image content view and preview — it differs only
// in the `full` presentation (a bubble-less floating image).

export const coreMessageRenderers: MessageRendererRegistry = {
    'text': messageInstance({ full: TextMessage, preview: TextMessagePreview, summary: TextMessageSummary }),
    'image': messageInstance({ full: ImageMessage, preview: ImageMessagePreview, summary: ImageMessageSummary }),
    'sticker': messageInstance({ full: StickerMessage, preview: ImageMessagePreview, summary: StickerMessageSummary }),
    'audio': messageInstance({ full: AudioMessage, preview: AudioMessagePreview, summary: AudioMessageSummary }),
    'video': messageInstance({ full: VideoMessage, preview: VideoMessagePreview, summary: VideoMessageSummary }),
    'document': messageInstance({ full: DocumentMessage, preview: DocumentMessagePreview, summary: DocumentMessageSummary })
};
