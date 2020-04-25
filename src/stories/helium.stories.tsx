import { withKnobs } from "@storybook/addon-knobs";
import React, { useState } from 'react';
import { SearchInput } from "../components/Form";
import { HamburgerIcon, NimboxIcon } from '../icons';
import { Header, Helium, Main, Navigator, Toggle } from '../layouts/helium/Helium';
import { DefaultNavigator } from '../layouts/helium/Navigator';
import '../styles/styles.css';


export default { title: 'Layout/Helium', decorators: [withKnobs] };

export const Simple = () => {

    const [navigator, setNavigator] = useState(true);

    return (

        <Helium navigator={navigator} onNavigator={(s) => setNavigator(s)}>

            <Header className="px-3 pl-0 flex flex-row justify-between items-stretch">

                <div className="h-full flex flex-row items-center">

                    <Toggle><HamburgerIcon className="w-8 h-8 fill-current" /></Toggle>
                    <SearchInput className="pl-3"/>

                </div>

                <div className="h-full flex flex-row items-center space-x-3 bg-red-500">

                    <div className="">Other</div>
                    <div>Some</div>

                </div>

            </Header>

            <Navigator>

                <Navigator.Header className="px-3 flex flex-row items-center justify-between">
                    <NimboxIcon className="w-8 h-8" />
                    <div>Right</div>
                </Navigator.Header>

                <Navigator.Content className="p-3">
                    <DefaultNavigator className="-mx-3">

                        <DefaultNavigator.Group>Menú</DefaultNavigator.Group>
                        <DefaultNavigator.Item active={true}>Clientes</DefaultNavigator.Item>
                        <DefaultNavigator.Item active={false}>Vendedores</DefaultNavigator.Item>
                        <DefaultNavigator.Item active={false}>Documentos</DefaultNavigator.Item>
                        <DefaultNavigator.Item active={false}>Cobros</DefaultNavigator.Item>
                        <DefaultNavigator.Item active={false}>Notas</DefaultNavigator.Item>
                        <DefaultNavigator.Item active={false}>Tareas</DefaultNavigator.Item>

                        <DefaultNavigator.Group>Extra</DefaultNavigator.Group>
                        <DefaultNavigator.Item active={false}>Laboratorio</DefaultNavigator.Item>

                        {[...Array(100)].map(() => <DefaultNavigator.Item active={false}>Otros</DefaultNavigator.Item>)}

                    </DefaultNavigator>
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
                    {[...Array(2)].map(() => <div>content</div>)}
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
