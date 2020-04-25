import { FC, useEffect, useState } from 'react';


//
// Delay
//

export const Delay: FC<{ delay?: number }> = ({ delay = 250, children }) => {
    const [show, setShow] = useState(false);
    useEffect(() => { setTimeout(() => setShow(true), delay); }, [delay, setShow]);
    return show ? children as React.ReactElement : null;
}
