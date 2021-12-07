export const consumeEvent = (e : React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
};