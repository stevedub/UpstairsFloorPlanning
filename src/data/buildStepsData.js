// DIY Step-by-Step Installation Workflow and Interactive Checklist
// Organized room-by-room across 4 distinct upstairs zones:
// 1. Primary: Primary Bedroom & Master Closet (Pieces #1–#9)
// 2. Spare Bedroom (NW): Bedroom 2 & Middle Closet (Pieces #13–#21)
// 3. Baby Room (SW): Bedroom 3 & Dual Closets (Pieces #22–#28)
// 4. Hallway: Central Hallway, Landing & Linen Closet (Pieces #10–#12)

export const roomBuildGuides = [
  {
    id: 'primary',
    name: 'Primary',
    title: 'Primary Bedroom & Master Closet',
    badge: 'Zone 1 • Starting Zone',
    badgeColor: 'blue',
    sqft: 180,
    areaDetail: '158 sq ft bedroom + 22 sq ft closet',
    sheetCount: '4 full sheets + 1 cut sheet (Pieces #1–#9)',
    startingPoint: 'North-East exterior corner (Directly under red pin at 12.71, -11.98)',
    progressionDirection: 'Row 1 heads West along north wall, then rows advance South toward closet',
    closetDoorInfo: 'Double sliding doors on North closet wall (z = 1.19, opening into bedroom)',
    pieces: ['#1', '#2', '#3', '#4', '#5', '#6', '#7', '#8', '#9'],
    phases: [
      {
        phase: 1,
        id: 'primary-phase-1',
        title: 'Phase 1: Parquet Demo & Slat Subfloor Squeak Remediation',
        estimatedTime: '1 Day',
        badge: 'Prep & Structure',
        summary: 'Rip up existing parquet tiles in Primary Bedroom and Master Closet. Eliminate all squeaks in the diagonal 1x6 slats before any plywood is placed.',
        tasks: [
          {
            id: 'pri-demo-01',
            title: 'Remove perimeter baseboards and sliding closet door tracks',
            desc: 'Score paint seam along drywall with utility knife, pry baseboards gently with a trim pry bar, and unclip closet sliding door panels and bottom floor guide.',
            crucial: true
          },
          {
            id: 'pri-demo-02',
            title: 'Pry up parquet wood tiles across 180 sq ft',
            desc: 'Work along the wood grain using a wide floor scraper or flat pry bar. Remove tiles from bedroom and deep inside the Master Closet.',
            crucial: false
          },
          {
            id: 'pri-demo-03',
            title: 'Pull all cleats, nails, and staples from 1x6 diagonal slats',
            desc: 'Slide a 4" drywall knife or metal scraper flat across the slats. Pull every single fastener with end-cutting nippers so the plywood sits 100% flat.',
            crucial: true
          },
          {
            id: 'pri-demo-04',
            title: 'Stomp & walk inspection: Screw loose 1x6 slats to joists',
            desc: 'Walk every square foot firmly. Drive 2-1/2" or 3" construction wood screws through squeaking or loose 1x6 slats directly into the joists below (2 screws per joist intersection).',
            crucial: true
          },
          {
            id: 'pri-demo-05',
            title: 'Flatness check & belt sand high ridges (No glue on slats)',
            desc: 'Subfloor must be within 3/16" over 10ft. Belt sand raised slat edges with 40-grit paper. CRITICAL: Do NOT apply subfloor glue to 1x6 slats; expansion differences will cause squeaking.',
            crucial: true
          },
          {
            id: 'pri-demo-06',
            title: 'Deep HEPA vacuum entire bedroom and closet',
            desc: 'Suck out all grit, sawdust, and old adhesive from the gaps between 1x6 slats so new plywood lays completely flat.',
            crucial: false
          }
        ],
        proTips: [
          'Finding joists: Look for original framing nail lines in the 1x6 diagonal slats. Joists run perpendicular to the slats on 16" centers.',
          'Save baseboards: Number the backs with a pencil if reinstalling, or upgrade to taller modern baseboards after flooring.'
        ]
      },
      {
        phase: 2,
        id: 'primary-phase-2',
        title: 'Phase 2: 1/2" BCX Plywood Underlayment (Pieces #1–#9)',
        estimatedTime: '1 – 2 Days',
        badge: 'Underlayment',
        summary: 'Install 9 precision plywood pieces starting from the North-East exterior corner under the red arrow marker.',
        tasks: [
          {
            id: 'pri-ply-01',
            title: 'Place Sheet #1 in NE exterior corner under red arrow marker',
            desc: 'Lay full 4x8 factory sheet (Piece #1) at coordinates (12.71, -11.98). Align factory edge along north wall. Keep 1/4" expansion gap from drywall.',
            crucial: true
          },
          {
            id: 'pri-ply-02',
            title: 'Cut and place Piece #2 (Irregular L-shape east alcove)',
            desc: 'Cut length to 89.6" and notch out 10" × 27.6" around the Master Closet east return wall. Wraps seamlessly into the East Alcove.',
            crucial: true
          },
          {
            id: 'pri-ply-03',
            title: 'Cross-cut Sheet #3 in half (48" × 48") to stagger Row 2',
            desc: 'Place Piece #3 as starter along north wall. IMPORTANT: Save the 48" × 48" offcut! It will be used as Sheet #15 in Bedroom 2.',
            crucial: true
          },
          {
            id: 'pri-ply-04',
            title: 'Install Piece #4 (Full 4x8) & Piece #5 (48" × 33.6" rip)',
            desc: 'Complete Row 2 heading west. Maintain 1/8" (3mm) expansion gap between all plywood sheets using 8d nails as spacers.',
            crucial: false
          },
          {
            id: 'pri-ply-05',
            title: 'Install Row 3 (Piece #6 starter & Piece #7 finish)',
            desc: 'Stagger joints minimum 24" from Row 2. Fasten along south bedroom wall approaching Master Closet doorway.',
            crucial: false
          },
          {
            id: 'pri-ply-06',
            title: 'Install Master Closet: Piece #8 (8ft runner) & Piece #9 (end fill)',
            desc: 'Slip Piece #8 (45.6" × 96") through sliding doors into closet. Cut Piece #9 (19.8" × 27.6") from Piece #8 offcut to finish closet floor.',
            crucial: true
          },
          {
            id: 'pri-ply-07',
            title: 'Fasten with Paulin screws: 6" on edges, 8" in field',
            desc: 'Drive Paulin #8 x 1-1/2" wood screws 3/8" from panel edges. Fasten progressively from one edge to avoid bubbling.',
            crucial: true
          },
          {
            id: 'pri-ply-08',
            title: 'The Drywall Blade Sweep Test (Zero Proud Screws)',
            desc: 'Glide a 10" drywall knife flat over the entire floor. If the blade clicks on any screw head, drive it 1/32" sub-flush immediately.',
            crucial: true
          }
        ],
        proTips: [
          'The entire upstairs starts here: Take your time squaring Sheet #1 against the exterior wall to ensure straight runs across the rest of the second floor.',
          'Never align plywood seams with 1x6 slat seams beneath.'
        ]
      },
      {
        phase: 3,
        id: 'primary-phase-3',
        title: 'Phase 3: Doorway & Closet Casing Undercutting',
        estimatedTime: '2 Hours',
        badge: 'Millwork Prep',
        summary: 'Undercut all door jambs and closet returns so LifeProof vinyl planks slip underneath freely.',
        tasks: [
          {
            id: 'pri-door-01',
            title: 'Undercut Master Closet sliding door frame & jambs',
            desc: 'Lay a scrap piece of LifeProof plank on the plywood subfloor against the closet frame. Rest oscillating blade flat on plank and cut horizontally.',
            crucial: true
          },
          {
            id: 'pri-door-02',
            title: 'Undercut Primary entrance door frame & casing from Hallway',
            desc: 'Undercut casing on both bedroom and hallway sides so planks slide cleanly through the doorway without awkward cutouts.',
            crucial: true
          },
          {
            id: 'pri-door-03',
            title: 'Chisel out cut wood blocks and vacuum pockets',
            desc: 'Clear wood scraps from beneath jambs. Verify 1/16" vertical clearance over vinyl plank.',
            crucial: false
          }
        ],
        proTips: [
          'Always undercut moldings—never notch vinyl planks around intricate trim. Undercutting produces a flawless custom builder look.'
        ]
      },
      {
        phase: 4,
        id: 'primary-phase-4',
        title: 'Phase 4: LifeProof 22-Mil Cobblestone LVP Installation',
        estimatedTime: '1 – 2 Days',
        badge: 'Finish Floor',
        summary: 'Click-lock LifeProof planks across Primary Bedroom and flow continuously through the closet doorway.',
        tasks: [
          {
            id: 'pri-lvp-01',
            title: 'Acclimate LifeProof boxes in room for 24-48 hours',
            desc: 'Store boxes flat at room temperature. Open 3 to 4 boxes and mix planks to distribute natural grain patterns.',
            crucial: false
          },
          {
            id: 'pri-lvp-02',
            title: 'Set up 1/4" expansion spacers along all walls',
            desc: 'Insert 1/4" wedge spacers every 2 to 3 feet along exterior and interior walls. Never install tight to drywall.',
            crucial: true
          },
          {
            id: 'pri-lvp-03',
            title: 'Lay Row 1 tongue-side facing north exterior wall',
            desc: 'Cut off tongue on wall-facing edge of Row 1. Click end joints together using tapping block and soft rubber mallet.',
            crucial: true
          },
          {
            id: 'pri-lvp-04',
            title: 'Stagger end joints minimum 8" (200mm) across rows',
            desc: 'Use the offcut from the previous row to start the next row (if at least 8" long). Maintain randomized plank stagger.',
            crucial: true
          },
          {
            id: 'pri-lvp-05',
            title: 'Flow vinyl planks continuously through Master Closet doorway',
            desc: 'Continue planks right through the closet opening into the Master Closet with no transition molding for a seamless modern finish.',
            crucial: true
          },
          {
            id: 'pri-lvp-06',
            title: 'Lock last row planks using heavy-duty pull bar',
            desc: 'Engage pull bar along closet back wall and bedroom south wall to tap locking tongue firmly into groove.',
            crucial: true
          }
        ],
        proTips: [
          'Score and snap: Score the tough 22-mil wear layer with a sharp utility knife along a speed square, then snap cleanly over your knee.',
          'Never nail or screw through LifeProof planks—the entire floor floats as a single unified membrane.'
        ]
      },
      {
        phase: 5,
        id: 'primary-phase-5',
        title: 'Phase 5: Baseboards, Closet Track & Final Trim',
        estimatedTime: '3 Hours',
        badge: 'Trim & Finish',
        summary: 'Reinstall baseboards, reinstall sliding closet doors, and caulk perimeter for a finished appearance.',
        tasks: [
          {
            id: 'pri-trim-01',
            title: 'Remove all 1/4" perimeter spacers',
            desc: 'Pull all wedge spacers from walls and closet. Ensure expansion gap is clean and free of screws or debris.',
            crucial: true
          },
          {
            id: 'pri-trim-02',
            title: 'Install baseboards nailed into WALL STUDS only',
            desc: 'CRITICAL: Fasten baseboards into studs with 18-gauge brad nails. NEVER nail down into the vinyl plank. Floor must float freely.',
            crucial: true
          },
          {
            id: 'pri-trim-03',
            title: 'Reinstall closet sliding doors and floor guide',
            desc: 'Screw sliding door floor guide through vinyl into plywood subfloor with clearance holes so vinyl can float.',
            crucial: false
          },
          {
            id: 'pri-trim-04',
            title: 'Caulk top edge of baseboard with paintable latex caulk',
            desc: 'Apply a fine bead along drywall joint and smooth with damp finger for a crisp professional appearance.',
            crucial: false
          }
        ],
        proTips: [
          'If re-using old baseboards leaves a gap, add matching shoe molding or 1/4-round nailed horizontally into the baseboard.'
        ]
      }
    ]
  },
  {
    id: 'spare-bedroom',
    name: 'Spare Bedroom (NW)',
    title: 'Spare Bedroom (NW) & Middle Closet',
    badge: 'Zone 2 • Bedroom 2',
    badgeColor: 'emerald',
    sqft: 135,
    areaDetail: '121 sq ft bedroom + 14 sq ft middle closet',
    sheetCount: '3 full sheets + 1 cut sheet (Pieces #13–#21)',
    startingPoint: 'Shared divider wall with Primary Bedroom (x = 0.80) at North wall',
    progressionDirection: 'Starts against Primary wall and works West toward front exterior wall, then South into middle closet',
    closetDoorInfo: 'Middle closet sliding doors on North wall (opening directly into Bedroom 2)',
    pieces: ['#13', '#14', '#15', '#16', '#17', '#18', '#19', '#20', '#21'],
    phases: [
      {
        phase: 1,
        id: 'spare-phase-1',
        title: 'Phase 1: Parquet Demo & Slat Subfloor Prep',
        estimatedTime: '4 – 6 Hours',
        badge: 'Prep & Structure',
        summary: 'Demo parquet in Bedroom 2 and Middle Closet. Secure all 1x6 diagonal slats to joists.',
        tasks: [
          {
            id: 'sp-demo-01',
            title: 'Remove baseboards and Middle Closet sliding door panels',
            desc: 'Pry baseboards with trim bar. Remove closet doors from upper track and take off bottom floor guides.',
            crucial: false
          },
          {
            id: 'sp-demo-02',
            title: 'Pry parquet tiles in Bedroom 2 and Middle Closet',
            desc: 'Clear 135 sq ft of old wood parquet down to bare 1x6 diagonal slats.',
            crucial: false
          },
          {
            id: 'sp-demo-03',
            title: 'Pull all nails, staples, and cleats from subfloor',
            desc: 'Run a metal scraper over every slat; pull fasteners with end-cutters.',
            crucial: true
          },
          {
            id: 'sp-demo-04',
            title: 'Walk & stomp test: Fasten loose slats to joists',
            desc: 'Drive 2-1/2" screws into floor joists wherever slats flex or creak. No adhesive on slats.',
            crucial: true
          },
          {
            id: 'sp-demo-05',
            title: 'Belt sand high ridges & vacuum thoroughly',
            desc: 'Flatten any crowned 1x6 edges with 40-grit belt sander. Thoroughly HEPA vacuum cracks.',
            crucial: false
          }
        ],
        proTips: [
          'Middle Closet Note: The closet between Bedroom 2 and Bedroom 3 belongs to Bedroom 2! Its doorway opens north into Bedroom 2.'
        ]
      },
      {
        phase: 2,
        id: 'spare-phase-2',
        title: 'Phase 2: Plywood Underlayment (Pieces #13–#21)',
        estimatedTime: '1 Day',
        badge: 'Underlayment',
        summary: 'Install 9 plywood pieces starting at shared Primary wall and working west to exterior wall.',
        tasks: [
          {
            id: 'sp-ply-01',
            title: 'Place Sheet #13 (47" × 96") against Primary shared wall',
            desc: 'Align factory edge along north exterior wall, starting at divider wall (x = 0.80). Leave 1/4" wall gap.',
            crucial: true
          },
          {
            id: 'sp-ply-02',
            title: 'Place Piece #14 (47" × 49.3") to complete Row 1',
            desc: 'Cross-cut sheet to 49.3" to finish Row 1 into North-West corner.',
            crucial: false
          },
          {
            id: 'sp-ply-03',
            title: 'Install Piece #15 (Reusing 48" × 48" offcut from Primary Sheet #3)',
            desc: 'Start Row 2 with the 48" × 48" half sheet saved from Primary Sheet #3. Staggers joints 48" perfectly!',
            crucial: true
          },
          {
            id: 'sp-ply-04',
            title: 'Install Piece #16 (Full 4x8) & Piece #17 (End trim)',
            desc: 'Complete Row 2 heading west. Maintain 1/8" spacing between sheets using 8d nail spacers.',
            crucial: false
          },
          {
            id: 'sp-ply-05',
            title: 'Install Row 3 pieces (Pieces #18, #19, #20)',
            desc: '31.4" rip width along south bedroom wall. Stagger joints cleanly.',
            crucial: false
          },
          {
            id: 'sp-ply-06',
            title: 'Install Piece #21 (28.3" × 60.2") in Middle Closet',
            desc: 'Slip piece through the north sliding closet doors into the Middle Closet. Covers the entire closet footprint.',
            crucial: true
          },
          {
            id: 'sp-ply-07',
            title: 'Drive Paulin screws & run drywall knife sweep test',
            desc: 'Paulin #8 x 1-1/2" screws 6" on edges, 8" in field. Glide drywall knife flat over every screw head.',
            crucial: true
          }
        ],
        proTips: [
          'Money Saver: Reusing the 48"x48" offcut from Primary Sheet #3 saves buying another full 4x8 sheet of BCX fir plywood.',
          'Door Opening: Piece #21 enters through the north sliding closet door. Do NOT attempt to floor from the south side.'
        ]
      },
      {
        phase: 3,
        id: 'spare-phase-3',
        title: 'Phase 3: Door Casing Undercutting',
        estimatedTime: '1 Hour',
        badge: 'Millwork Prep',
        summary: 'Undercut closet frame and bedroom entrance jambs.',
        tasks: [
          {
            id: 'sp-door-01',
            title: 'Undercut Middle Closet sliding door jambs and casing',
            desc: 'Oscillating blade flat on LifeProof plank scrap against north-facing closet frame.',
            crucial: true
          },
          {
            id: 'sp-door-02',
            title: 'Undercut bedroom entry door frame from Hallway',
            desc: 'Cut casing on both sides of doorway so planks float freely into hallway.',
            crucial: true
          }
        ],
        proTips: [
          'Vacuum out sawdust from under casing pockets before laying planks.'
        ]
      },
      {
        phase: 4,
        id: 'spare-phase-4',
        title: 'Phase 4: LifeProof LVP Flooring Installation',
        estimatedTime: '1 Day',
        badge: 'Finish Floor',
        summary: 'Install click-lock vinyl planks across Bedroom 2 and through the Middle Closet doorway.',
        tasks: [
          {
            id: 'sp-lvp-01',
            title: 'Set up 1/4" perimeter wedge spacers',
            desc: 'Space every 2-3 feet around all walls and closet perimeter.',
            crucial: true
          },
          {
            id: 'sp-lvp-02',
            title: 'Start Row 1 along north exterior wall',
            desc: 'Cut off tongues facing wall. Click end joints tight with tapping block.',
            crucial: true
          },
          {
            id: 'sp-lvp-03',
            title: 'Maintain minimum 8" plank end stagger',
            desc: 'Stagger rows randomly for natural hardwood plank appearance.',
            crucial: true
          },
          {
            id: 'sp-lvp-04',
            title: 'Flow planks through Middle Closet doorway',
            desc: 'Continue planks continuously through closet opening. Pull bar locks back wall planks.',
            crucial: true
          }
        ],
        proTips: [
          'Run planks parallel to the longest wall (East-West) to match the Primary bedroom direction.'
        ]
      },
      {
        phase: 5,
        id: 'spare-phase-5',
        title: 'Phase 5: Baseboards & Door Hardware',
        estimatedTime: '2 Hours',
        badge: 'Trim & Finish',
        summary: 'Complete bedroom trim and reinstall closet doors.',
        tasks: [
          {
            id: 'sp-trim-01',
            title: 'Remove perimeter wedge spacers',
            desc: 'Check perimeter for any debris jamming the expansion gap.',
            crucial: true
          },
          {
            id: 'sp-trim-02',
            title: 'Nail baseboards into wall studs only (18ga brads)',
            desc: 'Never nail through vinyl plank. Maintain full floating expansion.',
            crucial: true
          },
          {
            id: 'sp-trim-03',
            title: 'Rehang Middle Closet sliding doors and align floor guide',
            desc: 'Hang panels on top rail and adjust roller heights so doors glide smoothly.',
            crucial: false
          }
        ],
        proTips: [
          'Paint baseboards before installing to save hours of taping on new flooring!'
        ]
      }
    ]
  },
  {
    id: 'baby-room',
    name: 'Baby Room (SW)',
    title: 'Baby Room (SW) & Dual Closets',
    badge: 'Zone 3 • Baby Nursery',
    badgeColor: 'purple',
    sqft: 126,
    areaDetail: '101 sq ft bedroom + 10 sq ft NW closet + 15 sq ft South alcove closet',
    sheetCount: '3 full sheets + 1 cut sheet (Pieces #22–#28)',
    startingPoint: 'Shared divider wall with Hallway (x = -2.35) at East wall',
    progressionDirection: 'Starts against Hallway wall and advances West toward exterior wall; wraps into South closet and NW closet',
    closetDoorInfo: 'Dual Closets: North-West closet opens South (Piece #28); South alcove closet opens North (Piece #23)',
    pieces: ['#22', '#23', '#24', '#25', '#26', '#27', '#28'],
    phases: [
      {
        phase: 1,
        id: 'baby-phase-1',
        title: 'Phase 1: Nursery Zero-Squeak Slat Remediation & Prep',
        estimatedTime: '4 – 6 Hours',
        badge: 'Nursery Standard',
        summary: 'Extra thorough slat tightening for a quiet nursery where a sleeping baby won\'t be woken by floor creaks.',
        tasks: [
          {
            id: 'baby-demo-01',
            title: 'Remove baseboards and both closet doors / curtains',
            desc: 'Remove trim and door fixtures from bedroom, NW closet, and South alcove closet.',
            crucial: false
          },
          {
            id: 'baby-demo-02',
            title: 'Demo parquet tiles across 126 sq ft including dual closets',
            desc: 'Pry up tiles down to bare 1x6 slats. Clean out both closet floors.',
            crucial: false
          },
          {
            id: 'baby-demo-03',
            title: 'The "Barefoot Nursery" Squeak Test (Top Priority)',
            desc: 'Walk every board slowly in socks. Nursery floors require 100% silence. Mark every creak or springy board with painter\'s tape.',
            crucial: true
          },
          {
            id: 'baby-demo-04',
            title: 'Fasten 1x6 slats to joists with 2-1/2" wood screws',
            desc: 'Drive screws into joists under all marked spots. Add secondary screws on adjacent boards to ensure zero deflection.',
            crucial: true
          },
          {
            id: 'baby-demo-05',
            title: 'Belt sand high ridges & HEPA vacuum thoroughly',
            desc: 'Ensure no ridges exceed 1/8". Vacuum every trace of dust to ensure hypoallergenic, clean nursery air.',
            crucial: false
          }
        ],
        proTips: [
          'Baby Nursery Priority: Creaks that go unnoticed in normal rooms will wake a light-sleeping infant. Take an extra 30 minutes to screw down joists here!'
        ]
      },
      {
        phase: 2,
        id: 'baby-phase-2',
        title: 'Phase 2: Plywood Underlayment (Pieces #22–#28)',
        estimatedTime: '1 Day',
        badge: 'Underlayment',
        summary: 'Install 7 plywood pieces starting against the Hallway wall and flooring both closets.',
        tasks: [
          {
            id: 'baby-ply-01',
            title: 'Place Sheet #22 (48" × 96") against Hallway shared wall',
            desc: 'Align factory edge along East wall (x = -2.35). Leave 1/4" perimeter gap from drywall.',
            crucial: true
          },
          {
            id: 'baby-ply-02',
            title: 'Install Piece #23 (Irregular L-shape wrapping into South Closet)',
            desc: 'Cut L-shape (48" × 73" max) that extends directly through the north opening into the South Alcove Closet (4\'10" × 1\'11") seamlessly!',
            crucial: true
          },
          {
            id: 'baby-ply-03',
            title: 'Install Piece #24 (48" × 48" stagger starter) for Row 2',
            desc: 'Cross-cut 48" off a raw sheet to create a 48" × 48" half-sheet starter along North line (z = -0.65 to 3.35). Offsets Row 2 end joint by 48" from Row 1 (Sheet #22 at z = 7.35) and Row 3 (Sheet #26 at z = 7.35), completely eliminating aligned seams.',
            crucial: true
          },
          {
            id: 'baby-ply-04',
            title: 'Install Piece #25 (48" × 92.0" max notched) completing Row 2',
            desc: 'Cross-cut sheet to 92.0" length (z = 3.35 to 11.02) and notch 10.1" along south closet return (z = 9.12 to 11.02) to finish Row 2 toward south wall. Mates flush with Sheet #23 with zero overlap.',
            crucial: true
          },
          {
            id: 'baby-ply-05',
            title: 'Install Row 3 along West exterior wall (Pieces #26 & #27)',
            desc: 'Piece #26 (28.4" × 96", seam at z = 7.35) and Piece #27 (28.4" × 44.0") complete bedroom floor along west window wall with a 48" stagger from Row 2.',
            crucial: false
          },
          {
            id: 'baby-ply-06',
            title: 'Install Piece #28 (28.3" × 40.2") in NW Corner Closet',
            desc: 'Slip piece through the south doorway opening into the NW corner closet. Covers the 3\'4" × 2\'4" closet footprint.',
            crucial: true
          },
          {
            id: 'baby-ply-07',
            title: 'Fasten Paulin screws & drywall blade sweep test',
            desc: 'Paulin #8 x 1-1/2" screws 6" on edges, 8" in field. Sweep blade over every screw head to ensure 100% flush finish.',
            crucial: true
          }
        ],
        proTips: [
          'Dual Closets: South closet is floored seamlessly by Sheet #23; North-West closet is floored via its south door by Sheet #28.',
          'No sheets pass under solid partition walls—framing boundaries are strictly observed.'
        ]
      },
      {
        phase: 3,
        id: 'baby-phase-3',
        title: 'Phase 3: Door Casing Undercutting',
        estimatedTime: '1 Hour',
        badge: 'Millwork Prep',
        summary: 'Undercut jambs at 3 openings: NW Closet, South Closet, and Bedroom Entry.',
        tasks: [
          {
            id: 'baby-door-01',
            title: 'Undercut NW Corner Closet doorway jambs (South-facing)',
            desc: 'Cut horizontal clearance with oscillating tool using vinyl scrap as height guide.',
            crucial: true
          },
          {
            id: 'baby-door-02',
            title: 'Undercut South Alcove Closet return framing and casing',
            desc: 'Ensure vinyl plank slides freely into closet alcove.',
            crucial: true
          },
          {
            id: 'baby-door-03',
            title: 'Undercut Bedroom 3 entrance doorway casing from Hallway',
            desc: 'Cut casing on both sides of doorway for continuous floating clearance.',
            crucial: true
          }
        ],
        proTips: [
          'Keep shop vac running right next to the oscillating blade to capture fine wood dust instantly.'
        ]
      },
      {
        phase: 4,
        id: 'baby-phase-4',
        title: 'Phase 4: LifeProof LVP Flooring Installation',
        estimatedTime: '1 Day',
        badge: 'Finish Floor',
        summary: 'Install LifeProof Cobblestone vinyl planks with 1/4" expansion perimeter across bedroom and both closets.',
        tasks: [
          {
            id: 'baby-lvp-01',
            title: 'Acclimate LifeProof planks in nursery for 24-48 hours',
            desc: 'LifeProof is GREENGUARD Gold certified (ultra-low VOC, non-toxic, phthalate-free) — safe for babies.',
            crucial: false
          },
          {
            id: 'baby-lvp-02',
            title: 'Insert 1/4" perimeter wedge spacers along all walls',
            desc: 'Maintain 1/4" expansion gap around walls and inside both closets.',
            crucial: true
          },
          {
            id: 'baby-lvp-03',
            title: 'Start Row 1 tongue-side facing wall and click rows together',
            desc: 'Lock planks at 30° angle, tap tight with mallet and tapping block. Stagger ends minimum 8".',
            crucial: true
          },
          {
            id: 'baby-lvp-04',
            title: 'Flow planks seamlessly into South Alcove Closet & NW Closet',
            desc: 'Avoid transition strips at closet openings by running continuous vinyl planks through for a clean modern aesthetic.',
            crucial: true
          }
        ],
        proTips: [
          'LifeProof\'s built-in antimicrobial underlayment prevents mold and mildew growth underneath the floor.'
        ]
      },
      {
        phase: 5,
        id: 'baby-phase-5',
        title: 'Phase 5: Baseboards, Hardware & Deep Clean',
        estimatedTime: '2 Hours',
        badge: 'Trim & Clean',
        summary: 'Install trim, nail to studs only, and damp mop floor clean for baby nursery move-in.',
        tasks: [
          {
            id: 'baby-trim-01',
            title: 'Remove perimeter wedge spacers',
            desc: 'Confirm full 1/4" perimeter expansion channel is clear of debris.',
            crucial: true
          },
          {
            id: 'baby-trim-02',
            title: 'Install baseboards nailed into WALL STUDS only',
            desc: '18ga brad nails into studs. Never nail down into vinyl plank!',
            crucial: true
          },
          {
            id: 'baby-trim-03',
            title: 'Reinstall closet doors/curtains & caulk baseboards',
            desc: 'Caulk top of baseboards with paintable acrylic latex caulk. Wipe down floor with warm damp microfiber mop.',
            crucial: false
          }
        ],
        proTips: [
          'Add soft felt pads under the crib, dresser, and changing table legs to protect the 22-mil wear layer from heavy point loads.'
        ]
      }
    ]
  },
  {
    id: 'hallway',
    name: 'Hallway',
    title: 'Central Hallway, Landing & Linen Closet',
    badge: 'Zone 4 • Central Spine',
    badgeColor: 'amber',
    sqft: 80,
    areaDetail: '75 sq ft hallway + 5 sq ft linen closet',
    sheetCount: '1 full sheet + 1 cut sheet (Pieces #10–#12)',
    startingPoint: 'North end of Hallway below Bedroom 2 door (z = -2.61)',
    progressionDirection: 'Runs South down central spine directly to top stair nosing (z = 8.19) and branches into Linen Closet',
    closetDoorInfo: 'Linen Closet doorway opens East directly into central hallway (Piece #12)',
    pieces: ['#10', '#11', '#12'],
    phases: [
      {
        phase: 1,
        id: 'hall-phase-1',
        title: 'Phase 1: Hallway Parquet Demo & Slat Prep',
        estimatedTime: '3 – 4 Hours',
        badge: 'Prep & Structure',
        summary: 'Demo parquet along high-traffic central corridor and linen closet. Inspect top stair riser.',
        tasks: [
          {
            id: 'hall-demo-01',
            title: 'Remove hallway baseboards and linen closet door',
            desc: 'Pry baseboards with trim bar. Lift linen closet door off hinges.',
            crucial: false
          },
          {
            id: 'hall-demo-02',
            title: 'Pry parquet tiles along hallway spine and linen closet',
            desc: 'Clear 80 sq ft corridor down to 1x6 slats. Pay special attention to top stair edge.',
            crucial: false
          },
          {
            id: 'hall-demo-03',
            title: 'Pull all fasteners and scrape old adhesive',
            desc: 'Ensure no nail heads protrude above 1x6 slats in high-traffic landing zone.',
            crucial: true
          },
          {
            id: 'hall-demo-04',
            title: 'Reinforce 1x6 slats with 2-1/2" screws into joists',
            desc: 'The hallway takes the most daily foot traffic in the house. Drive double screws into every joist along center walking path.',
            crucial: true
          },
          {
            id: 'hall-demo-05',
            title: 'Inspect top stair riser and nosing subfloor flushness',
            desc: 'Check that subfloor terminates clean and square at the stair bullnose/riser (z = 8.19).',
            crucial: true
          }
        ],
        proTips: [
          'High traffic zone: Hallways see 5x more steps than bedrooms. Extra screws into joists here prevents floor bounce.'
        ]
      },
      {
        phase: 2,
        id: 'hall-phase-2',
        title: 'Phase 2: Plywood Underlayment (Pieces #10–#12)',
        estimatedTime: '4 – 6 Hours',
        badge: 'Underlayment',
        summary: 'Install 3 precision pieces covering the central corridor, top stair approach, and linen closet.',
        tasks: [
          {
            id: 'hall-ply-01',
            title: 'Install Piece #10 (45.6" × 96") main hallway runner',
            desc: 'Place 45.6" wide runner starting below Bedroom 2 doorway (z = -2.61) heading south. Center between bedroom door jambs.',
            crucial: true
          },
          {
            id: 'hall-ply-02',
            title: 'Install Piece #11 (45.6" × 33.6") top stair approach',
            desc: 'Butt Piece #11 to Piece #10 with 1/8" gap. Terminate flush with the top stair riser (z = 8.19).',
            crucial: true
          },
          {
            id: 'hall-ply-03',
            title: 'Install Piece #12 (24" × 28.3") in Linen Closet',
            desc: 'Floors the Linen Closet through its east opening door. Butt tight with 1/8" expansion spacing.',
            crucial: false
          },
          {
            id: 'hall-ply-04',
            title: 'Fasten with Paulin screws & drywall blade sweep test',
            desc: 'Fasten 6" edges / 8" field. Sweep 10" drywall knife flat across entire corridor to verify zero proud screw heads.',
            crucial: true
          }
        ],
        proTips: [
          'Piece #10 and Piece #11 are ripped to 45.6" wide (3\'10") from standard 4x8 sheets, fitting the central hallway hallway width perfectly.'
        ]
      },
      {
        phase: 3,
        id: 'hall-phase-3',
        title: 'Phase 3: Door Casing Undercutting & Threshold Prep',
        estimatedTime: '2 – 3 Hours',
        badge: 'Crucial Prep',
        summary: 'Undercut all 5 door frames adjoining the hallway and prepare 5PC Bath transition.',
        tasks: [
          {
            id: 'hall-door-01',
            title: 'Undercut casing at all 5 hallway doorways with oscillating tool',
            desc: 'CRITICAL STEP: Undercut door casings for Primary Bedroom, Bedroom 2, Bedroom 3, 5PC Bathroom, and Linen Closet using a scrap of LifeProof plank as a height guide.',
            crucial: true
          },
          {
            id: 'hall-door-02',
            title: 'Chisel out cut wood blocks and vacuum casing pockets',
            desc: 'Clean out wood blocks completely so planks slide easily underneath with 1/16" vertical clearance.',
            crucial: true
          },
          {
            id: 'hall-door-03',
            title: 'Prepare 5PC Bathroom doorway threshold (EXCLUDED)',
            desc: 'Ensure 5PC bathroom threshold line is straight and clean. Plan metal track installation for LifeProof T-molding or Reducer.',
            crucial: true
          },
          {
            id: 'hall-door-04',
            title: 'Dry-fit top-of-stairs nosing profile',
            desc: 'Check that the stair nosing sits flush with the new 7mm vinyl plank and covers the riser cleanly.',
            crucial: true
          }
        ],
        proTips: [
          'Undercutting all 5 door casings produces a continuous, seamless builder finish without ugly quarter-round or awkward gaps at doorways.'
        ]
      },
      {
        phase: 4,
        id: 'hall-phase-4',
        title: 'Phase 4: LifeProof LVP Flooring Installation',
        estimatedTime: '4 – 6 Hours',
        badge: 'Finish Floor',
        summary: 'Install vinyl planks lengthwise down the central hallway and into Linen Closet.',
        tasks: [
          {
            id: 'hall-lvp-01',
            title: 'Set 1/4" perimeter spacers along hallway walls',
            desc: 'Maintain floating expansion channel along east and west hallway walls.',
            crucial: true
          },
          {
            id: 'hall-lvp-02',
            title: 'Run planks lengthwise (North to South) along hallway spine',
            desc: 'Running planks parallel to hallway length makes the corridor appear longer and minimizes end cuts.',
            crucial: true
          },
          {
            id: 'hall-lvp-03',
            title: 'Slide planks under undercut door jambs',
            desc: 'Angle long seam into groove and slide plank under casing, using pull bar to lock end joints tight.',
            crucial: true
          },
          {
            id: 'hall-lvp-04',
            title: 'Flow planks through Linen Closet doorway',
            desc: 'Complete Linen Closet floor without a transition strip for clean continuous look.',
            crucial: false
          }
        ],
        proTips: [
          'Use a heavy-duty pull bar for doorway planks where space does not allow a tapping block.'
        ]
      },
      {
        phase: 5,
        id: 'hall-phase-5',
        title: 'Phase 5: Stair Nosing, Bath Threshold & Trim',
        estimatedTime: '2 – 3 Hours',
        badge: 'Transitions & Safety',
        summary: 'Secure top-of-stairs nosing, install 5PC Bath transition, and fasten baseboards.',
        tasks: [
          {
            id: 'hall-trim-01',
            title: 'Install Top-of-Stairs nosing transition (Safety Critical)',
            desc: 'Fasten stair nosing with polyurethane construction adhesive (Loctite PL) AND countersunk screws into plywood subfloor. Leave 1/4" expansion clearance under the nosing lip.',
            crucial: true
          },
          {
            id: 'hall-trim-02',
            title: 'Install 5PC Bathroom doorway transition (T-molding / Reducer)',
            desc: 'Screw metal channel to subfloor at bathroom threshold. Snap LifeProof transition into channel with 1/4" expansion gap inside channel.',
            crucial: true
          },
          {
            id: 'hall-trim-03',
            title: 'Remove spacers and nail baseboards into wall studs only',
            desc: 'Brad nail baseboards into studs. Rehang linen closet door. Re-check door swing clearance.',
            crucial: true
          }
        ],
        proTips: [
          'Stair Nosing Safety: Never rely solely on adhesive or tape for stair nosing. Always use both polyurethane adhesive and mechanical fasteners.'
        ]
      }
    ]
  }
]

// Backwards-compatible flat list of phases for global view / legacy components
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
        desc: 'Work along the wood grain. If adhesive is stubborn, a wide heavy-duty floor scraper speeds this up significantly.',
        crucial: false
      },
      {
        id: 'demo-03',
        title: 'Pull all old flooring nails, staples, and cleats',
        desc: 'Run a 4-inch wide flat scraper over the bare 1x6 slats. Any protruding fastener will lift the new 1/2" plywood and cause squeaks. Pull all nails with end-cutting nippers.',
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
        desc: 'Angle long tongue into groove, fold down flat, then use soft rubber mallet and LifeProof tapping block to tap seam fully closed.',
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
      'Cutting LifeProof: You can score the top 22-mil wear layer with a sharp utility knife against a speed square, then snap cleanly over your knee. For rip cuts or vents, a jigsaw or circular saw is effortless.',
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
