import classNames from 'classnames';
import React, { useState } from 'react';
import { ConversationContext, type ConversationContextProps } from './ConversationContext';
import { ConversationAvatar } from './slots/ConversationAvatar';
import { ConversationContainer } from './slots/ConversationContainer';
import { ConversationMessage } from './slots/ConversationMessage';
import { ConversationMeta } from './slots/ConversationMeta';
import { ConversationName } from './slots/ConversationName';
import { ConversationProperties } from './slots/ConversationProperties';
import { DefaultConversationRenderer } from './renderers/DefaultConversation';


// Conversation

export interface ConversationProps extends ConversationContextProps {

    className?: string;
    renderConversation?: (conversation: ConversationContextProps) => React.ReactElement;

}

export function Conversation({ className, renderConversation, ...props }: Omit<ConversationProps, 'isHovered'>) {

    const [isHovered, setIsHovered] = useState(false);
    const renderer = renderConversation || DefaultConversationRenderer;

    return (
        <ConversationContext.Provider value={{ ...props, isHovered }} >
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={classNames('group flex flex-col gap-4', className)}
            >
                {renderer({ ...props, isHovered: isHovered })}
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
