/**
 * Structured CV content rendered by the /cv page.
 *
 * Entries render in the order listed — keep each array most-recent-first.
 */

interface CvEntry {
  title: string;
  where?: string;
  date: string;
  detail?: string;
}

interface CvSection {
  title: string;
  entries: CvEntry[];
}

const summary =
  'Experimental nuclear physicist working on heavy and superheavy element spectroscopy. ' +
  'My PhD combined in-beam γ-ray, conversion-electron, and recoil-decay-tagging ' +
  'techniques at the University of Jyväskylä and Lawrence Berkeley National ' +
  'Laboratory, with a focus on the rotational structure of transfermium nuclei and ' +
  'the development of detector and analysis infrastructure for the next generation ' +
  'of superheavy element experiments. I now hold an Honorary Research Fellowship ' +
  'at the University of Liverpool and continue collaborative analysis with LBNL.';

const education: CvEntry[] = [
  {
    title: 'PhD in Experimental Nuclear Physics',
    where: 'University of Liverpool, UK',
    date: 'Oct 2021 – Feb 2026',
    detail:
      'Thesis: "Conversion electron and gamma-ray spectroscopy of $^{250}$Fm". ' +
      'Conversion-electron and γ-ray spectroscopy of $^{250}$Fm at the SAGE ' +
      'spectrometer (JYFL), combining recoil-decay tagging with Geant4 detector ' +
      'response modelling.',
  },
  {
    title: 'MPhys in Physics (First Class Honours)',
    where: 'University of Liverpool, UK',
    date: 'Jul 2021',
    detail:
      'MPhys project: "Investigating single-proton orbitals in nearly magic nuclei".',
  },
];

const positions: CvEntry[] = [
  {
    title: 'Honorary Research Fellow',
    where: 'University of Liverpool, UK',
    date: 'Oct 2025 – present',
    detail:
      'Completing publications from doctoral research and continuing ' +
      'collaborative analysis with LBNL.',
  },
  {
    title: 'Research Collaborator',
    where: 'Lawrence Berkeley National Laboratory, USA',
    date: 'Mar 2023 – present',
    detail:
      'Member of the Heavy Element Group at the 88-Inch Cyclotron. Led the ' +
      'construction and commissioning of a PPAC detector for the Berkeley ' +
      'Gas-filled Separator and the forthcoming on-beam publication.',
  },
  {
    title: 'PhD Researcher',
    where: 'University of Liverpool, UK',
    date: 'Oct 2021 – Feb 2026',
    detail:
      'In-beam and decay spectroscopy of heavy and superheavy elements in ' +
      'collaboration with the University of Jyväskylä and LBNL. Specialised in ' +
      'conversion-electron and γ-ray techniques for fusion-evaporation and ' +
      'transfer reaction experiments, with Geant4 modelling and open-source ' +
      'analysis tools.',
  },
  {
    title: 'Visiting Doctoral Researcher',
    where: 'University of Jyväskylä, Finland',
    date: 'Sep 2023 – Aug 2024',
    detail:
      'STFC Long-Term Attachment Grant residency. Served as Local Liaison for ' +
      'international experiments, operated and maintained HPGe and silicon ' +
      'detector arrays and the digital DAQ systems, and developed sorting codes ' +
      'for real-time and offline analysis.',
  },
];

const awards: CvEntry[] = [
  {
    title: 'Honorary Research Fellowship',
    where: 'University of Liverpool',
    date: '2025 – present',
  },
  {
    title: 'STFC Long-Term Attachment Grant',
    where: 'Science and Technology Facilities Council',
    date: '2023 – 2024',
    detail:
      '10-month residency at the Accelerator Laboratory of the University of ' +
      'Jyväskylä to operate and develop instrumentation for the SAGE spectrometer.',
  },
  {
    title: 'STFC Doctoral Training Studentship',
    where: 'Science and Technology Facilities Council',
    date: '2021 – 2025',
    detail: 'Full PhD funding.',
  },
];

