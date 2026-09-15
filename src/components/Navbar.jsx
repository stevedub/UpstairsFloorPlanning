import React from 'react'
import { Layers, DollarSign, Ruler, Compass, CheckSquare, Wrench, FileDown } from 'lucide-react'

export const Navbar = ({ activeSection, setActiveSection, totalSqFt, plywoodCount, flooringBoxes, totalCost }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'visualizer', label: '3D Floor & Cuts', icon: Layers },
    { id: 'sequencer', label: 'Cut Catalog', icon: Ruler },
    { id: 'calculator', label: 'Costs & Materials', icon: DollarSign },
    { id: 'gaps', label: 'Gaps & Spacing', icon: Ruler },
    { id: 'workflow', label: 'Build Guide', icon: CheckSquare },
    { id: 'tools', label: 'Tools Checklist', icon: Wrench },
  ]

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand & Project Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/30">
              <Layers className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white">Upstairs Flooring Hub</span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Interactive Planner
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">6 Prince David Ct, St. Catharines</p>
            </div>
          </div>

          {/* Quick Metrics Bar (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center space-x-2">
              <span className="text-slate-500">Floor:</span>
              <span className="font-bold text-amber-400">{totalSqFt} sq ft</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center space-x-2">
              <span className="text-slate-500">Plywood:</span>
              <span className="font-bold text-emerald-400">{plywoodCount} sheets</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center space-x-2">
              <span className="text-slate-500">LifeProof:</span>
              <span className="font-bold text-blue-400">{flooringBoxes} boxes</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center space-x-2">
              <span className="text-amber-500">Est. Total:</span>
              <span className="font-bold text-amber-300">${totalCost.toLocaleString('en-CA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} CAD</span>
            </div>
            <a
              href="/FloorPlan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Open original iGuide FloorPlan PDF"
            >
              <FileDown className="w-3.5 h-3.5 text-amber-400" />
              <span>PDF Plan</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 border-t border-slate-800/60 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
