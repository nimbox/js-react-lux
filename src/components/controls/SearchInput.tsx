import React from "react";
import { SearchIcon } from "../../icons";
import { ComponentScale } from "../ComponentScale";
import { IconInput, IconInputProps } from "./IconInput";


export interface SearchProps {
    scale?: ComponentScale;
    error?: boolean;
    className?: string;
}

export const SearchInput = React.forwardRef(({ ...props }, ref) => (
    <IconInput ref={ref} right={<SearchIcon width="1em" height="1em" className="text-control-border" style={{ strokeWidth: '0.25em'}}/>} {...props} />
)) as React.ForwardRefExoticComponent<React.PropsWithoutRef<IconInputProps> & React.RefAttributes<HTMLInputElement>>;;
