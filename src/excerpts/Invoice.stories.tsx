import { withKnobs } from "@storybook/addon-knobs";
import React from 'react';
import { Card } from "../components/Card";
import { Postit } from "../components/Postit";
import '../styles/styles.css';
import { Invoice as InvoiceComponent } from "./Invoice";
import { Note as NoteComponent } from './Note';
import { Payment as PaymentComponent } from './Payment';

export default {
    title: 'Excerpts', 
    decorators: [
        withKnobs,
        (story: () => React.ReactNode) => <div className="h-full p-4 bg-green-100"><div className="bg-white">{story()}</div></div>
    ]
};

export const Invoice = () => {

    return (

        <Card>
            <Card.Header>Documents</Card.Header>
            <Card.Body>
                <div className="-mx-3 px-3 py-2 text-muted border-b border-content-border">
                    EXPLICACIÓN
                </div>
                <div className="">
                    <InvoiceComponent full={false} />
                    <InvoiceComponent full={true} />
                    <PaymentComponent full={false} />
                    <PaymentComponent full={true} />
                    <NoteComponent full={false} />
                </div>
            </Card.Body>
        </Card>

    );

};

export const SimplePostit = () => {
    return (
        <div className="grid grid-cols-1 gap-2">
            <Postit className="postit w-1/4">Algo</Postit >
            <Postit className="postit w-2/4">Algo</Postit >
            <Postit className="postit w-3/4">Algo</Postit >
            <Postit className="postit w-4/4">Algo</Postit >
        </div>
    );
}
