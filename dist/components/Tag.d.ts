<<<<<<< HEAD
import { FC, SVGProps } from 'react';
=======
import React, { FC, SVGProps } from 'react';
>>>>>>> c58fda098b3f0fe26e5347f12164aa03f5414809
export declare const Cross: FC<SVGProps<SVGSVGElement> & {
    showCross: boolean;
    crossColor: string;
    circleColor: string;
}>;
export interface TagProps {
    color?: string;
<<<<<<< HEAD
    background?: string;
    onClick?: (e: any) => void;
    onDelete?: () => void;
=======
    onClick?: (e: any) => void;
    onDelete?: (e: React.UIEvent<HTMLElement>) => void;
>>>>>>> c58fda098b3f0fe26e5347f12164aa03f5414809
}
export declare const Tag: FC<TagProps>;
