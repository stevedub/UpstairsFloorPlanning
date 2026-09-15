import React from 'react'
import { Layers, FileDown, ExternalLink, Heart } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Upstairs Flooring Master Guide</div>
              <div className="text-xs text-slate-400 font-mono">6 Prince David Ct, St. Catharines, ON</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
            <a
              href="/FloorPlan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-amber-400 transition"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Original FloorPlan.pdf</span>
            </a>
            <span>•</span>
            <a
              href="https://turkstralumber.com/products/1-2-4-x-8-bcx-fir-plywood"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-emerald-400 transition"
            >
              <span>Turkstra Plywood</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://www.homedepot.ca/product/lifeproof-cobblestone-7mm-x-8-7-in-w-x-47-6-in-l-22mil-click-lock-waterproof-luxury-vinyl-plank-flooring-20-06-sq-ft-case-/1001633102"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-blue-400 transition"
            >
              <span>LifeProof LVP</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-xs text-slate-500 font-mono text-center md:text-right">
            <span>Built with precision for </span>
            <span className="text-slate-300">stevedub</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
