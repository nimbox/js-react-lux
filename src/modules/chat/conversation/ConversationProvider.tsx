import React, { useState } from 'react';
import type { ConversationData } from '../types/ConversationData';
import { ConversationContext } from './ConversationContext';
import { ConversationAvatar } from './slots/ConversationAvatar';
import { ConversationContainer } from './slots/ConversationContainer';
import { ConversationMessage } from './slots/ConversationMessage';
import { ConversationMeta } from './slots/ConversationMeta';
import { ConversationName } from './slots/ConversationName';
import { ConversationProperties } from './slots/ConversationProperties';


// ConversationProvider

export interface ConversationProviderProps {

    conversation: ConversationData;
    menu?: React.ReactElement;

    selected?: boolean;

    className?: string;
    children?: React.ReactElement | null;

}

export function ConversationProvider({ className, children, ...props }: Omit<ConversationProviderProps, 'isHovered'>) {

    const [isOver, setIsOver] = useState(false);

    return (
        <ConversationContext.Provider value={{ ...props, isOver }} >
            <div
                onMouseEnter={() => setIsOver(true)}
                onMouseLeave={() => setIsOver(false)}
                className={className}
            >
                {children}
            </div>
        </ConversationContext.Provider>
    );

}

// Slots

ConversationProvider.Avatar = ConversationAvatar;

ConversationProvider.Container = ConversationContainer;

ConversationProvider.Name = ConversationName;
ConversationProvider.Properties = ConversationProperties;

ConversationProvider.Message = ConversationMessage;
ConversationProvider.Meta = ConversationMeta;
