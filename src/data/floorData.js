// Exact architectural floor data extracted from 6 Prince David Ct FloorPlan.pdf vector drawings
// Total baseline equals user's measured 525 sq ft (including all closets, excluding 5PC Bath and its closet)

export const initialRoomsData = [
  {
    id: 'primary',
    name: 'Primary Bedroom',
    dims: "11'6\" × 15'6\"",
    sqft: 158,
    type: 'bedroom',
    isIncluded: true,
    description: 'Main starting area. Sheet #1 starts in outside North-East corner directly under the red arrow marker.',
    color: '#3b82f6',
  },
  {
    id: 'primary-closet',
    name: 'Primary Bedroom Closet',
    dims: "8'5\" × 1'11\"",
    sqft: 22,
    type: 'closet',
    isIncluded: true,
    description: 'Double sliding door closet on south wall of Primary Bedroom.',
    color: '#60a5fa',
  },
  {
    id: 'bedroom-2',
    name: 'Bedroom 2 (North-West)',
    dims: "13'6\" × 9'0\"",
    sqft: 121,
    type: 'bedroom',
    isIncluded: true,
    description: 'Top-left bedroom with west window wall.',
    color: '#10b981',
  },
  {
    id: 'bedroom-2-closet',
    name: 'Bedroom 2 Closet',
    dims: "3'4\" × 2'0\"",
    sqft: 14,
    type: 'closet',
    isIncluded: true,
    description: 'South closet inside NW Bedroom adjoining the divider wall.',
    color: '#34d399',
  },
  {
    id: 'bedroom-3',
    name: 'Bedroom 3 (South-West)',
    dims: "10'0\" × 11'3\"",
    sqft: 101,
    type: 'bedroom',
    isIncluded: true,
    description: 'Bottom-left bedroom with dual closet storage.',
    color: '#8b5cf6',
  },
  {
    id: 'bedroom-3-closet-n',
    name: 'Bedroom 3 North Closet',
    dims: "4'7\" × 2'0\"",
    sqft: 14,
    type: 'closet',
    isIncluded: true,
    description: 'Upper closet in Bedroom 3 sharing wall with Bed 2 closet.',
    color: '#a78bfa',
  },
  {
    id: 'hall-closet',
    name: 'Hallway Linen Closet',
    dims: "1'3\" × 2'0\"",
    sqft: 5,
    type: 'closet',
    isIncluded: true,
    description: 'Linen closet opening directly into the central hallway.',
    color: '#f59e0b',
  },
  {
    id: 'bedroom-3-closet-s',
    name: 'Bedroom 3 South Closet',
    dims: "4'5\" × 1'11\"",
    sqft: 15,
    type: 'closet',
    isIncluded: true,
    description: 'Lower alcove closet along south exterior wall.',
    color: '#c4b5fd',
  },
  {
    id: 'hallway',
    name: 'Central Hallway & North Entry',
    dims: "3'2\" × 20'2\" (plus landing)",
    sqft: 75,
    type: 'hallway',
    isIncluded: true,
    description: 'Connects all bedrooms and terminates at top stair nosing.',
    color: '#d97706',
  },
  {
    id: 'bath-5pc',
    name: '5PC Bathroom (EXCLUDED)',
    dims: "11'6\" × 7'1\"",
    sqft: 64,
    type: 'excluded',
    isIncluded: false,
    description: 'Excluded from new flooring. Threshold transition required at doorway.',
    color: '#64748b',
  },
  {
    id: 'bath-closet',
    name: 'Bathroom Closet (EXCLUDED)',
    dims: "6'2\" × 2'4\"",
    sqft: 20,
    type: 'excluded',
    isIncluded: false,
    description: 'Closet inside bathroom, excluded from new flooring.',
    color: '#475569',
  },
]

// 3D architectural bounding boxes in feet directly converted from FloorPlan.pdf vector paths
// Coordinates are centered around origin: (0, 0)
export const roomBounds3D = {
  'primary': {
    x: 1.19, z: -11.98, w: 11.52, d: 15.47,
    labelPos: [6.95, 0.2, -4.24],
    name: 'Primary Bedroom',
    dims: "11'6\" × 15'6\"",
    tag: '158 sq ft'
  },
  'primary-closet': {
    x: 1.19, z: 1.58, w: 8.38, d: 1.91,
    labelPos: [5.38, 0.2, 2.54],
    name: 'Primary Closet',
    dims: "8'5\" × 1'11\"",
    tag: '22 sq ft'
  },
  'bedroom-2': {
    x: -12.72, z: -11.98, w: 13.53, d: 8.97,
    labelPos: [-5.96, 0.2, -7.49],
    name: 'Bedroom 2 (NW)',
    dims: "13'6\" × 9'0\"",
    tag: '121 sq ft'
  },
  'bedroom-2-closet': {
    x: -12.72, z: -2.62, w: 3.35, d: 1.97,
    labelPos: [-11.05, 0.2, -1.63],
    name: 'Bed 2 Closet',
    dims: "3'4\" × 2'0\"",
    tag: '14 sq ft'
  },
  'bedroom-3-closet-n': {
    x: -8.98, z: -2.62, w: 4.63, d: 1.97,
    labelPos: [-6.67, 0.2, -1.63],
    name: 'Bed 3 Closet N',
    dims: "4'7\" × 2'0\"",
    tag: '14 sq ft'
  },
  'hall-closet': {
    x: -3.95, z: -2.62, w: 1.21, d: 1.97,
    labelPos: [-3.35, 0.2, -1.63],
    name: 'Hall Linen Closet',
    dims: "1'3\" × 2'0\"",
    tag: '5 sq ft'
  },
  'bedroom-3': {
    x: -12.72, z: -0.26, w: 9.98, d: 11.28,
    labelPos: [-7.73, 0.2, 5.38],
    name: 'Bedroom 3 (SW)',
    dims: "10'0\" × 11'3\"",
    tag: '101 sq ft'
  },
  'bedroom-3-closet-s': {
    x: -7.19, z: 9.12, w: 4.45, d: 1.89,
    labelPos: [-4.97, 0.2, 10.07],
    name: 'Bed 3 Closet S',
    dims: "4'5\" × 1'11\"",
    tag: '15 sq ft'
  },
  'hall-north': {
    x: -2.35, z: -11.98, w: 3.16, d: 9.36,
    labelPos: [-0.77, 0.2, -7.29],
    name: 'Hallway North Entry',
    dims: "3'2\" × 9'4\"",
    tag: '30 sq ft'
  },
  'hallway': {
    x: -2.35, z: -2.61, w: 3.16, d: 10.80,
    labelPos: [-0.77, 0.2, 2.79],
    name: 'Central Hallway',
    dims: "3'2\" × 10'10\"",
    tag: '45 sq ft'
  },
  'stairs': {
    x: -2.35, z: 8.19, w: 3.16, d: 4.61,
    labelPos: [-0.77, 0.2, 10.50],
    name: 'Stairs DN',
    dims: "3'2\" × 4'7\"",
    tag: 'To 1st Floor'
  },
  'bath-5pc': {
    x: 1.19, z: 3.89, w: 11.52, d: 7.13,
    labelPos: [6.95, 0.2, 7.45],
    name: '5PC Bath (Excluded)',
    dims: "11'6\" × 7'1\"",
    tag: '64 sq ft'
  },
  'bath-closet': {
    x: 1.19, z: 8.68, w: 6.13, d: 2.33,
    labelPos: [4.26, 0.2, 9.85],
    name: 'Bath Closet (Excluded)',
    dims: "6'2\" × 2'4\"",
    tag: '20 sq ft'
  }
}
