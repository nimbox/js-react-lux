import React, { FC, SVGProps } from 'react';
export declare const Cross: FC<SVGProps<SVGSVGElement> & {
    showCross: boolean;
    crossColor: string;
    circleColor: string;
}>;
export interface TagProps {
    color?: string;
    onClick?: (e: any) => void;
    onDelete?: (e: React.UIEvent<HTMLElement>) => void;
}
export declare const Tag: FC<TagProps>;
