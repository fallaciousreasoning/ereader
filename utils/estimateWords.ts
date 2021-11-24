import { area, containedPercent } from "./rect";

export const estimateWords = (node: ChildNode, container: Element): number => {
    if (node.nodeType == node.TEXT_NODE) {
        const r = document.createRange();
        r.selectNode(node);

        const containerRect = container.getBoundingClientRect();
        if (container.scrollLeft) containerRect.x += container.scrollLeft;
        if (container.scrollTop) containerRect.y += container.scrollTop;

        let totalArea = 0;
        let visibleArea = 0;
        for (const rect of r.getClientRects()) {
            const rectArea = area(rect);
            totalArea += rectArea;
            visibleArea += containedPercent(rect, containerRect) * rectArea
        }

        const visiblePercent = totalArea === 0 ? 0 : visibleArea / totalArea;
        const wordCount = wordsInText(node.textContent);

        const visibleWords = Math.floor(wordCount * visiblePercent);
        return visibleWords;
    }

    if (node.nodeType == node.ELEMENT_NODE) {
        return Array.from(node.childNodes).reduce((prev, next) => prev + estimateWords(next, container), 0);
    }

    return 0;
}

globalThis.estimateWords = estimateWords;

const wordsInText = (text: string) => {
    if (!text) return 0;

    let count = 1;
    for (let i = 0; i < text.length; ++i)
        if (text[i] == ' ') count++;

    return count;
}

const wordsInContainer = () => {
    const container = document.querySelector('.epub-container');
    const book = container.querySelector('iframe').contentDocument.body;
    return estimateWords(book, container);
}
globalThis.wordsInContainer = wordsInContainer;