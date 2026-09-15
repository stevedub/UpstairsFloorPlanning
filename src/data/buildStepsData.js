// DIY Step-by-Step Installation Workflow and Interactive Checklist

export const buildWorkflowPhases = [
  {
    phase: 1,
    id: 'demolition',
    title: 'Phase 1: Parquet Removal & Subfloor Cleanup',
    estimatedTime: '1 – 2 Days',
    badge: 'Demo & Prep',
    summary: 'Carefully rip up existing parquet wood tiles while preserving the structural 1x6 diagonal slat subfloor intact.',
    tasks: [
      {
        id: 'demo-01',
        title: 'Remove existing baseboards and quarter-round',
        desc: 'Score paint seam along wall with utility knife to avoid tearing drywall paper, then pry baseboards gently with a trim pry bar.',
        crucial: true
      },
      {
        id: 'demo-02',
        title: 'Pry up parquet tiles using flat pry bar or floor scraper',
        desc: 'Work along the wood grain. If adhesive is stubborn, a wide heavy-duty floor scraper or flat spade bit on an SDS rotary hammer speeds this up significantly.',
        crucial: false
      },
      {
        id: 'demo-03',
        title: 'Pull all old flooring nails, staples, and cleats',
        desc: 'Run a 4-inch wide flat scraper over the bare 1x6 slats. Any protruding fastener will lift the new 1/2" plywood and cause squeaks. Pull all nails with end-cutting nippers or nail puller.',
        crucial: true
      },
      {
        id: 'demo-04',
        title: 'Deep vacuum the 1x6 diagonal slats',
        desc: 'Remove all grit, sawdust, old adhesive chunks, and debris. Clean cracks between 1x6 slats so sheets can lay flat.',
        crucial: false
      }
    ],
    proTips: [
      'Number your baseboards with a pencil on the back if you plan to reinstall them, or take the opportunity to upgrade to modern 4-1/4" craftsman baseboards.',
      'Wear safety glasses and work gloves: old parquet splinters easily when prying.'
    ]
  },
  {
    phase: 2,
    id: 'subfloor-prep',
    title: 'Phase 2: Subfloor Squeak Remediation & Flatness',
    estimatedTime: '1 Day',
    badge: 'Structural Prep',
    summary: 'The existing 1x6 diagonal boards are the structural foundation. Eliminating squeaks now is the only chance you will ever get before covering them with plywood.',
    tasks: [
      {
        id: 'prep-01',
        title: 'The "Walk & Stomp" Squeak Inspection',
        desc: 'Walk slowly over every square foot of the second floor, stepping firmly on every 1x6 board. Mark every squeaking or flexing slat with bright painter\'s tape or chalk.',
        crucial: true
      },
      {
        id: 'prep-02',
        title: 'Screw down loose 1x6 slats directly into floor joists',
        desc: 'Drive 2-1/2" or 3" construction wood screws through the 1x6 slats into the floor joists below wherever boards are loose or squeaking. Use 2 screws per joist intersection.',
        crucial: true
      },
      {
        id: 'prep-03',
        title: 'Check flatness with an 8ft or 10ft straightedge / level',
        desc: 'Tolerance requirement: Subfloor must be flat within 3/16" over 10 feet (or 1/8" over 6 feet). Spin your straightedge across the rooms.',
        crucial: true
      },
      {
        id: 'prep-04',
        title: 'Sand down high board edges / ridges with belt sander',
        desc: 'Old 1x6 slats often cup or peak at board joints. Run an aggressive 40-grit belt sander across any raised board edges until flat.',
        crucial: false
      },
      {
        id: 'prep-05',
        title: 'IMPORTANT: Do NOT glue underlayment to 1x6 board slats',
        desc: 'APA guidelines state underlayment over board subfloors must be mechanically fastened with screws only. Wood slats expand across grain differently than plywood sheets; gluing leads to stress cracking and squeaks.',
        crucial: true
      }
    ],
    proTips: [
      'Finding joists: Look for existing nail patterns in the 1x6 slats. Joists are typically 16" on-center and run perpendicular to the 1x6 diagonal slats.',
      'Keep your shop vac running while sanding ridges to keep fine wood dust out of bedroom air.'
    ]
  },
  {
    phase: 3,
    id: 'plywood-underlayment',
    title: 'Phase 3: 1/2" BCX Fir Plywood Underlayment Installation',
    estimatedTime: '2 – 3 Days',
    badge: 'Underlayment',
    summary: 'Install 1/2" 4x8 BCX Fir Plywood sheets starting from the Primary Bedroom exterior wall, staggering joints, maintaining expansion gaps, and screwing to APA specifications.',
    tasks: [
      {
        id: 'ply-01',
        title: 'Acclimate plywood sheets inside the house for 24-48 hours',
        desc: 'Store the 4x8 sheets flat in the upstairs rooms so moisture content stabilizes with your home interior humidity.',
        crucial: false
      },
      {
        id: 'ply-02',
        title: 'Position Sheet #1 in Primary Bedroom outside wall corner',
        desc: 'Place full 4x8 sheet in the outside corner. Verify 1/4" to 1/2" gap from drywall. Snap chalk reference lines.',
        crucial: true
      },
      {
        id: 'ply-03',
        title: 'Stagger all end joints by at least 24" (no 4-corner joints)',
        desc: 'Row 2 must start with a cut sheet (e.g. 48" x 48") so that panel end seams are offset by at least 2 to 4 feet from adjacent rows.',
        crucial: true
      },
      {
        id: 'ply-04',
        title: 'Maintain 1/8" (3mm) expansion gap between all plywood sheets',
        desc: 'Drop 8d common nails between sheets as spacers while screwing. Remove nails before moving to the next sheet.',
        crucial: true
      },
      {
        id: 'ply-05',
        title: 'Drive Paulin screws: 6" along edges, 8" in field interior',
        desc: 'Keep screws 3/8" to 1/2" back from panel edges. Fasten from one edge across the panel to avoid bubbles or trapped bows.',
        crucial: true
      },
      {
        id: 'ply-06',
        title: 'The Drywall Blade Sweep Test (Zero Proud Screws)',
        desc: 'Slide a 10" drywall knife flat over the entire floor. If the blade hits or clicks on any screw head, drive it 1/32" deeper with your impact driver.',
        crucial: true
      }
    ],
    proTips: [
      'Lay sheets so the 8ft length runs perpendicular to the floor joists.',
      'Do NOT allow plywood seams to align directly over seams in the 1x6 slat subfloor below.',
      'Cut with the smooth B-face UP when using a track saw / circular saw with a fine-tooth plywood blade to prevent face tear-out.'
    ]
  },
  {
    phase: 4,
    id: 'door-prep',
    title: 'Phase 4: Door Frame Undercutting & Threshold Prep',
    estimatedTime: 'Half Day',
    badge: 'Millwork Prep',
    summary: 'Undercut all door jambs and casings so LifeProof vinyl planks slip smoothly underneath with full floating clearance.',
    tasks: [
      {
        id: 'door-01',
        title: 'Undercut all door jambs & casings with oscillating multi-tool',
        desc: 'Place a scrap piece of LifeProof vinyl plank flat on the plywood subfloor right against the door casing. Rest your oscillating blade flat on the plank and cut horizontally through casing and jamb.',
        crucial: true
      },
      {
        id: 'door-02',
        title: 'Chisel out the cut wood block and vacuum opening',
        desc: 'Clean out the wood piece from under the casing so the vinyl plank slides freely with at least 1/16" vertical clearance.',
        crucial: false
      },
      {
        id: 'door-03',
        title: 'Verify clearance under interior doors',
        desc: 'Measure bottom of bedroom and closet doors. LifeProof is 7mm (~9/32") thick. Ensure doors have at least 1/4" clearance over new floor height. Plan to trim doors if needed.',
        crucial: false
      },
      {
        id: 'door-04',
        title: 'Prepare 5PC Bathroom threshold and Top-of-Stairs transition',
        desc: 'Ensure 5PC bathroom threshold line is straight and clean. Plan T-molding or reducer profile. Check stair top bullnose.',
        crucial: true
      }
    ],
    proTips: [
      'Always undercut door casings—never try to cut vinyl plank around intricate casing moldings. It looks vastly more professional and allows the floor to float.'
    ]
  },
  {
    phase: 5,
    id: 'lifeproof-install',
    title: 'Phase 5: LifeProof Cobblestone LVP Installation',
    estimatedTime: '2 – 3 Days',
    badge: 'Finish Floor',
    summary: 'Install LifeProof click-lock planks across Primary Bedroom, Hallway, Closets, and secondary bedrooms with 1/4" expansion gap and 8"+ stagger.',
    tasks: [
      {
        id: 'vinyl-01',
        title: 'Acclimate LifeProof boxes at room temperature for 24-48 hours',
        desc: 'Keep boxes flat in bedrooms at 65°F-85°F (18°C-29°C). Mix planks from 3 to 4 boxes simultaneously to blend subtle color variations.',
        crucial: false
      },
      {
        id: 'vinyl-02',
        title: 'Set up 1/4" wedge spacers along all perimeter walls',
        desc: 'Place spacers every 2-3 feet along walls to guarantee a continuous 1/4" floating expansion perimeter.',
        crucial: true
      },
      {
        id: 'vinyl-03',
        title: 'Start Row 1 tongue-side facing wall in Primary Bedroom',
        desc: 'Cut off tongue on wall-facing side of Row 1 planks. Click end joints together using tapping block and soft rubber mallet.',
        crucial: true
      },
      {
        id: 'vinyl-04',
        title: 'Stagger end joints by at least 8" (200mm) on consecutive rows',
        desc: 'Use cut-off piece from end of row to start the next row (minimum 8" length). Maintain randomized pattern throughout.',
        crucial: true
      },
      {
        id: 'vinyl-05',
        title: 'Click-lock long edge at 30° angle, tap gently into lock',
        desc: 'Angle long tongue into groove, fold down flat, then use soft rubber mallet and LifeProof tapping block to tap seam fully closed. Never strike plank directly.',
        crucial: true
      },
      {
        id: 'vinyl-06',
        title: 'Use pull bar for end-wall and doorway planks',
        desc: 'A heavy-duty metal pull bar allows you to tap planks tight where wall clearance doesn\'t permit a tapping block.',
        crucial: true
      }
    ],
    proTips: [
      'Cutting LifeProof: You can score the top 22-mil wear layer with a sharp utility knife against a speed square, then snap cleanly over your knee or workbench edge! For rip cuts or vents, a jigsaw or circular saw with a fine blade is effortless.',
      'Never glue or nail through LifeProof planks—it is engineered strictly as a free-floating floor.'
    ]
  },
  {
    phase: 6,
    id: 'finishing',
    title: 'Phase 6: Baseboards, Transitions & Stair Nosing',
    estimatedTime: '1 Day',
    badge: 'Trim & Finish',
    summary: 'Complete the floor with baseboards, shoe molding, bathroom threshold transition, and secure stair nosing.',
    tasks: [
      {
        id: 'finish-01',
        title: 'Remove all 1/4" perimeter spacers from walls',
        desc: 'Pull all wedge spacers. Inspect perimeter to ensure no debris or screws are jamming the expansion gap.',
        crucial: true
      },
      {
        id: 'finish-02',
        title: 'Install baseboards nailed into WALL STUDS only',
        desc: 'CRITICAL: Fasten baseboards into drywall and wall studs with 18-gauge brad nails. NEVER nail down into the vinyl plank! The floor must remain free to expand and contract underneath.',
        crucial: true
      },
      {
        id: 'finish-03',
        title: 'Install quarter-round or shoe molding if needed',
        desc: 'Nail shoe molding horizontally into baseboard only (not down into floor) to cover any remaining expansion gap.',
        crucial: false
      },
      {
        id: 'finish-04',
        title: 'Install 5PC Bathroom doorway transition (T-molding / Reducer)',
        desc: 'Fasten the metal track to the plywood subfloor with screws. Snap T-molding into track, leaving 1/4" expansion gap inside track channel.',
        crucial: true
      },
      {
        id: 'finish-05',
        title: 'Install Top-of-Stairs nosing transition',
        desc: 'Fasten stair nosing securely with polyurethane construction adhesive and screws into subfloor. Maintain floating expansion under the nosing lip.',
        crucial: true
      }
    ],
    proTips: [
      'Caulk top of baseboards to drywall with paintable acrylic latex caulk for a crisp, high-end professional look.',
      'Wipe floor clean with damp microfiber mop. LifeProof 22-mil is 100% waterproof and ready for heavy daily foot traffic immediately!'
    ]
  }
]

