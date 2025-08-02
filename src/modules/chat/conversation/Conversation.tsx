import classNames from 'classnames';
import React from 'react';
import { ConversationContext, ConversationContextProps } from './ConversationContext';
import { DefaultConversationRenderer } from './renderers/DefaultConversation';
import { ConversationAvatar } from './slots/ConversationAvatar';
import { ConversationContainer } from './slots/ConversationContainer';
import { ConversationMessage } from './slots/ConversationMessage';
import { ConversationMeta } from './slots/ConversationMeta';
import { ConversationName } from './slots/ConversationName';
import { ConversationProperties } from './slots/ConversationProperties';


// Conversation

export interface ConversationProps extends ConversationContextProps {

    className?: string;
    renderConversation?: (conversation: ConversationContextProps) => React.ReactElement;

}

export function Conversation({ className, renderConversation, ...props }: ConversationProps) {

    const renderer = renderConversation || DefaultConversationRenderer;

    return (
        <ConversationContext.Provider value={props}>
            <div className={classNames('group flex flex-col gap-4', className)}>
                {renderer(props)}
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
