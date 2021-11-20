import { useCallback } from 'react';
import { Choose } from './Choose';



export default {
    title: 'Component/Choose/Choose',
    component: Choose,
    parameters: {
        layout: 'centered'
    }
};

const colors = [
    {
        name: 'Primary', options: [
            { value: 'ffff00', name: 'Yellow' },
            { value: '0000ff', name: 'Blue' },
            { value: 'ff0000', name: 'Red' }
        ]
    },
    {
        name: 'Secondary', options: [
            { value: '00ff00', name: 'Green' },
            { value: '800080', name: 'Purple' },
            { value: 'ffa500', name: 'Orange' }
        ]
    }
];

export const Default = () => {

    const handleChoose = (option: any) => console.log('choose', option);

    const extractor = useCallback((group) => group.options, []);
    // const searchable = useSearchOptions(provider);
    // const navigator = useOptionsKeyNavigator(searchable.options, { extractor, onChoose: handleChoose });

    return (
        <div className="text-base">

            <Choose

                provider={colors}

                extractor={extractor}
                identifier={color => color.value}
                onChoose={handleChoose}

                renderEmpty={() => 'No options'}
                renderGroupLabel={({ group }) => <span>{group.name}</span>}
                renderOption={({ option }) => <span className="lux-px-2em italic">{option.name}</span>} 
                renderChoosen={({ option }) => <span className="lux-px-2em italic">{option.name}</span>} 


            />

        </div>
    );

}