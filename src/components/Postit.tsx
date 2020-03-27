import classnames from 'classnames';
import React, { FC } from 'react';


//
// Postit
// 

export const Postit: FC<{ className?: string }> = ({ className, children }) => {

    return (
        <div className="postit-container">
            <div className={classnames('postit', className)}>
                {children}
            </div >
        </div>
    );

};
