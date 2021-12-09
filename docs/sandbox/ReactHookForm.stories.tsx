/* eslint-disable import/no-anonymous-default-export */
import React, { useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Choose } from '../components/choose/Choose';
import { createSearchMatcher } from '../utilities/createSearchMatcher';


export default {
    title: 'Sandbox/HookForm',
    parameters: { layout: 'centered' }
};


interface Option {
    value: string;
    name: string;
}

interface Group {
    name: string;
    options: Option[];
}

const colors: Group[] = [
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

const extractor = (group: Group): Option[] => group.options;
const identifier = (color: Option) => color.value;

const chooser = (value?: string | ReadonlyArray<string> | number | undefined) => {
    // await new Promise(resolve => setTimeout(() => resolve(undefined), 100));
    if (value === 'ffff00aa') {
        return {
            value: 'ffff00aa',
            name: 'Yellow Light'
        };
    }
    const option = colors.map(group => extractor(group).find(o => identifier(o) === value)).find(o => o != null);
    return option;
};

const provider = (query?: string) => {
    // await new Promise(resolve => setTimeout(() => resolve(undefined), 100));
    if (query == null || query.trim() === '') {
        return colors;
    } else {
        const matcher = createSearchMatcher(query.trim());
        return [
            { ...colors[0], options: colors[0].options.filter(o => matcher(o.name)) },
            { ...colors[1], options: colors[1].options.filter(o => matcher(o.name)) }
        ];
    }
};


const FormInput = React.forwardRef<HTMLInputElement>((props, ref) => {

    const internalRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => {

        const handler: ProxyHandler<HTMLInputElement> = {
            get(target, property) {
                return (target as any)[property];
            },
            set(target, property, v) {
                console.log('PROXY', property, 'to', v);
                if (property === 'value') {
                    (target as any)[property] = v;
                } else {
                    (target as any)[property] = v;
                }
                return true;
            }
        };

        if (internalRef.current != null) {
            return new Proxy(internalRef.current, handler);
        }

        return internalRef.current!;

        // return new Proxy({} as any, handler);

    });

    return (<input ref={ref} {...props} />);

});

export const FormDefaultValue = () => {

    const { register, setValue, handleSubmit } = useForm<{ color: string, shade: string }>({
        defaultValues: { color: '800080', shade: 'white' }
    });
    const onSubmit = (data: any) => console.log(data);

    // const props = register('shade');
    // console.log('register', props)

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput {...register('color')} />
                <input type="submit" />
                <button type="button" onClick={() => setValue('color', 'ffff00')}>set</button>
            </form>
        </div>
    );

};

const ColorPicker = React.forwardRef<HTMLInputElement>((props, ref) => {

    return (
        <Choose<Option, Group>

            ref={ref}

            withSearch={true}

            chooser={chooser}
            supplier={provider}
            extractor={extractor}
            identifier={identifier}

            renderEmpty={() => 'No options'}
            renderGroupLabel={({ group }) => <span>{group.name}</span>}
            renderOption={({ option }) => <span className="lux-px-2em italic">{option.name}</span>}
            renderChosen={({ option }) => <span>{option.name}</span>}

            {...props}

        />

    );

});


export const FormChoose = () => {

    const { register, setValue, handleSubmit } = useForm<{ color: string }>({
        defaultValues: { color: '800080' }
    });
    const onSubmit = (data: any) => console.log(data);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="w-96">
                    <ColorPicker {...register('color')} />
                </div>

                <input type="submit" />
                <button type="button" onClick={() => setValue('color', 'ffff00aa')}>set</button>

            </form>
        </div>
    );

};
