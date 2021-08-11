import classnames from 'classnames';
import { FC } from 'react';
import { CrossIcon } from '../icons';


export const Close: FC<{ onClick: () => void, className: string }> = ({ onClick, className }) => <CrossIcon onClick={onClick} className={classnames("stroke-2 cursor-pointer", className)} />;
