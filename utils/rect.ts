export const contains = (rect: DOMRect, { x, y }: { x: number, y: number }) => {
    return !(x < rect.left
        || x > rect.right
        || y < rect.top
        || y > rect.bottom);
}