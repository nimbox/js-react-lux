import { withKnobs } from "@storybook/addon-knobs";
import React from 'react';
import { Card } from "../components/Card";
import '../styles/styles.css';
import { Note as NoteComponent } from './Note';

export default {
    title: 'Excerpts',
    decorators: [
        withKnobs,
        (story: () => React.ReactNode) => <div className="h-full p-4 bg-green-100"><div className="bg-white">{story()}</div></div>
    ]
};

export const Note = () => {

    return (

        <Card>
            <Card.Header>Documents</Card.Header>
            <Card.Body>
                <div className="-mx-3 px-3 py-2 text-muted border-b border-content-border">
                    EXPLICACIÓN
                            </div>
                <NoteComponent full={false} />
                <NoteComponent full={false} />
                <NoteComponent full={true}>
                    <NoteComponent full={true} />
                    <NoteComponent full={true} />
                    <NoteComponent full={false} >
                        <NoteComponent full={false} />
                        <NoteComponent full={false} />
                        <NoteComponent full={false} />
                        <NoteComponent full={false} />
                    </NoteComponent>
                </NoteComponent>
            </Card.Body>
        </Card>

    );

};