const teaching: CvEntry[] = [
  {
    title: 'Senior Lab Coach & Undergraduate Laboratory Instructor',
    where: 'University of Liverpool',
    date: '2021 – 2025',
    detail:
      'Led weekly lab sessions for 20+ students. Delivered instruction in ' +
      'Python-based data analysis and scientific writing. Progressed to Senior ' +
      'Lab Coach, supervising junior TAs and reviewing their lesson plans.',
  },
];

const presentations: CvEntry[] = [
  {
    title: 'Invited seminars',
    where: 'LBNL Nuclear Physics Symposium; University of Jyväskylä',
    date: '2024; 2023',
  },
  {
    title: 'Contributed talks',
    where:
      'IOP Nuclear Physics Conference (2023, 2025); STFC Summer School (2024); ' +
      'UK ECR Workshop (2025); Mazurian Lakes Conference (2023)',
    date: '2023 – 2025',
  },
];

const software: CvEntry[] = [
  {
    title: 'PATRON — Program for the Analysis of Transfermium ROtational Nuclei',
    where: 'github.com/JChads4/PATRON',
    date: 'Active',
    detail:
      'Monte Carlo simulation of coupled rotational bands with detector-response ' +
      'modelling. Streamlit front-end; interfaces directly to the NNDC BrIcc tool ' +
      'for internal conversion coefficients.',
  },
  {
    title: 'EPIC — Electron and Photon Intensity Calculator',
    where: 'github.com/JChads4/EPIC',
    date: 'Active',
    detail:
      'Combined conversion-electron and γ-ray spectroscopy analysis framework. ' +
      'Predicts the conversion-electron spectrum from BrIcc-derived ICCs and ' +
      'fits the experimental electron data; YAML-driven, with a Streamlit UI.',
  },
  {
    title: 'shrec_analysis',
    where: 'github.com/JChads4/ppac_code',
    date: 'Active',
    detail:
      'Multi-threaded Polars/Parquet pipeline for the SHREC experiment and PPAC ' +
      'focal-plane detector at LBNL. Implements Berkeley-aligned adjacency ' +
      'clustering, energy averaging, and N-step inclusive correlation.',
  },
  {
    title: 'EffWizard',
    where: 'github.com/JChads4/EffWizard',
    date: 'Deployed at JYFL',
    detail:
      'Automated HPGe efficiency calculator used at the University of Jyväskylä.',
  },
  {
    title: 'AddbackSimulator',
    where: 'github.com/JChads4/AddbackSimulator',
    date: 'Released',
    detail:
      'Simulation of γ-ray add-back in segmented HPGe arrays.',
  },
  {
    title: 'Digital signal processing',
    where: 'github.com/JChads4/Digital-signal-processing',
    date: 'Released',
    detail:
      'Modelled signal formation in HPGe detectors and preamplifiers.',
  },
];

const skills: string[] = [
  // Methods & instrumentation
  'Conversion-electron spectroscopy',
  'In-beam γ-ray spectroscopy',
  'Recoil-decay tagging',
  'HPGe detector arrays (JUROGAMI 3, SAGE)',
  'Position-sensitive avalanche counters (PPAC)',
  'Geant4 simulation',
  'Monte Carlo detector response',
  // Software
  'Python (proficient)',
  'C++',
  'Java',
  'Bash',
  'ROOT',
  'Geant4',
  'Git / Linux',
  // Analysis tools
  'BrIcc / ENSDF nuclear-data libraries',
  'Streamlit dashboards',
  'Polars / Parquet pipelines',
  'PyTorch',
  // Writing
  'LaTeX',
];

export const cv = {
  summary,
  sections: [
    { title: 'Research positions', entries: positions },
    { title: 'Education', entries: education },
    { title: 'Grants & awards', entries: awards },
    { title: 'Teaching', entries: teaching },
    { title: 'Selected presentations', entries: presentations },
    { title: 'Open-source software', entries: software },
    { title: 'Service & peer review', entries: [] satisfies CvEntry[] },
  ],
  skills,
} satisfies { summary: string; sections: CvSection[]; skills: string[] };