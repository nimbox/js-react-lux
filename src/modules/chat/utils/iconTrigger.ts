// The one circular icon-button trigger shared verbatim by the reaction picker
// (`MessageReactionPicker`), the message overflow menu (`MessageOptions`), and
// the conversation overflow menu (`ConversationOptions`): gray at rest, white
// on hover, gray-500 icon darkening to gray-700 on hover. Every icon it hosts
// must rely on `currentColor` (no hardcoded color of its own) to pick this up.
export const CHAT_ICON_TRIGGER = 'p-1 bg-gray-100 hover:bg-white shadow rounded-full cursor-pointer text-gray-500 hover:text-gray-700 transition-colors';
