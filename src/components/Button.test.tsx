import { cleanup, render } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { Button } from './Button';


afterEach(cleanup);

describe('Button', () => {

    it('applies variant and semantic classes', () => {
        const { getByRole } = render(<Button variant="outlined" semantic="danger">Save</Button>);
        const button = getByRole('button');
        expect(button).toHaveClass('lux-button', 'lux-button-outlined', 'lux-button-danger');
    });

    it('defaults to filled + primary', () => {
        const { getByRole } = render(<Button>Save</Button>);
        expect(getByRole('button')).toHaveClass('lux-button-filled', 'lux-button-primary');
    });

    it('forwards the ref and arbitrary button props', () => {
        const ref = createRef<HTMLButtonElement>();
        const { getByRole } = render(<Button ref={ref} type="submit">Go</Button>);
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(getByRole('button')).toHaveAttribute('type', 'submit');
    });

});
