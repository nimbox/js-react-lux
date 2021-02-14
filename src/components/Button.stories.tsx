import React from 'react';
import { Button, ButtonProps } from './Buttons';


// definition

const definition = {
    title: 'Component/Button',
    component: Button,
    argTypes: {
        link: { control: { type: 'boolean' } },
        secondary: { control: { type: 'boolean' } },
        size: { control: { type: "select", options: ["sm", "base", "lg"] } },
        children: { control: { type: 'text' } }
    }
};
export default definition;

type BaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

//  buttons

export const Base = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
Base.args = { link: false, secondary: false, size: 'base', children: 'Primary' };

export const Primary = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
Primary.args = { link: false, secondary: false, size: 'base', children: 'Primary' };

export const PrimarySmall = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
PrimarySmall.args = { link: false, secondary: false, size: 'sm', children: 'Primary' };

export const PrimaryLarge = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
PrimaryLarge.args = { link: false, secondary: false, size: 'lg', children: 'Primary' };

export const Secondary = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
Secondary.args = { link: false, secondary: true, size: 'base', children: 'Secondary' };

export const SecondarySmall = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
SecondarySmall.args = { link: false, secondary: true, size: 'sm', children: 'Secondary' };

export const SecondaryLarge = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
SecondaryLarge.args = { link: false, secondary: true, size: 'lg', children: 'Secondary' };

export const PrimaryLink = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
PrimaryLink.args = { link: true, secondary: false, size: 'base', children: 'Primary' };

export const PrimaryLinkSmall = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
PrimaryLinkSmall.args = { link: true, secondary: false, size: 'sm', children: 'Primary' };

export const PrimaryLinkLarge = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
PrimaryLinkLarge.args = { link: true, secondary: false, size: 'lg', children: 'Primary' };

export const SecondaryLink = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
SecondaryLink.args = { link: true, secondary: true, size: 'base', children: 'Primary' };

export const SecondaryLinkSmall = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
SecondaryLinkSmall.args = { link: true, secondary: true, size: 'sm', children: 'Primary' };

export const SecondaryLinkLarge = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
SecondaryLinkLarge.args = { link: true, secondary: true, size: 'lg', children: 'Primary' };

// alignment

export const PrimaryAlignment = () =>
    <div className="space-x-4">
        <span>Before</span>
        <Button size="sm">Primary</Button>
        <Button>Primary</Button>
        <Button size="lg">Primary</Button>
        <span>After</span>
    </div >;

export const SecondaryAlignment = () =>
    <div className="space-x-4">
        <span>Before</span>
        <Button secondary size="sm">Secondary</Button>
        <Button secondary>Secondary</Button>
        <Button secondary size="lg">Secondary</Button>
        <span>After</span>
    </div >;

export const LinkPrimaryAlignment = () =>
    <div className="space-x-4">
        <span>Before</span>
        <Button link size="sm">Primary</Button>
        <Button link >Primary</Button>
        <Button link size="lg">Primary</Button>
        <span>After</span>
    </div>;


export const LinkSecondaryAlignment = () =>
    <div className="space-x-4">
        <span>Before</span>
        <Button link secondary size="sm">Secondary</Button>
        <Button link secondary >Secondary</Button>
        <Button link secondary size="lg">Secondary</Button>
        <span>After</span>
    </div>;






