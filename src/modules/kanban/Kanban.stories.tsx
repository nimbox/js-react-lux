import React, { FC } from 'react';
import { KanbanProvider, useCard, useColumn, useKanbanContext } from './Kanban';
import classnames from 'classnames';
import { BoardProps } from './Board';
import _ from 'lodash';


// definition

export default {
    title: 'Module/Kanban',
    component: KanbanProvider,
    parameters: {
        layout: 'fullscreen'
    }
};

export const Simple = () => {

    return (
        <div className="w-full h-screen bg-yellow-100">
            <KanbanProvider>
                <StoryBoard />
            </KanbanProvider>
        </div>
    );



};

const StoryBoard: FC<BoardProps> = () => {

    const { isActive: isDragging } = useKanbanContext();

    return (
        <div className={classnames('w-full h-full px-3 py-2 flex flex-row space-x-2', isDragging ? 'bg-red-200' : 'bg-blue-200')}>

            <KanbanColumn id="a">
                <KanbanCard id="1" lines={3} />
                <KanbanCard id="2" lines={2} />
                <KanbanCard id="3" lines={1} />
                <KanbanCard id="4" lines={5} />
            </KanbanColumn>

            <KanbanColumn id="b">
                <KanbanCard id="5" lines={1} />
                <KanbanCard id="6" lines={2} />
            </KanbanColumn>

            <KanbanColumn id="c">
                <KanbanCard id="7" lines={1} />
                <KanbanCard id="8" lines={2} />
                <KanbanCard id="9" lines={5} />
            </KanbanColumn>

        </div>

    );

};

const KanbanCard: FC<{ id: string, lines: number }> = ({ id, lines }) => {

    const [{ isSelfDragging }, card] = useCard(id);

    return (
        <div ref={card} className={classnames('w-48 bg-gray-300')}>
            <div className={isSelfDragging ? 'invisible' : ''}>
                {_.range(lines).map(() => <div>Line</div>)}
            </div>
        </div>
    );

};

const KanbanColumn: FC<{ id: string }> = ({ id, children }) => {

    const [{ isOver }, column] = useColumn(id);

    return (
        <div ref={column} className={classnames('px-3 py-2 space-y-2 bg-gray-100', { 'bg-gray-400': isOver })}>
            {children}
        </div>
    );

};












{/* <KanbanProvider.Board className={classnames('w-full h-full px-3 py-2 flex flex-row space-x-2', isDragging ? 'bg-red-200' : 'bg-blue-200')}>

<KanbanProvider.Column key="123" id="123" className="w-48 space-y-2">
    <KanbanProvider.Card key="abc" id="abc" className="bg-red-100">sss</KanbanProvider.Card>
    <KanbanProvider.Card key="abc1" id="abc1" className="bg-blue-100">s<br />ss</KanbanProvider.Card>
    <KanbanProvider.Card key="abc2" id="abc2" className="bg-green-100">sss</KanbanProvider.Card>
    <KanbanProvider.Card key="abc3" id="abc3" className="bg-red-100">sss</KanbanProvider.Card>
</KanbanProvider.Column>

<KanbanProvider.Column key="124" id="1234" className="w-48 space-y-2">
    <KanbanProvider.Card key="ab" id="ab" className="bg-red-100">sss</KanbanProvider.Card>
    <KanbanProvider.Card key="ab1" id="ab1" className="bg-blue-100">sss</KanbanProvider.Card>
    <KanbanProvider.Card key="ab2" id="ab2" className="bg-green-100">sss</KanbanProvider.Card>
    <KanbanProvider.Card key="ab3" id="ab3" className="bg-red-100">sss</KanbanProvider.Card>
</KanbanProvider.Column>

<KanbanProvider.Column key="125" id="1234" className="w-48 space-y-2">
    {isDragging ? 'DRAGING' : 'NOT'}
</KanbanProvider.Column>

</KanbanProvider.Board> */}
