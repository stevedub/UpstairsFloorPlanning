import React, { useState, useEffect, useRef } from 'react'
import { roomBuildGuides, buildWorkflowPhases } from '../data/buildStepsData.js'
import confetti from 'canvas-confetti'
import {
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Clock,
  ArrowRight,
  Home,
  Layers,
  DoorOpen,
  Maximize2,
  ShieldCheck,
  Download,
  Upload
} from 'lucide-react'

export const BuildWorkflow = () => {
  const [activeRoomId, setActiveRoomId] = useState('primary') // 'primary' | 'spare-bedroom' | 'baby-room' | 'hallway' | 'all'

  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('flooring_tasks_completed')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  // State to manage expanded phases per room
  const [expandedPhases, setExpandedPhases] = useState(() => {
    const initial = {}
    roomBuildGuides.forEach(r => {
      r.phases.forEach(p => {
        initial[`${r.id}-${p.phase}`] = true
      })
    })
    return initial
  })

  useEffect(() => {
    try {
      localStorage.setItem('flooring_tasks_completed', JSON.stringify(completedTasks))
    } catch (e) {
      console.error(e)
    }
  }, [completedTasks])

  // Aggregate statistics across all rooms
  const allRoomTasks = roomBuildGuides.flatMap(r => r.phases.flatMap(p => p.tasks))
  const totalAllTasks = allRoomTasks.length
  const completedAllTasks = allRoomTasks.filter(t => completedTasks[t.id]).length
  const totalAllPercent = totalAllTasks > 0 ? Math.round((completedAllTasks / totalAllTasks) * 100) : 0

  // Active room data
  const currentRoom = roomBuildGuides.find(r => r.id === activeRoomId) || roomBuildGuides[0]

  // Calculate stats for a given room
  const getRoomStats = (room) => {
    const tasks = room.phases.flatMap(p => p.tasks)
    const total = tasks.length
    const completed = tasks.filter(t => completedTasks[t.id]).length
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0
    const isDone = total > 0 && completed === total
    return { total, completed, percent, isDone }
  }

  const toggleTask = (taskId, roomId, phaseNum) => {
    const isNowDone = !completedTasks[taskId]
    const updated = { ...completedTasks, [taskId]: isNowDone }
    setCompletedTasks(updated)

    if (isNowDone) {
      // Check if this room is now 100% complete
      const targetRoom = roomBuildGuides.find(r => r.id === roomId)
      if (targetRoom) {
        const roomTasks = targetRoom.phases.flatMap(p => p.tasks)
        const roomAllDone = roomTasks.every(t => t.id === taskId ? true : updated[t.id])

        if (roomAllDone) {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          })
          return
        }
      }

      // Check if phase is complete
      if (targetRoom) {
        const phaseObj = targetRoom.phases.find(p => p.phase === phaseNum)
        if (phaseObj) {
          const phaseDone = phaseObj.tasks.every(t => t.id === taskId ? true : updated[t.id])
          if (phaseDone) {
            confetti({
              particleCount: 60,
              spread: 60,
              origin: { y: 0.65 }
            })
          }
        }
      }
    }
  }

  const togglePhase = (roomKey, phaseNum) => {
    const key = `${roomKey}-${phaseNum}`
    setExpandedPhases(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleResetRoom = (roomId) => {
    const targetRoom = roomBuildGuides.find(r => r.id === roomId)
    if (!targetRoom) return
    if (window.confirm(`Reset checklist progress for ${targetRoom.name}?`)) {
      const roomTaskIds = new Set(targetRoom.phases.flatMap(p => p.tasks).map(t => t.id))
      const updated = { ...completedTasks }
      roomTaskIds.forEach(id => {
        delete updated[id]
      })
      setCompletedTasks(updated)
    }
  }

  const fileInputRef = useRef(null)
  const [backupMessage, setBackupMessage] = useState(null)

  const handleExportBackup = () => {
    try {
      const toolsSaved = localStorage.getItem('flooring_tools_checked')
      const backupData = {
        exportedAt: new Date().toISOString(),
        completedTasks,
        checkedTools: toolsSaved ? JSON.parse(toolsSaved) : {},
        version: 1
      }
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2))
      const downloadAnchor = document.createElement('a')
      downloadAnchor.setAttribute('href', dataStr)
      downloadAnchor.setAttribute('download', `flooring-progress-backup-${new Date().toISOString().slice(0, 10)}.json`)
      document.body.appendChild(downloadAnchor)
      downloadAnchor.click()
      downloadAnchor.remove()
      setBackupMessage('Checklist progress exported to backup JSON file!')
      setTimeout(() => setBackupMessage(null), 3500)
    } catch (err) {
      console.error(err)
      alert('Failed to export backup.')
    }
  }

  const handleImportFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result)
        if (parsed && typeof parsed === 'object') {
          if (parsed.completedTasks) {
            setCompletedTasks(parsed.completedTasks)
            localStorage.setItem('flooring_tasks_completed', JSON.stringify(parsed.completedTasks))
          }
          if (parsed.checkedTools) {
            localStorage.setItem('flooring_tools_checked', JSON.stringify(parsed.checkedTools))
          }
          setBackupMessage('Checklist progress successfully restored from backup!')
          setTimeout(() => setBackupMessage(null), 4000)
        } else {
          alert('Invalid backup file format.')
        }
      } catch (err) {
        console.error(err)
        alert('Error parsing JSON backup file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleResetAll = () => {
    if (window.confirm('Reset ALL checklist tasks across all 4 rooms?')) {
      setCompletedTasks({})
    }
  }

  // Color mapping helper
  const getThemeColors = (colorName) => {
    switch (colorName) {
      case 'blue':
        return {
          border: 'border-blue-500/30',
          bgActive: 'bg-blue-500/15 border-blue-500/50 text-blue-400',
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          progress: 'from-blue-600 to-sky-400',
          accent: 'text-blue-400'
        }
      case 'emerald':
        return {
          border: 'border-emerald-500/30',
          bgActive: 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400',
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          progress: 'from-emerald-600 to-teal-400',
          accent: 'text-emerald-400'
        }
      case 'purple':
        return {
          border: 'border-purple-500/30',
          bgActive: 'bg-purple-500/15 border-purple-500/50 text-purple-400',
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          progress: 'from-purple-600 to-fuchsia-400',
          accent: 'text-purple-400'
        }
      case 'amber':
        return {
          border: 'border-amber-500/30',
          bgActive: 'bg-amber-500/15 border-amber-500/50 text-amber-400',
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          progress: 'from-amber-600 to-yellow-400',
          accent: 'text-amber-400'
        }
      default:
        return {
          border: 'border-slate-800',
          bgActive: 'bg-slate-800 border-slate-700 text-white',
          badge: 'bg-slate-800 text-slate-400 border-slate-700',
          progress: 'from-amber-500 to-emerald-400',
          accent: 'text-amber-400'
        }
    }
  }

  // Render a room section
  const renderRoomSection = (room) => {
    const stats = getRoomStats(room)
    const theme = getThemeColors(room.badgeColor)

    return (
      <div key={room.id} className="space-y-6">
        {/* Room Header Banner */}
        <div className={`glass-panel p-6 sm:p-8 rounded-2xl border ${stats.isDone ? 'border-emerald-500/40 bg-emerald-950/10' : theme.border}`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${theme.badge}`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{room.badge}</span>
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                  {room.sqft} sq ft total
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                  {room.pieces.length} Underlayment Pieces ({room.pieces[0]}–{room.pieces[room.pieces.length - 1]})
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {room.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                {room.areaDetail}. Follow the room-specific sequence below from slat prep through final shoe molding.
              </p>
            </div>

            {/* Room Progress Gauge */}
            <div className="flex items-center space-x-4 shrink-0 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono text-slate-400">Room Completion</div>
                <div className={`text-2xl font-black font-mono ${stats.isDone ? 'text-emerald-400' : theme.accent}`}>
                  {stats.percent}%
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  {stats.completed} of {stats.total} tasks
                </div>
              </div>
              <button
                onClick={() => handleResetRoom(room.id)}
                className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition"
                title={`Reset checklist for ${room.name}`}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Starting Corner</div>
              <div className="font-semibold text-slate-200 mt-0.5">{room.startingPoint}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Progression Vector</div>
              <div className="font-semibold text-slate-200 mt-0.5">{room.progressionDirection}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Closet Doorway Detail</div>
              <div className="font-semibold text-slate-200 mt-0.5">{room.closetDoorInfo}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Underlayment Catalog</div>
              <div className="font-semibold text-slate-200 mt-0.5 font-mono">{room.sheetCount}</div>
            </div>
          </div>

          {/* Room Progress Bar */}
          <div className="mt-5 w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className={`bg-gradient-to-r ${stats.isDone ? 'from-emerald-500 to-teal-400' : theme.progress} h-full rounded-full transition-all duration-500`}
              style={{ width: `${stats.percent}%` }}
            />
          </div>
        </div>

        {/* Room Phases Accordion List */}
        <div className="space-y-4">
          {room.phases.map((phase) => {
            const phaseKey = `${room.id}-${phase.phase}`
            const isExpanded = !!expandedPhases[phaseKey]
            const phaseCompletedCount = phase.tasks.filter(t => completedTasks[t.id]).length
            const phaseTotal = phase.tasks.length
            const isPhaseDone = phaseTotal > 0 && phaseCompletedCount === phaseTotal

            return (
              <div
                key={phase.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isPhaseDone
                    ? 'glass-panel border-emerald-500/30 bg-slate-900/60'
                    : 'glass-panel border-slate-800'
                }`}
              >
                {/* Phase Header */}
                <div
                  onClick={() => togglePhase(room.id, phase.phase)}
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
                      <span className={`text-xs font-mono font-bold ${isPhaseDone ? 'text-emerald-400' : 'text-slate-300'}`}>
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
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {phase.summary}
                    </p>

                    {/* Tasks List */}
                    <div className="space-y-2.5">
                      {phase.tasks.map((task) => {
                        const isDone = !!completedTasks[task.id]

                        return (
                          <div
                            key={task.id}
                            onClick={() => toggleTask(task.id, room.id, phase.phase)}
                            className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start space-x-3.5 ${
                              isDone
                                ? 'bg-emerald-500/10 border-emerald-500/30'
                                : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                            }`}
                          >
                            <button
                              type="button"
                              className="mt-0.5 shrink-0 focus:outline-none"
                              aria-label={task.title}
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
                          <span>{room.name} Pro-Tips:</span>
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

  return (
    <div className="space-y-8">
      {/* Top Banner: Global Project Progress */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Room-by-Room DIY Execution Manual</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Upstairs Flooring Installation Guide
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Step-by-step instructions separated into 4 distinct rooms. Check off tasks as you work upstairs. Progress persists automatically in your browser across container updates, or you can Export/Import a backup file.
            </p>
          </div>

          {/* Global Progress Widget & Backup Actions */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImportFile}
                accept=".json"
                className="hidden"
              />
              <button
                onClick={handleExportBackup}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-mono transition shadow-sm"
                title="Download JSON backup file of all completed tasks & tools"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Backup</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-mono transition shadow-sm"
                title="Restore progress from previously saved JSON backup file"
              >
                <Upload className="w-3.5 h-3.5 text-blue-400" />
                <span>Import Backup</span>
              </button>
            </div>

            <div className="flex items-center space-x-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono text-slate-400">Total Upstairs Completion</div>
                <div className="text-2xl font-black font-mono text-emerald-400">{totalAllPercent}%</div>
                <div className="text-[11px] text-slate-500 font-mono">{completedAllTasks} of {totalAllTasks} tasks done</div>
              </div>
              <button
                onClick={handleResetAll}
                className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition"
                title="Reset all tasks across all rooms"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Backup Status Message Banner */}
        {backupMessage && (
          <div className="mt-3 p-2.5 px-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{backupMessage}</span>
            </span>
            <button onClick={() => setBackupMessage(null)} className="text-emerald-400 hover:text-white ml-2 text-xs">✕</button>
          </div>
        )}

        {/* Global Progress Bar */}
        <div className="mt-4 w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${totalAllPercent}%` }}
          />
        </div>
      </div>

      {/* 4 Room Navigation Switcher */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">Select Room Build Guide:</span>
          <span className="text-xs text-slate-500 font-mono">4 Upstairs Zones</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {roomBuildGuides.map((room) => {
            const stats = getRoomStats(room)
            const isActive = activeRoomId === room.id
            const theme = getThemeColors(room.badgeColor)

            return (
              <button
                key={room.id}
                onClick={() => setActiveRoomId(room.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 select-none flex flex-col justify-between ${
                  isActive
                    ? `${theme.bgActive} shadow-lg shadow-black/40`
                    : 'glass-panel border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {room.sqft} sq ft
                    </span>
                    {stats.isDone ? (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        100% Done
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">
                        {stats.completed}/{stats.total}
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-sm sm:text-base text-white truncate">
                    {room.name}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {room.pieces.length} Plywood Pieces
                  </div>
                </div>

                {/* Mini progress bar on tab */}
                <div className="mt-3 w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div
                    className={`bg-gradient-to-r ${stats.isDone ? 'from-emerald-500 to-teal-400' : theme.progress} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${stats.percent}%` }}
                  />
                </div>
              </button>
            )
          })}

          {/* All Rooms Tab */}
          <button
            onClick={() => setActiveRoomId('all')}
            className={`p-4 rounded-xl border text-left transition-all duration-200 select-none flex flex-col justify-between col-span-2 lg:col-span-1 ${
              activeRoomId === 'all'
                ? 'bg-slate-800 border-amber-500/50 text-amber-400 shadow-lg shadow-black/40'
                : 'glass-panel border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 text-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Full Upstairs
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {completedAllTasks}/{totalAllTasks}
                </span>
              </div>
              <div className="font-bold text-sm sm:text-base text-white">
                View All Rooms
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Combined Overview
              </div>
            </div>

            <div className="mt-3 w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${totalAllPercent}%` }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeRoomId === 'all' ? (
        <div className="space-y-12">
          {roomBuildGuides.map(room => renderRoomSection(room))}
        </div>
      ) : (
        renderRoomSection(currentRoom)
      )}
    </div>
  )
}
