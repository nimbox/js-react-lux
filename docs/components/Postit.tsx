import classnames from 'classnames';
import React, { FC } from 'react';


interface PostitProps {
    className?: string
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
