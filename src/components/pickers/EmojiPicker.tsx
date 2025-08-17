import classNames from 'classnames';
import { useState } from 'react';
import { MinusIcon, PlusIcon } from '../../icons/components';
import { Button } from '../Button';
import { Tabs } from '../Tabs';
import { commonEmojis } from './common-emojis';
import { type EmojiGroup, emojiGroups } from './emojis';


// 
// Emoji Picker
//

export interface EmojiPickerProps {
    onSelect?: (emoji: string) => void;
    defaultExpanded?: boolean;
    className?: string;
}

export function EmojiPicker({
    onSelect,
    className,
    defaultExpanded = false
}: EmojiPickerProps) {

    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleEmojiSelect = (emoji: string) => {
        onSelect?.(emoji);
    };

    // Render

    if (!isExpanded) {
        return (
            <div className="relative">
                <CompactForm
                    onSelect={handleEmojiSelect}
                    className={className}
                    onToggle={handleToggle}
                />
            </div>
        );
    } else {
        return (
            <div className="relative">
                <FullForm
                    onSelect={handleEmojiSelect}
                    className={className}
                    onToggle={handleToggle}
                />
            </div>
        );
    }

}

// Compact Form Component

function CompactForm({ onSelect, onToggle: onToggleExpand, className }: {
    onSelect?: (emoji: string) => void;
    onToggle: () => void;
    className?: string;
}) {

    return (
        <div className={classNames(
            'px-3 py-2 flex items-center gap-1 bg-control-bg border border-control-border rounded-full shadow',
            className
        )}>
            {commonEmojis.map((item, index) => (
                <EmojiItem key={index} emoji={item.emoji} onClick={() => onSelect?.(item.emoji)} />
            ))}

            <div className="w-px h-6 bg-gray-300 mx-1" />

            <Button variant="text" semantic="muted" rounded onClick={onToggleExpand}>
                <PlusIcon />
            </Button>

        </div>
    );

}

// Full Form Component

function FullForm(props: EmojiPickerProps & { onToggle: () => void }) {

    const { onSelect, className, onToggle } = props;

    const [selectedCategory, setSelectedCategory] = useState(emojiGroups[0]?.name || '');

    const handleEmojiClick = (emoji: string) => {
        onSelect?.(emoji);
    };

    const currentCategory = emojiGroups.find(group => group.name === selectedCategory);
    const currentEmojis = currentCategory?.emojis || [];
    const getCategoryIcon = (group: EmojiGroup) => group.emojis[0] || '📁';

    // Render

    return (
        <div className={classNames(
            'min-w-md p-0 bg-control-bg rounded shadow border border-control-border',
            className
        )}>

            {/* Header */}

            <div className="p-3 flex items-center justify-between">
                <h3 className="font-bold">Emojis</h3>
                <Button variant="text" semantic="muted" rounded onClick={onToggle}>
                    <MinusIcon />
                </Button>
            </div>

            {/* Category Tabs */}

            <Tabs
                value={selectedCategory}
                setValue={(value) => setSelectedCategory(value as string)}
                className="border-b border-control-border"
            >
                {emojiGroups.map((group) => (
                    <Tabs.Option key={group.name} value={group.name}>
                        <span data-tooltip={group.name} className="text-3xl">{getCategoryIcon(group)}</span>
                    </Tabs.Option>
                ))}
            </Tabs>

            {/* Emoji Grid */}

            <div
                className="h-64 p-2 grid grid-cols-8  overflow-y-auto"
            >
                {currentEmojis.map((emoji, index) => (
                    <EmojiItem
                        key={`${selectedCategory}-${index}`}
                        emoji={emoji}
                        onClick={() => handleEmojiClick(emoji)}
                    />
                ))}
            </div>

        </div>
    );
}

function EmojiItem({ emoji, onClick }: { emoji: string, onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-150 text-3xl"
        >
            {emoji}
        </button>
    );
}
