import { ContactElement, ContactElementProps } from './ContactElement';
import { Sortable } from './Sortable';


// definition

const definition = {
    title: 'Component/ContactElement',
    component: ContactElement,
    parameters: { actions: { argTypesRegex: '^on.*' } },
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        isDraggable: { control: { type: 'boolean' } }
    }
};
export default definition;

export const ContactElements = ({ scale, ...props }: ContactElementProps) => {

    const contactElements = [
        { value: 1, text: 'kalzuro@nimbox.com', locus: 'work', type: 'email' },
        { value: 2, text: 'rmarimom@nimbox.com', locus: 'work', type: 'email' },
        { value: 3, text: 'jmeza@nimbox.com', locus: 'skype', type: 'email' },
        { value: 4, text: 'phernandez@nimbox.com', locus: 'work', type: 'email' },
        { value: 5, text: '04129335187', locus: 'mobile', type: 'phone' },
        { value: 6, text: '02123456872', locus: 'work', type: 'phone' }
    ]

    const onChange = (source: number, target: number) => {
        console.log("contactElement", source, target);
    }

    return (
        <div className="p-2">
            <Sortable onChange={onChange} scale={scale}>
                {contactElements
                    .map(item => (
                        <ContactElement
                            type={item.type}
                            render={item.text}
                            locus={item.locus}
                            scale={scale}
                        />
                    ))}
            </Sortable>
        </div>

    )
};
ContactElements.args = { scale: 'base' };
