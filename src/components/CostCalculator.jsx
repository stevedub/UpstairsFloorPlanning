import React, { useState } from 'react'
import { productsData } from '../data/productsData.js'
import { DollarSign, ExternalLink, RefreshCw, ShoppingCart, ShieldCheck, AlertCircle, Sparkles, Percent } from 'lucide-react'

export const CostCalculator = ({ totalSqFt, setTotalSqFt, plywoodCount, setPlywoodCount, flooringBoxes, setFlooringBoxes, totalCost, setTotalCost }) => {
  const [wastePercent, setWastePercent] = useState(15) // 15% standard recommended
  const [customWaste, setCustomWaste] = useState('15')
  const [includeTax, setIncludeTax] = useState(true) // Ontario HST 13%

  const { plywood, flooring, screws, bufferPresets } = productsData

  // Calculations
  const effectiveArea = totalSqFt * (1 + wastePercent / 100)

  // Plywood calculation (32 sq ft per 4x8 sheet)
  const rawPlywood = totalSqFt / plywood.unitSqFt
  const calculatedPlywood = Math.ceil(effectiveArea / plywood.unitSqFt)
  const plywoodSubtotal = calculatedPlywood * plywood.pricePerUnit

  // LifeProof calculation (20.06 sq ft per case)
  const rawFlooring = totalSqFt / flooring.coveragePerCase
  const calculatedFlooring = Math.ceil(effectiveArea / flooring.coveragePerCase)
  const flooringSubtotal = calculatedFlooring * flooring.pricePerUnit

  // Screws calculation (APA 6" edge / 8" field = ~80/sheet + 300 for 1x6 slat subfloor squeaks)
  const totalScrewsNeeded = (calculatedPlywood * screws.screwsPerSheetAverage) + screws.subfloorSqueakAllowance
  const calculatedScrewsBoxes = Math.max(1, Math.ceil(totalScrewsNeeded / screws.countPerBox))
  const screwsSubtotal = calculatedScrewsBoxes * screws.pricePerUnit

  // Grand Totals
  const subtotal = plywoodSubtotal + flooringSubtotal + screwsSubtotal
  const taxAmount = includeTax ? subtotal * 0.13 : 0
  const grandTotal = subtotal + taxAmount
  const costPerSqFt = subtotal / totalSqFt

  // Sync with parent props
  React.useEffect(() => {
    if (setPlywoodCount) setPlywoodCount(calculatedPlywood)
    if (setFlooringBoxes) setFlooringBoxes(calculatedFlooring)
    if (setTotalCost) setTotalCost(grandTotal)
  }, [calculatedPlywood, calculatedFlooring, grandTotal])

  const handlePresetClick = (val) => {
    setWastePercent(val)
    setCustomWaste(val.toString())
  }

  const handleCustomWasteChange = (val) => {
    setCustomWaste(val)
    const num = parseFloat(val)
    if (!isNaN(num) && num >= 0 && num <= 50) {
      setWastePercent(num)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header & Waste Buffer Controls */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Live Estimator & Over-Purchase Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Flooring Materials & Budget Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Calculates exact material requirements for your <strong>{totalSqFt} sq ft</strong> upstairs floor. Includes standard overage buffers for cut-offs and staggering, plus direct links and return policies.
            </p>
          </div>

          {/* Quick Total Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-right min-w-[220px]">
            <div className="text-[10px] uppercase font-mono tracking-wider text-amber-400">Estimated Total (CAD)</div>
            <div className="text-3xl font-black font-mono text-white tracking-tight">
              ${grandTotal.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-400 font-mono mt-1">
              ~${costPerSqFt.toFixed(2)}/sq ft (net) {includeTax && '• incl. 13% HST'}
            </div>
          </div>
        </div>

        {/* Waste Buffer Selector */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Percent className="w-4 h-4 text-amber-400" />
              <span>Over-Purchase / Waste Cut-Off Buffer</span>
            </div>
            <p className="text-xs text-slate-400">
              Industry standard for 3 bedrooms + hallway + closets is <strong className="text-amber-300">15% to 20%</strong>. Excess unopened boxes can be returned.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {bufferPresets.map(preset => (
              <button
                key={preset.value}
                onClick={() => handlePresetClick(preset.value)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex flex-col items-center ${
                  wastePercent === preset.value
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                <span>+{preset.value}%</span>
                <span className="text-[9px] font-normal opacity-80">{preset.value === 15 ? 'Recommended' : preset.value === 10 ? 'Tight' : 'Safety'}</span>
              </button>
            ))}

            {/* Custom Buffer Input */}
            <div className="flex items-center space-x-1 bg-slate-900 border border-slate-700 px-2.5 py-1.5 rounded-xl">
              <span className="text-xs text-slate-400 font-mono">+</span>
              <input
                type="number"
                min="0"
                max="50"
                value={customWaste}
                onChange={(e) => handleCustomWasteChange(e.target.value)}
                className="w-10 bg-transparent text-xs font-mono font-bold text-amber-400 focus:outline-none text-center"
              />
              <span className="text-xs text-slate-400 font-mono">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Material Product Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Turkstra Plywood Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Underlayment Layer
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">{plywood.name}</h3>
                <div className="text-xs text-slate-400">{plywood.retailer} • {plywood.material}</div>
              </div>
              <a
                href={plywood.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="View on Turkstra Lumber"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 my-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Unit Price:</span>
                <span className="text-white font-bold">${plywood.pricePerUnit.toFixed(2)} CAD / sheet</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Coverage / Sheet:</span>
                <span className="text-white font-bold">{plywood.unitSqFt} sq ft (4' × 8')</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Raw Need:</span>
                <span className="text-slate-300">{rawPlywood.toFixed(1)} sheets</span>
              </div>
              <div className="flex justify-between text-amber-400 font-bold pt-1 border-t border-slate-800">
                <span>Purchasing (+{wastePercent}%):</span>
                <span className="text-base">{calculatedPlywood} sheets</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Covers {(calculatedPlywood * plywood.unitSqFt)} sq ft ({Math.round(calculatedPlywood * plywood.unitSqFt - totalSqFt)} sq ft overage)
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {plywood.notes}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Subtotal:</span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                ${plywoodSubtotal.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 mt-2 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{plywood.returnPolicy}</span>
            </div>
          </div>
        </div>

        {/* 2. Home Depot LifeProof LVP Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Finish Floor
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">{flooring.name}</h3>
                <div className="text-xs text-slate-400">{flooring.retailer} • SKU #{flooring.sku}</div>
              </div>
              <a
                href={flooring.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="View on Home Depot Canada"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 my-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Unit Price:</span>
                <span className="text-white font-bold">${flooring.pricePerUnit.toFixed(2)} CAD / case</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Case Coverage:</span>
                <span className="text-white font-bold">{flooring.coveragePerCase} sq ft / case</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Raw Need:</span>
                <span className="text-slate-300">{rawFlooring.toFixed(1)} cases</span>
              </div>
              <div className="flex justify-between text-blue-400 font-bold pt-1 border-t border-slate-800">
                <span>Purchasing (+{wastePercent}%):</span>
                <span className="text-base">{calculatedFlooring} cases</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Covers {(calculatedFlooring * flooring.coveragePerCase).toFixed(1)} sq ft (~{Math.round(calculatedFlooring * flooring.coveragePerCase - totalSqFt)} sq ft overage)
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {flooring.notes}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Subtotal:</span>
              <span className="text-xl font-bold font-mono text-blue-400">
                ${flooringSubtotal.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 mt-2 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>{flooring.returnPolicy}</span>
            </div>
          </div>
        </div>

        {/* 3. Home Depot Paulin Screws Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Fasteners & Screws
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">{screws.name}</h3>
                <div className="text-xs text-slate-400">{screws.retailer} • SKU #{screws.sku}</div>
              </div>
              <a
                href={screws.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="View on Home Depot Canada"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 my-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Unit Price:</span>
                <span className="text-white font-bold">${screws.pricePerUnit.toFixed(2)} CAD / box</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Count / Box:</span>
                <span className="text-white font-bold">{screws.countPerBox} screws</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Plywood Fasteners:</span>
                <span className="text-slate-300">~{(calculatedPlywood * screws.screwsPerSheetAverage)} pcs (6" edge / 8" field)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>1×6 Slat Squeak Fix:</span>
                <span className="text-slate-300">~{screws.subfloorSqueakAllowance} pcs into joists</span>
              </div>
              <div className="flex justify-between text-amber-400 font-bold pt-1 border-t border-slate-800">
                <span>Purchasing ({totalScrewsNeeded} pcs):</span>
                <span className="text-base">{calculatedScrewsBoxes} boxes ({calculatedScrewsBoxes * screws.countPerBox} pcs)</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {screws.notes}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Subtotal:</span>
              <span className="text-xl font-bold font-mono text-amber-400">
                ${screwsSubtotal.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 mt-2 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{screws.returnPolicy}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Budget Summary Breakdown Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-amber-400" />
            <span>Complete Bill of Materials (BOM)</span>
          </h3>

          <label className="flex items-center space-x-2 text-xs font-mono cursor-pointer">
            <input
              type="checkbox"
              checked={includeTax}
              onChange={(e) => setIncludeTax(e.target.checked)}
              className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
            />
            <span className="text-slate-300">Include Ontario HST (13%)</span>
          </label>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-mono uppercase text-slate-400">
                <th className="pb-3">Item Description</th>
                <th className="pb-3">Source Retailer</th>
                <th className="pb-3 text-center">Unit Price</th>
                <th className="pb-3 text-center">Quantity</th>
                <th className="pb-3 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-xs sm:text-sm">
              <tr>
                <td className="py-3 font-semibold text-white">1/2" 4x8 BCX Fir Plywood Underlayment</td>
                <td className="py-3 text-slate-400">{plywood.retailer}</td>
                <td className="py-3 text-center text-slate-300">${plywood.pricePerUnit.toFixed(2)}</td>
                <td className="py-3 text-center text-amber-300 font-bold">{calculatedPlywood} sheets</td>
                <td className="py-3 text-right text-white font-bold">${plywoodSubtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-white">LifeProof Cobblestone 22-MIL Click LVP (20.06 sq ft)</td>
                <td className="py-3 text-slate-400">{flooring.retailer}</td>
                <td className="py-3 text-center text-slate-300">${flooring.pricePerUnit.toFixed(2)}</td>
                <td className="py-3 text-center text-blue-300 font-bold">{calculatedFlooring} cases</td>
                <td className="py-3 text-right text-white font-bold">${flooringSubtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-white">Paulin #8 x 1-1/2" Floor Screws (500 pcs)</td>
                <td className="py-3 text-slate-400">{screws.retailer}</td>
                <td className="py-3 text-center text-slate-300">${screws.pricePerUnit.toFixed(2)}</td>
                <td className="py-3 text-center text-amber-300 font-bold">{calculatedScrewsBoxes} boxes</td>
                <td className="py-3 text-right text-white font-bold">${screwsSubtotal.toFixed(2)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-700 text-xs text-slate-400">
                <td colSpan={4} className="pt-3 text-right">Materials Subtotal:</td>
                <td className="pt-3 text-right font-mono font-bold text-slate-200">${subtotal.toFixed(2)} CAD</td>
              </tr>
              {includeTax && (
                <tr className="text-xs text-slate-400">
                  <td colSpan={4} className="py-1 text-right">Ontario HST (13%):</td>
                  <td className="py-1 text-right font-mono text-slate-300">${taxAmount.toFixed(2)} CAD</td>
                </tr>
              )}
              <tr className="text-base text-white border-t border-slate-800">
                <td colSpan={4} className="pt-3 text-right font-bold">Estimated Grand Total:</td>
                <td className="pt-3 text-right font-mono font-black text-amber-400 text-lg sm:text-xl">
                  ${grandTotal.toFixed(2)} CAD
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Return & Purchase Strategy Tip */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3 text-xs text-slate-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-white">Zero-Risk Return Strategy:</strong> The Home Depot Canada accepts returns of unopened, undamaged flooring cartons for <strong>90 days</strong> with original receipt. Turkstra Lumber accepts returns of clean, uncut stock plywood sheets. Purchasing with the recommended <strong>+{wastePercent}% overage</strong> guarantees you won't stall the installation waiting for a single box or sheet, and you can simply return any leftover unopened boxes once the project is finished!
          </div>
        </div>
      </div>
    </div>
  )
}
