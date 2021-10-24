import React from 'react';
import { Loading, LoadingProps } from './Loading';


// definition

const definition = {
    title: 'Component/Loading',
    component: Loading,
    argTypes: {
        className: { control: { type: 'select', options: ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-4xl'] } },
    }
};
export default definition;

// parameterized

export const Parameterized = (props: LoadingProps) => <Loading {...props} />;
Parameterized.args = { className: 'text-4xl', colorClassName: 'text-secondary-500' };

// stories

export const Base = (props: LoadingProps) => <Loading {...props} />;
Base.args = { className: 'text-base' };

export const Small = (props: LoadingProps) => <Loading {...props} />;
Small.args = { className: 'text-sm' };

export const ExtraLarge4 = (props: LoadingProps) => <Loading {...props} />;
ExtraLarge4.args = { className: 'text-4xl' };
