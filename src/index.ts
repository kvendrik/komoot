#!/usr/bin/env bun

import { Command } from "commander";
import { search } from "./commands/search.ts";
import { download } from "./commands/download.ts";

const pkg = await Bun.file(new URL("../package.json", import.meta.url)).json();
const program = new Command();

program
  .name("komoot")
  .description("Discover cycling routes and download GPX files from Komoot")
  .version(pkg.version);

program
  .command("search")
  .description("Search for cycling routes by location or coordinates")
  .option("--location <name>", "Location name (e.g. \"Haarlem\")")
  .option("--lat <n>", "Latitude", parseFloat)
  .option("--lng <n>", "Longitude", parseFloat)
  .option("--radius <m>", "Search radius in meters", (v) => parseInt(v, 10), 30000)
  .option("--sport <type>", "Sport type (racebike, touringbicycle, mtb, citybike, e_racebike)", "racebike")
  .option("--limit <n>", "Number of results", (v) => parseInt(v, 10), 10)
  .option("--page <n>", "Page number (0-based)", (v) => parseInt(v, 10), 0)
  .option("--json", "Output as JSON")
  .action(async (opts: { location?: string; lat?: number; lng?: number; radius: number; sport: string; limit: number; page: number; json?: boolean }) => {
    await search(opts);
  });

program
  .command("download")
  .description("Download a route as a GPX file")
  .argument("<tour-id>", "Komoot tour ID")
  .option("--out <path>", "Output file path (default: <tour-id>.gpx)")
  .action(async (tourId: string, opts: { out?: string }) => {
    await download({ tourId, ...opts });
  });

program.parse();
