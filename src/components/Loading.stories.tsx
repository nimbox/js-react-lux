import React from 'react';
import { Loading, LoadingProps } from './Loading';


// definition

const definition = {
    title: 'Component/Loading',
    component: Loading,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
    }
};
export default definition;

// parameterized

export const Parameterized = (props: LoadingProps) => <Loading {...props} />;
Parameterized.args = { scale: 'base', colorClassName: 'text-secondary-500' };

// stories

export const Base = (props: LoadingProps) => <Loading {...props} />;
Base.args = { scale: 'base' };

export const Small = (props: LoadingProps) => <Loading {...props} />;
Small.args = { scale: 'sm' };

export const Large = (props: LoadingProps) => <Loading {...props} />;
Large.args = { scale: 'lg' };
