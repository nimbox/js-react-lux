import React from 'react';
import { Brand } from '../components/Brand';
import { Card, Cards } from '../components/Card';
import { Dropdown } from '../components/Dropdown';
import { Content, Helium, Navigator } from '../layouts/Helium';
import '../styles/styles.css';


export default { title: 'Layout/Helium' };

export const withSide = () => (
    <Helium>

        <Navigator>

            <Navigator.Header>
                <div><Brand /></div>
            </Navigator.Header>

            <Navigator.Body>

                <div className="text-xs text-muted px-3 py-2">MENU</div>
                <div className="text-navigator bg-primary cursor-pointer px-3 pl-6 py-2">Clientes</div>
                <div className="cursor-pointer px-3 pl-6 py-2">Vendedores</div>
                <div className="cursor-pointer px-3 pl-6 py-2">Documentos</div>
                <div className="cursor-pointer px-3 pl-6 py-2">Cobros</div>
                <div className="cursor-pointer px-3 pl-6 py-2">Notas</div>
                <div className="cursor-pointer px-3 pl-6 py-2">Tareas</div>
                <div className="cursor-pointer px-3 pl-6 py-2">Etiquetas</div>

                <div className="text-xs text-muted px-3 py-2">EXTRA</div>
                <div className="cursor-pointer px-3 pl-6 py-2">Laboratorio</div>

            </Navigator.Body>

            <Navigator.Footer>
                <div className="w-full flex flex-row justify-between items-center cursor-pointer">
                    <div>
                        <div className="">Soporte</div>
                        <div className="text-xs text-muted">Solicita ayuda aquí</div>
                    </div>
                    <div className="w-6 text-center rounded-full bg-navigator text-navigator-bg">?</div>
                </div>
            </Navigator.Footer>

            <Navigator.Copyright>
                <div className="text-xs text-muted">© 2020 Nimbox Technologies LTD</div>
            </Navigator.Copyright>

        </Navigator>

        <Content>
            <Content.Header>
                Header
            </Content.Header>
            <Content.Body>
                <Content.Main>
                    <Cards>
                        <Card>
                            <Card.Header>
                                <div>
                                    <Dropdown options={['One', 'Two', 'Three']} />
                                </div>
                            </Card.Header>
                            <Card.Body>body</Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>header</Card.Header>
                            <Card.Body>body</Card.Body>
                        </Card>

                        <div>
                            <p>Ho</p>
                            <p>Ho</p>
                            <p>Ho</p>
                            <p>Ho</p>
                            <p>Ho</p>
                            <p>Ho</p>
                            <p>Ho</p>
                            <p>Ho</p>
                            <p>Ho</p>
                            <p>Ho</p>
                            <p>Ho</p>
                            <p>Ho</p>
                            <p>Ho</p>
                            <p>Ho</p>
                            <p>Ho</p>
                        </div>

                    </Cards>
                </Content.Main>
                <Content.Side>
                    side
                    </Content.Side>
            </Content.Body>
        </Content>

    </Helium >
);