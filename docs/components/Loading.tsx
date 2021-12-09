
import classnames from 'classnames';
import React, { CSSProperties, FC } from 'react';


export interface LoadingProps {
    className?: string;
    colorClassName?: string;
    style?: CSSProperties;
}

export const Loading: FC<LoadingProps> = ({ className, colorClassName = 'text-primary-500', style }) => (
    <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"
        className={classnames('inline-block', colorClassName, className)}
        style={{ width: '1em', height: '1em', ...style }}
    >
        <g fill="none" fillRule="evenodd" transform="translate(1 1)" strokeWidth="2">
            <circle cx="22" cy="22" r="6" strokeOpacity="0">
                <animate attributeName="r"
                    begin="1.5s" dur="3s"
                    values="6;22"
                    calcMode="linear"
                    repeatCount="indefinite" />
                <animate attributeName="stroke-opacity"
                    begin="1.5s" dur="3s"
                    values="1;0" calcMode="linear"
                    repeatCount="indefinite" />
                <animate attributeName="stroke-width"
                    begin="1.5s" dur="3s"
                    values="2;0" calcMode="linear"
                    repeatCount="indefinite" />
            </circle>
            <circle cx="22" cy="22" r="6" strokeOpacity="0">
                <animate attributeName="r"
                    begin="3s" dur="3s"
                    values="6;22"
                    calcMode="linear"
                    repeatCount="indefinite" />
                <animate attributeName="stroke-opacity"
                    begin="3s" dur="3s"
                    values="1;0" calcMode="linear"
                    repeatCount="indefinite" />
                <animate attributeName="stroke-width"
                    begin="3s" dur="3s"
                    values="2;0" calcMode="linear"
                    repeatCount="indefinite" />
            </circle>
            <circle cx="22" cy="22" r="8">
                <animate attributeName="r"
                    begin="0s" dur="1.5s"
                    values="6;1;2;3;4;5;6"
                    calcMode="linear"
                    repeatCount="indefinite" />
            </circle>
        </g>
    </svg>
);
