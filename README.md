# 🚴‍♂️ komoot

Discover cycling routes and download GPX files from [Komoot](https://komoot.com/), from your terminal.

Designed for use with AI agents — see [AGENT.md](AGENT.md) for agent instructions.

> I use this through my AI cycling coach on [Backoffice](https://github.com/kvendrik/backoffice) to plan routes for recommended cycling workouts.

## Usage

### Search for routes

```bash
$ bunx komoot search --location "Amsterdam" --sport racebike --limit 5

Searching near Amsterdam, Noord-Holland, Nederland

1. Around Waterland from Amsterdam CS (1867432235)
   45.1 km  ·  69 m elevation  ·  114 min  ·  difficulty: difficult
   https://www.komoot.com/tour/1867432235

2. Hoge Duin en Daalseweg Climb – Spaarndammerdijk loop from Europaplein (28075115)
   99.9 km  ·  217 m elevation  ·  251 min  ·  difficulty: moderate
   https://www.komoot.com/tour/28075115

3. Windmill on the Amstel – Sunrise Over the Amstel loop from Amsterdam Zuid (15229918)
   56.7 km  ·  103 m elevation  ·  144 min  ·  difficulty: moderate
   https://www.komoot.com/tour/15229918

4. Spaardammerdijk – Spaarndammerdijk loop from Jan van Galenstraat (39020274)
   53.9 km  ·  128 m elevation  ·  133 min  ·  difficulty: moderate
   https://www.komoot.com/tour/39020274

5. Windmill on the Amstel – Sunrise Over the Amstel loop from Rokin (39048613)
   47.4 km  ·  80 m elevation  ·  121 min  ·  difficulty: moderate
   https://www.komoot.com/tour/39048613

Page 1 of 60 (296 total routes)
```

### Download a route as GPX

Use the tour ID from the search results to download a GPX file:

```bash
bunx komoot download 1867432235 --out route.gpx
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
| `--json` | | Output as JSON |
