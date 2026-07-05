import type { ReactNode } from 'react';
import { BoundingBox } from './BoundingBox';


/**
 * Side-by-side spacing-neutrality check for a single atom instance.
 *
 * @remarks
 * `BoundingBox` frames each copy of `children`. Left hugs the lines (no
 * margin); right adds `m-2`, opening a gap — spacing is the parent's job,
 * not the atom's.
 *
 * @param children - The atom instance to check, rendered twice (bare, then
 * inside an `m-2` wrapper).
 */
export function BoundingBoxSpacing({ children }: { children: ReactNode }) {

    return (
        <div className="flex items-center gap-24 px-12 py-16">
            <BoundingBox>{children}</BoundingBox>
            <BoundingBox>
                <div className="m-2">{children}</div>
            </BoundingBox>
        </div>
    );

}
