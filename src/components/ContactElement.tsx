import classnames from "classnames";
import React, { FC } from "react";
import { MessageIcon, PhoneIcon } from "../icons/components";
import { Button } from "./Buttons";


export interface ContactElementProps {
    type: string;
    locus?: string;
    render: string;
    className?: string;
}

export const ContactElement: FC<ContactElementProps> = ({ type, locus, render, className, ...props }) => {

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
                <Icon className={classnames('stroke-current stroke-1')} />
            </span>
            <Button variant="link" className='truncate'>
                {render}
            </Button>
            <span className={classnames(
                'flex flex-row rounded-full bg-primary-600 text-white px-1 py-0',
            )}>
                {locus}
            </span>
        </span>
    )
};
