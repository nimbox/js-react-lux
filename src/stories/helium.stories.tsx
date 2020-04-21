import { withKnobs } from "@storybook/addon-knobs";
import React, { useState } from 'react';
import { Card, Cards } from '../components/Card';
import { DatePicker } from '../components/DatePicker';
import { DefaultNavigator } from '../components/DefaultNavigator';
import { Group, Input, Label, TextArea } from "../components/Form";
import { Select } from '../components/Select';
import { HamburgerIcon, NimboxIcon, SearchIcon, WaffleIcon } from '../icons';
import { Header, Helium, Main, Navigator, Toggle } from '../layouts/Helium';
import '../styles/styles.css';


export default { title: 'Layout/Helium', decorators: [withKnobs] };

export const Simple = () => {

    const [navigator, setNavigator] = useState(false);

    return (

        <Helium navigator={navigator} onNavigator={(s) => setNavigator(s)}>

            <Header>

                <Header.Navigator>
                    <div className='hidden md:inline'>
                        <NimboxIcon className="inline align-bottom w-8 h-8" /> nimbox
                    </div>
                    <Toggle><HamburgerIcon className="text-navigator w-8 h-8 fill-current" /></Toggle>
                    <WaffleIcon className="text-navigator hidden md:inline w-8 h-8 fill-current" />
                </Header.Navigator>

                <Header.Content>

                    <div className="flex-none relative">
                        <input type="search" placeholder="Search" className="w-56 pl-10 pr-4 py-2 border border-content-border rounded-lg" />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center">
                            <SearchIcon className="text-content h-5 w-5 stroke-current stroke-2" />
                        </div>
                    </div>

                    <div className="flex-grow flex flex-row justify-end">
                        <div className="relative">
                            <select value="asd">asd</select>
                        </div>
                    </div>

                </Header.Content>

            </Header>

            <Navigator>

                <DefaultNavigator>

                    <DefaultNavigator.Content>

                        <DefaultNavigator.Group>Menú</DefaultNavigator.Group>
                        <DefaultNavigator.Item active={true}>Clientes</DefaultNavigator.Item>
                        <DefaultNavigator.Item active={false}>Vendedores</DefaultNavigator.Item>
                        <DefaultNavigator.Item active={false}>Documentos</DefaultNavigator.Item>
                        <DefaultNavigator.Item active={false}>Cobros</DefaultNavigator.Item>
                        <DefaultNavigator.Item active={false}>Notas</DefaultNavigator.Item>
                        <DefaultNavigator.Item active={false}>Tareas</DefaultNavigator.Item>

                        <DefaultNavigator.Group>Extra</DefaultNavigator.Group>
                        <DefaultNavigator.Item active={false}>Laboratorio</DefaultNavigator.Item>

                        {[...Array(102)].map(() => <DefaultNavigator.Item active={false}>Otros</DefaultNavigator.Item>)}

                    </DefaultNavigator.Content>

                    <DefaultNavigator.Footer>
                        <div className="flex flex-row items-center justify-between cursor-pointer">
                            <div>
                                <div className="">Soporte</div>
                                <div className="text-xs text-muted">Solicita ayuda aquí</div>
                            </div>
                            <div className="w-6 text-center rounded-full bg-navigator text-navigator-bg">?</div>
                        </div>
                    </DefaultNavigator.Footer>

                    <DefaultNavigator.Footer>
                        <div className="text-xs text-muted">© 2020 Nimbox Technologies LTD</div>
                    </DefaultNavigator.Footer>

                </DefaultNavigator>

            </Navigator>

            <Main>

                <Main.Content className="p-3">

                    <Cards>

                        <h1 className="text-4xl font-bold">Almacenes Esto o lo Otro</h1>

                        <Card>
                            <Card.Header>
                                <div>
                                    <Select options={['One', 'Two', 'Three']} />
                                </div>
                            </Card.Header>
                            <Card.Body>body</Card.Body>
                        </Card>

                        <Card>
                            <Card.Body>
                                <div className="grid grid-rows-3 grid-flow-col gap-4">

                                    <Group className="row-span-3 col-span-1">
                                        <Label>Excusa</Label>
                                        <TextArea value="asd" className="" />
                                    </Group>

                                    <Group className="row-span-1 col-span-2">
                                        <Label>Promesa</Label>
                                        <Input value="as" />
                                    </Group>

                                    <div className="row-span-1 col-span-2">
                                        <DatePicker value={[1967, 11, 19]} />
                                    </div>
                                    <div className="row-span-1 col-span-2">d</div>
                                </div>
                            </Card.Body>
                            <Card.Footer>

                            </Card.Footer>
                        </Card>

                        <Card>
                            <Card.Header>header</Card.Header>
                            <Card.Body>body</Card.Body>
                        </Card>

                    </Cards>


                    {[...Array(100)].map(() => <div>main</div>)}

                </Main.Content >

                <Main.Side className="">
                    {[...Array(102)].map(() => <DefaultNavigator.Item active={false}>Side</DefaultNavigator.Item>)}
                </Main.Side>

            </Main>

        </Helium >
    );

};
