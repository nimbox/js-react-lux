import { default as classnames, default as classNames } from 'classnames';
import React, { FC, useContext } from 'react';
import SearchIcon from '../../icons/SearchIcon';
import { ComponentScale, controlIconSize } from '../ComponentScale';
import { Context } from './Control';
import { Input, InputProps } from './Input';


export interface IconInputProps extends React.ComponentPropsWithoutRef<'input'> {
    icon: React.ComponentType<any>;
    scale?: ComponentScale;
    error?: boolean;
    className?: string;
}

export const IconInput: FC<IconInputProps> = (({ icon, scale, error, className, ...props }) => {

    const context = useContext(Context);
    const Icon = icon;
    return (
        <div className={classNames(
            'flex flex-grow flex-row w-full justify-center items-center',
            'rounded border border-control-border',
            error || context.error ?
                'border-danger-500 focus-within:border-danger-500 focus-within:ring focus-within:ring-danger-500' :
                'focus-within:border-primary-500 focus-within:ring focus-within:ring-primary-500',
            'focus-within:ring-opacity-50 focus:outline-none disabled:opacity-50',
            className)}>
            <Icon className={classnames(
                controlIconSize[scale || context.scale || 'base'], 'stroke-current stroke-1')} />
            <Input {...props} scale={scale} className="flex-grow border-none" style={{boxShadow: '0 0 #0000'}} />
        </div>
    );

});

export interface SearchProps {
    scale?: ComponentScale;
    error?: boolean;
    className?: string;
}

export const Search: FC<SearchProps & InputProps> = ({ scale, error, className, ...props }) => (
    <IconInput icon={SearchIcon} scale={scale} error={error} className={className} {...props} />
);
