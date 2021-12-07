/* eslint-disable import/no-anonymous-default-export */
import { useMemo, useRef } from 'react';
import { Button } from '../components/Buttons';


export default {
    title: 'Sandbox/Proxy',
    parameters: { layout: 'centered' }
};

export const ProxyExample = () => {


    const handler: ProxyHandler<HTMLInputElement> = useMemo(() => ({
        // get(target, property) {
        //     console.log('get', property);
        //     return (target as any)[property];
        // },
        set(target, property, v) {
            console.log('set', property, 'to', v);
            if (property === 'value') {
                console.log('is value');
            }
            (target as any)[property] = v;
            return true;
        }
    }), []);

    const simple = useRef({
        value: 'Hello',
        getValue() {
            return this.value;
        }
    });

    const proxy = new Proxy(simple.current!, handler as any);

    return (
        <div>
            <Button type="button" onClick={() => proxy.value = 'Hola'}>Set Value</Button>
            <Button type="button" onClick={() => console.log({ a: proxy.value, b: proxy.getValue() })}>Get Value</Button>
        </div>
    );

};
