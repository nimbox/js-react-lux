import { default as classnames, default as classNames } from 'classnames';
import React, { useContext } from 'react';
import SearchIcon from '../../icons/SearchIcon';
import { ComponentScale, controlIconMarginSize, controlIconSize } from '../ComponentScale';
import { Context } from './Control';
import { Input } from './Input';


export interface IconInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    left?: React.ComponentType<any>;
    right?: React.ComponentType<any>;
    scale?: ComponentScale;
    error?: boolean;
    className?: string;
}

export const IconInput = React.forwardRef(
    ({ left, right, scale, error, className, ...props }, ref) => {

        const context = useContext(Context);
        const Left = left ? left : undefined;
        const Right = right ? right : undefined;

        return (
            <div className={classNames('relative',
                className)}>
                <Input ref={ref} scale={scale} className={classnames({ 'pl-9': left, 'pr-9': right })}  {...props} />
                {Left &&
                    <Left className={classnames(
                        'absolute top-1/2 left-0',
                        controlIconMarginSize[scale || context.scale || 'base'],
                        'stroke-current stroke-1')} />}
                {Right &&
                    <Right className={classnames(
                        'absolute top-1/2 right-0',
                        controlIconMarginSize[scale || context.scale || 'base'],
                        'stroke-current stroke-1')} />}
            </div>
        );

    }
) as React.ForwardRefExoticComponent<React.PropsWithoutRef<IconInputProps> & React.RefAttributes<HTMLInputElement>>;

export interface SearchProps {
    scale?: ComponentScale;
    error?: boolean;
    className?: string;
}

export const Search = React.forwardRef(({ scale, error, className, ...props }, ref) => (
    <IconInput ref={ref} right={SearchIcon} scale={scale} error={error} className={className} {...props} />
)
) as React.ForwardRefExoticComponent<React.PropsWithoutRef<IconInputProps> & React.RefAttributes<HTMLInputElement>>;;
