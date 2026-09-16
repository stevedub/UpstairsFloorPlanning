import React, { useState } from 'react'
import { Navbar } from './components/Navbar.jsx'
import { Overview } from './components/Overview.jsx'
import { FloorPlan3D } from './components/FloorPlan3D.jsx'
import { LayoutSequencer } from './components/LayoutSequencer.jsx'
import { CostCalculator } from './components/CostCalculator.jsx'
import { GapsGuide } from './components/GapsGuide.jsx'
import { BuildWorkflow } from './components/BuildWorkflow.jsx'
import { ToolsChecklist } from './components/ToolsChecklist.jsx'
import { InstallersEngineers } from './components/InstallersEngineers.jsx'
import { Footer } from './components/Footer.jsx'
import { initialRoomsData } from './data/floorData.js'
import { ProgressProvider } from './context/ProgressContext.jsx'

export default function App() {
  const [activeSection, setActiveSection] = useState('overview')
  const [rooms, setRooms] = useState(initialRoomsData)
  const [activeStep, setActiveStep] = useState(1) // 1 to 20 sheets

  // Calculated properties shared across app
  const totalSqFt = rooms.filter(r => r.isIncluded).reduce((acc, r) => acc + r.sqft, 0)
  const [plywoodCount, setPlywoodCount] = useState(20)
  const [flooringBoxes, setFlooringBoxes] = useState(31)
  const [totalCost, setTotalCost] = useState(4525)

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigateTo3DFromSequencer = () => {
    setActiveSection('visualizer')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <ProgressProvider>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        totalSqFt={totalSqFt}
        plywoodCount={plywoodCount}
        flooringBoxes={flooringBoxes}
        totalCost={totalCost}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'overview' && (
          <Overview
            rooms={rooms}
            setRooms={setRooms}
            totalSqFt={totalSqFt}
            onNavigate={handleNavigate}
          />
        )}

        {activeSection === 'visualizer' && (
          <div className="space-y-6">
            <FloorPlan3D
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </div>
        )}

        {activeSection === 'sequencer' && (
          <LayoutSequencer
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            onNavigateTo3D={handleNavigateTo3DFromSequencer}
          />
        )}

        {activeSection === 'calculator' && (
          <CostCalculator
            totalSqFt={totalSqFt}
            setTotalSqFt={() => {}}
            plywoodCount={plywoodCount}
            setPlywoodCount={setPlywoodCount}
            flooringBoxes={flooringBoxes}
            setFlooringBoxes={setFlooringBoxes}
            totalCost={totalCost}
            setTotalCost={setTotalCost}
          />
        )}

        {activeSection === 'gaps' && (
          <GapsGuide />
        )}

        {activeSection === 'workflow' && (
          <BuildWorkflow />
        )}

        {activeSection === 'tools' && (
          <ToolsChecklist />
        )}

        {activeSection === 'engineers' && (
          <InstallersEngineers />
        )}
      </main>

      <Footer />
      </div>
    </ProgressProvider>
  )
}
