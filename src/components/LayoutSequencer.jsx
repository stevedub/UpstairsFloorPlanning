import React, { useState } from 'react'
import { sheetLayoutData } from '../data/sheetLayoutData.js'
import { Scissors, CheckCircle, ArrowRight, Filter, Search, Eye, Sparkles } from 'lucide-react'

export const LayoutSequencer = ({ activeStep, setActiveStep, onNavigateTo3D }) => {
  const [selectedRoom, setSelectedRoom] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const roomsList = [
    { id: 'all', label: 'All Rooms (20 Sheets)' },
    { id: 'Primary Bedroom', label: 'Primary Bedroom (Sheets 1–7)' },
    { id: 'Primary Closet', label: 'Primary Closet (Sheet 8)' },
    { id: 'Hallway', label: 'Hallway (Sheets 9–11)' },
    { id: 'Bedroom 2 (NW)', label: 'Bedroom 2 NW (Sheets 12–15)' },
    { id: 'Bedroom 2 Closet', label: 'Bed 2 Closet (Sheet 16)' },
    { id: 'Bedroom 3 (SW)', label: 'Bedroom 3 SW (Sheets 17–19)' },
    { id: 'Bedroom 3 Closets (North & South)', label: 'Bed 3 Closets (Sheet 20)' },
  ]

  const filteredSheets = sheetLayoutData.filter((sheet) => {
    const matchesRoom = selectedRoom === 'all' || sheet.room === selectedRoom
    const matchesStatus = selectedStatus === 'all' || sheet.status === selectedStatus
    const matchesSearch = sheet.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sheet.cutDimensions.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sheet.room.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesRoom && matchesStatus && matchesSearch
  })

  const fullCount = sheetLayoutData.filter(s => s.status === 'full').length
  const cutCount = sheetLayoutData.filter(s => s.status === 'cut').length

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
              <Scissors className="w-3.5 h-3.5" />
              <span>Cutting Blueprint & Layout Progression</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Plywood Sheet Cutting Catalog
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Follow this verified 20-sheet sequence starting from the Primary Bedroom outside corner. All cuts are planned to guarantee joint staggering of at least 24" (no four-corner seams) and maximum off-cut reuse.
            </p>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs">
            <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-emerald-400 font-bold text-lg">{fullCount}</div>
              <div className="text-slate-400 text-[10px] uppercase">Full Sheets</div>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-amber-400 font-bold text-lg">{cutCount}</div>
              <div className="text-slate-400 text-[10px] uppercase">Cut Pieces</div>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
              <div className="text-white font-bold text-lg">20</div>
              <div className="text-amber-400 text-[10px] uppercase">Total Sheets</div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-medium"
            >
              {roomsList.map(r => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>

            <div className="flex items-center space-x-1 p-1 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-3 py-1 rounded-lg transition ${selectedStatus === 'all' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'}`}
              >
                All ({sheetLayoutData.length})
              </button>
              <button
                onClick={() => setSelectedStatus('full')}
                className={`px-3 py-1 rounded-lg transition ${selectedStatus === 'full' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'}`}
              >
                Full Only ({fullCount})
              </button>
              <button
                onClick={() => setSelectedStatus('cut')}
                className={`px-3 py-1 rounded-lg transition ${selectedStatus === 'cut' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
              >
                Cuts Only ({cutCount})
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search sheet, room or cut..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Sheet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSheets.map((sheet) => {
          const isActive = activeStep === sheet.stepNumber
          const isFull = sheet.status === 'full'

          return (
            <div
              key={sheet.id}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'glass-panel-glow border-amber-500/50 bg-slate-900/95 ring-1 ring-amber-400/40'
                  : 'glass-panel border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
              }`}
              onClick={() => {
                setActiveStep(sheet.stepNumber)
                if (onNavigateTo3D) onNavigateTo3D()
              }}
            >
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center space-x-3">
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-black text-sm ${
                    isFull
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    #{sheet.sheetNumber}
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-white">{sheet.position}</div>
                    <div className="text-[11px] font-mono text-slate-400">{sheet.room}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isFull
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {sheet.type}
                  </span>
                </div>
              </div>

              {/* Specs & Dimensions */}
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 bg-slate-950/40 px-2.5 rounded-lg">
                  <span className="text-slate-400 font-mono">Installed Size:</span>
                  <span className="font-bold font-mono text-amber-300">{sheet.dimsText}</span>
                </div>

                <div className="flex justify-between items-start py-1 px-2.5">
                  <span className="text-slate-400 font-mono shrink-0">Cut Instructions:</span>
                  <span className="text-right text-slate-200 font-medium ml-2">{sheet.cutDimensions}</span>
                </div>

                <div className="flex justify-between items-start py-1 px-2.5 bg-slate-950/40 rounded-lg">
                  <span className="text-slate-400 font-mono shrink-0">Off-Cut Utilization:</span>
                  <span className="text-right text-emerald-400 font-medium ml-2">{sheet.offcut}</span>
                </div>

                <div className="flex justify-between items-center py-1 px-2.5">
                  <span className="text-slate-400 font-mono">Paulin Screws:</span>
                  <span className="font-mono text-slate-300">~{sheet.fastenersCount} screws (6" edge / 8" field)</span>
                </div>
              </div>

              {/* Action Link to 3D */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] italic">Step {sheet.stepNumber} of 20</span>
                <span className="text-amber-400 font-semibold flex items-center space-x-1 group">
                  <span>View in 3D Scene</span>
                  <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
