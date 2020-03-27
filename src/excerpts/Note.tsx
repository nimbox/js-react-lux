import classnames from 'classnames';
import React, { FC, useState } from 'react';
import { ButtonBar, MoreOptionsButton, PrimaryButton, SecondaryButton } from '../components/Buttons';
import { TextArea } from '../components/Form';
import EditIcon from '../icons/EditIcon';
import SpeechBubbleIcon from '../icons/SpeechBubbleIcon';
import ThumbsUpIcon from '../icons/ThumbsUpIcon';
import ThumbTackIcon from '../icons/ThumbTackIcon';
import { Action, Actions, Creation, Excerpt, Props as ExcerptProps, Relation } from './Excerpt';


//
// note
//

export interface Props extends ExcerptProps {

}

export const Note: FC<Props> = ({ full, value, onChange, children }) => {

    const [edit, setEdit] = useState(false);
    const [more, setMore] = useState(false);
    const [comment, setComment] = useState(false);

    return (
        <Excerpt kind="note" value={value} onChange={onChange}>

            <Creation />

            <div className="mb-1">
                {!edit && <div className="w-40 h-20 ml-2 my-2 float-right bg-yellow-300"></div>}
                <Relation full={full} />
                {!edit ?
                    <div className="">llame al sr. juan arias , pero estaba muy ocupado al momento de llamar , me dijo que me estaria devolviendo ( Le preguntare sobre el contrato de confidialidad, y saber en que necesita de los tecnicos para ponerlos en contacto)</div> :
                    <div className="">
                        <TextArea value="llame al sr. juan arias , pero estaba muy ocupado al momento de llamar , me dijo que me estaria devolviendo ( Le preguntare sobre el contrato de confidialidad, y saber en que necesita de los tecnicos para ponerlos en contacto)" />
                        <MoreOptionsButton value={more} onChange={(more) => setMore(more)} className="mb-2">
                            <div>more stuff</div>
                        </MoreOptionsButton>
                        <ButtonBar className="mb-2">
                            <PrimaryButton>guardar</PrimaryButton>
                            <SecondaryButton onClick={() => setEdit(false)}>cancelar</SecondaryButton>
                        </ButtonBar>
                    </div>
                }
            </div>

            <Actions className={classnames({ 'mb-2': children && comment })}>
                <Action><ThumbsUpIcon className="inline w-5 h-5 mr-1 stroke-current stroke-2" />me gusta</Action>
                <Action onClick={() => setComment(!comment)}><SpeechBubbleIcon className="inline w-5 h-5 mr-1 stroke-current stroke-2" />comentar</Action>
                <Action onClick={() => setEdit(!edit)}><EditIcon className="inline w-5 h-5 mr-1 stroke-current stroke-2" />editar</Action>
                <Action><ThumbTackIcon className="inline w-5 h-5 mr-1 stroke-current stroke-2" />pinear</Action>
            </Actions>

            {comment &&
                <div className="">
                    <TextArea value="llame al sr. juan arias , pero estaba muy ocupado al momento de llamar , me dijo que me estaria devolviendo ( Le preguntare sobre el contrato de confidialidad, y saber en que necesita de los tecnicos para ponerlos en contacto)" />
                    <ButtonBar className="mb-2">
                        <PrimaryButton>guardar</PrimaryButton>
                        <SecondaryButton onClick={() => setComment(false)}>cancelar</SecondaryButton>
                    </ButtonBar>
                </div>
            }

            {children &&
                <div className="mt-2 border-t">
                    {children}
                </div>
            }

        </Excerpt>
    );
}
