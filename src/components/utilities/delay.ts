/**
 * Delay execution for the specified time.
 * 
 * @param millis the number of millis to delay
 */
export async function delay(millis: number) {
    await new Promise(resolve => setTimeout(() => resolve(null), millis));
}
