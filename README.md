# MOLEVERSE LAB · Chemistry M.4

Interactive browser prototype: virtual balance, particle comparison, mole domino (solo / 2 local players), optional Google Sheets logging. No paid service required for core functions.

## Start

1. Extract project. Run `python -m http.server 8080` from the project folder (or `npm run start`).
2. Open `http://localhost:8080` in your browser.
3. For tests, install Node.js 20+ and run `npm test`.
4. GitHub Pages: upload the **contents of this directory** to a repository, Settings → Pages → Deploy from branch → main /(root), save.

## Google Sheets integration

1. Create a Google Spreadsheet. Copy its ID from the address bar (the middle segment between `/d/` and `/edit`).
2. Open Extensions → Apps Script and paste `apps-script/Code.gs`.
3. Replace `PASTE_SPREADSHEET_ID_HERE` with the copied ID.
4. Deploy → New deployment → Web app → Execute as: Me; Who has access: Anyone. Authorize permissions and copy the **/exec** URL.
5. In app → **บันทึกผล** → paste URL, enable checkbox, click Save. Complete a lab challenge or game, then inspect the spreadsheet tab `MoleverseResults`.
6. After modifying Apps Script, create a new deployment version; the same URL can be kept when editing the deployment.

**Privacy & trust:** The endpoint is intentionally public to receive no-login browser submissions. Anyone who knows the endpoint can submit data. Use pseudonymous class codes, **do not input full names, personal IDs, health data, or grades with legal significance**. These scores are practice data, not secure assessment records. No server verification of user identity or tampering is included. Logging uses `no-cors`, so a browser request completing does not prove the spreadsheet recorded the row.

## Chemistry accuracy rules

- `n=m/M` and `N=n×Nₐ`, using Nₐ = 6.02214076×10²³ mol⁻¹.
- Actual mass conversion uses molar masses in `src/chemistry.js` (approximate textbook values); round-off in displayed quantities is labeled/expected.
- NaCl is counted in **formula units**, not discrete molecules. C and Mg are counted in atoms; H₂O, CO₂, O₂ in molecules.
- Particle grids show *symbolic representative particles*, never actual 10²³ objects or actual molecular structures.
- Domino game intentionally uses rounded molar masses from `GAME_MASSES` to avoid decimal mismatches.
- A domino match requires **same substance plus same chemical amount in mol**, not the same gram mass for different substances.
- The ordered domino set is verified as a solvable ring, then shuffled for the hand. Opening tile is fixed, always allowing a solution.
- Game includes only a first-stage 7-tile deck. Advanced formula builder, 3D model renderer, and network multiplayer are planned, **not implemented**.

## Scope

This prototype's 2-player mode is **turn-taking on a single device**. It is not synchronous internet multiplayer. The 3D-style UI is SVG/CSS, not a physically exact 3D molecular model. User progress persists in localStorage per browser, subject to browser storage clearing. It does not yet have a real teacher authentication system or online class roster.
