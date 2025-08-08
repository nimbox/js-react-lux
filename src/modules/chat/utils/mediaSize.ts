export function mediaSize(bytes: number) {

    const thresh = 1024;
    if (bytes < thresh) return `${bytes} B`;

    const units = ['KB', 'MB', 'GB', 'TB'];
    let u = -1;
    let val = bytes;
    do {
        val /= thresh;
        ++u;
    } while (val >= thresh && u < units.length - 1);

    return `${val.toFixed(1)} ${units[u]}`;

}
