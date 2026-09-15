// Architectural floor data for 2nd Floor (6 Prince David Ct, St. Catharines, ON)
// Hallway starts below Bedroom 2 and terminates at stairs. Master closet is fully modeled.
// 5PC Bath & bath closet are clearly flagged as EXCLUDED.

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
    name: 'Primary (Master) Closet',
    dims: "8'9\" × 2'4\"",
    sqft: 22,
    type: 'closet',
    isIncluded: true,
    description: 'Master bedroom closet with double sliding doors on south wall.',
    color: '#60a5fa',
  },
  {
    id: 'bedroom-2',
    name: 'Bedroom 2 (North-West)',
    dims: "13'6\" × 9'0\"",
    sqft: 121,
    type: 'bedroom',
    isIncluded: true,
    description: 'Top-left bedroom spanning 13\'6" wide across the front to the Primary wall.',
    color: '#10b981',
  },
  {
    id: 'bedroom-2-closet',
    name: 'Bedroom 2 Closet',
    dims: "3'4\" × 2'4\"",
    sqft: 14,
    type: 'closet',
    isIncluded: true,
    description: 'South closet inside NW Bedroom adjoining divider wall.',
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
    dims: "5'0\" × 2'4\"",
    sqft: 14,
    type: 'closet',
    isIncluded: true,
    description: 'Upper closet in Bedroom 3 sharing wall with Bed 2 closet.',
    color: '#a78bfa',
  },
  {
    id: 'hall-closet',
    name: 'Hallway Linen Closet',
    dims: "2'0\" × 2'4\"",
    sqft: 5,
    type: 'closet',
    isIncluded: true,
    description: 'Linen closet opening directly into the central hallway.',
    color: '#f59e0b',
  },
  {
    id: 'bedroom-3-closet-s',
    name: 'Bedroom 3 South Closet',
    dims: "4'10\" × 1'11\"",
    sqft: 15,
    type: 'closet',
    isIncluded: true,
    description: 'Lower alcove closet along south exterior wall.',
    color: '#c4b5fd',
  },
  {
    id: 'hallway',
    name: 'Central Hallway & Landing',
    dims: "3'2\" × 10'10\" (plus stair approach)",
    sqft: 75,
    type: 'hallway',
    isIncluded: true,
    description: 'Central spine connecting all bedrooms and terminating at top stair nosing.',
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
    color: '#ef4444', // red
  },
  {
    id: 'bath-closet',
    name: 'Bathroom Closet (EXCLUDED)',
    dims: "6'6\" × 2'4\"",
    sqft: 20,
    type: 'excluded',
    isIncluded: false,
    description: 'Closet inside bathroom, excluded from new flooring.',
    color: '#dc2626', // dark red
  },
]

// 3D architectural bounding boxes in feet (origin centered)
export const roomBounds3D = {
  'primary': {
    x: 0.81, z: -11.98, w: 11.90, d: 13.17,
    labelPos: [6.76, 0.2, -5.4],
    name: 'Primary Bedroom',
    dims: "11'6\" × 15'6\"",
    tag: '158 sq ft'
  },
  'primary-alcove': {
    x: 9.57, z: 1.19, w: 3.14, d: 2.30,
    labelPos: [11.14, 0.2, 2.34],
    name: 'Primary Alcove',
    dims: "3'2\" × 2'4\"",
    tag: 'Bed Alcove'
  },
  'primary-closet': {
    x: 0.81, z: 1.19, w: 8.76, d: 2.30,
    labelPos: [5.19, 0.2, 2.34],
    name: 'Master Closet',
    dims: "8'9\" × 2'4\"",
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
    x: -12.72, z: -3.01, w: 3.35, d: 2.36,
    labelPos: [-11.05, 0.2, -1.83],
    name: 'Bed 2 Closet',
    dims: "3'4\" × 2'4\"",
    tag: '14 sq ft'
  },
  'bedroom-3-closet-n': {
    x: -9.37, z: -3.01, w: 5.02, d: 2.36,
    labelPos: [-6.86, 0.2, -1.83],
    name: 'Bed 3 Closet N',
    dims: "5'0\" × 2'4\"",
    tag: '14 sq ft'
  },
  'hall-closet': {
    x: -4.35, z: -3.01, w: 2.00, d: 2.36,
    labelPos: [-3.35, 0.2, -1.83],
    name: 'Hall Linen',
    dims: "2'0\" × 2'4\"",
    tag: '5 sq ft'
  },
  'bedroom-3': {
    x: -12.72, z: -0.65, w: 10.37, d: 11.67,
    labelPos: [-7.54, 0.2, 5.18],
    name: 'Bedroom 3 (SW)',
    dims: "10'0\" × 11'3\"",
    tag: '101 sq ft'
  },
  'bedroom-3-closet-s': {
    x: -7.19, z: 9.12, w: 4.84, d: 1.90,
    labelPos: [-4.77, 0.2, 10.07],
    name: 'Bed 3 Closet S',
    dims: "4'10\" × 1'11\"",
    tag: '15 sq ft'
  },
  'hallway': {
    x: -2.35, z: -2.61, w: 3.16, d: 10.80,
    labelPos: [-0.77, 0.2, 2.79],
    name: 'Central Hallway',
    dims: "3'2\" × 10'10\"",
    tag: '75 sq ft'
  },
  'stairs': {
    x: -2.35, z: 8.19, w: 3.16, d: 4.61,
    labelPos: [-0.77, 0.2, 10.50],
    name: 'Stairs DN',
    dims: "3'2\" × 4'7\"",
    tag: 'To 1st Floor'
  },
  'bath-5pc': {
    x: 0.81, z: 3.49, w: 11.90, d: 7.53,
    labelPos: [6.76, 0.2, 7.25],
    name: '5PC Bath (EXCLUDED)',
    dims: "11'6\" × 7'1\"",
    tag: 'EXCLUDED (64 sq ft)'
  },
  'bath-closet': {
    x: 0.81, z: 8.68, w: 6.51, d: 2.34,
    labelPos: [4.06, 0.2, 9.85],
    name: 'Bath Closet (EXCLUDED)',
    dims: "6'6\" × 2'4\"",
    tag: 'EXCLUDED (20 sq ft)'
  }
}
