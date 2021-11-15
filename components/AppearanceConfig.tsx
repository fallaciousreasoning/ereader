import React from "react";
import { updateTheme, useTheme } from "../data/theme";
import { defaultTheme } from "../types/theme";
import Button from "./Button";
import OptionPicker from "./OptionPicker";

const themeModes = ['light', 'dark', 'system'] as const;
const fontSizes = [12, 16, 20, 22, 24, 26, 28, 30, 34];
export default function AppearanceConfig() {
    const theme = useTheme();
    return <div className="flex flex-col gap-1 py-1">
        <div className="flex flex-col">
            <h3 className="text-lg">Font Size</h3>
            <OptionPicker options={fontSizes} value={theme.fontSize} onChange={value => updateTheme({ fontSize: value })} renderOption={(value, selected) => <div style={{ fontSize: value}} className={`flex flex-row h-full items-end ${selected ? 'underline' : ''}`}>
                {value}
            </div>} />
        </div>
        <div className="flex flex-col">
            <h3 className="text-lg">Line Spacing</h3>
            <div className="flex gap-2 w-full max-w-xs">
                <input className="flex-1" type="range" min={100} max={200} step={10} value={theme.lineHeight * 100} onChange={(e) => updateTheme({ lineHeight: parseInt(e.target.value) / 100 ?? 1.4 })} />
                <span>{theme.lineHeight}</span>
            </div>
        </div>
        <div className="flex flex-col">
            <h3 className="text-lg">Background Color</h3>
            <div className="flex gap-2 w-full">
                <input className="max-w-xs flex-1" type="color" value={theme.background} onChange={(e) => updateTheme({ background: e.target.value })} />
            </div>
        </div>
        <div className="flex flex-col">
            <h3 className="text-lg">Text Color</h3>
            <div className="flex gap-2 w-full">
                <input className="max-w-xs flex-1" type="color" value={theme.text} onChange={(e) => updateTheme({ text: e.target.value })} />
            </div>
        </div>
        <div className="flex flex-col">
            <h3 className="text-lg">Link Color</h3>
            <div className="flex gap-2 w-full">
                <input className="max-w-xs flex-1" type="color" value={theme.link} onChange={(e) => updateTheme({ link: e.target.value })} />
            </div>
        </div>
        <div>
            <Button onClick={() => updateTheme(defaultTheme)}>Reset Appearance</Button>
        </div>
    </div>
}