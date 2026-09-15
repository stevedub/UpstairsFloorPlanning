// Floor plan data for 2nd Floor (6 Prince David Ct, St. Catharines, ON)
// Total default square footage matches user's measured 525 sq ft (including all closets, excluding 5PC Bath and bath closet)

export const initialRoomsData = [
  {
    id: 'primary',
    name: 'Primary Bedroom',
    dims: "11'6\" × 15'6\"",
    sqft: 158,
    type: 'bedroom',
    isIncluded: true,
    description: 'Main starting area for underlayment. Lay sheet #1 against outside wall corner.',
    color: '#3b82f6', // blue
  },
  {
    id: 'primary-closet',
    name: 'Primary Bedroom Closet',
    dims: "7'6\" × 2'11\"",
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
    description: 'Top-left bedroom facing front/side with window wall.',
    color: '#10b981', // emerald
  },
  {
    id: 'bedroom-2-closet',
    name: 'Bedroom 2 Closet',
    dims: "5'4\" × 2'7\"",
    sqft: 14,
    type: 'closet',
    isIncluded: true,
    description: 'South closet inside NW Bedroom.',
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
    color: '#8b5cf6', // purple
  },
  {
    id: 'bedroom-3-closet-n',
    name: 'Bedroom 3 North Closet',
    dims: "5'4\" × 2'7\"",
    sqft: 14,
    type: 'closet',
    isIncluded: true,
    description: 'Upper closet adjoining Bedroom 2 divider wall.',
    color: '#a78bfa',
  },
  {
    id: 'bedroom-3-closet-s',
    name: 'Bedroom 3 South Closet',
    dims: "5'8\" × 2'8\"",
    sqft: 15,
    type: 'closet',
    isIncluded: true,
    description: 'Lower alcove closet along south exterior wall.',
    color: '#c4b5fd',
  },
  {
    id: 'hallway',
    name: 'Central Hallway & Stair Landing',
    dims: "16'0\" × 5'0\" (approx)",
    sqft: 80,
    type: 'hallway',
    isIncluded: true,
    description: 'Connects all bedrooms and leads to stair nosing transition.',
    color: '#f59e0b', // amber
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
    dims: "4'10\" × 4'2\"",
    sqft: 20,
    type: 'excluded',
    isIncluded: false,
    description: 'Closet inside bathroom, excluded from new flooring.',
    color: '#475569',
  },
]

// 3D coordinates (normalized in feet, centered around hallway/stairwell origin)
// Room bounding boxes [minX, minZ, maxX, maxZ] (Z is depth/vertical on floor plan, X is width)
export const roomBounds3D = {
  'primary': {
    x: 1.5, z: -16.0, w: 11.5, d: 15.5,
    labelPos: [7.25, 0.2, -8.25],
    name: 'Primary Bedroom',
    tag: '158 sq ft'
  },
  'primary-closet': {
    x: 1.5, z: -0.5, w: 7.5, d: 2.8,
    labelPos: [5.25, 0.2, 0.9],
    name: 'Primary Closet',
    tag: '22 sq ft'
  },
  'bedroom-2': {
    x: -13.5, z: -16.0, w: 13.5, d: 9.0,
    labelPos: [-6.75, 0.2, -11.5],
    name: 'Bedroom 2',
    tag: '121 sq ft'
  },
  'bedroom-2-closet': {
    x: -13.5, z: -7.0, w: 5.4, d: 2.6,
    labelPos: [-10.8, 0.2, -5.7],
    name: 'Bed 2 Closet',
    tag: '14 sq ft'
  },
  'bedroom-3': {
    x: -13.5, z: -4.4, w: 10.0, d: 11.25,
    labelPos: [-8.5, 0.2, 1.2],
    name: 'Bedroom 3',
    tag: '101 sq ft'
  },
  'bedroom-3-closet-n': {
    x: -8.1, z: -7.0, w: 5.4, d: 2.6,
    labelPos: [-5.4, 0.2, -5.7],
    name: 'Bed 3 Closet N',
    tag: '14 sq ft'
  },
  'bedroom-3-closet-s': {
    x: -6.0, z: 4.25, w: 5.8, d: 2.6,
    labelPos: [-3.1, 0.2, 5.55],
    name: 'Bed 3 Closet S',
    tag: '15 sq ft'
  },
  'hallway': {
    x: -3.5, z: -7.0, w: 5.0, d: 13.85,
    labelPos: [-1.0, 0.2, -0.1],
    name: 'Hallway',
    tag: '80 sq ft'
  },
  'bath-5pc': {
    x: 1.5, z: 2.3, w: 11.5, d: 7.1,
    labelPos: [7.25, 0.2, 5.85],
    name: '5PC Bath (Excluded)',
    tag: '64 sq ft'
  },
  'bath-closet': {
    x: 1.5, z: 9.4, w: 4.8, d: 4.2,
    labelPos: [3.9, 0.2, 11.5],
    name: 'Bath Closet (Excluded)',
    tag: '20 sq ft'
  },
  'stairs': {
    x: -3.5, z: 6.85, w: 5.0, d: 7.0,
    labelPos: [-1.0, 0.2, 10.35],
    name: 'Stairs DN',
    tag: 'To 1st Floor'
  }
}