export const toolsAndSupplies = [
  {
    category: 'Demolition & Prep',
    items: [
      { name: 'Flat Pry Bar & Trim Bar', desc: 'Removing baseboards and lifting parquet tiles without wall damage', essential: true },
      { name: 'End-Cutting Pliers / Nail Puller', desc: 'Pulling old subfloor nails, cleats, and staples', essential: true },
      { name: 'Heavy-Duty 4" Floor Scraper', desc: 'Scraping old dried adhesive and clearing wood slat joints', essential: true },
      { name: 'Shop Vacuum (HEPA Filter)', desc: 'Thoroughly cleaning 1x6 slats between demo and underlayment', essential: true },
      { name: 'Belt Sander (40 / 80 grit)', desc: 'Flattening peaked 1x6 slat edges and high spots', essential: false }
    ]
  },
  {
    category: 'Cutting & Fastening Plywood',
    items: [
      { name: 'Circular Saw or Track Saw with 40T+ Plywood Blade', desc: 'Cutting 1/2" 4x8 BCX sheets smoothly without tear-out', essential: true },
      { name: 'Cordless Impact Driver with #2 Square (Robertson) Bits', desc: 'Driving Paulin #8 x 1-1/2" floor screws rapidly and flush', essential: true },
      { name: 'Jigsaw with Fine Wood Blade', desc: 'Notching plywood around door jambs, closets, and heat vents', essential: true },
      { name: 'Chalk Line & 8ft / 10ft Straightedge', desc: 'Snapping straight reference and screw grid lines', essential: true },
      { name: '6" or 10" Drywall Taping Knife', desc: 'Sweeping across floor to detect any proud screw heads instantly', essential: true },
      { name: 'Box of 8d Common Nails or 1/8" Spacers', desc: 'Maintaining uniform 1/8" expansion gap between plywood sheets', essential: true }
    ]
  },
  {
    category: 'LifeProof Flooring Installation',
    items: [
      { name: 'LifeProof Flooring Installation Kit (Tapping Block + Pull Bar)', desc: 'Tapping vinyl plank seams tight without damaging click-lock profiles', essential: true },
      { name: 'Soft-Faced Rubber Mallet (Deadblow / White Rubber)', desc: 'Tapping planks together safely without marking face', essential: true },
      { name: '1/4" Flooring Spacers (Pack of 30-50)', desc: 'Maintaining perimeter expansion gap against all walls', essential: true },
      { name: 'Utility Knife with Heavy Duty Blades', desc: 'Scoring and snapping vinyl planks across width', essential: true },
      { name: 'Speed Square & 25ft Tape Measure', desc: 'Marking 90° square cuts and measuring stagger offsets', essential: true },
      { name: 'Oscillating Multi-Tool with Wood Flush-Cut Blade', desc: 'Undercutting door casings and jambs to exact plank height', essential: true }
    ]
  },
  {
    category: 'Safety & Personal Protection',
    items: [
      { name: 'Heavy-Duty Gel Knee Pads', desc: 'Critical protection for hours of floor work', essential: true },
      { name: 'Safety Glasses & Work Gloves', desc: 'Eye and hand protection from splinters and flying chips', essential: true },
      { name: 'N95 Dust Mask / Respirator', desc: 'Protection against old parquet demo dust and wood sanding particles', essential: true },
      { name: 'Ear Protection (Earmuffs or Plugs)', desc: 'For circular saw, oscillating tool, and belt sander use', essential: true }
    ]
  }
]
