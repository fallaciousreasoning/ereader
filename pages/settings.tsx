import Head from "next/head";
import React from "react";
import Button from "../components/Button";
import { updateTheme, useTheme } from "../data/theme";
import { defaultTheme } from "../types/theme";

const themeModes = ['light', 'dark', 'system'] as const;
export default function Settings() {
    const theme = useTheme();
    return <div>
        <Head>
            <title>Settings</title>
        </Head>
        <div className="flex flex-col m-auto my-2 max-w-3xl p-2 rounded shadow gap-2">
            <h2 className="text-2xl font-bold">Settings</h2>
            <div className="flex flex-col">
                <h3 className="text-lg">Theme</h3>
                <select className="max-w-xs" value={theme.mode ?? 'system'} onChange={e => updateTheme({ mode: e.target.value as any })}>
                    {themeModes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
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
                    <input className="flex-1" type="range" min={100} max={200} step={10} value={theme.lineHeight*100} onChange={(e) => updateTheme({ lineHeight: parseInt(e.target.value) / 100 ?? 1.4 })} />
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
                <Button onClick={() => updateTheme(defaultTheme)}>Reset</Button>
            </div>
        </div>
    </div>
}