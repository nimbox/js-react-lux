import React from 'react';
import { Loading, LoadingProps } from './Loading';


// definition

const definition = {
    title: 'Component/Loading',
    component: Loading,
    argTypes: {
        size: { control: { type: 'select', options: ['sm', 'base', 'lg'] } },
    }
};
export default definition;

// parameterized

export const Parameterized = (props: LoadingProps) => <Loading {...props} />;
Parameterized.args = { size: 'base', className: 'text-secondary-500' };

// stories

export const Base = (props: LoadingProps) => <Loading {...props} />;
Base.args = { size: 'base' };

export const Small = (props: LoadingProps) => <Loading {...props} />;
Small.args = { size: 'sm' };

export const Large = (props: LoadingProps) => <Loading {...props} />;
Large.args = { size: 'lg' };
