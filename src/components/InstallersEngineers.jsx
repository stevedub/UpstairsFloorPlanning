import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import {
  HardHat,
  Hammer,
  Sparkles,
  ShieldAlert,
  Award,
  Volume2,
  Ruler,
  CheckCircle2,
  ThumbsUp,
  Flame,
  Zap,
  Heart,
  Quote
} from 'lucide-react'

export const InstallersEngineers = () => {
  const [approvalCount, setApprovalCount] = useState(0)
  const [reactionMsg, setReactionMsg] = useState(null)

  const reactions = [
    'Grant slaps the subfloor: "Yup, that ain\'t goin\' nowhere!"',
    'Steven double-checks the 3D model: "Technically within 0.04mm tolerance."',
    'Mom yells from downstairs: "Please tell me you\'re wearing safety glasses!"',
    'Subfloor structural rating increased by +500 screw-pounds.',
    'Grant reaches for the jackhammer again: "Just in case."',
    'Steven waves the vintage hand saw with authority.'
  ]

  const triggerApproval = () => {
    setApprovalCount((prev) => prev + 1)
    const nextMsg = reactions[approvalCount % reactions.length]
    setReactionMsg(nextMsg)

    // Fire celebratory confetti
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#f97316']
    })
  }

  return (
    <div className="space-y-12 pb-8">
      {/* Top Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
              <HardHat className="w-3.5 h-3.5" />
              <span>Wingfelder & Son Contracting Syndicate</span>
              <span className="text-slate-500">•</span>
              <span className="font-mono text-[11px] text-slate-300">Est. ~1998</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The Installers & Engineers
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
              Designed in full 3D CAD simulation. Demolished with raw horsepower. Bonded by blood, family debate,
              and a shared refusal to pay thousands of dollars for something we can figure out ourselves.
            </p>
          </div>

          {/* Quick Credential Badges */}
          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-amber-300 flex items-center space-x-2">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>OSHA: Self-Audited</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-emerald-300 flex items-center space-x-2">
              <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Warranty: Guaranteed Squeak-Resistant</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-blue-300 flex items-center space-x-2">
              <Flame className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Confidence: Unshakable</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Origin Story - Big Hero Card */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden bg-gradient-to-b from-slate-900/60 to-slate-950/80">
        <div className="p-6 sm:p-8 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-mono text-amber-400 font-bold mb-1">
              Field Archive #001
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <span>The Apprenticeship Begins (Circa ~1998)</span>
            </h2>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
            25+ Years of Joint Operations
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
          {/* Photo */}
          <div className="lg:col-span-7 group">
            <div className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl bg-black">
              <img
                src="/stevenanddad.png"
                alt="Grant teaching toddler Steven how to use a power drill"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 font-mono bg-slate-900/85 backdrop-blur-sm p-2.5 rounded-lg border border-slate-700/60">
                <span className="text-amber-400 font-semibold">Historic Record:</span> Lead Foreman Grant calibrates
                toddler apprentice Steven’s high-torque drill technique. No drywall anchor was safe.
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-5 space-y-4 text-slate-300 text-sm leading-relaxed">
            <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-mono font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Generational Craftsmanship</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Some Contractors Are Trained. Others Are Born Into Demolition.
            </h3>
            <p>
              Long before 3D web visualizers and computerized subfloor layout sequencers existed, the Wingfelder
              construction doctrine was forged right here.
            </p>
            <p className="text-slate-400">
              Notice the backwards cap, the two-handed power drill grip, and the steady supervisory gaze of Grant ensuring
              the screw goes in straight. Twenty-five years later, we are taking that exact same energy upstairs to tackle
              617 sq ft of subfloor and 20 sheets of BCX fir plywood.
            </p>

            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-500">Apprentice Age</div>
                <div className="text-base font-bold text-amber-400">~3 Years Old</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-500">Drill RPM</div>
                <div className="text-base font-bold text-emerald-400">Maximum</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bios Section */}
      <div>
        <div className="mb-6 flex items-center space-x-3">
          <div className="w-2.5 h-6 bg-amber-500 rounded-full" />
          <h2 className="text-2xl font-bold text-white tracking-tight">Meet the Engineering Leadership</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Grant Wingfelder */}
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
            <div>
              {/* Photo Banner */}
              <div className="relative group bg-black overflow-hidden aspect-[4/3] sm:aspect-[16/10]">
                <img
                  src="/dad.jpg"
                  alt="Grant Wingfelder jackhammering ceramic tile"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-amber-400 font-mono text-xs flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Demolition Mode: Active</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                    The Heavyweight Champion
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">Grant Wingfelder</h3>
                  <p className="text-xs text-slate-300 font-mono">
                    Senior Vice President of Heavy Demolition & Jackhammer Operations
                  </p>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 space-y-4">
                {/* Quote */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs italic text-slate-300 flex items-start space-x-2.5">
                  <Quote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    "Why spend 2 hours gingerly lifting tiles with a chisel when an industrial jackhammer can turn the whole
                    room into crushed gravel in 8 minutes flat?"
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-white">Profile:</strong> Grant brings decades of seasoned patriarchal
                    resolve and an appetite for pulverized ceramic. Where others see delicate trim and fragile transitions,
                    Grant sees an opportunity for aggressive percussive persuasion.
                  </p>
                  <p>
                    <strong className="text-white">Core Competencies:</strong> Kneeling in rubble without knee pads,
                    refusing to read instruction manuals on principle, and delivering the authoritative two-slap "That
                    ain't goin' nowhere" inspection verdict.
                  </p>
                </div>

                {/* Stats Table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Tiles Broken</div>
                    <div className="text-sm font-bold text-amber-400">1,450+</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Manuals Read</div>
                    <div className="text-sm font-bold text-red-400">0</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Goggles Worn</div>
                    <div className="text-sm font-bold text-emerald-400">100%</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Slap Tests</div>
                    <div className="text-sm font-bold text-blue-400">10/10 Passed</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Tool of Choice: Industrial Demo Hammer</span>
              <span className="text-amber-400 font-semibold">★ Foreman Grade</span>
            </div>
          </div>

          {/* Steven Wingfelder */}
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
            <div>
              {/* Photo Banner */}
              <div className="relative group bg-black overflow-hidden aspect-[4/3] sm:aspect-[16/10]">
                <img
                  src="/steven.jpg"
                  alt="Steven Wingfelder holding a menacing saw with dust mask"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-amber-400 font-mono text-xs flex items-center space-x-1">
                  <Ruler className="w-3 h-3 text-amber-400" />
                  <span>CAD Precision: 99.9%</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                    The Floor Architect
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">Steven Wingfelder</h3>
                  <p className="text-xs text-slate-300 font-mono">
                    Chief Executive Floor Architect & Hand Saw Operative
                  </p>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 space-y-4">
                {/* Quote */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs italic text-slate-300 flex items-start space-x-2.5">
                  <Quote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    "I spent 30 hours programming a Three.js interactive 3D stagger visualizer and calculating joist spacing down to
                    the millimeter... so Dad can cut it 1/8 inch off by eye."
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-white">Profile:</strong> Steven provides the technological firepower and mathematical
                    sanity checks. Armed with a vintage hand saw, N95 respiratory protection, and full-stack software development
                    capabilities, he will over-engineer any household task until it has its own web app.
                  </p>
                  <p>
                    <strong className="text-white">Core Competencies:</strong> Calculating plywood yields, obsessing over 8" joist
                    screw spacing, brandishing saws menacingly for the camera, and asking "Did you check if the hallway is square?"
                  </p>
                </div>

                {/* Stats Table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-500 uppercase">3D Apps Built</div>
                    <div className="text-sm font-bold text-amber-400">1 Masterpiece</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Saws Waved</div>
                    <div className="text-sm font-bold text-emerald-400">1 Menacing</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-500 uppercase">"Measure 2x" Asked</div>
                    <div className="text-sm font-bold text-blue-400">47 Times</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Calculations / Cut</div>
                    <div className="text-sm font-bold text-purple-400">42 Drafts</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Tool of Choice: Vintage Hand Saw & 3D CAD</span>
              <span className="text-amber-400 font-semibold">★ Chief Architect</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Wingfelder Code of Jobsite Ethics */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-6 bg-emerald-500 rounded-full" />
          <h2 className="text-2xl font-bold text-white tracking-tight">The Jobsite Operating Code</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Ruler className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Rule #1: The Baseboard Pardon</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              If an edge is cut crooked or a gap is 1/8" wider than intended, fear not. If standard baseboard, shoe molding,
              or quarter-round covers the gap, the mistake never existed in the eyes of God or the Ontario Building Code.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Hammer className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Rule #2: The Slap Doctrine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No plywood subfloor sheet, screw pattern, or transition strip is officially accredited until Dad delivers
              two firm palm slaps, leans back, and proclaims: <em>"Yup, that's not goin' anywhere."</em>
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Rule #3: Noise Ordinance Negotiation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              If the neighbors query the sound of an 8:00 AM table saw rip cut on a crisp Saturday morning, the official
              protocol is to nod politely, give an enthusiastic thumbs-up, and compliment their newly seeded lawn.
            </p>
          </div>
        </div>
      </div>

      {/* Official Reviews */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Verified Client Reviews & Testimonials</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-bold text-xs tracking-wider">★★★★★ (5.0 / 5)</span>
              <span className="text-[11px] font-mono text-slate-500">Verified Household Authority</span>
            </div>
            <p className="text-xs italic text-slate-300">
              "Great work boys, but please sweep the sawdust off your socks before walking onto the living room rug.
              And why do all of our towels smell like PL-400 subfloor adhesive?"
            </p>
            <div className="text-right text-[11px] font-mono text-amber-400 font-semibold">— Mom</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-bold text-xs tracking-wider">★★★★★ (5.0 / 5)</span>
              <span className="text-[11px] font-mono text-slate-500">The Joists Themselves</span>
            </div>
            <p className="text-xs italic text-slate-300">
              "We have literally never been fastened this securely in the entire history of 6 Prince David Court.
              There are approximately 1,200 screws holding us together. We couldn't squeak if we tried."
            </p>
            <div className="text-right text-[11px] font-mono text-emerald-400 font-semibold">— The 2x10 Floor Joists</div>
          </div>
        </div>
      </div>

      {/* Interactive Foreman Slap Button */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 text-center space-y-4">
        <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
          <ThumbsUp className="w-8 h-8" />
        </div>
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-bold text-white">Give the Crew Your Official Approval</h3>
          <p className="text-xs text-slate-400 mt-1">
            Perform the sacred contractor ritual. Slap the subfloor to confirm structural integrity and fire the confetti cannon.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={triggerApproval}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all transform active:scale-95 cursor-pointer"
          >
            <Hammer className="w-4 h-4" />
            <span>Slap The Subfloor ("That Ain't Goin' Nowhere!")</span>
          </button>
        </div>

        {reactionMsg && (
          <div className="inline-block mt-3 px-4 py-2 rounded-lg bg-slate-900 border border-amber-400/40 text-amber-300 text-xs font-mono animate-bounce">
            {reactionMsg}
          </div>
        )}

        <div className="text-[11px] font-mono text-slate-500">
          Total Subfloor Slaps Recorded: <span className="text-amber-400 font-bold">{approvalCount}</span>
        </div>
      </div>
    </div>
  )
}
