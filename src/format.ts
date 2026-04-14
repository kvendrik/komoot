import chalk from "chalk";
import type { KomootTour } from "./types.ts";

export function formatTour(tour: KomootTour, index: number): string {
  const lines: string[] = [];

  const tourId = tour.id.replace(/^e/, "");
  const name = chalk.bold.cyan(tour.name);
  const id = chalk.dim(`(${tourId})`);
  lines.push(`${chalk.white.bold(`${index + 1}.`)} ${name} ${id}`);

  const distance = (tour.distance / 1000).toFixed(1);
  const elevation = Math.round(tour.elevation_up);
  const duration = Math.round(tour.duration / 60);
  const difficulty = tour.difficulty?.grade ?? "unknown";

  const stats = [
    `${distance} km`,
    `${elevation} m elevation`,
    `${duration} min`,
    `difficulty: ${difficulty}`,
  ].join("  ·  ");
  lines.push(`   ${chalk.dim(stats)}`);

  const url = `https://www.komoot.com/tour/${tourId}`;
  lines.push(`   ${chalk.blue(url)}`);

  return lines.join("\n");
}

export function formatTourList(tours: KomootTour[]): string {
  return tours.map((tour, i) => formatTour(tour, i)).join("\n\n");
}

export function formatPageInfo(page: { number: number; totalPages: number; totalElements: number }): string {
  return chalk.dim(`Page ${page.number + 1} of ${page.totalPages} (${page.totalElements} total routes)`);
}

export function formatError(message: string): string {
  return chalk.red(`Error: ${message}`);
}

export function formatSuccess(message: string): string {
  return chalk.green(message);
}
