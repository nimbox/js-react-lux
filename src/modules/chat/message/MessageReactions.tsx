import { MessageReactionsCluster } from './MessageReactionsCluster';


// The DEFAULT reactions rendering — the seam that chooses a form. It renders the
// clustered pill (`MessageReactionsCluster`) as the default; this is the single place
// a future `ChatContext` option would switch between the cluster and the per-emoji
// `MessageReactionsExpanded`. `MessageContainer` mounts THIS (not a concrete form),
// so the default stays swappable in one spot. Exposed as `Message.Reactions`; the
// concrete forms are `Message.ReactionsCluster` / `Message.ReactionsExpanded`.
export function MessageReactions() {

    return <MessageReactionsCluster />;

}
