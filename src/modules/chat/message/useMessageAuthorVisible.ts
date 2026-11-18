import { useMessage } from './MessageContext';


/**
 * Whether `Message.Author` renders for the current message: it has an author
 * and it is the first of its group.
 *
 * An instance that gives the author line a container of its own (a padded strip
 * above an image, a chip above a sticker) asks this to decide whether to mount
 * that container, so the rule lives in one place.
 */
export function useMessageAuthorVisible(): boolean {

    const { message: { author }, isFirst } = useMessage();

    return Boolean(author) && Boolean(isFirst);

}
