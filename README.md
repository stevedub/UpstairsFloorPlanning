# Upstairs Flooring Project & 3D Interactive Planner

> **Property**: 2nd Floor Renovation • 6 Prince David Ct, St. Catharines, ON  
> **Net Floor Area**: 525 sq ft (All 3 bedrooms, hallway, and 4 closets; excluding 5PC Bath and bath closet)  
> **Author**: `stevedub`

An interactive, responsive web application and 3D cutting visualizer built specifically to guide and track the upstairs flooring renovation.

---

## 🛠️ Build Specs & Products

| Layer | Material | Retailer | Unit Specs | Price (CAD) |
|---|---|---|---|---|
| **Subfloor (Existing)** | 1×6 Diagonal Wood Slats over Joists | Existing | Ripped parquet down to slats; re-screw loose boards | $0.00 |
| **Underlayment** | 1/2" 4x8 BCX Douglas Fir Plywood | [Turkstra Lumber](https://turkstralumber.com/products/1-2-4-x-8-bcx-fir-plywood) | 32 sq ft / sheet (4' × 8') | **$59.74 / sheet** |
| **Finish Flooring** | LifeProof Cobblestone 22-MIL Click LVP | [Home Depot Canada](https://www.homedepot.ca/product/lifeproof-cobblestone-7mm-x-8-7-in-w-x-47-6-in-l-22mil-click-lock-waterproof-luxury-vinyl-plank-flooring-20-06-sq-ft-case-/1001633102) | 7mm × 8.7" W × 47.6" L (20.06 sq ft / case) | **$85.85 / case** |
| **Fasteners** | Paulin #8 x 1-1/2" Phosphate Floor Screws | [Home Depot Canada](https://www.homedepot.ca/product/paulin--8-x-1-1-2-inch-flat-head-square-drive-phosphate-high-performance-floor-screws-500pcs/1000152692) | #2 Robertson Square Drive (500 pcs/box) | **$36.98 / box** |

---

## 📐 Material Calculations (At 525 sq ft Baseline)

| Material | Raw Need | Recommended Buffer (+15%) | Purchasing Target | Subtotal (CAD) |
|---|---|---|---|---|
| **1/2" 4x8 BCX Fir Plywood** | 16.4 sheets | +15% (~604 sq ft) | **19 sheets** (covers 608 sq ft) | **$1,135.06** |
| **LifeProof 22-MIL LVP** | 26.2 cases | +15% (~604 sq ft) | **31 cases** (covers 621.8 sq ft) | **$2,661.35** |
| **Paulin Floor Screws** | ~1,600 plywood screws + 300 slat screws | ~2,000 screws | **4 boxes** (2,000 screws total) | **$147.92** |
| **Subtotal** | | | | **$3,944.33** |
| **Ontario HST (13%)** | | | | **$512.76** |
| **Estimated Grand Total** | | | | **$4,457.09 CAD** |

*Note: The app allows live adjustment between 10%, 15%, 20%, or custom waste percentages.*

---

## ⚠️ Critical Expansion Gaps & Tolerances

1. **Plywood-to-Plywood Gap (1/8" / 3mm)**:
   - Always leave 1/8" between all edges and ends of 4x8 plywood sheets.
   - *Job-site trick*: Drop an 8d common nail (1/8" shank) between sheets as a spacer while driving screws, then pull the nail out.
   - *Why*: Allows summer humidity expansion without peaking or buckling.
2. **Plywood-to-Wall Gap (1/4" to 1/2")**:
   - Leave 1/4" to 1/2" expansion margin against all drywall and framing.
3. **Screw Spacing & Depth**:
   - Fasten every **6 inches** along panel perimeters (spaced **3/8" to 1/2" in from sheet edges**).
   - Fasten every **8 inches** in the interior field grid.
   - Every screw MUST sit flush or 1/32" countersunk below the surface.
   - *Job-site trick*: Perform the **Drywall Blade Sweep Test**—slide a 10" taping knife flat across sheets. If it clicks or catches on a screw, drive it deeper.
4. **LifeProof Vinyl Expansion Gap (1/4" / 6mm)**:
   - Leave 1/4" minimum floating expansion gap against all walls, vertical pipes, and door frames using plastic wedge spacers.
5. **LifeProof Plank Stagger (8" / 200mm minimum)**:
   - Offset end joints by at least 8" from the adjacent row. Never make "H-joints" or "staircases".
6. **Door Casing Undercutting**:
   - Lay a scrap piece of LifeProof plank against casings, rest an oscillating multi-tool blade flat on top, and slice horizontally through the casing. Plank will slide freely underneath with room to expand.
7. **No Glue on 1x6 Slat Subfloor**:
   - APA explicitly advises *against* gluing underlayment plywood to 1x6 diagonal board subfloors. Wood planks and plywood expand differently across grain; gluing causes stress cracks and squeaks. Fasten with screws only.

---

## 🚀 Running the Web App

### Option 1: Run Locally with Node.js
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
App runs at `http://localhost:3000`.

---

### Option 2: Run with Docker

Build and run the containerized application using Docker Compose:
```bash
docker compose up --build -d
```
Access the application at: `http://localhost:8080`

To stop the container:
```bash
docker compose down
```

---

## 🌟 App Features

- **Interactive 3D Three.js Floor Plan**: 3D perspective and 2D blueprint views with room boundaries, stairs opening, and excluded 5PC bathroom.
- **Layer Switcher**: Toggle between 1/2" Plywood Sheets, LifeProof LVP finish, and 1x6 Diagonal Slat Subfloor.
- **Interactive Sheet Layout Sequencer**: Step-by-step layout player starting at the Primary Bedroom outside wall corner, progressing to hallway and secondary bedrooms.
- **Interactive Cut Inspector**: Click any sheet to view exact cut dimensions, notch specifications, and offcut reusability.
- **Live Cost & Material Calculator**: Dynamic calculations with overage presets (+10%, +15%, +20%, or custom), tax calculation, and direct links to Turkstra Lumber and Home Depot Canada.
- **Gaps & Tolerances Master Guide**: Visual cross-section diagrams and pro job-site tips for every clearance tolerance.
- **6-Phase Interactive DIY Checklist**: Tracks demolition, subfloor squeak remediation, underlayment fastening, door casing undercuts, LVP laying, and trim finishing with progress saving.
- **Tool Readiness Checklist**: Interactive tool & safety gear audit.
