import classnames from 'classnames';
import React, { FC } from 'react';


interface Props {
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
