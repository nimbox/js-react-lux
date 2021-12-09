/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { NimboxIcon } from '../../icons';
import { Header, Helium, Main, Navigator, Panel } from './Helium';


export default {
    title: 'Layout/Helium',
    parameters: {
        layout: 'fullscreen'
    }
};

export const Simple = () => {

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

                        {[...Array(100)].map(() => <Panel.Item active={false}>Otros</Panel.Item>)}

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
                    {[...Array(100)].map(() => <div>content</div>)}
                </Main.Content >

                <Main.Side className="px-3 py-2">
                    <div>first</div>
                    {[...Array(2)].map(() => <div>side</div>)}
                </Main.Side>

            </Main>

        </Helium >
    );

};
