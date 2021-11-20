
/**
 * 
 */
export type OptionsExtractor<G, O> = (group: G) => O[];

/**
 * Default extractor for options. Assumes that the options come in an
 * array of objects.
 *
 * @param group 
 * @returns 
 */
export const EXTRACTOR = <G, O>(group: G) => group as unknown as O[];


/**
 * Default choose method for options.
 * 
 * @returns
 */
export const DEFAULT_ON_CHOOSE = () => null;


/**
 * Detault no options is no render.
 * 
 * @returns 
 */
export const DEFAULT_RENDER_NO_OPTIONS = () => null;

/**
 * Default group label is no render.
 * 
 * @returns 
 */
export const DEFAULT_RENDER_GROUP_LABEL = () => null;


/**
 * Default option renders option as a string.
 * 
 * @param props 
 * @returns 
 */
export const DEFAULT_RENDER_OPTION = <O,>({ option }: { option: O }) => String(option);
