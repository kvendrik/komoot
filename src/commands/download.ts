import { downloadGpx } from "../api.ts";
import { formatError, formatSuccess } from "../format.ts";

export async function download(opts: { tourId: string; out?: string }) {
  const email = process.env["KOMOOT_EMAIL"];
  const password = process.env["KOMOOT_PASSWORD"];

  if (!email || !password) {
    console.error(formatError("KOMOOT_EMAIL and KOMOOT_PASSWORD environment variables are required for GPX downloads."));
    process.exit(1);
  }

  try {
    const gpxData = await downloadGpx(opts.tourId, email, password);
    const outputPath = opts.out ?? `${opts.tourId}.gpx`;
    await Bun.write(outputPath, gpxData);
    console.log(formatSuccess(`GPX saved to ${outputPath}`));
  } catch (err) {
    console.error(formatError(err instanceof Error ? err.message : String(err)));
    process.exit(1);
  }
}
