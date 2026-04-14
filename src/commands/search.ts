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
      console.log(chalk.dim(`Searching near ${geo.displayName}\n`));
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
      console.log(chalk.yellow("No routes found."));
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
