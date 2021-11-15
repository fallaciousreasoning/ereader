import React from "react";
import { updateTheme, useTheme } from "../data/theme";
import { defaultTheme } from "../types/theme";
import Button from "./Button";
import OptionPicker from "./OptionPicker";

const themeModes = ['light', 'dark', 'system'] as const;
const fontSizes = [12, 16, 20, 22, 24, 26, 28, 30, 34];
const lineSpacings = [1, 1.2, 1.5, 1.8, 2];
const textAligns = ['left', 'right', 'center', 'justify'] as const;
const margins = [0, 4, 8, 12, 16, 32, 48, 64];
const backgrounds = [
    '#FFFFFF',
    '#000000',
    '#333333',
    '#f5deb3',
    '#111111',
    '#111b21'
];

const foregrounds = [
    '#000000',
    '#FFFFFF',
    '#eeeeee',
    '#f5deb3'
];

const colorOption = (o: string, s: boolean) => <div style={{ background: o }} className={`w-12 h-12 border-foreground rounded-full ${s ? 'border-4' : 'border'}`} />
export default function AppearanceConfig() {
    const theme = useTheme();
    return <div className="flex flex-col gap-1 py-1">
        <div className="flex flex-col">
            <h3 className="text-lg">Font Size</h3>
            <OptionPicker options={fontSizes} value={theme.fontSize} onChange={value => updateTheme({ fontSize: value })} renderOption={(value, selected) => <div style={{ fontSize: value }} className={`flex flex-row h-full items-end ${selected ? 'underline' : ''}`}>
                {value}
            </div>} />
        </div>
        <div className="flex flex-col">
            <h3 className="text-lg">Line Spacing</h3>
            <OptionPicker options={lineSpacings} value={theme.lineHeight} onChange={value => updateTheme({ lineHeight: value })} />
        </div>
        <div className="flex flex-col">
            <h3 className="text-lg">Background Color</h3>
            <OptionPicker value={theme.background} onChange={v => updateTheme({ background: v })} options={backgrounds} renderOption={colorOption} />
            <div className="flex gap-2 w-full">
                <input className="max-w-xs flex-1" type="color" value={theme.background} onChange={(e) => updateTheme({ background: e.target.value })} />
            </div>
        </div>
        <div className="flex flex-col">
            <h3 className="text-lg">Text Color</h3>
            <OptionPicker value={theme.text} onChange={v => updateTheme({ text: v })} options={foregrounds} renderOption={colorOption} />
        </div>
        <div className="flex flex-col">
            <h3 className="text-lg">Link Color</h3>
            <div className="flex gap-2 w-full">
                <input className="max-w-xs flex-1" type="color" value={theme.link} onChange={(e) => updateTheme({ link: e.target.value })} />
            </div>
        </div>
        <div className="flex flex-col">
            <h3>Text Align</h3>
            <OptionPicker value={theme.textAlign} onChange={v => updateTheme({ textAlign: v })} options={textAligns} />
        </div>
        <div className="flex flex-col">
            <h3>Margin Top</h3>
            <OptionPicker value={theme.marginTop} onChange={v => updateTheme({ marginTop: v })} options={margins} />
        </div>
        <div className="flex flex-col">
            <h3>Margin Sides</h3>
            <OptionPicker value={theme.marginLeft} onChange={v => updateTheme({ marginLeft: v, marginRight: v })} options={margins} />
        </div>
        <div className="flex flex-col">
            <h3>Margin Bottom</h3>
            <OptionPicker value={theme.marginBottom} onChange={v => updateTheme({ marginBottom: v })} options={margins} />
        </div>
        <div>
            <Button onClick={() => updateTheme(defaultTheme)}>Reset Appearance</Button>
        </div>
    </div>
}