import { geocode, discoverTours } from "../api.ts";
import { formatTourList, formatPageInfo, formatError } from "../format.ts";
import chalk from "chalk";

export async function search(opts: {
  location?: string;
  lat?: number;
  lng?: number;
  radius: number;
  sport: string;
  limit: number;
  page: number;
  json?: boolean;
}) {
  try {
    let lat: number;
    let lng: number;

    if (opts.lat !== undefined && opts.lng !== undefined) {
      lat = opts.lat;
      lng = opts.lng;
    } else if (opts.location) {
      const geo = await geocode(opts.location);
      lat = geo.lat;
      lng = geo.lng;
      if (!opts.json) console.log(chalk.dim(`Searching near ${geo.displayName}\n`));
    } else {
      console.error(formatError("Provide --location or both --lat and --lng"));
      process.exit(1);
    }

    const result = await discoverTours({
      lat,
      lng,
      radius: opts.radius,
      sport: opts.sport,
      limit: opts.limit,
      page: opts.page,
    });

    const tours = result._embedded?.items;
    if (!tours || tours.length === 0) {
      if (opts.json) {
        console.log(JSON.stringify({ tours: [], page: result.page }));
      } else {
        console.log(chalk.yellow("No routes found."));
      }
      return;
    }

    if (opts.json) {
      console.log(JSON.stringify({
        tours: tours.map((t) => ({
          id: t.id.replace(/^e/, ""),
          name: t.name,
          distance_km: +(t.distance / 1000).toFixed(1),
          elevation_up_m: Math.round(t.elevation_up),
          elevation_down_m: Math.round(t.elevation_down),
          duration_min: Math.round(t.duration / 60),
          difficulty: t.difficulty?.grade ?? "unknown",
          sport: t.sport,
          url: `https://www.komoot.com/tour/${t.id.replace(/^e/, "")}`,
        })),
        page: result.page,
      }));
      return;
    }

    console.log(formatTourList(tours));
    console.log();
    console.log(formatPageInfo(result.page));
  } catch (err) {
    console.error(formatError(err instanceof Error ? err.message : String(err)));
    process.exit(1);
  }
}
