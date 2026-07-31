import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CheckBar } from './CheckBar';


// Definition

const meta: Meta<typeof CheckBar> = {
    component: CheckBar
};

export default meta;
type Story = StoryObj<typeof CheckBar>;

// Templates

const CheckBarTemplate: Story = {
    render: ({ className }) => {
        const [value, onChange] = useState([1]);
        return (
            <CheckBar value={value} onChange={onChange} className={className}>
                <CheckBar.Option value={1}>1</CheckBar.Option>
                <CheckBar.Option value={2}>2</CheckBar.Option>
                <CheckBar.Option value={3}>3</CheckBar.Option>
                <CheckBar.Option value={6}>6</CheckBar.Option>
                <CheckBar.Option value={12}>12 months</CheckBar.Option>
            </CheckBar>
        );
    }
};

//  Stories

export const Base: Story = {
    ...CheckBarTemplate,
    args: { }
};

export const ExtraSmall: Story = {
    ...CheckBarTemplate,
    args: { className: 'text-xs'}
};

export const Small: Story = {
    ...CheckBarTemplate,
    args: { className: 'text-sm'}
};

export const Large: Story = {
    ...CheckBarTemplate,
    args: { className: 'text-lg'}
};

export const ExtraLarge: Story = {
    ...CheckBarTemplate,
    args: { className: 'text-xl'}
};

/**
 * Beside text, which is where the alignment shows. `items-center` on the row
 * around it lifts the options off the label's baseline, because the row is
 * taller than its own text — the rule and its padding hang below.
 */
export const NextToText: Story = {
    render: () => {

        const [a, setA] = useState<(string | number)[]>(['I']);
        const [b, setB] = useState<(string | number)[]>(['I']);

        const options = (value: (string | number)[], onChange: (value: (string | number)[]) => void) => (
            <CheckBar value={value} onChange={onChange}>
                <CheckBar.Option value="I">Facturas</CheckBar.Option>
                <CheckBar.Option value="P">Pagos</CheckBar.Option>
                <CheckBar.Option value="C">N/C</CheckBar.Option>
                <CheckBar.Option value="D">N/D</CheckBar.Option>
            </CheckBar>
        );

        return (
            <div className="space-y-6 text-xs">

                <div>
                    <div className="mb-1 text-[10px] tracking-wider uppercase text-muted">flex · items-center — labels ride high</div>
                    <div className="flex flex-row items-center gap-1">
                        <div>Mostrar:</div>
                        {options(a, setA)}
                    </div>
                </div>

                <div>
                    <div className="mb-1 text-[10px] tracking-wider uppercase text-muted">flex · items-baseline — aligned</div>
                    <div className="flex flex-row items-baseline gap-1">
                        <div>Mostrar:</div>
                        {options(b, setB)}
                    </div>
                </div>

            </div>
        );

    }
};

/**
 * Alt-click acts on all the *other* options, leaving the clicked one as it is.
 *
 * On a chosen option it clears the rest, isolating that one. On an unchosen
 * option it takes the rest, giving everything but that one. Narrowing a row of
 * six to a single choice is otherwise five clicks, and widening it to
 * all-but-one is five more.
 */
export const AltClick: Story = {
    render: () => {

        const [value, onChange] = useState<(string | number)[]>(['I', 'P', 'C']);

        return (
            <div className="space-y-3 text-xs">

                <CheckBar value={value} onChange={onChange}>
                    <CheckBar.Option value="I">Facturas</CheckBar.Option>
                    <CheckBar.Option value="P">Pagos</CheckBar.Option>
                    <CheckBar.Option value="C">N/C</CheckBar.Option>
                    <CheckBar.Option value="D">N/D</CheckBar.Option>
                    <CheckBar.Option value="R">Recibos</CheckBar.Option>
                </CheckBar>

                <div className="text-muted">
                    Chosen: <span className="tabular-nums">{value.length ? value.join(', ') : '—'}</span>
                </div>

                <ul className="list-disc pl-4 text-muted">
                    <li>Click — toggles that one</li>
                    <li>Alt-click a chosen one — only it stays</li>
                    <li>Alt-click an unchosen one — everything but it</li>
                </ul>

            </div>
        );

    }
};

/**
 * An all-of-them option, with `CheckBar.All`.
 *
 * It holds no value of its own: it reads as chosen when every option is chosen,
 * and clicking it takes them all or clears them. Watch `Chosen:` — "Todos" never
 * appears there, only the options it stands for.
 *
 * The reason it is a component and not an option with a value of `'*'` is the
 * modifier. An all-option that is itself a member of the set gets handed back by
 * alt-click's "everything but this one", and a caller reading `'*'` as *all* then
 * widens the selection when the click asked to narrow it. Alt-click `Facturas`
 * here and the result is the other three, with "Todos" correctly unlit.
 */
export const WithTodos: Story = {
    render: () => {

        const [value, onChange] = useState<(string | number)[]>(['I', 'P', 'C', 'D']);

        return (
            <div className="space-y-3 text-xs">

                <CheckBar value={value} onChange={onChange}>
                    <CheckBar.All>Todos</CheckBar.All>
                    <CheckBar.Option value="I">Facturas</CheckBar.Option>
                    <CheckBar.Option value="P">Pagos</CheckBar.Option>
                    <CheckBar.Option value="C">N/C</CheckBar.Option>
                    <CheckBar.Option value="D">N/D</CheckBar.Option>
                </CheckBar>

                <div className="text-muted">
                    Chosen: <span className="tabular-nums">{value.length ? value.join(', ') : '—'}</span>
                </div>

                <ul className="list-disc pl-4 text-muted">
                    <li>Click Todos — takes them all, or clears them if it is already lit</li>
                    <li>Click one option away — Todos goes out on its own</li>
                    <li>Alt-click Facturas — the other three, Todos unlit</li>
                    <li>Alt-click a lone chosen option — only it, Todos unlit</li>
                </ul>

            </div>
        );

    }
};

/**
 * Where it is mostly used: at the end of a panel heading. Several chosen at once
 * is the case a single-choice row never has to show.
 */
export const InAPanelHeader: Story = {
    render: () => {

        const [kinds, setKinds] = useState<(string | number)[]>(['I', 'P']);

        return (
            <div className="w-96 divide-y divide-content-border">
                <div className="flex min-h-6 flex-row items-center gap-2 px-4 py-3">
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-muted">Documentos pendientes</h3>
                    <div className="ml-auto flex-none">
                        <CheckBar value={kinds} onChange={setKinds} className="text-xs">
                            <CheckBar.Option value="I">Facturas</CheckBar.Option>
                            <CheckBar.Option value="P">Pagos</CheckBar.Option>
                            <CheckBar.Option value="C">N/C</CheckBar.Option>
                            <CheckBar.Option value="D">N/D</CheckBar.Option>
                        </CheckBar>
                    </div>
                </div>
            </div>
        );

    }
};
