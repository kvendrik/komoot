import type { NominatimResult, KomootDiscoverResponse } from "./types.ts";

const DISCOVER_URL = "https://api.komoot.de/v007/discover_tours/from_location/";
const GPX_URL = "https://external-api.komoot.de/v007/tours";
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

const HEADERS = {
  "Accept": "application/hal+json",
  "User-Agent": "Mozilla/5.0 (compatible; komoot-cli/0.1.0)",
};

export async function geocode(location: string): Promise<{ lat: number; lng: number; displayName: string }> {
  const params = new URLSearchParams({
    q: location,
    format: "json",
    limit: "1",
  });

  const res = await fetch(`${NOMINATIM_URL}?${params}`, {
    headers: { "User-Agent": "komoot-cli/0.1.0" },
  });

  if (!res.ok) {
    throw new Error(`Geocoding failed: ${res.status} ${res.statusText}`);
  }

  const results: NominatimResult[] = await res.json();
  if (results.length === 0) {
    throw new Error(`No results found for location "${location}"`);
  }

  const result = results[0]!;
  return {
    lat: parseFloat(result.lat),
    lng: parseFloat(result.lon),
    displayName: result.display_name,
  };
}

export async function discoverTours(opts: {
  lat: number;
  lng: number;
  radius: number;
  sport: string;
  limit: number;
  page: number;
}): Promise<KomootDiscoverResponse> {
  const params = new URLSearchParams({
    sport: opts.sport,
    lat: opts.lat.toString(),
    lng: opts.lng.toString(),
    max_distance: opts.radius.toString(),
    page: opts.page.toString(),
    limit: opts.limit.toString(),
    score: "relevance",
    include_main_tours: "true",
    collection_format: "v007",
  });

  const url = `${DISCOVER_URL}?${params}`;
  const res = await fetch(url, { headers: HEADERS });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Komoot API error: ${res.status} ${res.statusText}\n${body}`);
  }

  return res.json();
}

export async function downloadGpx(tourId: string, email: string, password: string): Promise<ArrayBuffer> {
  const res = await fetch(`${GPX_URL}/${tourId}.gpx`, {
    headers: {
      Authorization: "Basic " + btoa(`${email}:${password}`),
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GPX download failed: ${res.status} ${res.statusText}\n${body}`);
  }

  return res.arrayBuffer();
}
