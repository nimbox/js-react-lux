import classnames from 'classnames';
import React from 'react';


interface PostitProps {
    className?: string;
    children?: React.ReactNode
}

export function Postit({ className, children }: PostitProps) {

    return (
        <div className="postit-container">
            <div className={classnames('postit', className)}>
                {children}
            </div >
        </div>
    );

};
