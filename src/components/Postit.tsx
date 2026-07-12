import classNames from 'classnames';
import React from 'react';


interface PostitProps {
    className?: string;
    children?: React.ReactNode
}

export function Postit({ className, children }: PostitProps) {

    return (
        <div className="postit-container">
            <div className={classNames('postit', className)}>
                {children}
            </div >
        </div>
    );

};
