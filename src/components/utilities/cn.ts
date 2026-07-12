import { clsx, type ClassValue } from 'clsx';


/**
 * Central class-name combiner. Every component composes its classes through
 * `cn` so there is a single place to evolve class handling later (for example
 * adding Tailwind class merging) without touching call sites.
 */
export const cn = (...inputs: ClassValue[]) => clsx(inputs);
