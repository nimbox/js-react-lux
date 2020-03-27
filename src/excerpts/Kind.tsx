import React, { FC } from 'react';
import CheckIcon from '../icons/CheckIcon';


//
// Kind
//

interface Props {
    text: string,
    color: string,
    background: string,
    name?: string,
    value?: boolean,
    onChange?: (value: boolean) => void
}

export const Kind: FC<Props> = ({ text, color, background, value = false, onChange }) => (
    <div
        onClick={() => onChange && onChange(!value)}
        className="w-8 h-8 leading-8 text-center text-xs font-bold box-content border rounded-lg cursor-pointer"
        style={{ color: !value ? color : background, backgroundColor: !value ? background : 'white', borderColor: background }}>
        {!value ? text : <CheckIcon className="inline w-6 h-6 stroke-current stroke-2" />}
    </div>
);
