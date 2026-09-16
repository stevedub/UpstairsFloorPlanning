import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import confetti from 'canvas-confetti'
import { roomBuildGuides } from '../data/buildStepsData.js'

const ProgressContext = createContext(null)

export const ProgressProvider = ({ children }) => {
  // Initialize from localStorage immediately for instantaneous render
  const [checkedTools, setCheckedTools] = useState(() => {
    try {
      const saved = localStorage.getItem('flooring_tools_checked')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('flooring_tasks_completed')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const [syncStatus, setSyncStatus] = useState('synced') // 'synced' | 'saving' | 'offline'
  const isSyncingRef = useRef(false)
  const pendingSaveRef = useRef(null)

  // Fetch latest shared progress from server
  const fetchProgress = useCallback(async () => {
    try {
      const res = await fetch('/api/progress')
      if (res.ok) {
        const data = await res.json()
        if (data.tools) {
          setCheckedTools(data.tools)
          localStorage.setItem('flooring_tools_checked', JSON.stringify(data.tools))
        }
        if (data.tasks) {
          setCompletedTasks(data.tasks)
          localStorage.setItem('flooring_tasks_completed', JSON.stringify(data.tasks))
        }
        setSyncStatus('synced')
      }
    } catch (err) {
      console.warn('Could not reach shared progress API, using local backup:', err)
      setSyncStatus('offline')
    }
  }, [])

  // Send updates to the server with debounce
  const pushToServer = useCallback((payload) => {
    setSyncStatus('saving')
    if (pendingSaveRef.current) {
      clearTimeout(pendingSaveRef.current)
    }

    pendingSaveRef.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        if (res.ok) {
          setSyncStatus('synced')
        } else {
          setSyncStatus('offline')
        }
      } catch {
        setSyncStatus('offline')
      }
    }, 300)
  }, [])

  // Initial fetch and periodic background sync (every 12 seconds) + on window focus
  useEffect(() => {
    fetchProgress()

    const interval = setInterval(() => {
      // Only poll if not actively typing/saving
      if (!isSyncingRef.current) {
        fetchProgress()
      }
    }, 12000)

    const onFocus = () => fetchProgress()
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') fetchProgress()
    })

    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', onFocus)
    }
  }, [fetchProgress])

  // Toggle tool checkbox
  const toggleTool = useCallback((toolName) => {
    setCheckedTools((prev) => {
      const next = { ...prev, [toolName]: !prev[toolName] }
      try {
        localStorage.setItem('flooring_tools_checked', JSON.stringify(next))
      } catch (e) {
        console.error(e)
      }
      pushToServer({ tools: next })
      return next
    })
  }, [pushToServer])

  // Toggle build task
  const toggleTask = useCallback((taskId, roomId, phaseNum) => {
    setCompletedTasks((prev) => {
      const isNowDone = !prev[taskId]
      const next = { ...prev, [taskId]: isNowDone }

      try {
        localStorage.setItem('flooring_tasks_completed', JSON.stringify(next))
      } catch (e) {
        console.error(e)
      }

      pushToServer({ tasks: next })

      // Celebration effects if completed
      if (isNowDone) {
        const targetRoom = roomBuildGuides.find((r) => r.id === roomId)
        if (targetRoom) {
          const roomTasks = targetRoom.phases.flatMap((p) => p.tasks)
          const roomAllDone = roomTasks.every((t) => (t.id === taskId ? true : next[t.id]))

          if (roomAllDone) {
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 }
            })
          } else {
            const phaseObj = targetRoom.phases.find((p) => p.phase === phaseNum)
            if (phaseObj) {
              const phaseDone = phaseObj.tasks.every((t) => (t.id === taskId ? true : next[t.id]))
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

      return next
    })
  }, [pushToServer])

  // Reset all tasks
  const resetAllTasks = useCallback(() => {
    setCompletedTasks({})
    try {
      localStorage.setItem('flooring_tasks_completed', JSON.stringify({}))
    } catch (e) {
      console.error(e)
    }
    pushToServer({ tasks: {} })
  }, [pushToServer])

  // Import tasks
  const importTasks = useCallback((imported) => {
    setCompletedTasks(imported)
    try {
      localStorage.setItem('flooring_tasks_completed', JSON.stringify(imported))
    } catch (e) {
      console.error(e)
    }
    pushToServer({ tasks: imported })
  }, [pushToServer])

  return (
    <ProgressContext.Provider
      value={{
        checkedTools,
        toggleTool,
        completedTasks,
        toggleTask,
        resetAllTasks,
        importTasks,
        syncStatus,
        refreshProgress: fetchProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export const useSharedProgress = () => {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useSharedProgress must be used within a ProgressProvider')
  }
  return context
}
