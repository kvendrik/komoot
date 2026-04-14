# komoot

Discover cycling routes and download GPX files from Komoot, from your terminal.

I use this through my AI cycling coach on [Backoffice](https://github.com/kvendrik/backoffice) to plan routes for recommended cycling workouts.

## Install

```bash
bun install komoot
```

## Usage

### Search for routes

```bash
komoot search --location "Haarlem"
komoot search --lat 52.37 --lng 4.89 --sport mtb --limit 5
```

### Download a route as GPX

```bash
komoot download 1867482138 --out route.gpx
```

Requires `KOMOOT_EMAIL` and `KOMOOT_PASSWORD` environment variables.

### Options

| Option | Default | Description |
|---|---|---|
| `--location` | | City or place name |
| `--lat` / `--lng` | | Coordinates (alternative to --location) |
| `--radius` | `30000` | Search radius in meters |
| `--sport` | `racebike` | `racebike`, `touringbicycle`, `mtb`, `citybike`, `e_racebike` |
| `--limit` | `10` | Number of results |
| `--page` | `0` | Page number (0-based) |
