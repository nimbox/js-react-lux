import { SwatchPicker, SwatchPickerProps } from "./SwatchPicker";

const definition = {
    title: 'Component/Picker/SwatchPicker',
    component: SwatchPicker,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        error: { control: { type: 'boolean' } }
    }
};
export default definition;

export const Parameterized = ({ swatches, popperClassName }: SwatchPickerProps) => {

    return <SwatchPicker defaultValue="#906090" swatches={swatches} popperClassName={popperClassName} />;

};
Parameterized.args = {
    swatches: [
        '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
        '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
        '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6',
        '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'
    ],
    popperClassName: 'grid grid-cols-5'
};


