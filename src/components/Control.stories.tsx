import { Control, ControlProps } from './Control';
import { Input } from './Input';


// definition

const definition = {
    title: 'Component/Control',
    component: Control,
    argTypes: {
        size: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } }
    }
};
export default definition;

//  parameterized

export const Parameterized = ({ size = 'base', ...props }: ControlProps & { options: string[] }) => {

    return (
        <div className="mt-8 max-w-full">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <Control size={size}>
                        <Control.Label badge="1/60">Label</Control.Label>
                        <Input inputSize={size} />
                        <Control.Message>Mensaje text</Control.Message>
                    </Control>
                </div>
                <div>
                    <Control size={size} error={true} >
                        <Control.Label badge="1/60">Label</Control.Label>
                        <Input inputSize={size} error={true} />
                        <Control.Message>Mensaje text</Control.Message>
                        <Control.Error>Error text</Control.Error>
                    </Control>
                </div>
            </div>
        </div>
    );
};
Parameterized.args = { size: 'base' };