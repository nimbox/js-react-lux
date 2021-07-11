import { Placement } from '@popperjs/core';
import React, { FC } from 'react';
export interface PopupProps {
    visible?: boolean;
    onChangeVisible?: (visible: boolean) => void;
    placement?: Placement;
    Component: React.FunctionComponent;
    children: React.ReactElement;
}
export declare const Popup: FC<PopupProps>;
