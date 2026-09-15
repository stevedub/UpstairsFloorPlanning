import React, { useState, useEffect } from 'react'
import { buildWorkflowPhases } from '../data/buildStepsData.js'
import confetti from 'canvas-confetti'
import { CheckSquare, Square, ChevronDown, ChevronUp, AlertCircle, Sparkles, CheckCircle2, RotateCcw, Clock } from 'lucide-react'

export const BuildWorkflow = () => {
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('flooring_tasks_completed')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const [expandedPhases, setExpandedPhases] = useState({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true })

  useEffect(() => {
    try {
      localStorage.setItem('flooring_tasks_completed', JSON.stringify(completedTasks))
    } catch (e) {
      console.error(e)
    }
  }, [completedTasks])

  // Count total and completed tasks
  const allTasks = buildWorkflowPhases.flatMap(p => p.tasks)
  const totalTasksCount = allTasks.length
  const completedTasksCount = Object.values(completedTasks).filter(Boolean).length
  const progressPercent = Math.round((completedTasksCount / totalTasksCount) * 100)

  const toggleTask = (taskId, phaseNumber) => {
    const isNowDone = !completedTasks[taskId]
    const updated = { ...completedTasks, [taskId]: isNowDone }
    setCompletedTasks(updated)

    if (isNowDone) {
      // Check if this phase just hit 100%
      const currentPhase = buildWorkflowPhases.find(p => p.phase === phaseNumber)
      const phaseAllDone = currentPhase.tasks.every(t => t.id === taskId ? true : updated[t.id])

      if (phaseAllDone) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    }
  }

  const togglePhaseExpand = (phaseNum) => {
    setExpandedPhases(prev => ({ ...prev, [phaseNum]: !prev[phaseNum] }))
  }

  const handleResetChecklist = () => {
    if (window.confirm('Reset all checklist task progress?')) {
      setCompletedTasks({})
    }
  }

  return (
    <div className="space-y-8">
      {/* Header & Overall Progress Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Job-Site Interactive Checklist</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              6-Phase DIY Build Execution Manual
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Check off tasks as you work upstairs. Progress is saved automatically on this device so you can pick up right where you left off.
            </p>
          </div>

          {/* Progress Widget */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-[10px] uppercase font-mono text-slate-400">Total Completion</div>
              <div className="text-2xl font-black font-mono text-emerald-400">{progressPercent}%</div>
              <div className="text-[11px] text-slate-500 font-mono">{completedTasksCount} of {totalTasksCount} tasks</div>
            </div>
            <button
              onClick={handleResetChecklist}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition"
              title="Reset all tasks"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-4 w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 6 Phases Accordion / List */}
      <div className="space-y-5">
        {buildWorkflowPhases.map((phase) => {
          const isExpanded = !!expandedPhases[phase.phase]
          const phaseCompletedCount = phase.tasks.filter(t => completedTasks[t.id]).length
          const phaseTotal = phase.tasks.length
          const phasePercent = Math.round((phaseCompletedCount / phaseTotal) * 100)
          const isPhaseDone = phaseCompletedCount === phaseTotal

          return (
            <div
              key={phase.phase}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isPhaseDone
                  ? 'glass-panel border-emerald-500/30 bg-slate-900/60'
                  : 'glass-panel border-slate-800'
              }`}
            >
              {/* Phase Header */}
              <div
                onClick={() => togglePhaseExpand(phase.phase)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-slate-900/50 transition"
              >
                <div className="flex items-start sm:items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 ${
                    isPhaseDone
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : 'bg-slate-800 text-amber-400 border border-slate-700'
                  }`}>
                    {isPhaseDone ? '✓' : `0${phase.phase}`}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {phase.badge}
                      </span>
                      <span className="text-xs text-slate-500 font-mono flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{phase.estimatedTime}</span>
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                      {phase.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-4 ml-14 sm:ml-0">
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {phaseCompletedCount} / {phaseTotal}
                    </span>
                    <div className="text-[10px] font-mono text-slate-500">Tasks Complete</div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-400">
                    {phase.summary}
                  </p>

                  {/* Tasks List */}
                  <div className="space-y-2.5">
                    {phase.tasks.map((task) => {
                      const isDone = !!completedTasks[task.id]

                      return (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(task.id, phase.phase)}
                          className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start space-x-3.5 ${
                            isDone
                              ? 'bg-emerald-500/10 border-emerald-500/30'
                              : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                          }`}
                        >
                          <button
                            type="button"
                            className="mt-0.5 shrink-0 focus:outline-none"
                          >
                            {isDone ? (
                              <CheckSquare className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-500 hover:text-amber-400" />
                            )}
                          </button>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className={`text-sm font-semibold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                                {task.title}
                              </span>
                              {task.crucial && (
                                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                                  Crucial
                                </span>
                              )}
                            </div>
                            <p className={`text-xs mt-1 leading-relaxed ${isDone ? 'text-slate-500' : 'text-slate-300'}`}>
                              {task.desc}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Pro Tips Box */}
                  {phase.proTips && phase.proTips.length > 0 && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1.5">
                      <div className="font-bold flex items-center space-x-1.5 text-white">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Phase {phase.phase} Pro-Builder Tips:</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {phase.proTips.map((tip, idx) => (
                          <li key={idx} className="leading-relaxed">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
