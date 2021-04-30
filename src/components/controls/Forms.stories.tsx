import { Button } from '../Buttons';
import { CheckBox } from './CheckBox';
import { Control, ControlProps } from './Control';
import { Input } from './Input';
import { IconInput, Search } from './IconInput';
import { Radio } from './Radio';
import { Select } from './Select';
import { TextArea } from './TextArea';


// definition

const definition = {
    title: 'Component/Controls/Form',
    component: Input,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        error: { control: { type: 'boolean' } }
    }
};
export default definition;

//  parameterized

export const Parameterized = ({ scale, error, ...props }: ControlProps & { options: string[] }) => {

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
                    <Control scale={scale} error={error}>
                        <Control.Label badge="1/60">Apellido</Control.Label>
                        <Input type="text" scale={scale} />
                    </Control>
                </div>
                <div className="col-span-2" >
                    <Control scale={scale} error={error}>
                        <Control.Label >Email</Control.Label>
                        <Input type="email" scale={scale} />
                        <Control.Message>Por favor introduce tu asd ja sdlkjas dlkjas dlkjasdl  klasd lkjas dlkjasdlkj asdlkj asldkj alskdj laskdj laksjd laksdj lakjsd</Control.Message>
                        {error && <Control.Error>Introduce un correo válido</Control.Error>}
                    </Control>
                </div>
                <div className="col-span-2">
                    <Control scale={scale} error={error}>
                        <Control.Label >Dirección</Control.Label>
                        <TextArea scale={scale} />
                    </Control>
                </div>
                <div className="">
                    <Control scale={scale}>
                        <Control.Label >País</Control.Label>
                        <Select>
                            <Select.Option value="DO">República Dominicana</Select.Option>
                            <Select.Option value="VE">Venezuela</Select.Option>
                        </Select>
                    </Control>
                </div>
                <div className="col-span-2">
                    <Control scale={scale}>
                        <CheckBox scale={scale}>Acepto los términos</CheckBox>
                    </Control>
                </div>
                <div className="col-span-2">
                    <Control scale={scale}>
                        <Radio scale={scale}>Quiero recibir promociones y novedades</Radio>
                    </Control>
                </div>
                <div className="inline">
                    <Button scale={scale} className="mr-4" >Enviar</Button>
                    <Button secondary scale={scale} >Cancelar</Button>
                </div>
            </div>
        </div>
    );
};
Parameterized.args = { scale: 'base', error: false };