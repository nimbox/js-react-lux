import { withKnobs } from "@storybook/addon-knobs";
import React from 'react';
import { Card } from "../components/Card";
import '../styles/styles.css';
import { Invoice as InvoiceComponent } from "./Invoice";
import { Note as NoteComponent } from './Note';
import { Payment as PaymentComponent } from './Payment';

export default {
    title: 'Excerpts', 
    decorators: [
        withKnobs
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
