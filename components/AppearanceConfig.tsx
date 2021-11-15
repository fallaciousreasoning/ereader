import React from "react";
import { updateTheme, useTheme } from "../data/theme";
import { defaultTheme } from "../types/theme";
import Button from "./Button";
import OptionPicker from "./OptionPicker";

const themeModes = ['light', 'dark', 'system'] as const;
export default function AppearanceConfig() {
    const theme = useTheme();
    return <div className="flex flex-col gap-1 py-1">
        <div className="flex flex-col">
            <h3 className="text-lg">Theme</h3>
            <OptionPicker value={theme.mode} options={themeModes} onChange={value => updateTheme({ mode: value })} />
        </div>
        <div className="flex flex-col">
            <h3 className="text-lg">Font Size</h3>
            <div className="flex gap-2 w-full max-w-xs">
                <input className="flex-1" type="range" min={8} max={32} value={theme.fontSize} onChange={(e) => updateTheme({ fontSize: parseInt(e.target.value) ?? 18 })} />
                <span>{theme.fontSize}pt</span>
            </div>
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