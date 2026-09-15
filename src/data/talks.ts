/**
 * Talks — one entry per talk, for the front-page "Invited talks" block.
 *
 * The CV records presentations as two coarse rows ("Invited seminars",
 * "Contributed talks") whose `where` holds a semicolon-separated venue list and
 * whose `date` holds several years at once, so it cannot drive a per-talk list.
 * The entries below are that data split up.
 *
 * Talk titles are left unset rather than invented: the CV never recorded them.
 * The block falls back to the venue, and a title can be filled in here when it
 * is known. `year` is a number for ordering, mirroring `publications.year`,
 * while `date` is the display string.
 */
export interface Talk {
  /** Talk title, where we have one. Absent for the entries seeded from the CV. */
  title?: string;
  venue: string;
  /** Calendar year, used for ordering. */
  year: number;
  /** Display string, e.g. '2024' or 'Jun 2024'. */
  date: string;
  kind: 'invited' | 'contributed';
  url?: string;
}

export const talks: Talk[] = [
  // Invited seminars
  {
    venue: 'LBNL Nuclear Physics Symposium',
    year: 2024,
    date: '2024',
    kind: 'invited',
  },
  {
    venue: 'University of Jyväskylä',
    year: 2023,
    date: '2023',
    kind: 'invited',
  },

  // Contributed talks
  {
    venue: 'IOP Nuclear Physics Conference',
    year: 2025,
    date: '2025',
    kind: 'contributed',
  },
  {
    venue: 'UK ECR Workshop',
    year: 2025,
    date: '2025',
    kind: 'contributed',
  },
  {
    venue: 'STFC Summer School',
    year: 2024,
    date: '2024',
    kind: 'contributed',
  },
  {
    venue: 'IOP Nuclear Physics Conference',
    year: 2023,
    date: '2023',
    kind: 'contributed',
  },
  {
    venue: 'Mazurian Lakes Conference',
    year: 2023,
    date: '2023',
    kind: 'contributed',
  },
];
