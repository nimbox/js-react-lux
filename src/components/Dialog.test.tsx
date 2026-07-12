import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Dialog } from './Dialog';


afterEach(cleanup);

describe('Dialog', () => {

    it('is absent from the document when hidden', () => {
        render(<Dialog show={false} onHide={() => { }} className="panel"><button>ok</button></Dialog>);
        expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('exposes role="dialog" and aria-modal when shown', () => {
        render(<Dialog show onHide={() => { }} className="panel"><button>ok</button></Dialog>);
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('calls onHide when Escape is pressed', () => {
        const onHide = vi.fn();
        render(<Dialog show onHide={onHide} className="panel"><button>ok</button></Dialog>);
        fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
        expect(onHide).toHaveBeenCalled();
    });

});
