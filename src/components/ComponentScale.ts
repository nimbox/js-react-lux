export type ComponentScale = 'xs' | 'sm' | 'base' | 'lg';

export const smallScale: { [S in ComponentScale]: ComponentScale } = {
    'xs': 'xs',
    'sm': 'xs',
    'base': 'sm',
    'lg': 'base'
};

export const controlScale: { [S in ComponentScale]: string } = {
    'xs': 'text-xs px-2 py-0.5',
    'sm': 'text-sm px-2.5 py-1',
    'base': 'px-3 py-2',
    'lg': 'text-lg px-4 py-2'
};

export const controlSize: { [S in ComponentScale]: string } = {
    'xs': 'h-4 w-4',
    'sm': 'h-5 w-5',
    'base': 'h-6 w-6',
    'lg': 'h-6 w-6'
};

export const controlSmallSize: { [S in ComponentScale]: string } = {
    'xs': 'h-3 w-3',
    'sm': 'h-4 w-4',
    'base': 'h-4 w-4',
    'lg': 'h-5 w-5'
};

export const controlText: { [S in ComponentScale]: string } = {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': '',
    'lg': 'text-lg'
};

export const controlSmallText: { [S in ComponentScale]: string } = {
    'xs': 'text-1xs',
    'sm': 'text-xs',
    'base': 'text-sm',
    'lg': ''
};

export const controlIconSize: { [S in ComponentScale]: string } = {
    'xs': 'h-5 w-5',
    'sm': 'h-6 w-6',
    'base': 'h-8 w-8',
    'lg': 'h-8 w-8'
};

export const controlIconMarginSize: { [S in ComponentScale]: string } = {
    'xs': 'h-5 w-5 -mt-2.5',
    'sm': 'h-6 w-6 -mt-3',
    'base': 'h-8 w-8 -mt-4',
    'lg': 'h-8 w-8 -mt-4'
}

export const controlIconSmallMarginSize: { [S in ComponentScale]: string } = {
    'xs': 'h-3 w-3 -mt-1.5',
    'sm': 'h-4 w-4 -mt-2',
    'base': 'h-5 w-5 -mt-2.5',
    'lg': 'h-6 w-6 -mt-3'
};

export const controlIconSmallMarginPositiveSize: { [S in ComponentScale]: string } = {
    'xs': 'h-3 w-3 mt-1.5',
    'sm': 'h-4 w-4 mt-2',
    'base': 'h-5 w-5 mt-2.5',
    'lg': 'h-6 w-6 mt-3'
};

export const tagText: { [S in ComponentScale]: string } = {
    'xs': 'text-1xs',
    'sm': 'text-xs',
    'base': 'text-sm',
    'lg': ''
};
