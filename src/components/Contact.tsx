import classnames from "classnames";
import { FC } from "react";
import { NimboxIcon } from "../icons/components";
import { Button } from "./Buttons";


export interface ContactProps {
    render: string;
    className?: string;
}

export const Contact: FC<ContactProps> = ({ render, className, children, ...props }) => {

    return (
        <div {...props} className={className}>
            <span className={classnames(
                'flex flex-row max-w-full items-baseline py-0 truncate')} >
                <span className={
                    'self-center flex flex-row items-center justify-center'}>
                    <NimboxIcon className={classnames('stroke-current stroke-1')} />
                </span>
                <Button variant="link" className='truncate'>
                    {render}
                </Button>
            </span>
            <div className="ml-6">
                {children}
            </div>
        </div>
    )
};
