import { Button } from './Buttons';
import { Control, ControlProps } from './Control';
import { Input } from './Input';


// definition

const definition = {
    title: 'Component/Form',
    component: Input,
    argTypes: {
        size: { control: { type: 'select', options: ['sm', 'base', 'lg'] } }
    }
};
export default definition;

//  parameterized

export const Parameterized = ({ size, ...props }: ControlProps & { options: string[] }) => {

    return (
        <div className="mt-8 max-w-full">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Control size={size}>
                        <Control.Label badge="1/60">Nombre</Control.Label>
                        <Input type="text" size={size} />
                    </Control>
                </div>
                <div>
                    <Control size={size}>
                        <Control.Label badge="1/60">Apellido</Control.Label>
                        <Input type="text" size={size} />
                    </Control>
                </div>
                <div className="col-span-2">
                    <Control size={size} >
                        <Control.Label >Email</Control.Label>
                        <Input type="email" size={size} />
                        <Control.Message>Por favor introduce tu asd ja sdlkjas dlkjas dlkjasdl  klasd lkjas dlkjasdlkj asdlkj asldkj alskdj laskdj laksjd laksdj lakjsd</Control.Message>
                    </Control>
                </div>
                <div className="inline">
                    <Button size={size} className="mr-4" >Enviar</Button>
                    <Button secondary size={size} >Cancelar</Button>
                </div>
            </div>
        </div>
    );
};
Parameterized.args = { size: 'base' };