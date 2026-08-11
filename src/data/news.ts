/**
 * Short dated updates rendered on the home page ("News" section).
 * List most recent first.
 */

export interface NewsItem {
  date: string;
  text: string;
}

export const news: NewsItem[] = [
  {
    date: '2026-02',
    text:
      'PhD thesis submitted: "Conversion electron and gamma-ray spectroscopy of $^{250}$Fm" (University of Liverpool).',
  },
  {
    date: '2026-01',
    text:
      'New paper accepted in European Physical Journal A: "The Advanced Plunger-Particle detector Array — APPA".',
  },
  {
    date: '2025-10',
    text:
      'Appointed Honorary Research Fellow at the University of Liverpool, continuing the doctoral work and the LBNL collaboration.',
  },
  {
    date: '2025-08',
    text:
      'Finished a 12-month residency at the University of Jyväskylä under the STFC Long-Term Attachment Grant.',
  },
  {
    date: '2025-02',
    text:
      'Paper published in Communications Physics: "Direct Measurement of Three Different Deformations Near the Ground State in an Atomic Nucleus".',
  },
  {
    date: '2024-10',
    text:
      'Paper published in Physical Review Letters: "Toward the Discovery of New Elements: Production of Livermorium (Z=116) with $^{50}$Ti".',
  },
];