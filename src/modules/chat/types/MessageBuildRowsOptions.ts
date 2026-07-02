export interface MessageBuildRowsOptions {

    locale?: string;

    formatLocalDate?: (date: Date) => string;

    // The id of the first unread message. When set, a `marker` row (the "New
    // messages" line) is injected immediately before it, breaking the group. The
    // consumer computes which message that is (unread is viewer-relative — §4).
    markerBeforeId?: string;

}
