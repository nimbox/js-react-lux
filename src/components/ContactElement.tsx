import classnames from "classnames";
import React, { FC } from "react";
import { MessageIcon } from "../icons";
import PhoneIcon from "../icons/PhoneIcon";
import { Button } from "./Buttons";
import { ComponentScale, controlSmallText } from "./ComponentScale";


export interface ContactElementProps {
    type: string;
    locus?: string;
    render: string;
    scale?: ComponentScale;
    className?: string;
}

export const ContactElement: FC<ContactElementProps> = ({ type, locus, render, scale, className, ...props }) => {

    let Icon = MessageIcon;
    switch (type) {
        case 'message': Icon = MessageIcon;
            break;
        case 'phone': Icon = PhoneIcon;
            break;
        case 'address': Icon = MessageIcon;
            break;
    }

    return (
        <span {...props} className={classnames(
            'flex flex-row max-w-full items-baseline py-0 truncate',
            className)} >
            <span className={classnames(
                'self-center flex flex-row items-center justify-center')}>
                <Icon className={classnames(
                    { 'h-3 w-3': scale === 'xs', 'h-4 w-4': scale === 'sm' || scale === 'base', 'h-5 w-5': scale === 'lg' },
                    'stroke-current stroke-1')} />
            </span>
            <Button link scale={scale} className='truncate'>
                {render}
            </Button>
            <span className={classnames(
                'flex flex-row rounded-full bg-primary-600 text-white px-1 py-0',
                controlSmallText[scale || 'xs'])}>
                {locus}
            </span>
        </span>
    )
};
