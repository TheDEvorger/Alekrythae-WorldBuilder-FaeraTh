# Ałek’ryŧhæ World Builder & Færa’Th

> **A local-first Windows workspace for world-building, structured knowledge, writing, visual planning, focus and AI-assisted work.**

**Ałek’ryŧhæ World Builder & Færa’Th** is a `.alek` desktop application designed to run through **Ałek’ryŧhæ Core**.

It combines a world-builder and a practical everyday workspace in one application. You can keep structured Lore, write in Reverie, sketch and arrange visual material in Cartographer’s Table, manage calendar notes, use focus tools, open the AI workspace and move your local data between compatible versions without bundling your private workspace into the public source package.

**Current version:** `v0.1.0`  
**Platform:** Windows 10 / 11  
**Runtime:** A compatible Ałek’ryŧhæ Core installation  
**Data model:** Local-first

> **New here?** Install Core, run `Alekrythae.cmd`, click the Blue Moon, then press **F1**. That is the fastest route from “what is this?” to actually using the application.

---

## 1. What this application is

This project is not a conventional single-purpose note app and it is not only a fictional world editor.

It is a shared workspace built around several connected surfaces:

| Surface | What it is for |
|---|---|
| **Blue Moon / Focus Center** | Pomodoro-style focus cycles, stopwatch, timer, work presets and affirmations |
| **Calendar** | Real-world calendar notes and chronological note review |
| **Lore** | Hierarchical knowledge, research, setting documentation and structured reference material |
| **Reverie** | Long-form writing, journal/story entries, covers and in-flow images |
| **Cartographer’s Table (CT)** | 2D drawing, image placement, visual planning, diagrams and map-like work |
| **Tide** | Companion 2D connection/relationship workspace |
| **Harmonizer** | Audio/atmosphere controls |
| **AI** | A ChatGPT workspace opened through the Core/Edge integration |

You do **not** need to use every surface. A user can treat the application as a world-builder, a study system, a project notebook, a writing environment, a visual board, or a mixture of all of them.

---

## 2. Core and `.alek`: why there are two projects

Ałek’ryŧhæ World Builder & Færa’Th is the application. **Ałek’ryŧhæ Core** is the runtime that opens it.

```text
Ałek’ryŧhæ Core
        │
        └── Alekrythae-World-Builder-FaeraTh.alek
```

The application repository contains its own JavaScript modules, UI, assets and application logic. The Core provides the Windows host, `.alek` loading, WebView2/native integration and shared services.

This separation is intentional. Do not copy the Core into this repository just to make the folder look self-contained.

---

## 3. Requirements

You need:

- **Windows 10 or Windows 11**;
- a compatible **Ałek’ryŧhæ Core** installation;
- **Microsoft Edge WebView2 Runtime** where required by the Core;
- this repository or the application release package.

There is no Node.js/npm build step for normal use of this source tree. The `.alek` application is loaded directly by Core.

---

## 4. First-time setup

### Step 1: install Ałek’ryŧhæ Core

Install/register Core first. Core should register the `.alek` file association for the current Windows user.

If Core is not registered, `Alekrythae.cmd` will stop and tell you that the Core registration could not be found.

### Step 2: keep the repository structure intact

Do not move individual files out of the repository structure.

The important part looks like this:

```text
Alekrythae-World-Builder-FaeraTh-v0.1.0/
├── Alekrythae.cmd
├── README.md
├── README_TR.md
├── LICENSE.md
└── Meggy/
    ├── Alekrythae-World-Builder-FaeraTh.alek
    ├── Alekrythae.App/
    ├── Assets/
    ├── MapLibrary/
    └── VERSION
```

### Why does the internal folder still say `Meggy`?

`Meggy/` is a **legacy technical path retained for data/import compatibility**. The public product name is **Ałek’ryŧhæ World Builder & Færa’Th**.

Some old internal identifiers such as `alekrythae.meggy` are also intentionally retained. Renaming them casually can break migration of older `.alekdata`/workspace data. Treat them as compatibility identifiers, not current product branding.

### Step 3: start the application

Double-click:

```text
Alekrythae.cmd
```

You can also open the `.alek` file directly when Windows has the Core association:

```text
Meggy/Alekrythae-World-Builder-FaeraTh.alek
```

### Step 4: open the Blue Moon gate

On startup you will see the Blue Moon opening screen.

- **Click the Blue Moon** to enter.
- `Esc` also continues past the opening screen.

### Step 5: press F1

Once inside, press:

```text
F1
```

This opens the built-in **Command Atlas / Shortcut Guide**. If you forget how a drawing tool or view works, F1 should be your first stop.

---

## 5. The most important key: F2

Press:

```text
F2
```

to open the main radial menu.

The outer ring contains:

- **AI**
- **Calendar**
- **CT** — Cartographer’s Table
- **Tide**
- **Lore**
- **Reverie**

The **Blue Moon in the center** opens the Focus Center.

The exit control closes the Ałek’ryŧhæ application layer.

`Esc` closes the radial menu or the currently active modal/action in most places.

---

## 6. Blue Moon / Focus Center

