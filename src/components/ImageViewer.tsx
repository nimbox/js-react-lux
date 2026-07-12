import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from './utilities/cn';


// A zoom-and-pan image viewer — wheel to zoom, drag to pan, double-click to
// toggle zoom. Prop-driven and content-agnostic: it takes a resolved `src` (+
// optional `alt`), never a domain object, and a host frames it (a lightbox
// overlay, a gallery, …). Not chat-specific.

export interface ImageViewerProps {
    src: string;
    alt?: string;
    className?: string;
}

// Zoom bounds. The image never zooms out past its fitted size (1) nor in past 6x.
const MINIMUM_SCALE = 1;
const MAXIMUM_SCALE = 6;

export function ImageViewer({ src, alt, className }: ImageViewerProps) {

    const { t } = useTranslation();

    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const lastPointRef = useRef<{ x: number; y: number } | null>(null);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    // The view (scale + translate) is mirrored in refs so the handlers read and
    // advance an authoritative value synchronously. Reading it from state — or from
    // the DOM's `getBoundingClientRect` — would lag a render behind, so a burst of
    // wheel events in one frame would all start from the same stale value and
    // collapse into a single step. Refs let each event build on the previous one.
    const scaleRef = useRef(scale);
    const translateRef = useRef(translate);

    // Commit a new view: update the refs (authoritative, synchronous) and the state
    // (drives the render). Every handler goes through here.
    const setView = useCallback((nextScale: number, nextTranslate: { x: number; y: number }) => {
        scaleRef.current = nextScale;
        translateRef.current = nextTranslate;
        setScale(nextScale);
        setTranslate(nextTranslate);
    }, []);

    const resetView = useCallback(() => {
        setView(1, { x: 0, y: 0 });
    }, [setView]);

    // The image element is `w-full h-full`, so at scale 1 its box exactly covers the
    // container. All geometry is therefore in container-local coordinates: the
    // transformed box's top-left is the translate, and its size is the container size
    // times the scale (transform-origin is the top-left corner). This avoids reading
    // the transformed image's rect from the DOM, which lags the committed view.

    // The translate that puts `nextScale` centred on a cursor point (container-local),
    // clamped so the image stays within view.
    const zoomAround = useCallback((cursorX: number, cursorY: number, nextScale: number, width: number, height: number) => {

        const currentScale = scaleRef.current;
        const currentTranslate = translateRef.current;

        // The element-local point under the cursor (pre-transform space).
        const localX = (cursorX - currentTranslate.x) / currentScale;
        const localY = (cursorY - currentTranslate.y) / currentScale;

        // The translate that keeps that point under the cursor at the new scale.
        const desiredX = cursorX - localX * nextScale;
        const desiredY = cursorY - localY * nextScale;

        return clampToContainer(desiredX, desiredY, width * nextScale, height * nextScale, width, height);

    }, []);

    // Wheel zooming — registered as a native, non-passive listener so we can
    // `preventDefault()` the trackpad pinch (a wheel event with `ctrlKey`) and stop
    // the browser from zooming the whole page. React binds `onWheel` passively, where
    // `preventDefault()` is a no-op, so the React prop can't do this.

    useEffect(() => {

        const container = containerRef.current;
        if (!container) return;

        const onWheel = (e: WheelEvent) => {

            // Keep the gesture on the image; never let it fall through to page zoom.
            e.preventDefault();

            const rect = container.getBoundingClientRect();
            const cursorX = e.clientX - rect.left;
            const cursorY = e.clientY - rect.top;

            // Pinch (a wheel event with `ctrlKey`) delivers a much smaller `deltaY`
            // per event than a mouse wheel notch, so it needs a far higher sensitivity
            // to feel responsive. Exponential scaling keeps zoom-in/out symmetric and
            // bounded regardless of the delta's magnitude.
            const zoomIntensity = e.ctrlKey ? 0.02 : 0.0025;
            const nextScale = clamp(scaleRef.current * Math.exp(-e.deltaY * zoomIntensity), MINIMUM_SCALE, MAXIMUM_SCALE);

            setView(nextScale, zoomAround(cursorX, cursorY, nextScale, rect.width, rect.height));
        };

        container.addEventListener('wheel', onWheel, { passive: false });
        return () => container.removeEventListener('wheel', onWheel);

    }, [setView, zoomAround]);

    // Panning — only meaningful once zoomed in; at scale 1 the image already fits, so
    // there is nowhere to pan.

    const handlePointerDown = useCallback((e: React.PointerEvent) => {

        if (scaleRef.current <= 1) return;
        (e.target as Element).setPointerCapture?.(e.pointerId);
        setIsPanning(true);
        lastPointRef.current = { x: e.clientX, y: e.clientY };

    }, []);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {

        if (!isPanning || !lastPointRef.current) return;
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();

        const dx = e.clientX - lastPointRef.current.x;
        const dy = e.clientY - lastPointRef.current.y;
        lastPointRef.current = { x: e.clientX, y: e.clientY };

        const currentScale = scaleRef.current;
        const currentTranslate = translateRef.current;
        setView(currentScale, clampToContainer(
            currentTranslate.x + dx,
            currentTranslate.y + dy,
            rect.width * currentScale,
            rect.height * currentScale,
            rect.width,
            rect.height
        ));

    }, [isPanning, setView]);

    const handlePointerUp = useCallback((e: React.PointerEvent) => {

        (e.target as Element).releasePointerCapture?.(e.pointerId);
        setIsPanning(false);
        lastPointRef.current = null;

    }, []);

    // Double-click zooming — toggle between fitted (1) and 2x around the cursor.

    const handleDoubleClick = useCallback((e: React.MouseEvent) => {

        const container = containerRef.current;
        if (!container) return;
        if (scaleRef.current > 1) {
            resetView();
            return;
        }

        const rect = container.getBoundingClientRect();
        const cursorX = e.clientX - rect.left;
        const cursorY = e.clientY - rect.top;
        const nextScale = 2;

        setView(nextScale, zoomAround(cursorX, cursorY, nextScale, rect.width, rect.height));

    }, [resetView, setView, zoomAround]);

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
            className={cn(
                'w-full h-full overflow-hidden rounded-lg bg-gray-100',
                scale > 1 && (isPanning ? 'cursor-grabbing' : 'cursor-grab'),
                className
            )}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDoubleClick={handleDoubleClick}
            role="group"
            aria-label={t('imageViewer.label', { defaultValue: 'Image viewer' })}
        >
            <div className="w-full h-full touch-none select-none">
                <img

                    ref={imageRef}

                    src={src}
                    alt={alt}
                    draggable={false}

                    className="w-full h-full object-scale-down"
                    style={imageStyle}

                    onLoad={resetView}

                />
            </div>
        </div>
    );

}

// Utilities

function clamp(value: number, min: number, max: number) {

    return Math.min(max, Math.max(min, value));

}

// Clamp a transformed box (top-left `desiredLeft`/`desiredTop`, size `boxWidth`/
// `boxHeight`) to a container of `containerWidth`/`containerHeight`, all in
// container-local coordinates (container origin at 0, 0). When the box is smaller
// than the container on an axis it is centred; otherwise it is held so its edges
// never pull away from the container's edges.
function clampToContainer(desiredLeft: number, desiredTop: number, boxWidth: number, boxHeight: number, containerWidth: number, containerHeight: number) {

    const minLeft = boxWidth <= containerWidth ? (containerWidth - boxWidth) / 2 : containerWidth - boxWidth;
    const maxLeft = boxWidth <= containerWidth ? minLeft : 0;

    const minTop = boxHeight <= containerHeight ? (containerHeight - boxHeight) / 2 : containerHeight - boxHeight;
    const maxTop = boxHeight <= containerHeight ? minTop : 0;

    return {
        x: clamp(desiredLeft, minLeft, maxLeft),
        y: clamp(desiredTop, minTop, maxTop)
    };

}
