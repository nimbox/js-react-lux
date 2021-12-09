/* eslint-disable import/no-anonymous-default-export */
import { useRef, useState } from 'react';
import { Button } from '..';
import { useObservableValueRef } from '../hooks/useObservableValueRef';


export default {
    title: 'Sandbox/References',
    parameters: { layout: 'centered' }
};

export const UsingUseRef = () => {

    const ref = useRef<HTMLDivElement>(null);

    console.log('render');

    return (
        <div ref={ref}>
            Content Renders 1 Time
        </div>
    );

};

export const UsingUseState = () => {

    const [, setRef] = useState<HTMLDivElement | null>(null);

    console.log('render');

    return (
        <div ref={setRef}>
            Content Renders 2 Times
        </div>
    );

};



export const UsingObervableRef = () => {

    const ref = useObservableValueRef<HTMLInputElement>(null, {
        onSet: (value) => {
            console.log('value changed to', value);
        }
    });

    const handleGetClick = () => {
        console.log('get click', ref.current?.value);
    };

    const handleSetClick = () => {
        console.log('set click');
        ref.current!.value = 'Hello World';
    };

    console.log('render', ref.current);

    return (
        <div>
            <div>
                <input ref={ref} defaultValue="Hello" />
            </div>
            <div className="space-x-2">
                <Button onClick={handleGetClick}>Get</Button>
                <Button onClick={handleSetClick}>Set</Button>
            </div>
        </div>
    );

};
