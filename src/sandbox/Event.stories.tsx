/* eslint-disable import/no-anonymous-default-export */
import { action } from '@storybook/addon-actions';


export default {
    title: 'Sandbox/Events',
    parameters: { layout: 'centered' }
};


export const BlurBubbleUp = () => {

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const currentTarget = e.currentTarget;
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                // You can invoke a callback or add custom logic here
                console.log('the real blur');
            }
        }, 0);
    };


    return (
        <div>
            <input onBlur={() => action('onBlur')('input outside 1')} className="border" />
            <div onFocus={(e) => action('onFocus')('div', e)} onBlur={handleBlur}>
                <input onBlur={() => action('onBlur')('input inside 1')} className="border" />
                <input onBlur={() => action('onBlur')('input inside 2')} className="border" />
            </div>
            <input onBlur={() => action('onBlur')('input outside 2')} className="border" />
        </div>
    );

};