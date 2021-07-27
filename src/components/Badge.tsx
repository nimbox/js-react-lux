import { FC } from 'react';


export interface BadgeProps {
    color: string;
    backgroundColor?: string;
}

export const Badge: FC<BadgeProps> = ({ color, backgroundColor, children }) => {
    return (
        <span className="px-2 rounded" style={{ color, backgroundColor }}>{children}</span>
    );
};