import classNames from 'classnames';
import { FC } from 'react';
import { CrossIcon } from '../icons';
import classnames from 'classnames';


export const Close: FC<{ onClick: () => void, className: string }> = ({ onClick, className }) => <CrossIcon onClick={onClick} className={classNames("stroke-2 cursor-pointer", className)} />;