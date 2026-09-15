import React, { useState } from 'react'
import { Home, Layers, CheckCircle2, XCircle, RotateCcw, Edit2, AlertCircle, FileText, ArrowRight, ShieldCheck } from 'lucide-react'

export const Overview = ({ rooms, setRooms, totalSqFt, onNavigate }) => {
  const [editingRoomId, setEditingRoomId] = useState(null)
  const [tempSqFt, setTempSqFt] = useState('')

  const handleStartEdit = (room) => {
    setEditingRoomId(room.id)
    setTempSqFt(room.sqft.toString())
  }

  const handleSaveEdit = (roomId) => {
    const val = parseFloat(tempSqFt)
    if (!isNaN(val) && val > 0) {
      setRooms(prev => prev.map(r => r.id === roomId ? { ...r, sqft: Math.round(val) } : r))
    }
    setEditingRoomId(null)
  }

  const handleResetDefaults = () => {
    setRooms([
      { id: 'primary', name: 'Primary Bedroom', dims: "11'6\" × 15'6\"", sqft: 158, type: 'bedroom', isIncluded: true, description: 'Main starting area for underlayment. Lay sheet #1 against outside wall corner.', color: '#3b82f6' },
      { id: 'primary-closet', name: 'Primary Bedroom Closet', dims: "7'6\" × 2'11\"", sqft: 22, type: 'closet', isIncluded: true, description: 'Double sliding door closet on south wall of Primary Bedroom.', color: '#60a5fa' },
      { id: 'bedroom-2', name: 'Bedroom 2 (North-West)', dims: "13'6\" × 9'0\"", sqft: 121, type: 'bedroom', isIncluded: true, description: 'Top-left bedroom facing front/side with window wall.', color: '#10b981' },
      { id: 'bedroom-2-closet', name: 'Bedroom 2 Closet', dims: "5'4\" × 2'7\"", sqft: 14, type: 'closet', isIncluded: true, description: 'South closet inside NW Bedroom.', color: '#34d399' },
      { id: 'bedroom-3', name: 'Bedroom 3 (South-West)', dims: "10'0\" × 11'3\"", sqft: 101, type: 'bedroom', isIncluded: true, description: 'Bottom-left bedroom with dual closet storage.', color: '#8b5cf6' },
      { id: 'bedroom-3-closet-n', name: 'Bedroom 3 North Closet', dims: "5'4\" × 2'7\"", sqft: 14, type: 'closet', isIncluded: true, description: 'Upper closet adjoining Bedroom 2 divider wall.', color: '#a78bfa' },
      { id: 'bedroom-3-closet-s', name: 'Bedroom 3 South Closet', dims: "5'8\" × 2'8\"", sqft: 15, type: 'closet', isIncluded: true, description: 'Lower alcove closet along south exterior wall.', color: '#c4b5fd' },
      { id: 'hallway', name: 'Central Hallway & Stair Landing', dims: "16'0\" × 5'0\" (approx)", sqft: 80, type: 'hallway', isIncluded: true, description: 'Connects all bedrooms and leads to stair nosing transition.', color: '#f59e0b' },
      { id: 'bath-5pc', name: '5PC Bathroom (EXCLUDED)', dims: "11'6\" × 7'1\"", sqft: 64, type: 'excluded', isIncluded: false, description: 'Excluded from new flooring. Threshold transition required at doorway.', color: '#64748b' },
      { id: 'bath-closet', name: 'Bathroom Closet (EXCLUDED)', dims: "4'10\" × 4'2\"", sqft: 20, type: 'excluded', isIncluded: false, description: 'Closet inside bathroom, excluded from new flooring.', color: '#475569' },
    ])
  }

  const includedRooms = rooms.filter(r => r.isIncluded)
  const excludedRooms = rooms.filter(r => !r.isIncluded)

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>2nd Floor Renovation • 6 Prince David Ct, St. Catharines, ON</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Upstairs Flooring <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Execution Hub</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Interactive guide, 3D sheet cut catalog, dynamic square footage and cost calculator, and tolerance standards for ripping up the old parquet, reinforcing the 1×6 diagonal slat subfloor, fastening 1/2" BCX fir plywood underlayment, and clicking together 22-mil LifeProof luxury vinyl plank.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('visualizer')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition"
            >
              <span>Explore 3D Floor & Cuts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('calculator')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 transition"
            >
              <span>View Materials & Costs</span>
            </button>
            <button
              onClick={() => onNavigate('gaps')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium text-sm border border-amber-500/30 transition"
            >
              <span>Crucial Gaps & Tolerances</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Build Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Layer 01 • Existing</div>
          <h3 className="font-bold text-white text-base mb-1">1×6 Diagonal Slats</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Parquet ripped up; solid 1x6 wood slats preserved over joists. Must be inspected for loose boards and re-screwed to eliminate squeaks before plywood.
          </p>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Layer 02 • Underlayment</div>
          <h3 className="font-bold text-white text-base mb-1">1/2" 4x8 BCX Fir Plywood</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Turkstra Lumber Douglas fir exterior underlayment. Sanded smooth face. Fastened with 1/8" sheet gaps and 24"+ joint stagger. No glue on wood slats.
          </p>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Layer 03 • Fasteners</div>
          <h3 className="font-bold text-white text-base mb-1">Paulin Floor Screws</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            #8 × 1-1/2" phosphate flat head square drive. 6" on panel edges, 8" in field. Countersunk flush to 1/32" below surface.
          </p>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">Layer 04 • Finish Flooring</div>
          <h3 className="font-bold text-white text-base mb-1">LifeProof Cobblestone LVP</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            7mm × 8.7" W × 47.6" L with 22-mil wear layer and attached acoustic pad. 100% waterproof click-lock. 1/4" expansion perimeter gap.
          </p>
        </div>
      </div>

      {/* Interactive Room Breakdown & Square Footage */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>Interactive Square Footage & Room Breakdown</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                {includedRooms.length} Included Areas
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Click any square footage value to edit on-site measurements. Excluded spaces are safely locked out.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700 transition"
              title="Reset all rooms to baseline 525 sq ft"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset to 525 sq ft</span>
            </button>
            <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-right">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-amber-400">Total Net Area</div>
              <div className="text-2xl font-black font-mono text-white">{totalSqFt} <span className="text-sm font-normal text-amber-400">sq ft</span></div>
            </div>
          </div>
        </div>

        {/* Room Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-wider">
                <th className="pb-3 font-semibold">Room / Space</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Dimensions</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Net Area</th>
                <th className="pb-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {includedRooms.map((room) => (
                <tr key={room.id} className="hover:bg-slate-900/50 transition">
                  <td className="py-3.5 pr-4">
                    <div className="font-semibold text-white flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: room.color }} />
                      <span>{room.name}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{room.description}</div>
                  </td>
                  <td className="py-3.5 pr-4 text-xs font-mono capitalize text-slate-300">
                    <span className={`px-2 py-0.5 rounded-md ${room.type === 'bedroom' ? 'bg-blue-500/10 text-blue-400' : room.type === 'closet' ? 'bg-purple-500/10 text-purple-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {room.type}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-xs font-mono text-slate-300">{room.dims}</td>
                  <td className="py-3.5 pr-4">
                    <span className="inline-flex items-center space-x-1 text-xs text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Included</span>
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-right font-mono font-bold text-white text-base">
                    {editingRoomId === room.id ? (
                      <div className="flex items-center justify-end space-x-2">
                        <input
                          type="number"
                          value={tempSqFt}
                          onChange={(e) => setTempSqFt(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(room.id)}
                          className="w-20 px-2 py-1 text-sm bg-slate-950 border border-amber-500 rounded text-right font-mono text-white focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(room.id)}
                          className="px-2 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <span>{room.sqft} sq ft</span>
                    )}
                  </td>
                  <td className="py-3.5 text-center">
                    {editingRoomId === room.id ? null : (
                      <button
                        onClick={() => handleStartEdit(room)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition"
                        title="Edit square footage"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {/* Excluded Spaces */}
              {excludedRooms.map((room) => (
                <tr key={room.id} className="bg-slate-950/40 opacity-60">
                  <td className="py-3.5 pr-4">
                    <div className="font-medium text-slate-400 flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                      <span>{room.name}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{room.description}</div>
                  </td>
                  <td className="py-3.5 pr-4 text-xs font-mono text-slate-500">Excluded</td>
                  <td className="py-3.5 pr-4 text-xs font-mono text-slate-500">{room.dims}</td>
                  <td className="py-3.5 pr-4">
                    <span className="inline-flex items-center space-x-1 text-xs text-slate-500 font-medium">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Excluded</span>
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-right font-mono text-slate-500 text-sm">
                    {room.sqft} sq ft
                  </td>
                  <td className="py-3.5 text-center text-xs text-slate-600 font-mono">
                    Locked
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Warning / Note Alert */}
        <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start space-x-3">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Square Footage Verification:</span> Baseline is tuned to exactly <strong className="text-white">525 sq ft</strong> incorporating all 3 bedrooms, the hallway, and all 4 closets (Primary, Bed 2, Bed 3 North, Bed 3 South). When purchasing materials, we factor a standard recommended overage buffer (15% to 20%) to ensure you never run short during cuts.
          </div>
        </div>
      </div>
    </div>
  )
}
