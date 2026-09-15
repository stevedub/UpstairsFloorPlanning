// 28-Piece Plywood Underlayment Cut Catalog & Verified Irregular Polygon Sequence
// Strictly adheres to original FloorPlan.pdf:
// 1. ALL GREY WALL REGIONS IN THE PDF ARE THE CLOSET DOORWAYS:
//    - Bedroom 2 Closet (Middle Closet): Doorway is on NORTH wall (grey sliding doors facing Bed 2)
//    - Bedroom 3 North Closet (Left Closet): Doorway is on SOUTH wall (grey opening facing Bed 3)
//    - Hallway Linen Closet: Doorway is on EAST wall (grey door facing Hallway)
//    - Bedroom 3 South Closet: Doorway is on NORTH wall (grey opening facing Bed 3)
//    - Master Closet: Doorway is on NORTH wall (grey sliding doors facing Primary)
// 2. NO SHEETS PASS UNDER SOLID BLACK WALLS - cuts strictly respect framing and openings.
// 3. NO PIECE EXCEEDS 4ft × 8ft (All pieces fit within standard physical 4x8 BCX plywood sheets).
// 4. All closets are 100% covered with zero gaps and zero duplicate overlaps.
// 5. Dedicated 4x8 sheet for Master Closet (8ft runner + end fill from same offcut).

