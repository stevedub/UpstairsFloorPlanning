// Comprehensive Gaps, Spacing & Tolerances Rules

export const gapsData = [
  {
    id: 'plywood-to-plywood',
    category: 'Underlayment Plywood',
    title: 'Plywood Sheet-to-Sheet Expansion Gap',
    dimension: '1/8 inch (3 mm)',
    tolerance: '± 1/32"',
    importance: 'CRITICAL',
    badgeColor: 'red',
    icon: 'Layers',
    summary: 'Leave a 1/8" gap between all edges and ends of 4x8 plywood sheets. NEVER butt sheets tightly together.',
    reasonWhy: 'Wood expands across its width and length as relative humidity changes through Ontario seasons. If panels are installed tight edge-to-edge, humidity expansion will force the edges to peak or buckle upward, creating visible ridges beneath your vinyl plank.',
    proTip: 'Use 8d common nails (which have a 1/8" shank) as temporary spacers between sheets while driving screws, then pull the nails out before moving to the next sheet.',
    diagram: {
      leftLabel: 'Sheet A (4x8)',
      rightLabel: 'Sheet B (4x8)',
      gapLabel: '1/8" Expansion Gap (8d nail)',
      subfloorLabel: '1x6 Diagonal Slat Subfloor Below'
    }
  },
  {
    id: 'plywood-to-wall',
    category: 'Underlayment Plywood',
    title: 'Plywood-to-Perimeter Wall Gap',
    dimension: '1/4" to 1/2" (6 mm - 12 mm)',
    tolerance: '+ 1/4"',
    importance: 'HIGH',
    badgeColor: 'amber',
    icon: 'SquareDashedBottom',
    summary: 'Leave 1/4" to 1/2" gap between plywood sheet edges and all perimeter drywall, framing, and vertical pipes.',
    reasonWhy: 'Prevents the entire underlayment floor system from binding against the wall studs when expanding, which could cause center room buckling or creaking against drywall base plates.',
    proTip: 'Cut 1/4" scrap strips of plywood or use plastic shims along the walls as temporary spacers while securing each sheet.',
    diagram: {
      leftLabel: 'Framing / Drywall',
      rightLabel: '1/2" Plywood Edge',
      gapLabel: '1/4" to 1/2" Perimeter Gap',
      subfloorLabel: 'Wall Base Plate'
    }
  },
  {
    id: 'fastener-spacing',
    category: 'Fasteners & Screws',
    title: 'Screw Spacing & Edge Margin',
    dimension: '6" on Edges, 8" in Field, 3/8" from Edge',
    tolerance: '± 1/2"',
    importance: 'CRITICAL',
    badgeColor: 'red',
    icon: 'Disc',
    summary: 'Screws spaced every 6" along all sheet perimeters, every 8" across interior grid lines. Keep screws 3/8" to 1/2" back from panel edges.',
    reasonWhy: 'Screwing closer than 3/8" to the edge can blow out or split the plywood veneer, destroying its holding power. Consistent 6"/8" spacing locks down the 1/2" plywood and prevents squeaks between the plywood and 1x6 slats.',
    proTip: 'Snap chalk lines across the 4x8 sheet at 8" intervals before fastening to guide rapid, perfectly straight screw placement.',
    diagram: {
      leftLabel: 'Sheet Edge',
      rightLabel: '3/8" Margin -> Screw Row',
      gapLabel: '6" Edge Centers / 8" Field Grid',
      subfloorLabel: 'Paulin #8 x 1-1/2" High Performance'
    }
  },
  {
    id: 'screw-countersink',
    category: 'Fasteners & Screws',
    title: 'Fastener Depth & Countersinking',
    dimension: 'Flush to 1/32" below surface',
    tolerance: 'Zero proud heads',
    importance: 'CRITICAL',
    badgeColor: 'red',
    icon: 'CheckCircle2',
    summary: 'Every screw head MUST sit completely flush or slightly countersunk (1/32"). Absolutely NO screw head may stand proud.',
    reasonWhy: 'LifeProof luxury vinyl plank sits directly atop the underlayment. Even a single screw head sticking up by 1/64" will create a high pivot point, cause an audible clicking sound when walked on, and will eventually wear a hole through the plank\'s attached foam backing.',
    proTip: 'The "Drywall Knife Test": Hold a 6-inch or 10-inch drywall taping knife flat against the floor and slide it in sweeping motions across every sheet. If the steel blade clicks or snags on a screw, back it out or drive it 1/32" deeper with your impact driver.',
    diagram: {
      leftLabel: 'Plywood Top Surface',
      rightLabel: 'Paulin Flat Head with Nibs',
      gapLabel: '1/32" Sub-surface Countersink',
      subfloorLabel: 'Smooth plane for LifeProof pad'
    }
  },
  {
    id: 'lifeproof-to-wall',
    category: 'LifeProof Luxury Vinyl',
    title: 'LifeProof Perimeter Expansion Gap',
    dimension: '1/4 inch (6 mm) minimum',
    tolerance: '1/4" to 3/8"',
    importance: 'CRITICAL',
    badgeColor: 'red',
    icon: 'Maximize2',
    summary: 'Maintain a minimum 1/4" expansion gap around ALL perimeter walls, door jambs, pipes, and fixed cabinetry.',
    reasonWhy: 'LifeProof is a floating floor. It expands and contracts with changes in ambient temperature (HVAC heating cycles, summer warmth, direct sun from bedroom windows). If pinched tight to a wall, the floor cannot float and will peak, buckle, or pop lock seams apart.',
    proTip: 'Use plastic 1/4" flooring wedge spacers along every wall every 2 to 3 feet. Remove all spacers AFTER the floor is complete before installing baseboards or quarter-round.',
    diagram: {
      leftLabel: 'Drywall Wall Base',
      rightLabel: 'LifeProof Plank',
      gapLabel: '1/4" (6mm) Floating Expansion Gap',
      subfloorLabel: 'Covered by 1/2" Baseboard + Shoe'
    }
  },
  {
    id: 'plank-stagger',
    category: 'LifeProof Luxury Vinyl',
    title: 'Plank End-Joint Stagger Distance',
    dimension: '8 inches (200 mm) minimum',
    tolerance: '8" to 24"',
    importance: 'HIGH',
    badgeColor: 'amber',
    icon: 'GitCommit',
    summary: 'Stagger plank end joints by at least 8" from the joint in the adjacent row. Never create H-patterns or staircase steps.',
    reasonWhy: 'Adequate stagger locks the floating floor system together structurally. Repeating seams close together weakens the mechanical lock and looks visually amateur.',
    proTip: 'Use the cut-off piece from the end of a row to start the next row (provided it is at least 8" long). This creates a natural, randomized wood grain stagger and minimizes waste.',
    diagram: {
      leftLabel: 'Row 1 End Joint',
      rightLabel: 'Row 2 End Joint',
      gapLabel: '≥ 8" (200mm) Stagger Offset',
      subfloorLabel: 'Random pattern distributes lock strength'
    }
  },
  {
    id: 'door-casing-undercut',
    category: 'Doorways & Trim',
    title: 'Door Casing & Jamb Undercut Clearance',
    dimension: 'Plank Thickness + 1/16" (~8 mm total)',
    tolerance: '+ 1/32"',
    importance: 'HIGH',
    badgeColor: 'amber',
    icon: 'Scissors',
    summary: 'Undercut all door casings and jambs so the LifeProof plank slides freely underneath with room to expand.',
    reasonWhy: 'Trying to scribe and cut vinyl plank around intricate door casings leaves unsightly, uneven gaps. Undercutting allows the plank to slip under cleanly while preserving the 1/4" floating expansion clearance underneath.',
    proTip: 'Take a scrap offcut of your LifeProof plank, lay it upside down on the subfloor against the door casing, rest your oscillating multi-tool blade flat on top of the scrap, and cut horizontally through the wood casing. Vacuum out sawdust.',
    diagram: {
      leftLabel: 'Door Casing / Jamb',
      rightLabel: 'LifeProof Plank Slid Under',
      gapLabel: '1/16" Vertical Clearance',
      subfloorLabel: 'Free to float without pinching'
    }
  },
  {
    id: 'transition-thresholds',
    category: 'Doorways & Trim',
    title: 'Transitions: 5PC Bathroom & Top of Stairs',
    dimension: '1/4" gap inside T-molding track',
    tolerance: 'Exact track fit',
    importance: 'HIGH',
    badgeColor: 'amber',
    icon: 'ChevronsRight',
    summary: 'Bathroom threshold: T-molding / Reducer with 1/4" gap inside channel. Top of stairs: Mechanically fastened flush/overlap stair nosing.',
    reasonWhy: 'Since the 5PC bathroom and its closet are excluded, the flooring will meet existing bathroom tile or floor at the door. Floating vinyl must terminate with a T-molding or reducer. NEVER pin the vinyl down through the molding—the molding track screws to the subfloor only.',
    proTip: 'At the top of the stairs, safety code requires stair nosing to be rigidly secured (glued with construction adhesive and screwed) so it never slips underfoot. Maintain the floating expansion gap underneath the nosing overlap lip.',
    diagram: {
      leftLabel: '5PC Bath Tile',
      rightLabel: 'LifeProof Plank',
      gapLabel: 'T-Molding with 1/4" Expansion Slot',
      subfloorLabel: 'Track anchored to subfloor only'
    }
  }
]
