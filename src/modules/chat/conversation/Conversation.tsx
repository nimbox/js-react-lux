import React, { useState } from 'react';
import type { ConversationData } from '../types/ConversationData';
import { ConversationContext } from './ConversationContext';
import { ConversationAvatar } from './slots/ConversationAvatar';
import { ConversationContainer } from './slots/ConversationContainer';
import { ConversationMessage } from './slots/ConversationMessage';
import { ConversationMeta } from './slots/ConversationMeta';
import { ConversationName } from './slots/ConversationName';
import { ConversationProperties } from './slots/ConversationProperties';


// Conversation

export interface ConversationProps {

    menu?: React.ReactElement;
    conversation: ConversationData;

    selected?: boolean;

    className?: string;
    children?: React.ReactElement | null;

}

export function Conversation({ className, children, ...props }: Omit<ConversationProps, 'isHovered'>) {

    const [isOver, setIsOver] = useState(false);

    return (
        <ConversationContext.Provider value={{ ...props, isOver }} >
            <div onMouseEnter={() => setIsOver(true)} onMouseLeave={() => setIsOver(false)} className={className}>
                {children}
            </div>
        </ConversationContext.Provider>
    );

}

// Slots

Conversation.Avatar = ConversationAvatar;

Conversation.Container = ConversationContainer;

Conversation.Name = ConversationName;
Conversation.Properties = ConversationProperties;

Conversation.Message = ConversationMessage;
Conversation.Meta = ConversationMeta;
