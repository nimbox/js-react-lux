import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Modal } from './Modal';


afterEach(cleanup);

describe('Modal', () => {

    it('renders nothing when show is false', () => {
        render(<Modal show={false}><div data-testid="content">hi</div></Modal>);
        expect(document.querySelector('[data-testid="content"]')).toBeNull();
    });

    it('falls back to document.body when no #modal mount point exists', () => {
        // Regression: previously did `querySelector('#modal')!` and crashed when
        // the host app had no #modal element.
        expect(() =>
            render(<Modal show><div data-testid="content">hi</div></Modal>)
        ).not.toThrow();
        const content = document.querySelector('[data-testid="content"]');
        expect(content).not.toBeNull();
        expect(document.body.contains(content)).toBe(true);
    });

    it('mounts into #modal when present', () => {
        const mount = document.createElement('div');
        mount.id = 'modal';
        document.body.appendChild(mount);
        render(<Modal show><div data-testid="content">hi</div></Modal>);
        expect(mount.querySelector('[data-testid="content"]')).not.toBeNull();
        document.body.removeChild(mount);
    });

});
