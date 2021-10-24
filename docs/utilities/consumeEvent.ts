export const consumeEvent = (e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
};