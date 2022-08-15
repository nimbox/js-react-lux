import { FC, useEffect, useState } from 'react';


//
// Delay
//

export const Delay: FC<{ delay?: number, children?: React.ReactNode; }> = ({ delay = 250, children }) => {

    const [show, setShow] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setShow(true), delay);
        return () => clearTimeout(timeout);
    }, [delay, setShow]);

    return show ? <>{children}</> : null;

}
