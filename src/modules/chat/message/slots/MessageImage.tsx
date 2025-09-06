import classNames from 'classnames';
import { Loading } from '../../../../components/Loading';
import type { MessageData } from '../../types/MessageData';
import { useMessage } from '../MessageContext';


const DEFAULT_MAX_WIDTH = 384;
const DEFAULT_MAX_HEIGHT = 256;

export interface MessageImageProps {

    maxWidth?: number;
    maxHeight?: number;
    upscale?: boolean;

    onClick?: (message: MessageData) => void;
    className?: string;

}

export function MessageImage(props: MessageImageProps) {

    const { maxWidth = DEFAULT_MAX_WIDTH, maxHeight = DEFAULT_MAX_HEIGHT, onClick, className } = props;
    const { message, message: { attachments } } = useMessage();

    if (!attachments || attachments.length === 0) {
        return (
            <LoadingImage width={maxWidth / 2} height={maxHeight / 2} />
        );
    }

    const url = attachments[0].thumbnailUrl;
    if (!url) {
        return (
            <LoadingImage width={maxWidth / 2} height={maxHeight / 2} />
        );
    }

    // Handlers

    const handleOnClick = () => {
        onClick?.(message);
    };

    // Render

    return (
        <img

            src={url}
            alt={attachments[0].filename || 'image'}

            onClick={handleOnClick}
            className={classNames('w-auto h-auto max-h-[256px] max-w-full object-contain rounded shadow', className)}

            loading="lazy"
            decoding="async"

        />
    );

}

function LoadingImage({ width, height }: { width: number; height: number }) {
    return (
        <div
            className="flex items-center justify-center rounded-xl shadow bg-gray-100"
            style={{ width, height }}
            aria-busy="true"
        >
            <Loading className="text-6xl" colorClassName="text-gray-300" />
        </div>
    );
}

// Utils

interface Size {
    width: number;
    height: number;
}

export function fitSize(original: Size, maximum: Size, upscale = false): Size {

    const scaleWidth = maximum.width / original.width
    const scaleHeight = maximum.height / original.height
    const scale = Math.min(scaleWidth, scaleHeight, upscale ? Number.POSITIVE_INFINITY : 1)

    return {
        width: Math.round(original.width * scale),
        height: Math.round(original.height * scale)
    }

}