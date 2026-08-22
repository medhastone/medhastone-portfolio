const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('SettingsScreen')) {
    code = "import SettingsScreen from './components/SettingsScreen';\n" + code;
}
if (!code.includes('ShopScreen')) {
    code = "import ShopScreen from './components/ShopScreen';\n" + code;
}
if (!code.includes('RanksScreen')) {
    code = "import RanksScreen from './components/RanksScreen';\n" + code;
}

code = code.replace(
    /export type ScreenState = 'HOME' \| 'GAME' \| 'VICTORY' \| 'GAMEOVER';/,
    `export type ScreenState = 'HOME' | 'GAME' | 'VICTORY' | 'GAMEOVER' | 'RANKS' | 'SHOP' | 'SETTINGS';`
);

code = code.replace(
    /\{screen === 'HOME' && <HomeScreen stats=\{stats\} onPlay=\{\(\) => setScreen\('GAME'\)\} \/>\}/,
    `{screen === 'HOME' && <HomeScreen stats={stats} onPlay={() => setScreen('GAME')} onRanks={() => setScreen('RANKS')} onShop={() => setScreen('SHOP')} onSettings={() => setScreen('SETTINGS')} />}\n        {screen === 'RANKS' && <RanksScreen stats={stats} onBack={() => setScreen('HOME')} />}\n        {screen === 'SHOP' && <ShopScreen stats={stats} updateStats={updateStats} onBack={() => setScreen('HOME')} />}\n        {screen === 'SETTINGS' && <SettingsScreen stats={stats} updateStats={updateStats} onBack={() => setScreen('HOME')} />}`
);

fs.writeFileSync('src/App.tsx', code);
