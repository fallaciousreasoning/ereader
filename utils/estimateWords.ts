import { area, containedPercent } from "./rect";

export const estimateWords = (node: ChildNode): number => {
    if (node.nodeType == node.TEXT_NODE) {
        const r = document.createRange();
        r.selectNode(node);
        const window = document.body.getBoundingClientRect();

        let totalArea = 0;
        let visibleArea = 0;
        for (const rect of r.getClientRects()) {
            const rectArea = area(rect);
            totalArea += rectArea;
            visibleArea += containedPercent(rect, window) * rectArea
        }

        const visiblePercent = totalArea === 0 ? 0 : visibleArea/totalArea;
        const wordCount = wordsInText(node.textContent);
        console.log(`Words: ${wordCount}, Visible: ${visiblePercent}, Area: ${totalArea}, Visible: ${visibleArea}`)

        const visibleWords = Math.floor(wordCount * visiblePercent);
        return visibleWords;
    }
    
    if (node.nodeType == node.ELEMENT_NODE) {
        return Array.from(node.childNodes).reduce((prev, next) => prev + estimateWords(next), 0);
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