Open **F2**, then select the center Blue Moon.

The Focus Center includes:

- Pomodoro-style focus/break cycles;
- multi-set work flows;
- long break after the last set;
- stopwatch with lap support;
- countdown timer;
- selectable work systems;
- affirmation entries.

Current presets include:

- `25 / 5` Pomodoro;
- `50 / 10` Deep Work;
- `52 / 17`;
- `90 / 20`;
- a short **15-second Test** preset for verifying transitions.

The notification audio follows the work/break flow and the Harmonizer/Bard channel is temporarily paused while transition audio plays.

---

## 7. Calendar and notes

Choose **F2 → Calendar**.

The calendar uses the real-world date.

Basic flow:

1. click a day;
2. open/create a note for that day;
3. save it;
4. return to the same day later to review it.

The circular **Meggy** portrait in the Calendar is a retained in-app character/utility element. Clicking it opens **all calendar notes in chronological order**, from older to newer entries.

Deleting a note uses the application's confirmation/m seal flow before permanent removal.

Use **Today** to return the calendar to the current date.

---

## 8. Lore: structured knowledge archive

Choose **F2 → Lore**.

Lore is the hierarchical archive. It is useful for:

- world-building documentation;
- characters, locations, cultures and setting material;
- software/project notes;
- language study;
- research;
- personal knowledge bases.

A simple organization example:

```text
Lore Archive
├── World
│   ├── Regions
│   ├── Peoples
│   └── History
├── Software Notes
│   ├── C#
│   └── SQL
└── Languages
    ├── English
    └── German
```

Top-level and nested items can be managed from their context controls. The current UI intentionally keeps the root row clean: the item name and its `⋯` menu are the important controls rather than a visible item-count badge.

---

## 9. Reverie: writing and visual narrative

Choose **F2 → Reverie**.

Reverie is the long-form writing surface.

A Reverie entry can contain:

- title/date information;
- a cover image;
- written sections;
- images placed between text blocks;
- image scaling;
- left/center/right image positioning;
- a sealed/read-only style workflow where supported.

The image model is intentionally simple: **text flows above and below an image, not wrapped along its left and right sides**. After an image you can continue writing in the following text block.

This makes entries predictable and prevents complex word-processor layout behavior from damaging the writing flow.

---

## 10. Cartographer’s Table (CT)

Choose **F2 → CT**.

Cartographer’s Table is a **2D** visual workspace. It is not presented as a 3D CAD system.

Use it for:

- sketching;
- shapes and lines;
- diagrams;
- map-like planning;
- reference-image placement;
- visual organization.

### Essential CT controls

| Input | Action |
|---|---|
| Mouse wheel | Zoom the working surface |
| Middle mouse + drag | Pan around the surface |
| Alt + mouse wheel | Rotate the 2D CT surface |
| `R` | Add a pin at the pointer position |
| `F` | Add the selected library image at the pointer position |
| `Ctrl + Z` | Undo |
| `Ctrl + Shift + Z` or `Ctrl + Y` | Redo |
| `Shift` while resizing | Preserve image aspect ratio |
| `Shift` while rotating | Constrain rotation to whole-degree steps |

### Drawing palette

Press the physical key above `Tab` (`Backquote`, and supported keyboard equivalents) to open/close the Drawing Palette.

Inside drawing workflows:

| Input | Action |
|---|---|
| `Space` | Commit/move a selection or finish point-based drawing |
| `Delete` | Delete selected drawings/text |
| `Backspace` | Remove the last control point in a point-based drawing |
| Double-click | Finish point-based drawing |
| `Shift` | Apply square/circle/equal-side constraints where supported |
| `Esc` | Cancel the active drawing/selection |

If a shortcut is unclear, press **F1**. The in-app guide is the canonical shortcut reference for the build you are running.

---

## 11. Tide

Choose **F2 → Tide**.

Tide is the companion 2D connection/relationship surface. It shares parts of the visual workspace behavior with CT, including view navigation and undo/redo where applicable.

Because Tide is evolving alongside the rest of the workspace, use **F1** for the exact controls exposed by the current build instead of relying on an old screenshot or tutorial.

---

## 12. Harmonizer

Use the **♫** utility button in the top area.

Harmonizer manages the supported audio/atmosphere channels used by the workspace. It is deliberately integrated into the application instead of operating as a separate media player.

The Focus Center may temporarily pause an active Bard/Harmonizer channel while work/break notification audio is playing.

---

## 13. AI workspace

Choose **F2 → AI**.

The AI surface opens the ChatGPT workflow through the application's Core/Edge integration.

Important points:

- the public repository contains **no developer ChatGPT/OpenAI password**;
- it contains **no developer login session or authentication token**;
- it contains **no developer WebView2/Edge profile, cookies or browser history**;
- sign-in, if needed, is performed by the user on the user's own machine;
- F2 remains available while the AI surface is active, so you can switch to another application surface without first clicking outside the Edge area.

The repository is source code and application assets, not an account bundle.

---

## 14. Import and export

The top utility area contains:

- **↥ Export**
- **↧ Import**

