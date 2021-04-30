import { withKnobs } from '@storybook/addon-knobs';
import { useState } from 'react';
import { Button } from '../components/Buttons';
import { Card } from '../components/Card';
import { Control } from '../components/controls/Control';
import { CheckBox } from '../components/controls/CheckBox';
import { Input } from '../components/controls/Input';
import { Select } from '../components/controls/Select';
import { TextArea } from '../components/controls/TextArea';
import { TagPicker } from '../components/pickers/TagPicker';
import { TimePicker } from '../components/pickers/TimePicker';
import { Tag } from '../components/Tag';
import MessageIcon from '../icons/MessageIcon';


// definition

export default {
    title: 'Canexer/Customer',
    decorators: [
        withKnobs
    ]
};


export const Customer = () => {

    const tags = [
        { id: "id1", name: "Estado Contactado" },
        { id: "id2", name: "conector x desarrollar" },
        { id: "id3", name: "Campaña Lista DGII-Santo Domingo Oeste-2" },
        { id: "id4", name: "Custodio Katryn" },
        { id: "id5", name: "Campaña CCPSD 2 " },
        { id: "id6", name: "Captaciones Nuevas Dahiana" },
        { id: "id7", name: "Campaña CCPSD 7" },
        { id: "id8", name: "Sistema Administrativo Contamax " },
        { id: "id6", name: "Captaciones Nuevas Dahiana" },
        { id: "id7", name: "Campaña CCPSD 7" },
        { id: "id8", name: "Sistema Administrativo Contamax " }
    ];

    const render = (t: any, onRemove?: (value: any) => void | undefined) => (
        <Tag scale="sm" color={t.color} onDelete={onRemove} >{t.name}</Tag>
    )

    const [time, setTime] = useState('08:30am');

    const badge = () => (
        <CheckBox scale="xs"><MessageIcon className="h-4 w-4 -ml-1" /></CheckBox>
    );

    return (
        <div className="mt-8 max-w-full h-16">
            <Card>
                <Card.Header>
                    <div className="text-2xl">MARAT INDUSTRIAL, C. POR A. (marat)</div>
                </Card.Header>
                <Card.Body>
                    <div className="">
                        <TagPicker scale="base" values={tags} render={render}
                            onRemove={(id) => true}
                            onSearch={(q) => []}
                            onAdd={(id) => true}
                            onCreate={(id) => true}>
                        </TagPicker>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="row-span-3 space-y-2">
                            <Control>
                                <Control.Label>Nota</Control.Label>
                                <TextArea />
                            </Control>
                            <Button>Enviar</Button>
                        </div>
                        <div className="grid  grid-rows-3 grid-cols-4 gap-4">
                            <div className="col-span-4">
                                <Control>
                                    <Control.Label>Tarea</Control.Label>
                                    <Input />
                                </Control>
                            </div>
                            <div className="col-span-2">
                                <Control>
                                    <Control.Label>Vence</Control.Label>
                                    <Input />
                                </Control>
                            </div>
                            <div className="col-span-2">
                                <Control>
                                    <Control.Label>Hora</Control.Label>
                                    <TimePicker name="time" value={time} onChange={(d) => setTime(d.target.value)} />
                                </Control>
                            </div>
                            <div className="col-span-2">
                                <Control>
                                    <Control.Label badge={badge}>Responsable</Control.Label>
                                    <Select>
                                        <Select.Option>nimbox</Select.Option>
                                        <Select.Option>Karla Alzuro</Select.Option>
                                        <Select.Option>Ricardo Marimon</Select.Option>
                                        <Select.Option>Jonathan Meza</Select.Option>
                                    </Select>
                                </Control>
                            </div>
                            <div className="col-span-2">
                                <Control>
                                    <Control.Label badge={badge} >Supervisor</Control.Label>
                                    <Select>
                                        <Select.Option>nimbox</Select.Option>
                                        <Select.Option>Karla Alzuro</Select.Option>
                                        <Select.Option>Ricardo Marimon</Select.Option>
                                        <Select.Option>Jonathan Meza</Select.Option>
                                    </Select>
                                </Control>
                            </div>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    );
};