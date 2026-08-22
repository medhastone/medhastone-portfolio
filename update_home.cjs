const fs = require('fs');
let code = fs.readFileSync('src/components/HomeScreen.tsx', 'utf8');

if (!code.includes('onRanks')) {
    code = code.replace(
        /onPlay: \(\) => void;\n\}/,
        `onPlay: () => void;\n  onRanks: () => void;\n  onShop: () => void;\n  onSettings: () => void;\n}`
    );

    code = code.replace(
        /export default function HomeScreen\(\{ stats, onPlay \}: Props\) \{/,
        `export default function HomeScreen({ stats, onPlay, onRanks, onShop, onSettings }: Props) {`
    );

    code = code.replace(
        /<button onClick=\{\(\) => playButton\(\)\} className="flex flex-col items-center gap-1 bg-white\/10 p-3 rounded-2xl hover:bg-white\/20 transition-colors">\s*<Award className="text-yellow-400" \/>\s*<span className="text-xs font-bold">Ranks<\/span>\s*<\/button>/g,
        `<button onClick={() => { playButton(); onRanks(); }} className="flex flex-col items-center gap-1 bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors">\n            <Award className="text-yellow-400" />\n            <span className="text-xs font-bold">Ranks</span>\n          </button>`
    );
    
    code = code.replace(
        /<button onClick=\{\(\) => playButton\(\)\} className="flex flex-col items-center gap-1 bg-white\/10 p-3 rounded-2xl hover:bg-white\/20 transition-colors">\s*<ShoppingCart className="text-blue-400" \/>\s*<span className="text-xs font-bold">Shop<\/span>\s*<\/button>/g,
        `<button onClick={() => { playButton(); onShop(); }} className="flex flex-col items-center gap-1 bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors">\n            <ShoppingCart className="text-blue-400" />\n            <span className="text-xs font-bold">Shop</span>\n          </button>`
    );
    
    code = code.replace(
        /<button onClick=\{\(\) => playButton\(\)\} className="flex flex-col items-center gap-1 bg-white\/10 p-3 rounded-2xl hover:bg-white\/20 transition-colors">\s*<Settings className="text-slate-300" \/>\s*<span className="text-xs font-bold">Settings<\/span>\s*<\/button>/g,
        `<button onClick={() => { playButton(); onSettings(); }} className="flex flex-col items-center gap-1 bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors">\n            <Settings className="text-slate-300" />\n            <span className="text-xs font-bold">Settings</span>\n          </button>`
    );

    fs.writeFileSync('src/components/HomeScreen.tsx', code);
}
