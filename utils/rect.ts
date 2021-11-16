export const contains = (rect: DOMRect, { x, y }: { x: number, y: number }) => {
    return !(x < rect.left
        || x > rect.right
        || y < rect.top
        || y > rect.bottom);
}

export const intersection = (r1: DOMRect, r2: DOMRect) => {
    const leftX = Math.max(r1.left, r2.left);
    const rightX = Math.min(r1.right, r2.right);

    const topY = Math.max(r1.top, r2.top);
    const bottomY = Math.min(r1.bottom, r2.bottom);

    if (leftX < rightX && topY < bottomY)
        return new DOMRect(leftX, topY, rightX - leftX, bottomY - topY);
}

export const area = (rect: DOMRect) => rect.x * rect.y;

export const containedPercent = (rect: DOMRect, container: DOMRect) => {
    const intersect = intersection(rect, container);
    if (!intersect) return 0;

    const intersectArea = area(intersect);
    const rectArea = area(rect);

    return intersectArea / rectArea;
}