// 20-Sheet Plywood Underlayment Cut Catalog & Irregular Polygon Sequence
// Strictly follows user's 4-zone installation sequence:
// Zone 1: Primary Bedroom & Master Closet (starts in NE outside corner under arrow)
// Zone 2: Central Hallway & Linen Closet
// Zone 3: Bedroom 2 (NW) - starts from wall adjacent to Primary, works down/west
// Zone 4: Bedroom 3 (SW) - starts from wall shared with Hallway, works west/south
// Sheets feature realistic irregular cuts (L-shapes, T-notches, closet wraps) to keep sheets as large as possible.

export const sheetLayoutData = [
  // ==========================================
  // ZONE 1: PRIMARY BEDROOM + MASTER CLOSET
  // ==========================================
  {
    id: 'sheet-01',
    stepNumber: 1,
    sheetNumber: 1,
    zone: 'Zone 1: Primary Bedroom',
    room: 'Primary Bedroom',
    status: 'full',
    shapeType: 'Full 4×8 Rectangle',
    dimsText: '48" × 96" (4\' × 8\')',
    cutDimensions: 'No cut required - factory full 4x8 sheet',
    offcut: 'None (Full sheet preserved)',
    position: 'Row 1, Outside Corner (North-East exterior corner)',
    polygon: [
      [8.71, -11.98],
      [12.71, -11.98],
      [12.71, -3.98],
      [8.71, -3.98]
    ],
    notes: 'Start here! Place factory edges against chalk lines directly under the red arrow marker. Maintain 1/4" expansion gap from drywall.',
    staggerOffset: '0"',
    fastenersCount: 82
  },
  {
    id: 'sheet-02',
    stepNumber: 2,
    sheetNumber: 2,
    zone: 'Zone 1: Primary Bedroom',
    room: 'Primary Bedroom & East Alcove',
    status: 'cut',
    shapeType: 'Irregular L-Shape Sheet',
    dimsText: '48" × 90" max (L-shaped wrap)',
    cutDimensions: 'Keep sheet large! Cross-cut length to 90", notch out 10" × 28" around Master Closet east return wall to flow continuously into the East Alcove',
    offcut: '10" × 28" notch offcut',
    position: 'Row 1, completing East exterior wall and wrapping into East Alcove beside closet',
    polygon: [
      [8.71, -3.98],
      [12.71, -3.98],
      [12.71, 3.49],
      [9.57, 3.49],
      [9.57, 1.19],
      [8.71, 1.19]
    ],
    notes: 'Irregular cut keeps one continuous piece covering the bedroom floor and east alcove, eliminating an unnecessary seam!',
    staggerOffset: '0"',
    fastenersCount: 72
  },
  {
    id: 'sheet-03',
    stepNumber: 3,
    sheetNumber: 3,
    zone: 'Zone 1: Primary Bedroom',
    room: 'Primary Bedroom',
    status: 'cut',
    shapeType: 'Stagger Starter (4×4)',
    dimsText: '48" × 48" (4\' × 4\')',
    cutDimensions: 'Cut 8ft sheet in half to 48" length',
    offcut: '48" × 48" half-sheet (reused in Bedroom 2 starter)',
    position: 'Row 2, Starter piece along North exterior wall',
    polygon: [
      [4.71, -11.98],
      [8.71, -11.98],
      [8.71, -7.98],
      [4.71, -7.98]
    ],
    notes: 'CRITICAL: Staggers the end joint by 48" from Sheet #1/2 seam. Avoids 4-corner intersections.',
    staggerOffset: '48" offset',
    fastenersCount: 46
  },
  {
    id: 'sheet-04',
    stepNumber: 4,
    sheetNumber: 4,
    zone: 'Zone 1: Primary Bedroom',
    room: 'Primary Bedroom',
    status: 'full',
    shapeType: 'Full 4×8 Rectangle',
    dimsText: '48" × 96" (4\' × 8\')',
    cutDimensions: 'No cut required - factory full 4x8 sheet',
    offcut: 'None',
    position: 'Row 2, Center field of Primary Bedroom',
    polygon: [
      [4.71, -7.98],
      [8.71, -7.98],
      [8.71, 0.02],
      [4.71, 0.02]
    ],
    notes: 'Screw every 6" on perimeter edges and 8" in the field. Keep 1/8" spacer nails between sheets.',
    staggerOffset: '48" offset',
    fastenersCount: 82
  },
  {
    id: 'sheet-05',
    stepNumber: 5,
    sheetNumber: 5,
    zone: 'Zone 1: Primary Bedroom',
    room: 'Primary Bedroom & Master Closet',
    status: 'cut',
    shapeType: 'Irregular T-Notch Closet Wrap',
    dimsText: '48" × 42" max (T-shaped wrap)',
    cutDimensions: 'Cut 48" × 42" sheet with 9" side notches to extend through grey Master Closet sliding door opening (Z: 1.20) directly into closet floor',
    offcut: 'Two 9" × 28" notch strips',
    position: 'Row 2, wrapping through Master Closet sliding doors into closet center',
    polygon: [
      [4.71, 0.02],
      [8.71, 0.02],
      [8.71, 1.19],
      [7.98, 1.19],
      [7.98, 3.49],
      [4.71, 3.49]
    ],
    notes: 'Passes cleanly through the grey sliding door opening without crossing solid walls. Bridges bedroom to closet without extra seams!',
    staggerOffset: '48" offset',
    fastenersCount: 48
  },
  {
    id: 'sheet-06',
    stepNumber: 6,
    sheetNumber: 6,
    zone: 'Zone 1: Primary Bedroom',
    room: 'Primary Bedroom',
    status: 'cut',
    shapeType: 'Rip Cut Rectangle',
    dimsText: '47" × 96" (3\'11" × 8\')',
    cutDimensions: 'Rip 1" off width along 8ft length (from 48" down to 47")',
    offcut: '1" × 96" rip strip',
    position: 'Row 3, North section along Hallway divider wall',
    polygon: [
      [0.81, -11.98],
      [4.71, -11.98],
      [4.71, -3.98],
      [0.81, -3.98]
    ],
    notes: 'Finishes width of Primary along Hall divider. Staggered with Row 2.',
    staggerOffset: '0" offset from Row 1',
    fastenersCount: 78
  },
  {
    id: 'sheet-07',
    stepNumber: 7,
    sheetNumber: 7,
    zone: 'Zone 1: Primary Bedroom',
    room: 'Primary Bedroom',
    status: 'cut',
    shapeType: 'Cross Cut Rectangle',
    dimsText: '47" × 62" (3\'11" × 5\'2")',
    cutDimensions: 'Rip to 47" width, cross-cut to 62" length',
    offcut: '47" × 34" piece (reused in Bedroom 3)',
    position: 'Row 3, south section facing bedroom entry door',
    polygon: [
      [0.81, -3.98],
      [4.71, -3.98],
      [4.71, 1.19],
      [0.81, 1.19]
    ],
    notes: 'Stops flush at Master Closet north wall line (Z: 1.19). Maintains door threshold clearance.',
    staggerOffset: '0" offset from Row 1',
    fastenersCount: 56
  },
  {
    id: 'sheet-08',
    stepNumber: 8,
    sheetNumber: 8,
    zone: 'Zone 1: Primary Bedroom',
    room: 'Master Closet (West)',
    status: 'cut',
    shapeType: 'Closet Interior Cut',
    dimsText: '28" × 47" (2\'4" × 3\'11")',
    cutDimensions: 'Cut to fit west section of Master Closet from offcut stock',
    offcut: 'Minimal scrap',
    position: 'Inside Master Closet (West side behind return wall)',
    polygon: [
      [0.81, 1.19],
      [4.71, 1.19],
      [4.71, 3.49],
      [0.81, 3.49]
    ],
    notes: 'Installed inside Master Closet enclosure. No overlap with bedroom floor.',
    staggerOffset: 'Closet unit',
    fastenersCount: 36
  },
  {
    id: 'sheet-09',
    stepNumber: 9,
    sheetNumber: 9,
    zone: 'Zone 1: Primary Bedroom',
    room: 'Master Closet (East)',
    status: 'cut',
    shapeType: 'Closet Interior Cut',
    dimsText: '28" × 19" (2\'4" × 1\'7")',
    cutDimensions: 'Cut small fill piece for east section of Master Closet',
    offcut: 'Minimal scrap',
    position: 'Inside Master Closet (East corner to closet return wall)',
    polygon: [
      [7.98, 1.19],
      [9.57, 1.19],
      [9.57, 3.49],
      [7.98, 3.49]
    ],
    notes: 'Completes Primary Bedroom and Master Closet! Zero waste, all corners covered.',
    staggerOffset: 'Closet unit',
    fastenersCount: 18
  },

  // ==========================================
  // ZONE 2: CENTRAL HALLWAY & LINEN CLOSET
  // ==========================================
  {
    id: 'sheet-10',
    stepNumber: 10,
    sheetNumber: 10,
    zone: 'Zone 2: Central Hallway',
    room: 'Central Hallway & Linen Closet',
    status: 'cut',
    shapeType: 'Irregular L-Notch Hallway & Closet',
    dimsText: '38" × 96" max (L-shaped wrap)',
    cutDimensions: 'Rip 10" off width along 8ft length to fit 38" corridor; notch L-tab 24" × 24" extending through grey opening into Hallway Linen Closet',
    offcut: '10" × 96" rip strip',
    position: 'Central Hallway Corridor + wrapping directly into Linen Closet',
    polygon: [
      [-2.35, -2.61],
      [0.80, -2.61],
      [0.80, 5.39],
      [-2.35, 5.39],
      [-2.35, -0.65],
      [-4.35, -0.65],
      [-4.35, -2.61]
    ],
    notes: 'Starts below Bedroom 2 door (Z: -2.61) and extends through the linen closet opening in one big, solid sheet!',
    staggerOffset: 'Hallway spine',
    fastenersCount: 82
  },
  {
    id: 'sheet-11',
    stepNumber: 11,
    sheetNumber: 11,
    zone: 'Zone 2: Central Hallway',
    room: 'Hallway Landing',
    status: 'cut',
    shapeType: 'Stair Landing Cut',
    dimsText: '38" × 34" (3\'2" × 2\'10")',
    cutDimensions: 'Cut length to 34" to terminate flush at top stair riser/nosing line (Z: 8.19)',
    offcut: 'Minimal scrap',
    position: 'Hallway South End / Top of Stairs Landing',
    polygon: [
      [-2.35, 5.39],
      [0.80, 5.39],
      [0.80, 8.19],
      [-2.35, 8.19]
    ],
    notes: 'Stops cleanly at the stair riser edge (Z: 8.19). Leaves clearance for stair nosing molding.',
    staggerOffset: 'Stair terminal',
    fastenersCount: 38
  },

  // ==========================================
  // ZONE 3: BEDROOM 2 (NW) - STARTS FROM ADJACENT PRIMARY WALL
  // ==========================================
  {
    id: 'sheet-12',
    stepNumber: 12,
    sheetNumber: 12,
    zone: 'Zone 3: Bedroom 2 (NW)',
    room: 'Bedroom 2 (NW)',
    status: 'full',
    shapeType: 'Full 4×8 Rectangle',
    dimsText: '48" × 96" (4\' × 8\')',
    cutDimensions: 'No cut required - factory full sheet (runs along wall shared with Primary)',
    offcut: 'None',
    position: 'Row 1, starting against wall shared with Primary Bedroom (X: 0.80) along North wall',
    polygon: [
      [-3.19, -11.98],
      [0.80, -11.98],
      [0.80, -3.98],
      [-3.19, -3.98]
    ],
    notes: 'Starts against the adjacent Primary wall as planned! Proves hallway does not extend into this bedroom.',
    staggerOffset: '0"',
    fastenersCount: 82
  },
  {
    id: 'sheet-13',
    stepNumber: 13,
    sheetNumber: 13,
    zone: 'Zone 3: Bedroom 2 (NW)',
    room: 'Bedroom 2 (NW)',
    status: 'cut',
    shapeType: 'Doorway Notched Cut',
    dimsText: '48" × 16" with door notch',
    cutDimensions: 'Cross-cut length to 16" to complete Row 1 down to Bedroom 2 south wall and door threshold (Z: -2.61)',
    offcut: '48" × 80" remaining stock (used for Sheet #15)',
    position: 'Row 1 South, completing span along Primary wall down to hallway door',
    polygon: [
      [-3.19, -3.98],
      [0.80, -3.98],
      [0.80, -2.61],
      [-0.50, -2.61],
      [-0.50, -3.01],
      [-3.19, -3.01]
    ],
    notes: 'Notched around the door opening to the hallway. Stops at south wall.',
    staggerOffset: '0"',
    fastenersCount: 28
  },
  {
    id: 'sheet-14',
    stepNumber: 14,
    sheetNumber: 14,
    zone: 'Zone 3: Bedroom 2 (NW)',
    room: 'Bedroom 2 (NW)',
    status: 'full',
    shapeType: 'Full 4×8 Rectangle (Stagger Row)',
    dimsText: '48" × 96" (4\' × 8\')',
    cutDimensions: 'No cut required - factory full sheet',
    offcut: 'None',
    position: 'Row 2, Center section of Bedroom 2',
    polygon: [
      [-7.19, -11.98],
      [-3.19, -11.98],
      [-3.19, -3.98],
      [-7.19, -3.98]
    ],
    notes: 'Staggers end joints with Row 1. Fasten every 6" on edges, 8" field.',
    staggerOffset: '48" offset',
    fastenersCount: 82
  },
  {
    id: 'sheet-15',
    stepNumber: 15,
    sheetNumber: 15,
    zone: 'Zone 3: Bedroom 2 (NW)',
    room: 'Bedroom 2 (NW)',
    status: 'full',
    shapeType: 'Full 4×8 Rectangle',
    dimsText: '48" × 96" (4\' × 8\')',
    cutDimensions: 'No cut required - factory full sheet along West exterior wall',
    offcut: 'None',
    position: 'Row 3, North-West corner along exterior window wall',
    polygon: [
      [-12.72, -11.98],
      [-7.19, -11.98],
      [-7.19, -3.98],
      [-12.72, -3.98]
    ],
    notes: 'Placed along west window wall. Maintain 1/4" wall gap.',
    staggerOffset: '0"',
    fastenersCount: 82
  },
  {
    id: 'sheet-16',
    stepNumber: 16,
    sheetNumber: 16,
    zone: 'Zone 3: Bedroom 2 (NW)',
    room: 'Bedroom 2 & Closet',
    status: 'cut',
    shapeType: 'Irregular L-Shape Closet Wrap',
    dimsText: '48" × 114" max (L-shaped wrap)',
    cutDimensions: 'Cut large L-shaped sheet covering south span of Bedroom 2 and wrapping continuously through grey closet opening into Bedroom 2 Closet',
    offcut: 'Scrap from notch cut',
    position: 'Row 3 South span + wrapping through opening into Bedroom 2 Closet',
    polygon: [
      [-12.72, -3.98],
      [-3.19, -3.98],
      [-3.19, -3.01],
      [-9.37, -3.01],
      [-9.37, -0.65],
      [-12.72, -0.65]
    ],
    notes: 'Massive single piece covering the bedroom south span and wrapping into the closet. Seamless, maximum structural rigidity!',
    staggerOffset: 'Closet wrap',
    fastenersCount: 74
  },

  // ==========================================
  // ZONE 4: BEDROOM 3 (SW) - STARTS FROM WALL SHARED WITH HALLWAY
  // ==========================================
  {
    id: 'sheet-17',
    stepNumber: 17,
    sheetNumber: 17,
    zone: 'Zone 4: Bedroom 3 (SW)',
    room: 'Bedroom 3 (SW)',
    status: 'full',
    shapeType: 'Full 4×8 Rectangle',
    dimsText: '48" × 96" (4\' × 8\')',
    cutDimensions: 'No cut required - factory full sheet (runs along shared Hallway wall)',
    offcut: 'None',
    position: 'Row 1, starting against the wall shared with the Hallway (X: -2.35)',
    polygon: [
      [-6.35, -0.65],
      [-2.35, -0.65],
      [-2.35, 7.35],
      [-6.35, 7.35]
    ],
    notes: 'Starts against shared Hallway wall as planned! Lays down cleanly from north closet line.',
    staggerOffset: '0"',
    fastenersCount: 82
  },
  {
    id: 'sheet-18',
    stepNumber: 18,
    sheetNumber: 18,
    zone: 'Zone 4: Bedroom 3 (SW)',
    room: 'Bedroom 3 & South Closet',
    status: 'cut',
    shapeType: 'Irregular L-Shape South Closet Wrap',
    dimsText: '48" × 58" (L-shaped wrap)',
    cutDimensions: 'Cross-cut length to 44" and extend L-tab 23" × 58" into Bedroom 3 South Closet through grey opening',
    offcut: 'Scrap from notch cut',
    position: 'Row 1 South section + wrapping directly into Bedroom 3 South Closet',
    polygon: [
      [-6.35, 7.35],
      [-2.35, 7.35],
      [-2.35, 11.02],
      [-7.19, 11.02],
      [-7.19, 9.12],
      [-6.35, 9.12]
    ],
    notes: 'Irregular cut locks the south-east corner and covers the closet without a separate mini piece!',
    staggerOffset: '0"',
    fastenersCount: 58
  },
  {
    id: 'sheet-19',
    stepNumber: 19,
    sheetNumber: 19,
    zone: 'Zone 4: Bedroom 3 (SW)',
    room: 'Bedroom 3 (SW)',
    status: 'full',
    shapeType: 'Full 4×8 Rectangle',
    dimsText: '48" × 96" (4\' × 8\')',
    cutDimensions: 'No cut required - factory full sheet',
    offcut: 'None',
    position: 'Row 2, Center section of Bedroom 3',
    polygon: [
      [-10.35, -0.65],
      [-6.35, -0.65],
      [-6.35, 7.35],
      [-10.35, 7.35]
    ],
    notes: 'Center field of Bedroom 3. 48" offset stagger with Row 1.',
    staggerOffset: '48" offset',
    fastenersCount: 82
  },
  {
    id: 'sheet-20',
    stepNumber: 20,
    sheetNumber: 20,
    zone: 'Zone 4: Bedroom 3 (SW)',
    room: 'Bedroom 3 (West & North Closet)',
    status: 'cut',
    shapeType: 'Rip Cut Rectangle',
    dimsText: '28" × 140" (2\'4" × 11\'8")',
    cutDimensions: 'Rip cut along West exterior wall from south wall up to closet divider',
    offcut: '20" × 96" rip strip',
    position: 'Row 3, along West exterior window wall',
    polygon: [
      [-12.72, -0.65],
      [-10.35, -0.65],
      [-10.35, 11.02],
      [-12.72, 11.02]
    ],
    notes: 'Final sheet! Finishes the entire 2nd floor underlayment. Vacuum clean and check every screw with a drywall knife.',
    staggerOffset: 'Final perimeter',
    fastenersCount: 76
  }
]
