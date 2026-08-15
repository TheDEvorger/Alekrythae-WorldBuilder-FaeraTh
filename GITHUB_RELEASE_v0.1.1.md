# Ałek’ryŧhæ World Builder & Færa’Th v0.1.1 🌙

Ałek’ryŧhæ World Builder & Færa’Th v0.1.1 is a substantial refinement release over v0.1.0, focused on smoother media behavior, lower idle resource use, stronger session continuity, cleaner interaction design and better compatibility with the updated Ałek’ryŧhæ Core.

## ✨ Highlights

### 🌌 Ambience timing & phase stability
- Indoor and Outdoor image layers now use an internal **10-second image cadence**.
- Outdoor stays **5 seconds out of phase** with Indoor so both layers do not normally crossfade at the same instant.
- A lightweight phase watchdog periodically checks timing drift and realigns the next image boundary when necessary.
- This prevents small loading or resume delays from accumulating over long sessions.

### 🎵 Bard improvements
- Bard now refreshes its library immediately after tracks are added, removed or reordered.
- Track counts and the visible list no longer require reopening the Bard view.
- Balanced mode uses smoother fade-out / fade-in transitions between tracks.
- Playback position is preserved more reliably across normal application lifecycle changes.

### 🔄 Media continuity
Ambience and Bard are treated as persistent runtime streams rather than temporary view state.

The current media position is preserved across:
- rendering-profile changes;
- GPU preference changes;
- switching to another application;
- minimize / restore;
- normal application close and reopen.

Changing a rendering or GPU setting should not rewind the user's ambience or music queue.

### ⚡ Performance refinements
- Reduced unnecessary rendering work while the application is inactive.
- Balanced transitions remain visually smooth without persistent blur/filter animation overhead.
- Temporary compositor hints are released after crossfades so the GPU can return to idle.
- Indoor and Outdoor transition timing is staggered to reduce simultaneous full-screen compositing work.

### 🎨 Drawing & color workflow
- Simplified the Drawing Palette so tool selection remains compact.
- Added a dedicated Ałek’ryŧhæ color-spectrum palette.
- The palette moves vertically through the color spectrum and horizontally from white through the selected hue to black.
- Removed redundant palette controls from the Cartographer’s Table toolbar.

### 🗺️ World-building refinements
- Improved Cartographer’s Table map and card behavior.
- Expanded internal fantasy-oriented surface generation profiles.
- Non-Being entity cards continue to use the same canonical Character-card template while retaining their own entity type labels.

### 🌐 Interface refinements
- Expanded English UI coverage.
- Focus Center affirmations can be presented in separate stacked Turkish and English fields.
- Various labels, controls and workspace behaviors were simplified for everyday use as well as world-building.

### 🎮 Updated Core integration
The GPU interface is designed for the newer adapter-based GPU selection workflow in Ałek’ryŧhæ Core.

Instead of exposing abstract High Performance / Low Performance choices, compatible Core versions can expose detected Windows graphics adapters directly.

## 📦 Runtime requirement

**Ałek’ryŧhæ Core v0.1.2 or newer is recommended.**

Core is intentionally maintained as a separate runtime and is **not bundled** inside the World Builder release archive.

## 🔁 Updating from v0.1.0

Existing local workspace data is intended to remain compatible. Internal compatibility identifiers such as the legacy `Meggy/` path and `alekrythae.meggy` application ID are intentionally retained where renaming them could break older data migration.

For normal use, download the attached **NoCore** Windows application package and run it with a compatible Ałek’ryŧhæ Core installation.

---

**Version:** v0.1.1  
**Platform:** Windows 10 / 11  
**Recommended runtime:** Ałek’ryŧhæ Core v0.1.2+  
**Package type:** NoCore / `.alek` application
