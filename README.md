# komoot

Discover cycling routes and download GPX files from Komoot, from your terminal.

I use this through my AI cycling coach on [Backoffice](https://github.com/kvendrik/backoffice) to plan routes for recommended cycling workouts.

Designed for use with AI agents — see [AGENT.md](AGENT.md) for agent instructions.

## Usage

### Search for routes

```bash
bunx komoot search --location "Haarlem"
bunx komoot search --lat 52.37 --lng 4.89 --sport mtb --limit 5
```

### Download a route as GPX

```bash
bunx komoot download 1867482138 --out route.gpx
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
