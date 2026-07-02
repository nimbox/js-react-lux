import { messageInstance, type MessageRendererRegistry } from '../../message/renderers';
import { AudioMessage, AudioMessagePreview } from './instances/Audio';
import { DocumentMessage, DocumentMessagePreview } from './instances/Document';
import { ImageMessage, ImageMessagePreview } from './instances/Image';
import { StickerMessage } from './instances/Sticker';
import { TextMessage, TextMessagePreview } from './instances/Text';
import { VideoMessage, VideoMessagePreview } from './instances/Video';


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
    'text': messageInstance({ full: TextMessage, preview: TextMessagePreview }),
    'image': messageInstance({ full: ImageMessage, preview: ImageMessagePreview }),
    'sticker': messageInstance({ full: StickerMessage, preview: ImageMessagePreview }),
    'audio': messageInstance({ full: AudioMessage, preview: AudioMessagePreview }),
    'video': messageInstance({ full: VideoMessage, preview: VideoMessagePreview }),
    'document': messageInstance({ full: DocumentMessage, preview: DocumentMessagePreview })
};
