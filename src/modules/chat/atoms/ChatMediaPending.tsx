import { Loading } from '../../../components/Loading';
import { cn } from '../../../components/utilities/cn';


/** Props for `ChatMediaPending`. */
export interface ChatMediaPendingProps {

    /** Accessible label announced for the frame. Defaults to `'Loading'`. */
    label?: string;

    /**
     * Extra CSS classes merged onto the frame. A kit sizes the frame here
     * to roughly the space the media will take, so the bubble does not
     * jump when it arrives.
     */
    className?: string;

}

/**
 * The design-system placeholder for chat media whose bytes are not yet
 * available — a fixed frame with the loading indicator, standing where
 * the image, sticker, audio or video will render.
 */
export function ChatMediaPending(props: ChatMediaPendingProps) {

    const { label = 'Loading', className } = props;

    return (
        <div
            role="status"
            aria-label={label}
            aria-busy="true"
            className={cn('w-48 h-36 flex items-center justify-center bg-gray-100 rounded', className)}
        >
            <Loading className="text-4xl" />
        </div>
    );

}
