import type { MessageOption } from '../types/MessageOption';


// The base ships **no** default viewer options. The one content-blind
// affordance — adding a reaction — is deliberately NOT modelled as an
// option: it is separate, fixed base chrome (`MessageReactionPicker`,
// positioned by `MessageContainer` beside the bubble, present
// whenever `onCreateReaction` is supplied), kept apart from the
// menu/option logic by design (docs §7). Consumers populate `options`
// with reply/copy/delete/… ; the reaction chooser is not among them.

export const defaultMessageOptions: MessageOption[] = [];
