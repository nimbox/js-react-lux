/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { CrossIcon, HamburgerIcon, NimboxIcon } from '../../icons';
import '../../index.css';
import { Header, Helium, Main, Navigator, Panel, Toggle } from './Helium';


export default { title: 'Layout/Helium' };

export const Simple = () => {

    const [navigator, setNavigator] = useState(true);

    return (

        <Helium navigator={navigator} setNavigator={(s) => setNavigator(s)}>

            <Header className="px-3 pl-0 flex flex-row justify-between items-stretch">

                <div className="h-full flex flex-row items-center">

                    <Toggle always={true}><HamburgerIcon className="w-8 h-8 fill-current" /></Toggle>

                </div>

                <div className="h-full flex flex-row items-center space-x-3 bg-red-500">

                    <div className="">Other</div>
                    <div>Some</div>

                </div>

            </Header>

            <Navigator>

                <Navigator.Header className="pl-3 flex flex-row items-center justify-between">
                    <NimboxIcon className="w-8 h-8" />
                    <Toggle always={false}><CrossIcon className="w-8 h-8 stroke-2" /></Toggle>
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

                <Main.Content className="p-3">
                    <div>first</div>
                    {[...Array(100)].map(() => <div>content</div>)}
                </Main.Content >

                {true &&
                    <Main.Side className="p-3">
                        <div>first</div>
                        {[...Array(2)].map(() => <div>side</div>)}
                    </Main.Side>
                }

            </Main>

        </Helium >
    );

};
