import { MessageIcon, PhoneIcon } from '@nimbox/icons-react';
import { type FC } from 'react';
import { Anchor } from './Anchor';
import { cn } from './utilities/cn';


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
        <span {...props} className={cn('inline-flex items-center max-w-full gap-1', className)} >
            <Icon className="flex-none"/>
            <Anchor variant="link" className="flex-1 truncate">
                {render}
            </Anchor>
            <span className="flex-none rounded-full text-xs bg-primary-600 text-white px-1 py-0">
                {locus}
            </span>
        </span>
    );

};
