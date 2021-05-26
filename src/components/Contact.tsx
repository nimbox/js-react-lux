import classnames from "classnames";
import React from "react";
import { NimboxIcon } from "../icons";
import { Button } from "./Buttons";
import { ComponentScale, controlSmallText } from "./ComponentScale";
import { ContactElement } from './ContactElement';



export interface ContactProps {
    render: string;
    scale?: ComponentScale;
    className?: string;
}


export const Contact = React.forwardRef<HTMLInputElement, ContactProps>(({ render, scale, className, children, ...props }, ref) => {

    return (
        <div ref={ref} {...props} className={className}>
            <span  className={classnames(
                'flex flex-row max-w-full items-baseline py-0 truncate')} >
                <span className={
                    'self-center flex flex-row items-center justify-center'}>
                    <NimboxIcon className={classnames(
                        { 'h-3 w-3': scale === 'xs', 'h-4 w-4': scale === 'sm' || scale === 'base', 'h-5 w-5': scale === 'lg' },
                        'stroke-current stroke-1')} />
                </span>
                <Button link scale={scale} className='truncate'>
                    {render}
                </Button>
            </span>
            <div className="ml-6">
                {children}
            </div>
        </div>
    )
});
Contact.displayName = 'Contact';
