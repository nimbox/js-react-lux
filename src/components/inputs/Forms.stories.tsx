/* eslint-disable import/no-anonymous-default-export */
import { Button } from '../Button';
import { CheckBox } from './CheckBox';
import { Control, ControlProps } from './Control';
import { Input } from './Input';
import { Radio } from './Radio';
import { Select } from './Select';
import { TextArea } from './TextArea';


// definition

export default {
    title: 'Component/Controls/Form',
    component: Input,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        error: { control: { type: 'boolean' } }
    }
};

//  parameterized

export const Parameterized = ({ error, ...props }: ControlProps & { options: string[] }) => {

    return (
        <div className="mt-8 max-w-full">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Control error={error} >
                        <Control.Label badge="1/60">Nombre</Control.Label>
                        <Input type="text" />
                    </Control>
                </div>
                <div>
                    <Control error={error}>
                        <Control.Label badge="1/60">Apellido</Control.Label>
                        <Input type="text" />
                    </Control>
                </div>
                <div className="col-span-2" >
                    <Control error={error}>
                        <Control.Label >Email</Control.Label>
                        <Input type="email" />
                        <Control.Message>Por favor introduce tu asd ja sdlkjas dlkjas dlkjasdl  klasd lkjas dlkjasdlkj asdlkj asldkj alskdj laskdj laksjd laksdj lakjsd</Control.Message>
                        {error && <Control.Error>Introduce un correo válido</Control.Error>}
                    </Control>
                </div>
                <div className="col-span-2">
                    <Control error={error}>
                        <Control.Label >Dirección</Control.Label>
                        <TextArea />
                    </Control>
                </div>
                <div className="">
                    <Control >
                        <Control.Label >País</Control.Label>
                        <Select>
                            <Select.Option value="DO">República Dominicana</Select.Option>
                            <Select.Option value="VE">Venezuela</Select.Option>
                        </Select>
                    </Control>
                </div>
                <div className="col-span-2">
                    <Control >
                        <CheckBox/>Acepto los términos
                    </Control>
                </div>
                <div className="col-span-2">
                    <Control >
                        <Radio/>Quiero recibir promociones y novedades
                    </Control>
                </div>
                <div className="inline">
                    <Button className="mr-4" >Enviar</Button>
                    <Button semantic="secondary"  >Cancelar</Button>
                </div>
            </div>
        </div>
    );
};
Parameterized.args = { scale: 'base', error: false };