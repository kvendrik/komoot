# komoot — Agent Instructions

You have access to a CLI tool called `komoot` that can search for cycling routes on Komoot and download GPX files. Run it with `bunx komoot` — no install needed.

## Commands

### Search for routes

```bash
bunx komoot search --location "Haarlem" [--radius 30000] [--sport racebike] [--limit 10] [--page 0]
```

Or search by coordinates:

```bash
bunx komoot search --lat 52.37 --lng 4.89
```

- `--location`: city or place name (geocoded via OpenStreetMap)
- `--lat` / `--lng`: coordinates (use instead of --location)
- `--radius`: search radius in meters (default: 30000)
- `--sport`: sport type — `racebike`, `touringbicycle`, `mtb`, `citybike`, `e_racebike` (default: racebike)
- `--limit`: number of results (default: 10)
- `--page`: page number, 0-based (default: 0)

Returns route details: name, distance (km), elevation gain (m), duration (min), difficulty, and a direct link to the route on Komoot.

### Download a route as GPX

```bash
bunx komoot download <tour-id> [--out /path/to/file.gpx]
```

- `<tour-id>`: the Komoot tour ID from search results
- `--out`: output file path (default: `<tour-id>.gpx`)

Requires `KOMOOT_EMAIL` and `KOMOOT_PASSWORD` environment variables for authentication.

## Typical workflow

1. Run `bunx komoot search --location "Amsterdam"` to find routes near a location
2. Browse results, use `--page` to paginate
3. Run `bunx komoot download <tour-id>` to save a route as GPX

## Notes

- Search does not require authentication — it uses Komoot's public discover API.
- GPX downloads require Komoot credentials stored as env vars (`KOMOOT_EMAIL`, `KOMOOT_PASSWORD`).
- Sport types: `racebike`, `touringbicycle`, `mtb`, `citybike`, `e_racebike`.
