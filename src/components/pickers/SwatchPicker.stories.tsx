import { Input } from '../controls/Input';
import { SwatchPicker, SwatchPickerProps } from './SwatchPicker';


const definition = {
    title: 'Component/Picker/SwatchPicker',
    name: 'asd',
    component: SwatchPicker,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        error: { control: { type: 'boolean' } }
    }
};
export default definition;

export const Parameterized = ({ scale, swatches, error, popperClassName }: SwatchPickerProps) => {
    return (
        <div className="flex flex-row justify-center">
            <div className="grid grid-cols-3 gap-4 w-2/3">
                <Input type="text" defaultValue="before" />
                <SwatchPicker scale={scale} swatches={swatches} defaultValue="#906090" error={error} popperClassName={popperClassName} />
                <Input type="text" defaultValue="after" />
            </div>
        </div>
    );
};
Parameterized.args = {
    scale: 'base',
    swatches: [
        '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
        '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
        '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6',
        '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'
    ],
    error: false,
    popperClassName: 'grid grid-cols-5'
};
