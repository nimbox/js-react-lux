import { createSearchMatcher } from '../utilities/createSearchMatcher';

export interface Option {
    value: string;
    name: string;
}

export interface Group {
    name: string;
    options: Option[];
}

export const colors: Group[] = [
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

export const extractor = (group: Group): Option[] => group.options;
export const identifier = (color: Option) => color.value;

export const chooser = async (value?: string | ReadonlyArray<string> | number | undefined) => {
    // await new Promise(resolve => setTimeout(() => resolve(undefined), 2000));
    const option = colors.map(group => extractor(group).find(o => identifier(o) === value)).find(o => o != null);
    return option;
};

export const supplier = async (query?: string) => {
    // await new Promise(resolve => setTimeout(() => resolve(undefined), 2000));
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
