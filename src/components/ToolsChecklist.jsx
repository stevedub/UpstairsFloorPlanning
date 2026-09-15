import React, { useState, useEffect } from 'react'
import { toolsAndSupplies } from '../data/buildStepsData.js'
import { Wrench, CheckCircle, Circle, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react'

export const ToolsChecklist = () => {
  const [checkedTools, setCheckedTools] = useState(() => {
    try {
      const saved = localStorage.getItem('flooring_tools_checked')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('flooring_tools_checked', JSON.stringify(checkedTools))
    } catch (e) {
      console.error(e)
    }
  }, [checkedTools])

  const toggleTool = (toolName) => {
    setCheckedTools(prev => ({ ...prev, [toolName]: !prev[toolName] }))
  }

  const allItems = toolsAndSupplies.flatMap(c => c.items)
  const totalItems = allItems.length
  const checkedCount = Object.values(checkedTools).filter(Boolean).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>Tool Kit & Equipment Readiness</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Essential Tools & Supplies Checklist
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Ensure you have all necessary equipment on-site before starting demo or cutting underlayment. Having the right tools avoids costly project halts.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-right">
            <div className="text-slate-400 text-[10px] uppercase">Tools Ready</div>
            <div className="text-xl font-bold text-amber-400">{checkedCount} <span className="text-slate-500 text-sm">/ {totalItems}</span></div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {toolsAndSupplies.map((cat, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 pb-3 border-b border-slate-800">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{cat.category}</span>
            </h3>

            <div className="space-y-2.5">
              {cat.items.map((item, itemIdx) => {
                const isChecked = !!checkedTools[item.name]

                return (
                  <div
                    key={itemIdx}
                    onClick={() => toggleTool(item.name)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start space-x-3 select-none ${
                      isChecked
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <button type="button" className="mt-0.5 shrink-0 focus:outline-none">
                      {isChecked ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600 hover:text-amber-400" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs sm:text-sm font-semibold ${isChecked ? 'text-slate-400 line-through' : 'text-white'}`}>
                          {item.name}
                        </span>
                        {item.essential && (
                          <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            Must Have
                          </span>
                        )}
                      </div>
                      <p className={`text-xs mt-0.5 leading-relaxed ${isChecked ? 'text-slate-500' : 'text-slate-400'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
