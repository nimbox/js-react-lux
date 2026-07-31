import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RadioBar } from './RadioBar';


// Definition

const meta: Meta<typeof RadioBar> = {
    component: RadioBar
};

export default meta;
type Story = StoryObj<typeof RadioBar>;

// Templates

const RadioBarTemplate: Story = {
    render: ({ className }) => {
        const [value, onChange] = useState<string | number>(1);
        return (
            <RadioBar value={value} onChange={onChange} className={className}>
                <RadioBar.Option value={1}>1</RadioBar.Option>
                <RadioBar.Option value={2}>2</RadioBar.Option>
                <RadioBar.Option value={3}>3</RadioBar.Option>
                <RadioBar.Option value={6}>6</RadioBar.Option>
                <RadioBar.Option value={12}>12 months</RadioBar.Option>
            </RadioBar>
        );
    }
};

//  Stories

export const Base: Story = {
    ...RadioBarTemplate,
    args: { }
};

export const ExtraSmall: Story = {
    ...RadioBarTemplate,
    args: { className: 'text-xs'}
};

export const Small: Story = {
    ...RadioBarTemplate,
    args: { className: 'text-sm'}
};

export const Large: Story = {
    ...RadioBarTemplate,
    args: { className: 'text-lg'}
};

export const ExtraLarge: Story = {
    ...RadioBarTemplate,
    args: { className: 'text-xl'}
};

/**
 * Where it is mostly used: at the end of a panel heading, beside a muted title.
 * The point of the plain treatment is that the title still reads as the subject
 * and the control as a way to narrow it.
 */
export const InAPanelHeader: Story = {
    render: () => {

        const [currency, setCurrency] = useState<string | number>('all');
        const [grouping, setGrouping] = useState<string | number>('d');

        const header = (label: string, control: React.ReactNode) => (
            <div className="flex min-h-6 flex-row items-center gap-2 px-4 py-3">
                <h3 className="text-sm font-semibold tracking-wider uppercase text-muted">{label}</h3>
                <div className="ml-auto flex-none">{control}</div>
            </div>
        );

        return (
            <div className="w-96 divide-y divide-content-border">

                {header('Cobranzas',
                    <RadioBar value={currency} onChange={setCurrency} className="text-xs">
                        <RadioBar.Option value="all">Todo</RadioBar.Option>
                        <RadioBar.Option value="DOP">DOP</RadioBar.Option>
                        <RadioBar.Option value="USD">USD</RadioBar.Option>
                    </RadioBar>
                )}

                {header('Pagos',
                    <RadioBar value={grouping} onChange={setGrouping} className="text-xs">
                        <RadioBar.Option value="d">Día</RadioBar.Option>
                        <RadioBar.Option value="w">Semana</RadioBar.Option>
                        <RadioBar.Option value="m">Mes</RadioBar.Option>
                    </RadioBar>
                )}

            </div>
        );

    }
};

/**
 * Beside text, which is where the alignment shows.
 *
 * The row is taller than its own text — the rule and its padding hang below the
 * labels — so anything that centres it against a neighbouring label lifts the
 * options off that label's baseline. The first two rows are the ones to read
 * together: `items-center` is the mistake, `items-baseline` the fix. The last is
 * the same thing in ordinary inline flow, where the browser uses the box's
 * baseline and it lands right on its own.
 */
export const NextToText: Story = {
    render: () => {

        const [a, setA] = useState<string | number>('m');
        const [b, setB] = useState<string | number>('m');
        const [c, setC] = useState<string | number>('m');

        const options = (value: string | number, onChange: (value: string | number) => void) => (
            <RadioBar value={value} onChange={onChange}>
                <RadioBar.Option value="d">Día</RadioBar.Option>
                <RadioBar.Option value="w">Semana</RadioBar.Option>
                <RadioBar.Option value="m">Mes</RadioBar.Option>
            </RadioBar>
        );

        return (
            <div className="space-y-6 text-xs">

                <div>
                    <div className="mb-1 text-[10px] tracking-wider uppercase text-muted">flex · items-center — labels ride high</div>
                    <div className="flex flex-row items-center gap-1">
                        <div>Agrupación:</div>
                        {options(a, setA)}
                    </div>
                </div>

                <div>
                    <div className="mb-1 text-[10px] tracking-wider uppercase text-muted">flex · items-baseline — aligned</div>
                    <div className="flex flex-row items-baseline gap-1">
                        <div>Agrupación:</div>
                        {options(b, setB)}
                    </div>
                </div>

                <div>
                    <div className="mb-1 text-[10px] tracking-wider uppercase text-muted">inline flow — aligned</div>
                    <div>
                        Agrupación: {options(c, setC)}
                    </div>
                </div>

            </div>
        );

    }
};

/**
 * A long row, to show what `truncate` and the gap do when the labels stop being
 * two or three characters.
 */
export const LongLabels: Story = {
    render: () => {
        const [value, onChange] = useState<string | number>(1);
        return (
            <div className="w-96">
                <RadioBar value={value} onChange={onChange} className="text-sm">
                    <RadioBar.Option value={1}>Hoy</RadioBar.Option>
                    <RadioBar.Option value={7}>Esta semana</RadioBar.Option>
                    <RadioBar.Option value={14}>La semana pasada</RadioBar.Option>
                    <RadioBar.Option value={30}>Este mes</RadioBar.Option>
                </RadioBar>
            </div>
        );
    }
};
