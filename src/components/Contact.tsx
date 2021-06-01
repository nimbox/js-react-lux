import classnames from "classnames";
import { FC } from "react";
import { NimboxIcon } from "../icons";
import { Button } from "./Buttons";
import { ComponentScale } from "./ComponentScale";


export interface ContactProps {
    render: string;
    scale?: ComponentScale;
    className?: string;
}

export const Contact: FC<ContactProps> = ({ render, scale, className, children, ...props }) => {

    return (
        <div {...props} className={className}>
            <span className={classnames(
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
};
