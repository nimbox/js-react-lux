import classnames from 'classnames';
import React, { FC, useState } from 'react';
import SpeechBubbleIcon from '../icons/SpeechBubbleIcon';
import ThumbsUpIcon from '../icons/ThumbsUpIcon';
import { Action, Actions, Comment, Creation, Excerpt, Props as ExcerptProps } from './Excerpt';


//
// invoice
//

export interface Props extends ExcerptProps {

}

export const Invoice: FC<Props> = ({ full, value, onChange, children }) => {

    const [comment, setComment] = useState(false);

    return (
        <Excerpt kind="invoice" value={value} onChange={onChange}>

            <Creation />

            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 flex flex-row md:flex-col justify-between">
                    {full && <div className="font-bold truncate">Expendio de licores Ron Depot</div>}
                    <div className="truncate">BACA:123902-123</div>
                </div>
                <div className="w-full md:w-3/5 grid grid-cols-3 grid-rows-2 grid-flow-col">
                    <div className="truncate " style={{ fontVariantNumeric: 'tabular-nums' }}>E 19-12-1967</div>
                    <div className="truncate " style={{ fontVariantNumeric: 'tabular-nums' }}>V 24-03-2020</div>
                    <div className="text-right truncate ">1,000.00</div>
                    <div className="text-right truncate ">10</div>
                    <div className="text-right truncate ">1,240.20</div>
                    <div className="text-right truncate ">22</div>
                </div>
            </div>

            {true && <Comment className="mb-1">llame al sr. juan arias , pero estaba muy ocupado al momento de llamar , me dijo que me estaria devolviendo ( Le preguntare sobre el contrato de confidialidad, y saber en que necesita de los tecnicos para ponerlos en contacto)</Comment>}

            <Actions className={classnames({ 'mb-2': children && comment })}>
                <Action><ThumbsUpIcon className="inline w-5 h-5 mr-1 stroke-current stroke-2" />me gusta</Action>
                <Action onClick={() => setComment(!comment)}><SpeechBubbleIcon className="inline w-5 h-5 mr-1 stroke-current stroke-2" />comentar</Action>
            </Actions>

        </Excerpt>
    );
}
