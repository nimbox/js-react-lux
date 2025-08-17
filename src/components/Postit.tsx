import classnames from 'classnames';
import React, { type FC } from 'react';


interface PostitProps {
    className?: string;
    children?: React.ReactNode
}

export const Postit: FC<PostitProps> = ({ className, children }) => {

    return (
        <div className="postit-container">
            <div className={classnames('postit', className)}>
                {children}
            </div >
        </div>
    );

};
