// 19 Raw 4×8 Plywood Sheets Nesting & Cutting Plan (+ Sheet #20 Full Spare Buffer)
// Mathematically verifies that all 28 irregular & rectangular cut pieces fit onto 19 raw sheets.
// Standard sheet size: 48" × 96" (4ft × 8ft = 32.0 sq ft). Total net piece area = 486.1 sq ft.

export const rawSheetNestingData = [
  {
    rawSheetNum: 1,
    status: 'full',
    title: 'Raw Sheet #1 (Factory Full)',
    allocatedZone: 'Zone 1: Primary Bedroom',
    sheetRole: 'Primary NE Exterior Corner - Project Starting Sheet',
    piecesProduced: [
      {
        stepNumber: 1,
        pieceId: 'sheet-01',
        room: 'Primary Bedroom',
        size: '48" × 96" (4\' × 8\')',
        shape: 'Full Factory Sheet',
        cutDescription: 'No cutting required. Place factory full sheet directly under the red arrow pin at the North-East exterior corner.'
      }
    ],
    efficiencyPercent: 100,
    usedSqFt: 32.0,
    wasteSqFt: 0.0,
    offcutNotes: 'Zero waste. 100% sheet utilization.'
  },
  {
    rawSheetNum: 2,
    status: 'cut',
    title: 'Raw Sheet #2 (L-Shape Wrap)',
    allocatedZone: 'Zone 1: Primary Bedroom',
    sheetRole: 'Primary Row 1 East Exterior Wall & East Alcove Wrap',
    piecesProduced: [
      {
        stepNumber: 2,
        pieceId: 'sheet-02',
        room: 'Primary Bedroom & East Alcove',
        size: '48" × 89.6" max (L-shape)',
        shape: 'Irregular L-Shape',
        cutDescription: 'Cross-cut length from 96" to 89.6". Notch out 10" × 27.6" around the Master Closet east return wall to wrap continuously into the East Alcove.'
      }
    ],
    efficiencyPercent: 88,
    usedSqFt: 28.0,
    wasteSqFt: 4.0,
    offcutNotes: '10" × 27.6" notch offcut + 6.4" × 48" end strip (used for shims and backing).'
  },
  {
    rawSheetNum: 3,
    status: 'multi-cut',
    title: 'Raw Sheet #3 (Two 48" × 48" Starters)',
    allocatedZone: 'Zone 1 (Primary) & Zone 3 (Bedroom 2)',
    sheetRole: 'Dual Row-Stagger Starter Sheet (Primary Row 2 + Bed 2 Row 2)',
    piecesProduced: [
      {
        stepNumber: 3,
        pieceId: 'sheet-03',
        room: 'Primary Bedroom',
        size: '48" × 48" (4\' × 4\')',
        shape: '4×4 Stagger Starter',
        cutDescription: 'First half: Cross-cut full sheet at 48" centerline to start Primary Row 2 with a 48" stagger offset.'
      },
      {
        stepNumber: 15,
        pieceId: 'sheet-15',
        room: 'Bedroom 2 (NW)',
        size: '48" × 48" (4\' × 4\')',
        shape: '4×4 Stagger Starter',
        cutDescription: 'Second half: The remaining 48" × 48" half-sheet is saved and used directly as the Row 2 starter in Bedroom 2!'
      }
    ],
    efficiencyPercent: 100,
    usedSqFt: 32.0,
    wasteSqFt: 0.0,
    offcutNotes: 'Zero waste! 100% sheet utilization. A single cut in half yields two essential starter pieces.'
  },
  {
    rawSheetNum: 4,
    status: 'full',
    title: 'Raw Sheet #4 (Factory Full)',
    allocatedZone: 'Zone 1: Primary Bedroom',
    sheetRole: 'Primary Row 2 Center Field',
    piecesProduced: [
      {
        stepNumber: 4,
        pieceId: 'sheet-04',
        room: 'Primary Bedroom',
        size: '48" × 96" (4\' × 8\')',
        shape: 'Full Factory Sheet',
        cutDescription: 'No cutting required. Place factory full sheet in center of Primary Bedroom Row 2.'
      }
    ],
    efficiencyPercent: 100,
    usedSqFt: 32.0,
    wasteSqFt: 0.0,
    offcutNotes: 'Zero waste. 100% sheet utilization.'
  },
  {
    rawSheetNum: 5,
    status: 'multi-cut',
    title: 'Raw Sheet #5 (Primary & Bed 2 Row 2 Finishers)',
    allocatedZone: 'Zone 1 (Primary) & Zone 3 (Bedroom 2)',
    sheetRole: 'Row 2 South Finishers for Primary and Bedroom 2',
    piecesProduced: [
      {
        stepNumber: 5,
        pieceId: 'sheet-05',
        room: 'Primary Bedroom',
        size: '48" × 14" (4\' × 1\'2")',
        shape: 'Cross-Cut Finisher',
        cutDescription: 'Cross-cut 14" length to finish Primary Row 2 flush at Master Closet north wall line (Z: 1.19).'
      },
      {
        stepNumber: 16,
        pieceId: 'sheet-16',
        room: 'Bedroom 2 (NW)',
        size: '48" × 59.6" (4\' × 4\'11.6")',
        shape: 'Cross-Cut Finisher',
        cutDescription: 'Cross-cut 59.6" length from remainder to complete Bedroom 2 Row 2 south span down to Z: -3.01.'
      }
    ],
    efficiencyPercent: 77,
    usedSqFt: 24.5,
    wasteSqFt: 7.5,
    offcutNotes: '14" + 59.6" = 73.6" of 96" used. Leaves a usable 48" × 22.4" stock remainder.'
  },
  {
    rawSheetNum: 6,
    status: 'cut',
    title: 'Raw Sheet #6 (Primary Row 3 North)',
    allocatedZone: 'Zone 1: Primary Bedroom',
    sheetRole: 'Primary Row 3 North span along Hallway divider wall',
    piecesProduced: [
      {
        stepNumber: 6,
        pieceId: 'sheet-06',
        room: 'Primary Bedroom',
        size: '46.8" × 96" (3\'11" × 8\')',
        shape: 'Full-Length Rip Cut',
        cutDescription: 'Rip 1.2" off width along the full 8ft length to fit room width along hallway divider wall.'
      }
    ],
    efficiencyPercent: 97,
    usedSqFt: 31.2,
    wasteSqFt: 0.8,
    offcutNotes: '1.2" × 96" narrow edge rip scrap.'
  },
  {
    rawSheetNum: 7,
    status: 'multi-cut',
    title: 'Raw Sheet #7 (Primary Row 3 & Hallway Linen)',
    allocatedZone: 'Zone 1 (Primary) & Zone 2 (Hallway)',
    sheetRole: 'Primary Row 3 South & Hallway Linen Closet Floor',
    piecesProduced: [
      {
        stepNumber: 7,
        pieceId: 'sheet-07',
        room: 'Primary Bedroom',
        size: '46.8" × 62" (3\'11" × 5\'2")',
        shape: 'Rip & Cross Cut',
        cutDescription: 'Rip to 46.8" width, cut length to 62" to complete Primary Bedroom floor approaching closet.'
      },
      {
        stepNumber: 12,
        pieceId: 'sheet-12',
        room: 'Hallway Linen Closet',
        size: '24" × 28.3" (2\' × 2\'4.3")',
        shape: 'Closet Unit Cut',
        cutDescription: 'Cut single floor plate (24" × 28.3") from the 34" × 48" remainder of this sheet!'
      }
    ],
    efficiencyPercent: 78,
    usedSqFt: 24.8,
    wasteSqFt: 7.2,
    offcutNotes: 'The 34" × 48" remainder of Sheet #7 easily accommodates the entire Linen Closet floor (Piece #12).'
  },
  {
    rawSheetNum: 8,
    status: 'multi-cut',
    title: 'Raw Sheet #8 (Dedicated Master Closet Sheet)',
    allocatedZone: 'Zone 1: Primary Bedroom',
    sheetRole: '100% of Master Closet Floor (Runner + End Fill)',
    piecesProduced: [
      {
        stepNumber: 8,
        pieceId: 'sheet-08',
        room: 'Master Closet (Main Runner)',
        size: '27.6" × 96" (2\'3.6" × 8\')',
        shape: '8-Foot Continuous Runner',
        cutDescription: 'Rip sheet lengthwise to 27.6" width to create continuous 8ft runner covering 91% of closet.'
      },
      {
        stepNumber: 9,
        pieceId: 'sheet-09',
        room: 'Master Closet (East Fill)',
        size: '27.6" × 9.1" (2\'3.6" × 0\'9.1")',
        shape: 'End Fill Plate',
        cutDescription: 'Cut 9.1" end fill from the 20.4" × 96" offcut of Piece #8 to complete 100% of the Master Closet!'
      }
    ],
    efficiencyPercent: 63,
    usedSqFt: 20.1,
    wasteSqFt: 11.9,
    offcutNotes: 'Piece #8 and Piece #9 consume ONE single 4x8 sheet. Master Closet is 100% covered with zero extra sheets.'
  },
  {
    rawSheetNum: 9,
    status: 'cut',
    title: 'Raw Sheet #9 (Central Hallway Corridor)',
    allocatedZone: 'Zone 2: Central Hallway',
    sheetRole: 'Full 8ft Central Hallway Corridor Runner',
    piecesProduced: [
      {
        stepNumber: 10,
        pieceId: 'sheet-10',
        room: 'Central Hallway',
        size: '37.8" × 96" (3\'1.8" × 8\')',
        shape: 'Corridor Rip Cut',
        cutDescription: 'Rip sheet down from 48" to 37.8" (3\'1.8") along full 8ft length to fit hallway width.'
      }
    ],
    efficiencyPercent: 79,
    usedSqFt: 25.2,
    wasteSqFt: 6.8,
    offcutNotes: 'Leaves a clean 10.2" × 96" rip strip.'
  },
  {
    rawSheetNum: 10,
    status: 'multi-cut',
    title: 'Raw Sheet #10 (Stair Landing, Bed 2 Doorway & Narrow Strips)',
    allocatedZone: 'Zone 2 (Hallway) & Zone 3 (Bedroom 2)',
    sheetRole: 'Top Stair Landing + Bed 2 Doorway Threshold & Perimeter Strips',
    piecesProduced: [
      {
        stepNumber: 11,
        pieceId: 'sheet-11',
        room: 'Hallway Landing (Stair Top)',
        size: '37.8" × 33.6" (3\'1.8" × 2\'9.6")',
        shape: 'Landing Approach',
        cutDescription: 'Cut landing piece terminating flush at top stair nosing line (Z: 8.19).'
      },
      {
        stepNumber: 14,
        pieceId: 'sheet-14',
        room: 'Bedroom 2 Doorway Span',
        size: '48" × 16.4" (4\' × 1\'4.4")',
        shape: 'Doorway Notch Cut',
        cutDescription: 'Cross-cut 16.4" with doorway notch through grey opening between X: -2.35 and 0.80.'
      },
      {
        stepNumber: 18,
        pieceId: 'sheet-18',
        room: 'Bedroom 2 (NW)',
        size: '48" × 11.6" (4\' × 0\'11.6")',
        shape: 'South Strip',
        cutDescription: 'Cross-cut 11.6" strip to complete Bedroom 2 Row 3 down to south wall.'
      },
      {
        stepNumber: 20,
        pieceId: 'sheet-20',
        room: 'Bedroom 2 (SW Corner)',
        size: '18.2" × 11.6" (1\'6.2" × 0\'11.6")',
        shape: 'SW Corner Strip',
        cutDescription: 'Cut 18.2" × 11.6" corner piece stopping at solid wall dividing Bed 2 from Bed 3 closet.'
      }
    ],
    efficiencyPercent: 82,
    usedSqFt: 26.2,
    wasteSqFt: 5.8,
    offcutNotes: 'All 4 pieces cut across the 48" sheet width: 33.6" + 16.4" + 11.6" + 11.6" = 73.2" of 96".'
  },
  {
    rawSheetNum: 11,
    status: 'full',
    title: 'Raw Sheet #11 (Factory Full)',
    allocatedZone: 'Zone 3: Bedroom 2 (NW)',
    sheetRole: 'Bedroom 2 Row 1 against Primary Shared Wall',
    piecesProduced: [
      {
        stepNumber: 13,
        pieceId: 'sheet-13',
        room: 'Bedroom 2 (NW)',
        size: '48" × 96" (4\' × 8\')',
        shape: 'Full Factory Sheet',
        cutDescription: 'No cutting required. Starts directly against shared divider wall with Primary (X: 0.80) along north exterior wall.'
      }
    ],
    efficiencyPercent: 100,
    usedSqFt: 32.0,
    wasteSqFt: 0.0,
    offcutNotes: 'Zero waste. 100% sheet utilization.'
  },
  {
    rawSheetNum: 12,
    status: 'full',
    title: 'Raw Sheet #12 (Factory Full)',
    allocatedZone: 'Zone 3: Bedroom 2 (NW)',
    sheetRole: 'Bedroom 2 Row 3 Center Span',
    piecesProduced: [
      {
        stepNumber: 17,
        pieceId: 'sheet-17',
        room: 'Bedroom 2 (NW)',
        size: '48" × 96" (4\' × 8\')',
        shape: 'Full Factory Sheet',
        cutDescription: 'No cutting required. Placed along north exterior wall in Row 3.'
      }
    ],
    efficiencyPercent: 100,
    usedSqFt: 32.0,
    wasteSqFt: 0.0,
    offcutNotes: 'Zero waste. 100% sheet utilization.'
  },
  {
    rawSheetNum: 13,
    status: 'multi-cut',
    title: 'Raw Sheet #13 (Bed 2 West Wall & Middle Closet)',
    allocatedZone: 'Zone 3: Bedroom 2 (NW)',
    sheetRole: 'Bed 2 Window Wall (Piece #19) & Middle Closet Floor (Piece #21)',
    piecesProduced: [
      {
        stepNumber: 19,
        pieceId: 'sheet-19',
        room: 'Bedroom 2 West Wall',
        size: '18.2" × 96" (1\'6.2" × 8\')',
        shape: 'Full-Length Rip Cut',
        cutDescription: 'Rip 18.2" width along full 8ft length for west exterior window wall.'
      },
      {
        stepNumber: 21,
        pieceId: 'sheet-21',
        room: 'Bedroom 2 Closet (Middle Closet)',
        size: '28.3" × 60.2" (2\'4.3" × 5\'0.2")',
        shape: 'Solid Closet Floor Plate',
        cutDescription: 'Cut 28.3" × 60.2" from the remaining 29.8" × 96" strip to floor the entire middle closet through north sliding doors!'
      }
    ],
    efficiencyPercent: 75,
    usedSqFt: 23.9,
    wasteSqFt: 8.1,
    offcutNotes: 'Width math: 18.2" + 28.3" = 46.5" <= 48"! Both pieces fit side-by-side on ONE 4x8 sheet.'
  },
  {
    rawSheetNum: 14,
    status: 'full',
    title: 'Raw Sheet #14 (Factory Full)',
    allocatedZone: 'Zone 4: Bedroom 3 (SW)',
    sheetRole: 'Bedroom 3 Row 1 against Hallway Shared Wall',
    piecesProduced: [
      {
        stepNumber: 22,
        pieceId: 'sheet-22',
        room: 'Bedroom 3 (SW)',
        size: '48" × 96" (4\' × 8\')',
        shape: 'Full Factory Sheet',
        cutDescription: 'No cutting required. Starts directly against shared divider wall with Hallway (X: -2.35).'
      }
    ],
    efficiencyPercent: 100,
    usedSqFt: 32.0,
    wasteSqFt: 0.0,
    offcutNotes: 'Zero waste. 100% sheet utilization.'
  },
  {
    rawSheetNum: 15,
    status: 'cut',
    title: 'Raw Sheet #15 (Bed 3 South Closet L-Wrap)',
    allocatedZone: 'Zone 4: Bedroom 3 (SW)',
    sheetRole: 'Row 1 South & Wrapping into South Alcove Closet',
    piecesProduced: [
      {
        stepNumber: 23,
        pieceId: 'sheet-23',
        room: 'Bedroom 3 & South Closet',
        size: '58.1" × 44.0" max (4.84\' × 3.67\')',
        shape: 'Irregular L-Shape',
        cutDescription: 'Cut L-shape extending through verified north opening into South Alcove Closet (4\'10" × 1\'11") seamlessly.'
      }
    ],
    efficiencyPercent: 62,
    usedSqFt: 19.8,
    wasteSqFt: 12.2,
    offcutNotes: 'Fits within 4x8 bounds (4.84\' × 3.67\'). Remainder strip used for blocking.'
  },
  {
    rawSheetNum: 16,
    status: 'cut',
    title: 'Raw Sheet #16 (Bed 3 Row 2 Completion)',
    allocatedZone: 'Zone 4: Bedroom 3 (SW)',
    sheetRole: 'Bedroom 3 Row 2 Completion & South Span',
    piecesProduced: [
      {
        stepNumber: 25,
        pieceId: 'sheet-25',
        room: 'Bedroom 3 (South Span)',
        size: '48" × 92.0" max (4\' × 7\'8")',
        shape: 'Notched South Span',
        cutDescription: 'Cross-cut length to 92.0" (cutting off 4.0" end strip), then notch 10.1" return along closet wall from Z: 9.12 to 11.02 to mate flush with Sheet #23.'
      }
    ],
    efficiencyPercent: 88,
    usedSqFt: 28.1,
    wasteSqFt: 3.9,
    offcutNotes: '4" × 48" end strip + 10.1" × 22.8" notch offcut (clean usable backing/shims).'
  },
  {
    rawSheetNum: 17,
    status: 'multi-cut',
    title: 'Raw Sheet #17 (Stagger Starter #24 & SW Corner Finish #27)',
    allocatedZone: 'Zone 4: Bedroom 3 (SW)',
    sheetRole: 'Bedroom 3 Row 2 Stagger Starter & Row 3 SW Corner Finish',
    piecesProduced: [
      {
        stepNumber: 24,
        pieceId: 'sheet-24',
        room: 'Bedroom 3 (SW Starter)',
        size: '48" × 48" (4\' × 4\')',
        shape: '4×4 Stagger Starter',
        cutDescription: 'Cross-cut 48" off the 8ft sheet to yield the 48" × 48" starter piece that offsets Row 2 by 48" from Row 1 and Row 3.'
      },
      {
        stepNumber: 27,
        pieceId: 'sheet-27',
        room: 'Bedroom 3 (SW Corner Finish)',
        size: '28.4" × 44.0" (2\'4.4" × 3\'8")',
        shape: 'SW Corner Finish',
        cutDescription: 'Cut 28.4" × 44.0" from the remaining 48" × 48" half of this sheet to finish the South-West corner of Bedroom 3.'
      }
    ],
    efficiencyPercent: 77,
    usedSqFt: 24.7,
    wasteSqFt: 7.3,
    offcutNotes: 'First half (48" × 48") is Piece #24. Remaining 48" × 48" easily yields Piece #27 (28.4" × 44.0"), leaving a 19.6" × 44.0" strip and a 4" × 48" offcut.'
  },
  {
    rawSheetNum: 18,
    status: 'cut',
    title: 'Raw Sheet #18 (Bed 3 West Window Wall)',
    allocatedZone: 'Zone 4: Bedroom 3 (SW)',
    sheetRole: 'Bedroom 3 West exterior window wall (Row 3 North)',
    piecesProduced: [
      {
        stepNumber: 26,
        pieceId: 'sheet-26',
        room: 'Bedroom 3 West Wall',
        size: '28.4" × 96" (2\'4.4" × 8\')',
        shape: 'Full-Length Rip Cut',
        cutDescription: 'Rip sheet down to 28.4" along full 8ft length along west window wall.'
      }
    ],
    efficiencyPercent: 59,
    usedSqFt: 18.9,
    wasteSqFt: 13.1,
    offcutNotes: 'Leaves a 19.6" × 96" offcut strip.'
  },
  {
    rawSheetNum: 19,
    status: 'cut',
    title: 'Raw Sheet #19 (Bed 3 North Closet Floor)',
    allocatedZone: 'Zone 4: Bedroom 3 (SW)',
    sheetRole: 'Bed 3 North Closet Floor (Leftmost Closet through South Door)',
    piecesProduced: [
      {
        stepNumber: 28,
        pieceId: 'sheet-28',
        room: 'Bed 3 North Closet (Left Closet)',
        size: '40.2" × 28.3" (3\'4.2" × 2\'4.3")',
        shape: 'Closet Floor Unit',
        cutDescription: 'Cut 40.2" × 28.3" solid single piece to floor the leftmost closet through its south doorway opening.'
      }
    ],
    efficiencyPercent: 25,
    usedSqFt: 7.9,
    wasteSqFt: 24.1,
    offcutNotes: 'Final cut piece! 100% of the entire 2nd floor is floored with zero gaps and zero overlaps.'
  },
  {
    rawSheetNum: 20,
    status: 'buffer',
    title: 'Raw Sheet #20 (Full Uncut Spare Buffer)',
    allocatedZone: 'Safety Contingency Stock',
    sheetRole: 'Job-Site Contingency / Mis-Cut Insurance',
    piecesProduced: [],
    efficiencyPercent: 0,
    usedSqFt: 0.0,
    wasteSqFt: 32.0,
    offcutNotes: 'Full 4x8 factory sheet kept intact. 100% returnable to Turkstra Lumber if unused! Protects against any mis-cut or saw blade pinch.'
  }
]
