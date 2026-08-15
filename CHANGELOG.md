# Changelog

## v0.1.1

Stability, performance, media-continuity and interface refinement release.

### Highlights
- Improved low-overhead Balanced rendering behavior and background resource handling.
- Indoor / Outdoor ambience now uses an internal 10-second image cadence with a permanent 5-second phase offset.
- Added periodic phase-drift correction so long-running ambience layers do not slowly synchronize.
- Ambience and Bard playback state is preserved across view changes, rendering-profile changes, minimize/focus transitions and normal application restarts.
- Bard library updates immediately after adding, removing or reordering tracks.
- Smoother Balanced ambience and Bard transitions without persistent blur/filter animation overhead.
- Simplified drawing palette and added the dedicated Ałek’ryŧhæ color-spectrum palette.
- Improved English UI coverage and bilingual Turkish/English affirmation presentation.
- Improved Cartographer’s Table map/card behavior and fantasy surface-generation profiles.
- GPU selection UI was simplified for the updated Ałek’ryŧhæ Core GPU-adapter workflow.

### Runtime requirement
- Ałek’ryŧhæ Core v0.1.2 or newer is recommended.
- Core is intentionally not bundled with the World Builder release package.

## v0.1.0

First public source release under the product name **Ałek’ryŧhæ World Builder & Færa’Th**.

### Highlights
- Product branding updated from the earlier Meggy working name.
- Ałek’ryŧhæ Core remains a separate runtime/repository.
- F2 radial workspace: AI, Calendar, Cartographer’s Table, Tide, Lore and Reverie.
- Blue Moon Focus Center with Pomodoro-style systems, stopwatch and timer.
- Harmonizer audio workspace.
- Local-first data workflow with portable `.alekdata` export/import.
- Public source package contains no developer saves, browser profile, cookies, sessions or credentials.
- English and Turkish user guides included.

### Compatibility note
The internal `Meggy/` directory, `alekrythae.meggy` application identifier and selected legacy data identifiers are intentionally retained where changing them could break older workspace/data migration. They are compatibility identifiers rather than the current public product name.
