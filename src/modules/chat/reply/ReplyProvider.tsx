import type { MessageData } from '../types/MessageData';
import { ReplyContext } from './ReplyContext';
import { ReplyAuthor } from './slots/ReplyAuthor';
import { ReplyBody } from './slots/ReplyBody';
import { ReplyContainer } from './slots/ReplyContainer';
import { ReplyContent } from './slots/ReplyContent';
import { ReplyImage } from './slots/ReplyImage';
import { ReplyMedia } from './slots/ReplyMedia';


// ReplyProvider

export interface ReplyProps {

    message: MessageData;

}

export interface ReplyProviderProps extends ReplyProps {

    className?: string;
    children: React.ReactNode;

}

export function ReplyProvider({ className, children, ...props }: ReplyProviderProps) {

    return (
        <ReplyContext.Provider value={props}>
            {children}
        </ReplyContext.Provider>
    );

}

// Slots

ReplyProvider.Container = ReplyContainer;

ReplyProvider.Content = ReplyContent;
ReplyProvider.Author = ReplyAuthor;
ReplyProvider.Body = ReplyBody;

ReplyProvider.Media = ReplyMedia;
ReplyProvider.Image = ReplyImage;
