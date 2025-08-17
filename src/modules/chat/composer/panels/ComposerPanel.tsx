import classNames from 'classnames';
import { type ReactNode } from 'react';
import { Button } from '../../../../components/Button';
import { useOnEscape } from '../../../../hooks/useOnEscape';
import { CrossIcon } from '../../../../icons/components';


export interface ComposerPanelProps {
    children: ReactNode;
    onClose?: () => void;
}

export function ComposerPanel(props: ComposerPanelProps) {

    // Properties

    const { children, onClose } = props;

    // Close on Escape

    useOnEscape(onClose);

    // Render

    return (
        <div className="h-full flex flex-col gap-4">
            {children}
        </div>
    );

}

// Header

export interface ComposerPanelHeaderProps {
    title: string;
    onClose: () => void;
}

function ComposerPanelHeader(props: ComposerPanelHeaderProps) {

    // Properties

    const { title, onClose } = props;

    // Render

    return (
        <div className="flex-none p-4 flex flex-row justify-between items-center gap-4">
            <div className="text-lg font-medium truncate">{title}</div>
            <Button type='button' semantic="muted" rounded={true} onClick={onClose}>
                <CrossIcon />
            </Button>
        </div>
    );

}

// Body

export interface ComposerPanelBodyProps {
    className?: string;
    children: ReactNode;
}

function ComposerPanelBody(props: ComposerPanelBodyProps) {

    // Properties

    const { children, className } = props;

    // Render

    return (
        <div className={classNames('min-h-0 flex-1', className)}>
            {children}
        </div>
    );

}

// Slots

ComposerPanel.Header = ComposerPanelHeader;
ComposerPanel.Body = ComposerPanelBody;
