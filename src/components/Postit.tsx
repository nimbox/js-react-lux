import classnames from 'classnames';
import React, { FC } from 'react';


//
// Postit
// 

interface Props {

    /** the css classes */
    className?: string

}

export const Postit: FC<Props> = ({ className, children }) => {

    return (
        <div className="postit-container">
            <div className={classnames('postit', className)}>
                {children}
            </div >
        </div>
    );

};
