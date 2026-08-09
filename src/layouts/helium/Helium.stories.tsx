import type { Meta, StoryObj } from '@storybook/react-vite';
import { NimboxIcon } from '@nimbox/icons-react';
import { ViewportProvider } from '../../hooks/ViewportProvider';
import { Header, Helium, Main, Navigator, Panel } from './Helium';


// Definition

const meta: Meta = {

    // The layout owns the whole page: it pins a fixed header to the viewport
    // edges and sizes itself against the screen, so the default padded frame
    // would inset everything except that header.
    parameters: { layout: 'fullscreen' },

    // `Helium` reads the viewport width to pick between its docked and
    // compact arrangements, and falls back to a width of zero without a
    // provider above it.
    decorators: [
        (Story) => (
            <ViewportProvider>
                <Story />
            </ViewportProvider>
        )
    ]

};

export default meta;
type Story = StoryObj;

// Templates

const HelliumTemplate: Story = {
    render: () => {
        return (
            <Helium>

                <Header className="flex flex-row justify-center items-center">
                    <div>Header</div>
                </Header>

                <Navigator>

                    <Navigator.Header className="pl-3 flex flex-row items-center justify-between">
                        <NimboxIcon className="w-8 h-8" />
                    </Navigator.Header>

                    <Navigator.Content className="p-3">
                        <Panel className="-mx-3">

                            <Panel.Group>Menú</Panel.Group>
                            <Panel.Item active={true}>Clientes</Panel.Item>
                            <Panel.Item active={false}>Vendedores</Panel.Item>
                            <Panel.Item active={false}>Documentos</Panel.Item>
                            <Panel.Item active={false}>Cobros</Panel.Item>
                            <Panel.Item active={false}>Notas</Panel.Item>
                            <Panel.Item active={false}>Tareas</Panel.Item>

                            <Panel.Group>Extra</Panel.Group>
                            <Panel.Item active={false}>Laboratorio</Panel.Item>

                            {[...Array(100)].map((_, index) => <Panel.Item key={index} active={false}>Otros</Panel.Item>)}

                        </Panel>
                    </Navigator.Content>

                    <Navigator.Footer className="px-3 py-2">
                        <div className="flex flex-row items-center justify-between cursor-pointer">
                            <div>
                                <div className="">Soporte</div>
                                <div className="text-xs text-muted">Solicita ayuda aquí</div>
                            </div>
                            <div className="w-6 text-center rounded-full bg-navigator text-navigator-bg">?</div>
                        </div>
                    </Navigator.Footer>
                    <Navigator.Footer className="px-3 py-2">
                        <div className="text-xs text-muted">© 2020 Nimbox Technologies LTD</div>
                    </Navigator.Footer>

                </Navigator>

                <Main>

                    <Main.Content className="px-3 py-2">
                        <div>first</div>
                        {[...Array(100)].map((_, index) => <div key={index}>content</div>)}
                    </Main.Content>

                    {/* Tall enough to run past the fold, so the drawer's
                        bottom edge is visible on a compact viewport. */}
                    <Main.Side className="px-3 py-2">
                        <div>first</div>
                        {[...Array(60)].map((_, index) => <div key={index}>side</div>)}
                    </Main.Side>

                </Main>

            </Helium>
        );
    }
};

// Story

export const Primary: Story = {
    ...HelliumTemplate
};