Use them before moving to a new build or before making major changes to your workspace.

The preferred portable backup format is:

```text
.alekdata
```

Compatibility paths for older supported JSON/folder-based data may also be offered by the current build.

### Recommended backup habit

1. close any unfinished edit;
2. export an `.alekdata` backup;
3. store it outside the application folder;
4. only then replace/update the application files;
5. import the backup if migration is required.

Do **not** use GitHub as your save folder.

---

## 15. Where personal data goes

This public source package is intentionally clean.

It does not contain the developer's personal:

- calendar notes;
- Lore entries;
- Reverie entries;
- working saves/databases;
- private media;
- ChatGPT/Edge session;
- cookies/history/cache;
- credentials.

Runtime-generated data directories are excluded from Git tracking.

The repository currently retains paths such as:

```text
Meggy/Data/
Meggy/Games/
Meggy/MapLibrary/*
```

as ignored/runtime locations or compatibility paths.

Keep your own backups. This software is still in the `0.x` series and storage/migration behavior may evolve.

---

## 16. General shortcuts

| Shortcut | Action |
|---|---|
| `F1` | Open Command Atlas / shortcut guide |
| `F2` | Open the main radial menu |
| `F11` | Toggle true fullscreen in the Core window |
| `Ctrl + Mouse Wheel` | Change Ałek’ryŧhæ UI scale |
| `Alt + G` | Toggle the A̤ɐ͜ɨǣ́ꞎ͡ƣ image palette |
| `Ctrl + Shift + Esc` | Close only the Ałek’ryŧhæ UI layer, not the Core window |
| `Esc` | Cancel/close the active selection, dialog or operation |
| `Enter` / `Space` | Activate the focused button/option |

The in-app F1 guide takes precedence if a future version changes a shortcut.

---

## 17. Source structure

The application is intentionally split into an orchestrator, a legacy compatibility layer and smaller modules while migration/refactoring continues.

```text
Meggy/
├── Alekrythae-World-Builder-FaeraTh.alek
├── Alekrythae.App/
│   ├── manifest.json
│   ├── legacy/
│   │   └── legacy-app.js
│   └── modules/
│       ├── application/
│       └── world-map/
├── Assets/
├── MapLibrary/
└── VERSION
```

### Important for contributors/readers

`legacy-app.js` is large because it preserves the behavior of the working application while features are progressively extracted into modules.

Do not remove apparently old `Meggy`, Journey, Tavern or migration-related identifiers merely because the current product name changed. Some identifiers can still participate in backward compatibility, data parsing or dormant legacy flows.

A cleanup should be performed only after proving that the corresponding runtime/data path is no longer required.

---

## 18. Troubleshooting

### “Ałek’ryŧhæ Core registration could not be found”

Core is not installed/registered for the current Windows user. Install or run the compatible Core package first, then retry `Alekrythae.cmd`.

### The application starts but I only see the opening moon

Click the Blue Moon. `Esc` also continues through the opening screen.

### I do not know how to reach a feature

Press **F2**.

### I do not know a shortcut

Press **F1**.

### AI is empty or cannot open

Confirm that the compatible Core and Microsoft Edge/WebView2 environment are available. AI integration depends on Core/Edge behavior rather than a credential stored in this repository.

### I am about to update the source folder

Export an `.alekdata` backup first. Never assume an early `0.x` build will migrate every future schema automatically.

### I renamed the `Meggy/` folder and something stopped working

Restore the repository structure. That directory is currently retained as a legacy compatibility path even though the product's public name has changed.

---

## 19. Versioning

`v0.1.0` is the first public source release under the name:

**Ałek’ryŧhæ World Builder & Færa’Th**

The application is usable, but `0.x` means the technical contract is still allowed to evolve. Runtime compatibility, bridge operations, data schemas and internal module boundaries may change between releases.

---

## 20. License

Ałek’ryŧhæ World Builder & Færa’Th is **source-available proprietary software**. It is **not open-source software**.

It is distributed under:

**TheDEvorger UNIVERSAL PROPRIETARY SOFTWARE LICENSE — Version 1.3**  
SPDX: `LicenseRef-TheDEvorger-UPSL-1.3`

Read the complete terms in:

**[LICENSE.md](LICENSE.md)**

The source being visible on GitHub does not by itself grant unrestricted rights to redistribute, commercialize, create derivative products, train AI systems on the Covered Materials or create alternative `.alek` runtimes.

---

## 21. Third-party components

Third-party technologies remain governed by their own licenses. See:

**[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)**

---

## 22. Security

For security reporting, see:

**[SECURITY.md](SECURITY.md)**

---

## 23. Turkish documentation

Türkçe kullanım kılavuzu:

**[README_TR.md](README_TR.md)**

---

## Author

**TheDEvorger**

Licensing / legal contact:  
`TheDEvorger.alekrythae.dev@gmail.com`

---

<p align="center">
  <strong>Ałek’ryŧhæ World Builder & Færa’Th</strong><br>
  Build worlds. Structure knowledge. Write, draw, focus and keep the work local.
</p>
