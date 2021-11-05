/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { CheckIcon, CrossIcon } from '../icons';
import { Button, ButtonProps, RoundButton, RoundButtonProps } from './Buttons';


// definition

export default {
    title: 'Component/Button1',
    component: Button,
    argTypes: {
        link: { control: { type: 'boolean' } },
        secondary: { control: { type: 'boolean' } },
        scale: { control: { type: "select", options: ["xs", "sm", "base", "lg"] } },
        children: { control: { type: 'text' } }
    }
};

type BaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

//  buttons

export const Base = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
Base.args = { link: false, secondary: false, scale: 'base', children: 'Primary' };

export const Primary = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
Primary.args = { link: false, secondary: false, scale: 'base', children: 'Primary' };

export const PrimarySmall = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
PrimarySmall.args = { link: false, secondary: false, scale: 'sm', children: 'Primary' };

export const PrimaryLarge = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
PrimaryLarge.args = { link: false, secondary: false, scale: 'lg', children: 'Primary' };

export const Secondary = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
Secondary.args = { link: false, secondary: true, scale: 'base', children: 'Secondary' };

export const SecondarySmall = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
SecondarySmall.args = { link: false, secondary: true, scale: 'sm', children: 'Secondary' };

export const SecondaryLarge = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
SecondaryLarge.args = { link: false, secondary: true, scale: 'lg', children: 'Secondary' };

export const PrimaryLink = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
PrimaryLink.args = { link: true, secondary: false, scale: 'base', children: 'Primary' };

export const PrimaryLinkSmall = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
PrimaryLinkSmall.args = { link: true, secondary: false, scale: 'sm', children: 'Primary' };

export const PrimaryLinkLarge = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
PrimaryLinkLarge.args = { link: true, secondary: false, scale: 'lg', children: 'Primary' };

export const SecondaryLink = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
SecondaryLink.args = { link: true, secondary: true, scale: 'base', children: 'Primary' };

export const SecondaryLinkSmall = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
SecondaryLinkSmall.args = { link: true, secondary: true, scale: 'sm', children: 'Primary' };

export const SecondaryLinkLarge = ({ children, ...props }: BaseProps) => <Button {...props}>{children}</Button>
SecondaryLinkLarge.args = { link: true, secondary: true, scale: 'lg', children: 'Primary' };

export const PrimaryRound= ({ children, ...props}: RoundButtonProps) => <RoundButton {...props}>{children}</RoundButton>
PrimaryRound.args = { scale: 'lg', children: <CheckIcon className="stroke-2"/> }

export const PrimaryRoundDanger = ({ children, ...props}: RoundButtonProps) => <RoundButton {...props}>{children}</RoundButton>
PrimaryRoundDanger.args = { scale: 'base', color: 'danger', children: <CrossIcon className="stroke-2"/> }

// alignment

export const PrimaryAlignment = () =>
    <div className="space-x-4">
        <span>Before</span>
        <Button>Primary</Button>
        <Button>Primary</Button>
        <Button>Primary</Button>
        <span>After</span>
    </div >;

export const SecondaryAlignment = () =>
    <div className="space-x-4">
        <span>Before</span>
        <Button color="secondary">Secondary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="secondary">Secondary</Button>
        <span>After</span>
    </div >;

export const LinkPrimaryAlignment = () =>
    <div className="space-x-4">
        <span>Before</span>
        <Button  variant="link">Primary</Button>
        <Button variant="link">Primary</Button>
        <Button variant="link">Primary</Button>
        <span>After</span>
    </div>;


export const LinkSecondaryAlignment = () =>
    <div className="space-x-4">
        <span>Before</span>
        <Button variant="link" color="secondary">Secondary</Button>
        <Button variant="link" color="secondary">Secondary</Button>
        <Button variant="link" color="secondary">Secondary</Button>
        <span>After</span>
    </div>;






