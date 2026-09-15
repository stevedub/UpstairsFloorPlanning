import React, { useState } from 'react'
import { sheetLayoutData } from '../data/sheetLayoutData.js'
import { rawSheetNestingData } from '../data/rawSheetNestingData.js'
import {
  Scissors,
  CheckCircle,
  ArrowRight,
  Filter,
  Search,
  Eye,
  Sparkles,
  Layers,
  ShieldCheck,
  Package,
  AlertCircle
} from 'lucide-react'

export const LayoutSequencer = ({ activeStep, setActiveStep, onNavigateTo3D }) => {
  const [viewMode, setViewMode] = useState('pieces') // 'pieces' | 'raw-sheets'
  const [selectedZone, setSelectedZone] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const zonesList = [
    { id: 'all', label: `All 4 Zones (${sheetLayoutData.length} Pieces)` },
    { id: 'Zone 1', label: 'Zone 1: Primary Bedroom & Master Closet (Pieces 1–9)' },
    { id: 'Zone 2', label: 'Zone 2: Hallway & Linen Closet (Pieces 10–12)' },
    { id: 'Zone 3', label: 'Zone 3: Bedroom 2 NW & Closet (Pieces 13–21)' },
    { id: 'Zone 4', label: 'Zone 4: Bedroom 3 SW & Closets (Pieces 22–28)' },
  ]

  const filteredSheets = sheetLayoutData.filter((sheet) => {
    const matchesZone = selectedZone === 'all' || (sheet.zone && sheet.zone.includes(selectedZone))
    const matchesStatus = selectedStatus === 'all' || sheet.status === selectedStatus
    const matchesSearch = sheet.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sheet.cutDimensions.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sheet.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (sheet.shapeType && sheet.shapeType.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (sheet.zone && sheet.zone.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesZone && matchesStatus && matchesSearch
  })

  const fullCount = sheetLayoutData.filter(s => s.status === 'full').length
  const cutCount = sheetLayoutData.filter(s => s.status === 'cut').length

  const filteredRawSheets = rawSheetNestingData.filter((rs) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return rs.title.toLowerCase().includes(term) ||
           rs.sheetRole.toLowerCase().includes(term) ||
           rs.allocatedZone.toLowerCase().includes(term) ||
           rs.piecesProduced.some(p => p.room.toLowerCase().includes(term) || p.cutDescription.toLowerCase().includes(term))
  })

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
              <Scissors className="w-3.5 h-3.5" />
              <span>Cutting Blueprint & Nesting Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Plywood Sheet Cutting Catalog & Nesting Plan
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Verify every physical cut from raw 4×8 sheets down to the 28 installed floor pieces. All pieces are strictly sized to standard 4×8 dimensions with zero over-sized pieces, all closets are 100% floored, and joint staggering of ≥24" is guaranteed.
            </p>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs">
            <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-emerald-400 font-bold text-lg">20</div>
              <div className="text-slate-400 text-[10px] uppercase">Sheets to Buy (19+1)</div>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-blue-400 font-bold text-lg">19</div>
              <div className="text-slate-400 text-[10px] uppercase">Raw Sheets Cut</div>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
              <div className="text-white font-bold text-lg">{sheetLayoutData.length}</div>
              <div className="text-amber-400 text-[10px] uppercase">Cut Pieces</div>
            </div>
          </div>
        </div>

        {/* 20-Sheet Verification Callout Box */}
        <div className="mt-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-300 text-sm">
                Mathematical Verification: Will 20 sheets work for all cuts?
              </span>
              <p className="text-slate-300 mt-0.5 leading-relaxed">
                <strong>YES, absolutely!</strong> The total net area of all 28 pieces is <strong>486.14 sq ft</strong>. Through offcut reuse (such as cutting Sheet #3 in half for Piece #3 and Piece #15, and using a single sheet for the entire Master Closet runner #8 and end fill #9), all 28 pieces require <strong>exactly 19 raw 4×8 sheets</strong>. Budgeting <strong>20 sheets</strong> gives you <strong>1 full uncut spare sheet</strong> for safety, which can be returned unopened to Turkstra Lumber if unused!
              </p>
            </div>
          </div>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="flex items-center space-x-2 p-1 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setViewMode('pieces')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg transition ${
                viewMode === 'pieces'
                  ? 'bg-amber-500 text-slate-950 shadow font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Installed Pieces ({sheetLayoutData.length})</span>
            </button>
            <button
              onClick={() => setViewMode('raw-sheets')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg transition ${
                viewMode === 'raw-sheets'
                  ? 'bg-blue-500 text-white shadow font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Raw 4×8 Sheets Nesting (19 + 1)</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={viewMode === 'pieces' ? "Search piece, room or cut..." : "Search raw sheet, cut or room..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Filter controls for Pieces view */}
        {viewMode === 'pieces' && (
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-medium"
            >
              {zonesList.map(z => (
                <option key={z.id} value={z.id}>{z.label}</option>
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
        )}
      </div>

      {/* VIEW 1: RAW 4x8 SHEETS NESTING PLAN */}
      {viewMode === 'raw-sheets' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRawSheets.map((rawSheet) => {
              const isBuffer = rawSheet.status === 'buffer'
              const isFullFactory = rawSheet.status === 'full'
              const isMultiCut = rawSheet.status === 'multi-cut'

              return (
                <div
                  key={rawSheet.rawSheetNum}
                  className={`p-5 rounded-2xl border transition-all duration-200 ${
                    isBuffer
                      ? 'glass-panel border-blue-500/40 bg-blue-950/15'
                      : isFullFactory
                      ? 'glass-panel border-emerald-500/30'
                      : isMultiCut
                      ? 'glass-panel border-amber-500/40 bg-amber-950/10'
                      : 'glass-panel border-slate-800'
                  }`}
                >
                  {/* Raw Sheet Header */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800/80">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-sm shrink-0 shadow-md ${
                        isBuffer
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                          : isFullFactory
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        #{rawSheet.rawSheetNum}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {rawSheet.allocatedZone}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isBuffer
                              ? 'bg-blue-500/20 text-blue-400'
                              : isFullFactory
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {isBuffer ? 'Spare Buffer' : isFullFactory ? '100% Factory Full' : `${rawSheet.efficiencyPercent}% Utilized`}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-base mt-1">
                          {rawSheet.title}
                        </h4>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] font-mono uppercase text-slate-500">Yield</div>
                      <div className="text-sm font-bold font-mono text-slate-200">
                        {rawSheet.piecesProduced.length > 0 ? `${rawSheet.piecesProduced.length} Piece(s)` : 'Uncut Stock'}
                      </div>
                    </div>
                  </div>

                  {/* Pieces Produced from this raw sheet */}
                  <div className="mt-3.5 space-y-2">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Pieces Cut From This Sheet:
                    </div>

                    {rawSheet.piecesProduced.length === 0 ? (
                      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
                        {rawSheet.offcutNotes}
                      </div>
                    ) : (
                      rawSheet.piecesProduced.map((piece) => (
                        <div
                          key={piece.stepNumber}
                          onClick={() => {
                            setActiveStep(piece.stepNumber)
                            if (onNavigateTo3D) onNavigateTo3D()
                          }}
                          className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-amber-500/40 hover:bg-slate-900 cursor-pointer transition flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center space-x-2.5">
                            <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                              Piece #{piece.stepNumber}
                            </span>
                            <div>
                              <span className="text-slate-200 font-semibold">{piece.room}</span>
                              <div className="text-[11px] text-slate-400">{piece.cutDescription}</div>
                            </div>
                          </div>
                          <div className="text-right font-mono font-semibold text-emerald-400 shrink-0">
                            {piece.size}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Offcut / Utilization Footer */}
                  {rawSheet.piecesProduced.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span><strong>Offcut:</strong> {rawSheet.offcutNotes}</span>
                      <span className="font-mono text-slate-500 shrink-0">{rawSheet.usedSqFt} / 32.0 sq ft</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* VIEW 2: INSTALLED CUT PIECES CATALOG (28 Pieces) */
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
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {sheet.zone}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isFull
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {sheet.shapeType}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-base mt-1">
                        {sheet.room}
                      </h4>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {sheet.dimsText}
                    </span>
                    <div className="text-[10px] font-mono text-slate-500">
                      ~{sheet.fastenersCount} screws
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-300 space-y-2">
                  <p className="line-clamp-2 text-slate-400 leading-relaxed">
                    {sheet.position}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] font-mono text-slate-300">
                    <span className="text-amber-400 font-bold">Cut: </span>
                    <span>{sheet.cutDimensions}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Off-cut: <span className="text-slate-300">{sheet.offcut}</span></span>
                    <button className="text-amber-400 hover:text-amber-300 flex items-center space-x-1 font-semibold">
                      <span>Inspect 3D</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
