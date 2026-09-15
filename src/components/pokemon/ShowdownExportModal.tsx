import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, Sparkles } from 'lucide-react';
import { Pokemon, TYPE_COLORS } from '../../data/pokemonData';

interface ShowdownExportModalProps {
  team: { pokemon: Pokemon; isShiny: boolean }[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ShowdownExportModal({ team, isOpen, onClose }: ShowdownExportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate official Pokémon Showdown team text
  const showdownText = team.map(({ pokemon, isShiny }) => {
    const primaryType = pokemon.types[0].charAt(0).toUpperCase() + pokemon.types[0].slice(1);
    const moves = [
      `${primaryType} Pulse`,
      'Protect',
      'Substitute',
      'Tera Blast'
    ];

    const shinyLine = isShiny ? '\nShiny: Yes' : '';
    return `${pokemon.name} @ Leftovers
Ability: Pressure${shinyLine}
Tera Type: ${primaryType}
EVs: 252 HP / 252 Atk / 4 Spe
Adamant Nature
- ${moves[0]}
- ${moves[1]}
- ${moves[2]}
- ${moves[3]}`;
  }).join('\n\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(showdownText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([showdownText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pokemon-showdown-team-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Export to Pokémon Showdown
              </h3>
              <p className="text-xs text-slate-400">
                Ready to paste into the Pokémon Showdown Team Builder (play.pokemonshowdown.com)
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text Area Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="relative">
            <textarea
              readOnly
              value={showdownText}
              rows={14}
              className="w-full font-mono text-xs p-4 rounded-xl bg-slate-950 border border-white/10 text-slate-300 focus:outline-none focus:border-red-500/50 resize-none select-all leading-relaxed"
            />
          </div>

          <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Formatted in standard Smogon / Showdown syntax with EV spreads, Items, Natures, and Tera Types.</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950/80 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={handleDownloadTxt}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download .txt File</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                copied 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Showdown Format</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
