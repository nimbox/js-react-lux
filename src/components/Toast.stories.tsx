/* eslint-disable import/no-anonymous-default-export */
import { ToastProvider, useToast } from "./Toast";
import React from 'react';


export default {
    title: 'Layout/Toast',
    component: ToastProvider,
    argTypes: {
        autoDeleteTimeout: { control: { type: ' number' } }
    }
};


export const Parameterized = () => {
    return (
        <ToastProvider>
            <ParameterizedToast />
        </ToastProvider>
    );
}

let count = 0;
const ParameterizedToast = () => {

    const { addToast } = useToast();

    return (
        <div className="w-full h-96 flex flex-row justify-center items-center">
            <div>

                <button type="button" onClick={() => addToast('success', <div className="font-bold">Hola</div>, 0)}>
                    success
                </button>

                <button type="button" onClick={() => addToast('info', { description: "Hola " + String(count++) }, 10000)}>
                    info
                </button>

                <button type="button" onClick={() => addToast('warning', { description: "Hola " + String(count++) })}>
                    warning
                </button>

                <button type="button" onClick={() => addToast('danger', { title: 'Error', description: "Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola  Hola Hola Hola Hola Hola HolaHola " + String(count++) }, 0)}>
                    danger
                </button>

            </div>
        </div>
    );

}
