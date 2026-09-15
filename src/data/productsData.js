// Product specifications, pricing (CAD), and coverage rules

export const productsData = {
  plywood: {
    id: 'plywood-bcx',
    name: '1/2" 4x8 BCX Fir Plywood',
    retailer: 'Turkstra Lumber',
    url: 'https://turkstralumber.com/products/1-2-4-x-8-bcx-fir-plywood',
    unit: 'Sheet (4 ft × 8 ft)',
    unitSqFt: 32,
    thickness: '1/2 inch',
    material: 'Douglas Fir Exterior BCX',
    pricePerUnit: 59.74, // CAD
    standardOveragePercent: 15, // standard buffer for sheet goods with stagger & doorways
    returnPolicy: 'Turkstra Lumber allows return of clean, undamaged, uncut stock sheets with original receipt.',
    recommendedFastenerSpacing: '6" along panel edges, 8" in interior field',
    notes: 'APA Underlayment grade fir plywood. Smooth B-grade face sanded smooth, exterior glue line, cross-laminated for high dimensional stability over 1x6 slat subfloors. Order target: 20 sheets (19 cut sheets to produce all 28 pieces + 1 uncut spare buffer sheet).'
  },
  flooring: {
    id: 'lifeproof-lvp',
    name: 'LifeProof Cobblestone 22-MIL Click Lock LVP',
    retailer: 'Home Depot Canada',
    url: 'https://www.homedepot.ca/product/lifeproof-cobblestone-7mm-x-8-7-in-w-x-47-6-in-l-22mil-click-lock-waterproof-luxury-vinyl-plank-flooring-20-06-sq-ft-case-/1001633102',
    sku: '1001633102',
    unit: 'Case / Box',
    coveragePerCase: 20.06, // sq ft
    plankWidthInches: 8.7,
    plankLengthInches: 47.6,
    thicknessMm: 7.0,
    wearLayerMil: 22,
    pricePerUnit: 85.85, // CAD per case (~$4.28/sq ft)
    standardOveragePercent: 15, // standard buffer for multi-room click-lock installations
    returnPolicy: 'The Home Depot offers a generous 90-day return policy for unopened, undamaged boxes with receipt.',
    expansionGap: '1/4 inch (6mm) minimum on all perimeter walls & vertical surfaces',
    staggerRequirement: 'Minimum 8-inch (200mm) end-joint stagger between rows',
    notes: 'ISOCORE rigid core waterproof vinyl plank with pre-attached acoustic underlayment pad. Drop-and-lock angle-tap profile.'
  },
  screws: {
    id: 'paulin-floor-screws',
    name: 'Paulin #8 x 1-1/2" Flat Head Square Drive Phosphate Floor Screws (500 pcs)',
    retailer: 'Home Depot Canada',
    url: 'https://www.homedepot.ca/product/paulin--8-x-1-1-2-inch-flat-head-square-drive-phosphate-high-performance-floor-screws-500pcs/1000152692',
    sku: '1000152692',
    model: '214-911',
    unit: 'Box (500 pcs)',
    countPerBox: 500,
    pricePerUnit: 36.98, // CAD per box
    driveType: '#2 Square (Robertson)',
    length: '1-1/2 inch',
    gauge: '#8',
    coating: 'Black Phosphate (anti-squeak & anti-friction)',
    returnPolicy: 'Home Depot 90-day return on unopened boxes.',
    screwsPerSheetAverage: 80, // 48 perimeter (6" spacing) + 32 field (8" spacing)
    subfloorSqueakAllowance: 300, // extra screws to lock down 1x6 slat subfloor into joists prior to underlayment
    notes: 'Countersinking nibs under the flat head ensure screw heads sit flush or 1/32" below plywood surface, preventing bumps under vinyl planks.'
  },
  bufferPresets: [
    { label: '10% Tight', value: 10, desc: 'Bare minimum waste allowance for straight single rooms. Risky for complex 3-bedroom + hallway layouts.' },
    { label: '15% Recommended', value: 15, desc: 'Industry standard for multi-room homes with hallways & closets. Safe, reliable, and excess boxes can be returned.' },
    { label: '20% High Safety', value: 20, desc: 'Maximum peace of mind for extra cut-offs, odd angles, and keeping a spare box for future repairs.' }
  ]
}
