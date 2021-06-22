import { FC, SVGProps } from 'react';
export declare const Cross: FC<SVGProps<SVGSVGElement> & {
    showCross: boolean;
    crossColor: string;
    circleColor: string;
}>;
export interface TagProps {
    color?: string;
    background?: string;
    onClick?: (e: any) => void;
    onDelete?: () => void;
}
export declare const Tag: FC<TagProps>;
