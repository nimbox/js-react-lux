import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from '../../../components/Button';
import { CrossIcon } from '../../../icons/components';
import type { MessageData } from '../types/MessageData';


interface MessageLightBoxProps {
    message: MessageData;
    onClose: () => void;
}

export function MessageLightBox(props: MessageLightBoxProps) {

    const { message, onClose } = props;
    const { attachments } = message || {};
    const url = attachments?.[0]?.url;

    return (
        <div className="absolute inset-8 min-h-0 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg">

            <div className="w-full flex-none p-4 flex flex-row justify-between items-center gap-4">
                <div className="text-lg font-medium truncate">Preview</div>
                <Button type='button' semantic="muted" rounded={true} onClick={onClose}>
                    <CrossIcon />
                </Button>
            </div>

            <div className="w-full min-h-0 px-4 pb-4 flex-1">
                {url && <MessagePreview src={url} alt="Preview" />}
            </div>

        </div>
    );

}

// Simple zoom-and-pan preview for images
// - Wheel to zoom
// - Drag to pan
// - Double click to toggle zoom

interface MessagePreviewProps {
    src: string;
    alt?: string;
}

export function MessagePreview({ src, alt }: MessagePreviewProps) {

    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const lastPointRef = useRef<{ x: number; y: number } | null>(null);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const naturalRef = useRef<{ w: number; h: number } | null>(null);

    // Handlers

    const resetView = useCallback(() => {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
    }, []);

    // Wheel zooming

    const handleWheel = useCallback((e: React.WheelEvent) => {

        const container = containerRef.current;
        const img = imageRef.current;
        if (!container || !img) return;

        const containerRect = container.getBoundingClientRect();
        const imageRect = img.getBoundingClientRect();

        const cursorX = e.clientX;
        const cursorY = e.clientY;

        const baseW = imageRect.width / scale;
        const baseH = imageRect.height / scale;

        const zoomIntensity = 0.0015;
        const nextScale = clamp(scale * (1 - e.deltaY * zoomIntensity), 1, 6);

        // Local coords within image (pre-transform space)
        const localX = (cursorX - imageRect.left) / scale;
        const localY = (cursorY - imageRect.top) / scale;

        // Desired new screen top-left after scaling around cursor
        const desiredLeft = cursorX - localX * nextScale;
        const desiredTop = cursorY - localY * nextScale;

        // Clamp desired left/top so image stays within container
        const newW = baseW * nextScale;
        const newH = baseH * nextScale;
        const { left: clampedLeft, top: clampedTop } = clampToContainer(desiredLeft, desiredTop, newW, newH, containerRect);

        // Translate delta in screen space -> update translate
        const nextTx = translate.x + (clampedLeft - imageRect.left);
        const nextTy = translate.y + (clampedTop - imageRect.top);

        setScale(nextScale);
        setTranslate({ x: nextTx, y: nextTy });

    }, [scale, translate.x, translate.y]);

    // Panning

    const handlePointerDown = useCallback((e: React.PointerEvent) => {

        (e.target as Element).setPointerCapture?.(e.pointerId);
        setIsPanning(true);
        lastPointRef.current = { x: e.clientX, y: e.clientY };

    }, []);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {

        if (!isPanning || !lastPointRef.current) return;
        const container = containerRef.current;
        const img = imageRef.current;
        if (!container || !img) return;
        const containerRect = container.getBoundingClientRect();
        const imageRect = img.getBoundingClientRect();

        const dx = e.clientX - lastPointRef.current.x;
        const dy = e.clientY - lastPointRef.current.y;
        lastPointRef.current = { x: e.clientX, y: e.clientY };

        const baseW = imageRect.width / scale;
        const baseH = imageRect.height / scale;
        const newW = baseW * scale;
        const newH = baseH * scale;
        const desiredLeft = imageRect.left + dx;
        const desiredTop = imageRect.top + dy;
        const { left: clampedLeft, top: clampedTop } = clampToContainer(desiredLeft, desiredTop, newW, newH, containerRect);

        const nextTx = translate.x + (clampedLeft - imageRect.left);
        const nextTy = translate.y + (clampedTop - imageRect.top);

        setTranslate({ x: nextTx, y: nextTy });

    }, [isPanning, scale, translate.x, translate.y]);

    const handlePointerUp = useCallback((e: React.PointerEvent) => {

        (e.target as Element).releasePointerCapture?.(e.pointerId);
        setIsPanning(false);
        lastPointRef.current = null;

    }, []);

    // Double click zooming

    const handleDoubleClick = useCallback((e: React.MouseEvent) => {

        const container = containerRef.current;
        const img = imageRef.current;
        if (!container || !img) return;
        if (scale > 1) {
            resetView();
            return;
        }

        const containerRect = container.getBoundingClientRect();
        const imageRect = img.getBoundingClientRect();

        const cursorX = e.clientX;
        const cursorY = e.clientY;
        const nextScale = 2;

        const baseW = imageRect.width / scale;
        const baseH = imageRect.height / scale;
        const localX = (cursorX - imageRect.left) / scale;
        const localY = (cursorY - imageRect.top) / scale;

        const desiredLeft = cursorX - localX * nextScale;
        const desiredTop = cursorY - localY * nextScale;

        const newW = baseW * nextScale;
        const newH = baseH * nextScale;
        const { left: clampedLeft, top: clampedTop } = clampToContainer(desiredLeft, desiredTop, newW, newH, containerRect);

        const nextTx = translate.x + (clampedLeft - imageRect.left);
        const nextTy = translate.y + (clampedTop - imageRect.top);

        setScale(nextScale);
        setTranslate({ x: nextTx, y: nextTy });

    }, [resetView, scale, translate.x, translate.y]);

    // Style

    const imageStyle = useMemo<React.CSSProperties>(() => ({
        transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
        transformOrigin: '0 0',
        willChange: 'transform'
    }), [scale, translate.x, translate.y]);

    // Render

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-hidden rounded-lg bg-gray-100"
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDoubleClick={handleDoubleClick}
            role="img"
            aria-label={alt || 'Image preview'}
        >
            <div className="w-full h-full touch-none select-none">
                <img

                    ref={imageRef}

                    src={src}
                    alt={alt}
                    draggable={false}

                    className="w-full h-full object-scale-down"
                    style={imageStyle}

                    onLoad={(e) => {
                        const t = e.currentTarget;
                        if (t.naturalWidth && t.naturalHeight) {
                            naturalRef.current = { w: t.naturalWidth, h: t.naturalHeight };
                            setScale(1);
                            setTranslate({ x: 0, y: 0 });
                        }
                    }}

                />
            </div>
        </div>
    );

}

// Utilities

function clamp(value: number, min: number, max: number) {

    return Math.min(max, Math.max(min, value));

}

function clampToContainer(desiredLeft: number, desiredTop: number, newW: number, newH: number, containerRect: DOMRect) {

    const minLeft = newW <= containerRect.width
        ? containerRect.left + (containerRect.width - newW) / 2
        : containerRect.left + containerRect.width - newW;
    const maxLeft = newW <= containerRect.width
        ? minLeft
        : containerRect.left;

    const minTop = newH <= containerRect.height
        ? containerRect.top + (containerRect.height - newH) / 2
        : containerRect.top + containerRect.height - newH;
    const maxTop = newH <= containerRect.height
        ? minTop
        : containerRect.top;

    return {
        left: clamp(desiredLeft, minLeft, maxLeft),
        top: clamp(desiredTop, minTop, maxTop)
    };

}
