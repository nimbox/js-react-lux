export interface MessageGroupData {

    id: string;

    alignment: 'start' | 'end';
    // Opaque — forwarded to `authorRenderer.avatar`, never read by the base.
    author?: unknown;

}
