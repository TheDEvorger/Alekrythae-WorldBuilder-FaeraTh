# Public release data audit

This public source package was prepared without developer/user runtime data.

Excluded classes include application save/registry SQLite files, personal workspace folders, private user media, Core WebView profiles, cache/session/history/cookie data, credentials and runtime logs.

`Meggy/Data/` and `Meggy/Games/` are runtime/legacy paths and are not shipped with personal records. `Meggy/MapLibrary/` contains only its repository placeholder in the clean source package.

The `Meggy/` directory name itself is retained for migration compatibility and does not represent the current public product name.