export const sheetLayoutData = [
  // ==========================================
  // ZONE 1: PRIMARY BEDROOM & MASTER CLOSET (Pieces 1–9)
  // Starts directly under red arrow pin at NE exterior corner (12.71, -11.98)
  // ==========================================
  {
    id: 'sheet-01',
    stepNumber: 1,
    sheetNumber: 1,
    zone: 'Zone 1: Primary Bedroom',
    room: 'Primary Bedroom',
    status: 'full',
    shapeType: 'Full 4×8 Factory Sheet',
    dimsText: '48" × 96" (4\' × 8\')',
    cutDimensions: 'No cut required - factory full 4x8 sheet',
    offcut: 'None (Full sheet preserved)',
    position: 'Row 1, North-East exterior corner (Directly under red pin)',
    polygon: [
      [8.71, -11.98],
      [12.71, -11.98],
      [12.71, -3.98],
      [8.71, -3.98]
    ],
    notes: 'Start project here! Place factory edges against chalk lines directly under the red arrow marker. Maintain 1/4" expansion gap from drywall.',
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
    dimsText: '48" × 89.6" max (L-shaped wrap)',
    cutDimensions: 'Cross-cut length to 89.6" (7\'5"), notch out 10" × 27.6" around Master Closet east return wall to wrap seamlessly into East Alcove',
    offcut: '10" × 27.6" notch offcut',
    position: 'Row 1, completing East exterior wall and wrapping into East Alcove',
    polygon: [
      [8.71, -3.98],
      [12.71, -3.98],
      [12.71, 3.49],
      [9.57, 3.49],
      [9.57, 1.19],
      [8.71, 1.19]
    ],
    notes: 'Fits within a 4x8 sheet (4.0\' × 7.47\'). Continuous piece covers bedroom floor and alcove without an extra joint.',
    staggerOffset: '0"',
    fastenersCount: 74
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
    cutDimensions: 'Cross-cut full 8ft sheet in half at 48"',
    offcut: '48" × 48" half-sheet (reused in Bedroom 2 as Sheet #15)',
    position: 'Row 2, Starter piece along North exterior wall',
    polygon: [
      [4.71, -11.98],
      [8.71, -11.98],
      [8.71, -7.98],
      [4.71, -7.98]
    ],
    notes: 'Staggers the end joint by 48" from Sheet #1/2 seam. Avoids four-corner intersections.',
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
    shapeType: 'Full 4×8 Factory Sheet',
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
    notes: 'Screw every 6" on edges and 8" in field. Keep 1/8" spacer nails between plywood sheets.',
    staggerOffset: '48" offset',
    fastenersCount: 82
  },
  {
    id: 'sheet-05',
    stepNumber: 5,
    sheetNumber: 5,
    zone: 'Zone 1: Primary Bedroom',
    room: 'Primary Bedroom',
    status: 'cut',
    shapeType: 'Cross Cut Rectangle',
    dimsText: '48" × 14" (4\' × 1\'2")',
    cutDimensions: 'Cross-cut 14" strip to finish Row 2 flush at Master Closet north wall (Z: 1.19)',
    offcut: '48" × 82" remainder (used for Bedroom 3 and landing)',
    position: 'Row 2, south section stopping at Master Closet wall line',
    polygon: [
      [4.71, 0.02],
      [8.71, 0.02],
      [8.71, 1.19],
      [4.71, 1.19]
    ],
    notes: 'Stops flush at closet wall line. Master closet is floored independently with its own dedicated 4x8 sheet.',
    staggerOffset: '48" offset',
    fastenersCount: 28
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
    position: 'Row 3, North section along Hallway divider wall (X: 0.81)',
    polygon: [
      [0.81, -11.98],
      [4.71, -11.98],
      [4.71, -3.98],
      [0.81, -3.98]
    ],
    notes: 'Finishes width of Primary along Hall divider. 48" stagger with Row 2.',
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
    offcut: '47" × 34" remainder stock',
    position: 'Row 3, south section facing bedroom entry door',
    polygon: [
      [0.81, -3.98],
      [4.71, -3.98],
      [4.71, 1.19],
      [0.81, 1.19]
    ],
    notes: 'Stops flush at Master Closet north wall line (Z: 1.19). Primary bedroom floor is 100% complete.',
    staggerOffset: '0" offset from Row 1',
    fastenersCount: 56
  },
  {
    id: 'sheet-08',
    stepNumber: 8,
    sheetNumber: 8,
    zone: 'Zone 1: Primary Bedroom',
    room: 'Master Closet (Main Runner)',
    status: 'cut',
    shapeType: 'Primary Closet 8ft Runner (from 4×8)',
    dimsText: '27.6" × 96" (2\'3.6" × 8\')',
    cutDimensions: 'Rip a fresh 4x8 sheet lengthwise to 27.6" (2\'4") width to create full 8ft runner covering main closet floor through the grey sliding door opening',
    offcut: '20.4" × 96" remainder strip (used directly for Sheet #9 and Linen Closet)',
    position: 'Master Closet, main 8ft continuous span from West wall',
    polygon: [
      [0.81, 1.19],
      [8.81, 1.19],
      [8.81, 3.49],
      [0.81, 3.49]
    ],
    notes: 'Uses a dedicated 4x8 sheet for the Master Closet! Single 8ft piece covers 91% of the closet seamlessly through grey sliding doors.',
    staggerOffset: 'Closet unit',
    fastenersCount: 68
  },
  {
    id: 'sheet-09',
    stepNumber: 9,
    sheetNumber: 9,
    zone: 'Zone 1: Primary Bedroom',
    room: 'Master Closet (East Fill)',
    status: 'cut',
    shapeType: 'Primary Closet End Fill (from Sheet #8 offcut)',
    dimsText: '27.6" × 9.1" (2\'3.6" × 0\'9.1")',
    cutDimensions: 'Cut 9.1" fill piece from the 20.4" wide offcut of Sheet #8',
    offcut: 'Minimal scrap',
    position: 'Master Closet, East corner fill to closet return wall',
    polygon: [
      [8.81, 1.19],
      [9.57, 1.19],
      [9.57, 3.49],
      [8.81, 3.49]
    ],
    notes: 'Cut from the same 4x8 sheet offcut as Sheet #8! Master Closet is 100% covered with zero waste.',
    staggerOffset: 'Closet unit',
    fastenersCount: 16
  },

  // ==========================================
  // ZONE 2: CENTRAL HALLWAY & LINEN CLOSET (Pieces 10–12)
  // Starts below Bedroom 2 door (Z: -2.61) down to top of stairs (Z: 8.19)
  // ==========================================
  {
    id: 'sheet-10',
    stepNumber: 10,
    sheetNumber: 10,
    zone: 'Zone 2: Central Hallway',
    room: 'Central Hallway Corridor',
    status: 'cut',
    shapeType: 'Rip Cut Corridor Sheet',
    dimsText: '37.8" × 96" (3\'1.8" × 8\')',
    cutDimensions: 'Rip 4x8 sheet down to 37.8" (3\'1.8") width along full 8ft length to fit hallway corridor',
    offcut: '10.2" × 96" rip strip',
    position: 'Central Hallway, Main corridor from Bedroom 2 door (Z: -2.61) down to landing',
    polygon: [
      [-2.35, -2.61],
      [0.80, -2.61],
      [0.80, 5.39],
      [-2.35, 5.39]
    ],
    notes: 'Fits within 4x8 bounds (3.15\' × 8.0\'). Clean single piece covering hallway spine.',
    staggerOffset: 'Hallway spine',
    fastenersCount: 78
  },
  {
    id: 'sheet-11',
    stepNumber: 11,
    sheetNumber: 11,
    zone: 'Zone 2: Central Hallway',
    room: 'Hallway Landing',
    status: 'cut',
    shapeType: 'Stair Landing Cut',
    dimsText: '37.8" × 33.6" (3\'1.8" × 2\'9.6")',
    cutDimensions: 'Rip to 37.8" width, cut length to 33.6" to terminate flush at top stair riser/nosing line (Z: 8.19)',
    offcut: 'Minimal scrap',
    position: 'Hallway South End / Top of Stairs Landing',
    polygon: [
      [-2.35, 5.39],
      [0.80, 5.39],
      [0.80, 8.19],
      [-2.35, 8.19]
    ],
    notes: 'Terminates cleanly at stair nosing edge. Leaves clearance for stair nosing molding.',
    staggerOffset: 'Stair terminal',
    fastenersCount: 36
  },
  {
    id: 'sheet-12',
    stepNumber: 12,
    sheetNumber: 12,
    zone: 'Zone 2: Central Hallway',
    room: 'Hallway Linen Closet',
    status: 'cut',
    shapeType: 'Linen Closet Unit Cut',
    dimsText: '24" × 28.3" (2\'0" × 2\'4.3")',
    cutDimensions: 'Cut 24" × 28.3" single floor plate from offcut stock',
    offcut: 'Reused stock',
    position: 'Hallway Linen Closet Floor (Enters through verified grey doorway on East wall)',
    polygon: [
      [-4.35, -3.01],
      [-2.35, -3.01],
      [-2.35, -0.65],
      [-4.35, -0.65]
    ],
    notes: 'Dedicated piece inside linen closet. Enters through the grey door opening on the East wall. Bounded 2.0\' × 2.36\'.',
    staggerOffset: 'Closet unit',
    fastenersCount: 26
  },

  // ==========================================
  // ZONE 3: BEDROOM 2 (NW) & BEDROOM 2 CLOSET (MIDDLE CLOSET) (Pieces 13–21)
  // Starts against wall shared with Primary (X: 0.80) working west across 13'6" width
  // Note: Bedroom 2 closet is the MIDDLE closet with grey sliding doors on the NORTH wall!
  // ==========================================
  {
    id: 'sheet-13',
    stepNumber: 13,
    sheetNumber: 13,
    zone: 'Zone 3: Bedroom 2 (NW)',
    room: 'Bedroom 2 (NW)',
    status: 'full',
    shapeType: 'Full 4×8 Factory Sheet',
    dimsText: '48" × 96" (4\' × 8\')',
    cutDimensions: 'No cut required - factory full 4x8 sheet',
    offcut: 'None',
    position: 'Row 1, North section starting against wall shared with Primary (X: 0.80)',
    polygon: [
      [-3.20, -11.98],
      [0.80, -11.98],
      [0.80, -3.98],
      [-3.20, -3.98]
    ],
    notes: 'Starts against the adjacent Primary wall as required! Confirms hallway stops below Bedroom 2.',
    staggerOffset: '0"',
    fastenersCount: 82
  },
  {
    id: 'sheet-14',
    stepNumber: 14,
    sheetNumber: 14,
    zone: 'Zone 3: Bedroom 2 (NW)',
    room: 'Bedroom 2 Doorway Span',
    status: 'cut',
    shapeType: 'Doorway Notched Cut',
    dimsText: '48" × 16.4" max (notched)',
    cutDimensions: 'Cross-cut length to 16.4", notch doorway extension to Z: -2.61 between X: -2.35 and 0.80 through the grey doorway opening, stopping at Z: -3.01 west of door',
    offcut: '48" × 79.6" remainder (used for Sheet #16)',
    position: 'Row 1 South, completing span along Primary wall down to hallway door threshold',
    polygon: [
      [-3.20, -3.98],
      [0.80, -3.98],
      [0.80, -2.61],
      [-2.35, -2.61],
      [-2.35, -3.01],
      [-3.20, -3.01]
    ],
    notes: 'Passes cleanly through the verified grey doorway opening to the hallway. Stops flush at wall. Zero overlap into linen closet.',
    staggerOffset: '0"',
    fastenersCount: 30
  },
  {
    id: 'sheet-15',
    stepNumber: 15,
    sheetNumber: 15,
    zone: 'Zone 3: Bedroom 2 (NW)',
    room: 'Bedroom 2 (NW)',
    status: 'cut',
    shapeType: 'Stagger Starter (4×4)',
    dimsText: '48" × 48" (4\' × 4\')',
    cutDimensions: 'Use second half of Sheet #3 cut (48" × 48")',
    offcut: 'Zero waste - 100% offcut reuse!',
    position: 'Row 2, Starter piece along North exterior wall',
    polygon: [
      [-7.20, -11.98],
      [-3.20, -11.98],
      [-3.20, -7.98],
      [-7.20, -7.98]
    ],
    notes: '48" stagger offset from Row 1. Reuses offcut half from Sheet #3 directly.',
    staggerOffset: '48" offset',
    fastenersCount: 46
  },
  {
    id: 'sheet-16',
    stepNumber: 16,
    sheetNumber: 16,
    zone: 'Zone 3: Bedroom 2 (NW)',
    room: 'Bedroom 2 (NW)',
    status: 'cut',
    shapeType: 'Cross Cut Rectangle',
    dimsText: '48" × 59.6" (4\' × 4\'11.6")',
    cutDimensions: 'Cross-cut length to 59.6" (4.97\') to complete Row 2 to south wall (Z: -3.01)',
    offcut: '48" × 36.4" remainder',
    position: 'Row 2, Center span of Bedroom 2 down to south wall',
    polygon: [
      [-7.20, -7.98],
      [-3.20, -7.98],
      [-3.20, -3.01],
      [-7.20, -3.01]
    ],
    notes: 'Fits within 4x8 bounds (4.0\' × 4.97\'). Stops at south wall line facing the Bedroom 2 closet sliding doors.',
    staggerOffset: '48" offset',
    fastenersCount: 58
  },
  {
    id: 'sheet-17',
    stepNumber: 17,
    sheetNumber: 17,
    zone: 'Zone 3: Bedroom 2 (NW)',
    room: 'Bedroom 2 (NW)',
    status: 'full',
    shapeType: 'Full 4×8 Factory Sheet',
    dimsText: '48" × 96" (4\' × 8\')',
    cutDimensions: 'No cut required - factory full 4x8 sheet',
    offcut: 'None',
    position: 'Row 3, North section along North exterior wall',
    polygon: [
      [-11.20, -11.98],
      [-7.20, -11.98],
      [-7.20, -3.98],
      [-11.20, -3.98]
    ],
    notes: 'Row 3 full sheet. Aligned with Row 1 joint line.',
    staggerOffset: '0"',
    fastenersCount: 82
  },
  {
    id: 'sheet-18',
    stepNumber: 18,
    sheetNumber: 18,
    zone: 'Zone 3: Bedroom 2 (NW)',
    room: 'Bedroom 2 (NW)',
    status: 'cut',
    shapeType: 'Cross Cut Rectangle',
    dimsText: '48" × 11.6" (4\' × 0\'11.6")',
    cutDimensions: 'Cross-cut 11.6" strip to finish Row 3 to south wall (Z: -3.01)',
    offcut: 'Reused stock',
    position: 'Row 3, south strip stopping at south wall line',
    polygon: [
      [-11.20, -3.98],
      [-7.20, -3.98],
      [-7.20, -3.01],
      [-11.20, -3.01]
    ],
    notes: 'Stops at south wall line. Row 3 complete.',
    staggerOffset: '0"',
    fastenersCount: 22
  },
  {
    id: 'sheet-19',
    stepNumber: 19,
    sheetNumber: 19,
    zone: 'Zone 3: Bedroom 2 (NW)',
    room: 'Bedroom 2 (NW)',
    status: 'cut',
    shapeType: 'Rip Cut Rectangle',
    dimsText: '18.2" × 96" (1\'6.2" × 8\')',
    cutDimensions: 'Rip 4x8 sheet down to 18.2" width to complete Bedroom 2 west exterior window wall',
    offcut: '29.8" × 96" rip offcut',
    position: 'Row 4, along West exterior window wall (North section)',
    polygon: [
      [-12.72, -11.98],
      [-11.20, -11.98],
      [-11.20, -3.98],
      [-12.72, -3.98]
    ],
    notes: 'Runs along west window wall down to Z: -3.98. Maintain 1/4" perimeter wall gap.',
    staggerOffset: '0"',
    fastenersCount: 52
  },
  {
    id: 'sheet-20',
    stepNumber: 20,
    sheetNumber: 20,
    zone: 'Zone 3: Bedroom 2 (NW)',
    room: 'Bedroom 2 (SW Corner)',
    status: 'cut',
    shapeType: 'Cross Cut Rectangle',
    dimsText: '18.2" × 11.6" (1\'6.2" × 0\'11.6")',
    cutDimensions: 'Cross-cut 18.2" width to 11.6" length to complete South-West corner of Bedroom 2 up to the solid wall',
    offcut: 'Minimal scrap',
    position: 'Row 4 South span, stopping at solid dividing wall (Z: -3.01)',
    polygon: [
      [-12.72, -3.98],
      [-11.20, -3.98],
      [-11.20, -3.01],
      [-12.72, -3.01]
    ],
    notes: 'STRICT WALL CLEARANCE: Stops flush at Z: -3.01 against the solid black wall dividing Bedroom 2 from Bedroom 3 North closet. Does NOT penetrate solid wall!',
    staggerOffset: '0"',
    fastenersCount: 20
  },
  {
    id: 'sheet-21',
    stepNumber: 21,
    sheetNumber: 21,
    zone: 'Zone 3: Bedroom 2 (NW)',
    room: 'Bedroom 2 Closet (Middle Closet)',
    status: 'cut',
    shapeType: 'Bed 2 Closet Unit Cut (from 4×8)',
    dimsText: '60.2" × 28.3" (5\'0.2" × 2\'4.3")',
    cutDimensions: 'Cut 60.2" × 28.3" solid single piece from a 4x8 sheet (rotated 5.02\' length fits on 8ft sheet) to floor the Bedroom 2 Middle Closet through the verified grey sliding doors',
    offcut: '35.8" × 48" remainder stock',
    position: 'Bedroom 2 Closet Floor (Middle closet, enters through verified grey sliding doors on North wall)',
    polygon: [
      [-9.37, -3.01],
      [-4.35, -3.01],
      [-4.35, -0.65],
      [-9.37, -0.65]
    ],
    notes: 'CORRECTED PER PDF BLUEPRINT: The middle closet is Bedroom 2\'s closet! Its doorway is the grey sliding doors on the NORTH wall. Floored in ONE continuous 5\'0" piece. Bedroom 2 is 100% complete.',
    staggerOffset: 'Closet unit',
    fastenersCount: 48
  },

  // ==========================================
  // ZONE 4: BEDROOM 3 (SW) & CLOSETS (Pieces 22–28)
  // Starts against wall shared with Hallway (X: -2.35) working west/south
  // Note: Bedroom 3 North closet is the LEFTMOST closet with grey opening on the SOUTH wall!
  // ==========================================
  {
    id: 'sheet-22',
    stepNumber: 22,
    sheetNumber: 22,
    zone: 'Zone 4: Bedroom 3 (SW)',
    room: 'Bedroom 3 (SW)',
    status: 'full',
    shapeType: 'Full 4×8 Factory Sheet',
    dimsText: '48" × 96" (4\' × 8\')',
    cutDimensions: 'No cut required - factory full 4x8 sheet',
    offcut: 'None',
    position: 'Row 1, starting against wall shared with Hallway (X: -2.35)',
    polygon: [
      [-6.35, -0.65],
      [-2.35, -0.65],
      [-2.35, 7.35],
      [-6.35, 7.35]
    ],
    notes: 'Starts against shared Hallway wall as required! Lays down cleanly from north wall line (Z: -0.65).',
    staggerOffset: '0"',
    fastenersCount: 82
  },
  {
    id: 'sheet-23',
    stepNumber: 23,
    sheetNumber: 23,
    zone: 'Zone 4: Bedroom 3 (SW)',
    room: 'Bedroom 3 & South Closet',
    status: 'cut',
    shapeType: 'Irregular L-Shape South Closet Wrap',
    dimsText: '58.1" × 44.0" max (L-shaped wrap)',
    cutDimensions: 'Cut L-shaped sheet (4.84\' × 3.67\') extending through verified grey opening on North wall into Bedroom 3 South Closet',
    offcut: 'Scrap from notch cut',
    position: 'Row 1 South section + wrapping directly into Bedroom 3 South Closet through grey opening',
    polygon: [
      [-6.35, 7.35],
      [-2.35, 7.35],
      [-2.35, 11.02],
      [-7.19, 11.02],
      [-7.19, 9.12],
      [-6.35, 9.12]
    ],
    notes: 'Passes through verified grey opening on the north wall into the south closet! Fits within 4x8 sheet (4.84\' × 3.67\').',
    staggerOffset: '0"',
    fastenersCount: 62
  },
  {
    id: 'sheet-24',
    stepNumber: 24,
    sheetNumber: 24,
    zone: 'Zone 4: Bedroom 3 (SW)',
    room: 'Bedroom 3 (SW)',
    status: 'cut',
    shapeType: 'Stagger Starter (4×4)',
    dimsText: '48" × 48" (4\' × 4\')',
    cutDimensions: 'Cross-cut full 8ft sheet in half at 48" to establish a 48" stagger offset from Row 1 and Row 3',
    offcut: '48" × 48" half-sheet (used on Raw Sheet #17 to produce Piece #27)',
    position: 'Row 2, Starter piece along North room line (Z: -0.65)',
    polygon: [
      [-10.35, -0.65],
      [-6.35, -0.65],
      [-6.35, 3.35],
      [-10.35, 3.35]
    ],
    notes: 'Eliminates aligned seams! Staggers the end joint at Z: 3.35 by 48" from Row 1 (Sheet #22 seam at Z: 7.35) and Row 3 (Sheet #26 seam at Z: 7.35). Zero cross-joints.',
    staggerOffset: '48" offset',
    fastenersCount: 46
  },
  {
    id: 'sheet-25',
    stepNumber: 25,
    sheetNumber: 25,
    zone: 'Zone 4: Bedroom 3 (SW)',
    room: 'Bedroom 3 (South Span)',
    status: 'cut',
    shapeType: 'Irregular Notch South Span',
    dimsText: '48" × 92.0" max (4\' × 7\'8")',
    cutDimensions: 'Cross-cut length to 92.0" (7\'8"), notch 10.1" return along closet wall (Z: 9.12 to 11.02) to match Sheet #23 boundary with zero overlap',
    offcut: '4" × 48" end strip + 10.1" × 22.8" notch offcut',
    position: 'Row 2, from Z: 3.35 down to South exterior wall (Z: 11.02)',
    polygon: [
      [-10.35, 3.35],
      [-6.35, 3.35],
      [-6.35, 9.12],
      [-7.19, 9.12],
      [-7.19, 11.02],
      [-10.35, 11.02]
    ],
    notes: 'Fits within a standard 4x8 sheet (4.0\' × 7.67\' = 48" × 92.0" <= 96"). Seam with Sheet #24 is at Z: 3.35, creating a 48" stagger from Row 1 and Row 3. Aligns flush against Sheet #23 with zero overlap.',
    staggerOffset: '48" offset',
    fastenersCount: 78
  },
  {
    id: 'sheet-26',
    stepNumber: 26,
    sheetNumber: 26,
    zone: 'Zone 4: Bedroom 3 (SW)',
    room: 'Bedroom 3 (West Window Wall)',
    status: 'cut',
    shapeType: 'Rip Cut Rectangle',
    dimsText: '28.4" × 96" (2\'4.4" × 8\')',
    cutDimensions: 'Rip 4x8 sheet down to 28.4" width along full 8ft length to fit west exterior window wall',
    offcut: '19.6" × 96" rip offcut',
    position: 'Row 3, along West exterior window wall (North section)',
    polygon: [
      [-12.72, -0.65],
      [-10.35, -0.65],
      [-10.35, 7.35],
      [-12.72, 7.35]
    ],
    notes: 'Fits within 4x8 bounds (2.37\' × 8.0\'). Placed along west exterior wall.',
    staggerOffset: '0"',
    fastenersCount: 68
  },
  {
    id: 'sheet-27',
    stepNumber: 27,
    sheetNumber: 27,
    zone: 'Zone 4: Bedroom 3 (SW)',
    room: 'Bedroom 3 (SW Corner Finish)',
    status: 'cut',
    shapeType: 'Cross Cut Rectangle',
    dimsText: '28.4" × 44.0" (2\'4.4" × 3\'8")',
    cutDimensions: 'Rip to 28.4" width, cross-cut to 44.0" length to complete South-West exterior corner',
    offcut: 'Minimal scrap',
    position: 'Row 3 South, completing South-West corner of Bedroom 3',
    polygon: [
      [-12.72, 7.35],
      [-10.35, 7.35],
      [-10.35, 11.02],
      [-12.72, 11.02]
    ],
    notes: 'Completes Bedroom 3 main room floor down to south exterior wall.',
    staggerOffset: 'Final perimeter',
    fastenersCount: 38
  },
  {
    id: 'sheet-28',
    stepNumber: 28,
    sheetNumber: 28,
    zone: 'Zone 4: Bedroom 3 (SW)',
    room: 'Bedroom 3 North Closet (Left Closet)',
    status: 'cut',
    shapeType: 'Bed 3 North Closet Unit Cut (from 4×8)',
    dimsText: '40.2" × 28.3" (3\'4.2" × 2\'4.3")',
    cutDimensions: 'Cut 40.2" × 28.3" solid single piece from a 4x8 sheet to floor the leftmost closet through its verified grey doorway on the South wall',
    offcut: 'Reused stock',
    position: 'Bedroom 3 North Closet Floor (Leftmost closet, enters through verified grey opening on South wall)',
    polygon: [
      [-12.72, -3.01],
      [-9.37, -3.01],
      [-9.37, -0.65],
      [-12.72, -0.65]
    ],
    notes: 'CORRECTED PER PDF BLUEPRINT: The leftmost closet belongs to Bedroom 3! Its doorway is on the SOUTH wall facing Bedroom 3. Its north wall is solid black drywall. FINAL PIECE! 100% of the entire 2nd floor is completely floored with zero gaps and zero overlaps.',
    staggerOffset: 'Closet unit',
    fastenersCount: 36
  }
]
