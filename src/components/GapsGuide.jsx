import React, { useState } from 'react'
import { gapsData } from '../data/gapsData.js'
import { Ruler, AlertTriangle, CheckCircle2, Info, Layers, Maximize2, Scissors, ChevronsRight, Disc } from 'lucide-react'

export const GapsGuide = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All 8 Rules' },
    { id: 'Underlayment Plywood', label: 'Plywood Gaps' },
    { id: 'Fasteners & Screws', label: 'Screw Spacing & Depth' },
    { id: 'LifeProof Luxury Vinyl', label: 'LifeProof Expansion' },
    { id: 'Doorways & Trim', label: 'Door Jambs & Thresholds' },
  ]

  const filteredGaps = activeCategory === 'all'
    ? gapsData
    : gapsData.filter(g => g.category === activeCategory)

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Critical Installation Tolerances</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Gaps, Spacing & Expansion Master Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Floors fail when materials don't have room to breathe or when fasteners pinch and pivot. Follow these exact expansion gaps and screw spacings during your build to ensure a silent, lifetime floor without buckling or clicks.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 font-mono text-xs text-amber-300">
            <span className="font-bold">Golden Rule:</span> 1/8" between plywood sheets, 1/4" around all vinyl perimeter walls.
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Reference Summary Cheatsheet Card */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 overflow-x-auto">
        <h3 className="text-base font-bold text-white mb-3 flex items-center space-x-2 font-mono">
          <Ruler className="w-4 h-4 text-amber-400" />
          <span>Quick Reference Cheatsheet (Take Upstairs While Working)</span>
        </h3>
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <th className="pb-2">Location / Material Interface</th>
              <th className="pb-2">Required Gap / Spacing</th>
              <th className="pb-2">Standard Spacer Tool</th>
              <th className="pb-2 text-right">Risk If Ignored</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            <tr>
              <td className="py-2.5 font-bold text-white">Between 4x8 Plywood Sheets (Edges & Ends)</td>
              <td className="py-2.5 text-amber-300 font-bold">1/8 inch (3 mm)</td>
              <td className="py-2.5">8d common nail or 1/8" spacer</td>
              <td className="py-2.5 text-right text-red-400">Sheets expand, peak & tent in summer</td>
            </tr>
            <tr>
              <td className="py-2.5 font-bold text-white">Plywood Edge to Perimeter Walls</td>
              <td className="py-2.5 text-amber-300 font-bold">1/4" to 1/2"</td>
              <td className="py-2.5">1/4" plywood scrap or plastic shims</td>
              <td className="py-2.5 text-right text-red-400">Floor binds against framing, center buckles</td>
            </tr>
            <tr>
              <td className="py-2.5 font-bold text-white">Plywood Screw Perimeter Edge Distance</td>
              <td className="py-2.5 text-emerald-300 font-bold">3/8" to 1/2" in from edge</td>
              <td className="py-2.5">Tape mark on driver or finger gauge</td>
              <td className="py-2.5 text-right text-amber-400">Edge splits/blows out, screw loses grip</td>
            </tr>
            <tr>
              <td className="py-2.5 font-bold text-white">Plywood Screw Spacing</td>
              <td className="py-2.5 text-emerald-300 font-bold">6" on edges, 8" in field</td>
              <td className="py-2.5">Chalk grid snapped across sheet</td>
              <td className="py-2.5 text-right text-amber-400">Underlayment squeaks over 1x6 slats</td>
            </tr>
            <tr>
              <td className="py-2.5 font-bold text-white">Screw Head Countersink Depth</td>
              <td className="py-2.5 text-emerald-300 font-bold">Flush or 1/32" below face</td>
              <td className="py-2.5">10" Drywall taping knife sweep test</td>
              <td className="py-2.5 text-right text-red-400">Clicks under foot; punctures vinyl pad</td>
            </tr>
            <tr>
              <td className="py-2.5 font-bold text-white">LifeProof Vinyl to All Perimeter Walls</td>
              <td className="py-2.5 text-blue-300 font-bold">1/4 inch (6 mm) minimum</td>
              <td className="py-2.5">1/4" flooring wedge spacers</td>
              <td className="py-2.5 text-right text-red-400">Floor cannot float; seams pop open</td>
            </tr>
            <tr>
              <td className="py-2.5 font-bold text-white">LifeProof Plank End-Joint Stagger</td>
              <td className="py-2.5 text-blue-300 font-bold">Minimum 8 inches (200 mm)</td>
              <td className="py-2.5">Tape measure / Speed square</td>
              <td className="py-2.5 text-right text-amber-400">Weak row lock; unsightly staircase pattern</td>
            </tr>
            <tr>
              <td className="py-2.5 font-bold text-white">Door Casing & Jamb Undercut</td>
              <td className="py-2.5 text-purple-300 font-bold">Plank Thickness + 1/16"</td>
              <td className="py-2.5">Scrap plank + Oscillating multi-tool</td>
              <td className="py-2.5 text-right text-red-400">Plank is pinched tight; cannot float</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Detailed Cards for Each Gap Rule with Interactive Diagrams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGaps.map((rule) => {
          const isCritical = rule.importance === 'CRITICAL'

          return (
            <div
              key={rule.id}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 flex flex-col justify-between"
            >
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-slate-400">
                    {rule.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    isCritical
                      ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {rule.importance}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{rule.title}</h3>

                {/* Dimension Callout Banner */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between mb-4">
                  <span className="text-xs text-slate-400 font-mono">Tolerance Spec:</span>
                  <span className="text-base font-black font-mono text-amber-400">{rule.dimension}</span>
                </div>

                {/* Visual Gap Diagram Simulation */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-4">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Cross-Section Diagram</div>
                  
                  <div className="flex items-center justify-between h-14 bg-slate-900 rounded-lg p-2 relative overflow-hidden border border-slate-800">
                    {/* Left Block */}
                    <div className="w-[42%] h-full bg-slate-800 rounded flex items-center justify-center text-[11px] font-semibold text-slate-300 border border-slate-700">
                      {rule.diagram.leftLabel}
                    </div>

                    {/* Gap Indicator */}
                    <div className="w-[16%] flex flex-col items-center justify-center relative">
                      <div className="w-full border-t-2 border-dashed border-amber-400" />
                      <span className="text-[9px] font-bold font-mono text-amber-400 mt-1 whitespace-nowrap">
                        {rule.diagram.gapLabel}
                      </span>
                    </div>

                    {/* Right Block */}
                    <div className="w-[42%] h-full bg-slate-800 rounded flex items-center justify-center text-[11px] font-semibold text-slate-300 border border-slate-700">
                      {rule.diagram.rightLabel}
                    </div>
                  </div>

                  <div className="mt-2 text-[10px] font-mono text-center text-slate-500">
                    Base: {rule.diagram.subfloorLabel}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {rule.summary}
                </p>

                {/* Why it Matters */}
                <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20 text-xs text-slate-300 space-y-1 mb-4">
                  <div className="font-bold text-red-400 text-[11px] uppercase tracking-wider flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Why This Rule Is Non-Negotiable:</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {rule.reasonWhy}
                  </p>
                </div>
              </div>

              {/* Pro Tip Box */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Pro Job-Site Tip: </strong>
                  <span>{rule.proTip}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
