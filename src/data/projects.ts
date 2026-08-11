/**
 * Project showcases rendered on the /projects page.
 * Each card links out to its GitHub repo and to a paper / write-up where
 * one exists. Keep descriptions tight — these are summaries, not docs.
 */

export interface Project {
  /** Folder-safe id used as the DOM id and for ordering. */
  id: string;
  /** Short title shown in the card heading. */
  title: string;
  /** One-line tagline under the title. */
  tagline: string;
  /** 2–4 sentence summary of what the project does and why it exists. */
  summary: string;
  /** Primary GitHub link (or external landing page). */
  repoUrl: string;
  /** Optional paper / preprint / write-up URL. */
  paperUrl?: string;
  /** Optional short note describing status (e.g. "Deployed at JYFL"). */
  status?: string;
  /** Role on the project. */
  role: string;
  /** Free-form tags rendered as chips. */
  keywords: string[];
}

export const projects: Project[] = [
  {
    id: 'alpha-pinn',
    title: 'α-PINN',
    tagline:
      'Physics-Informed Neural Network for α-decay half-lives and hindrance factors.',
    summary:
      'Combines a semiclassical Superfluid Tunneling Model (Clark & Rudolph PRC 107, 034321) ' +
      'with a PINN to predict α-decay half-lives from nuclear structure data. The macroscopic ' +
      'tunnelling amplitude spans ~20 orders of magnitude; the microscopic correction (~3–4 orders) ' +
      'is what the network is meant to learn. Trained on the ENSDF-derived α-decay dataset and ' +
      'Möller mass-table prescriptions.',
    repoUrl: 'https://github.com/JChads4/alpha_PINN',
    status: 'In development',
    role: 'Author',
    keywords: ['PyTorch', 'ENSDF', 'PINN', 'STM'],
  },
  {
    id: 'epic',
    title: 'EPIC',
    tagline:
      'Electron and Photon Intensity Calculator for conversion-electron spectroscopy.',
    summary:
      'Combined conversion-electron and γ-ray spectroscopy framework. Predicts the expected ' +
      'conversion-electron spectrum from theoretical internal conversion coefficients (BrIcc) and ' +
      'fits the experimental electron data. YAML-driven with a Streamlit dashboard; used in the ' +
      'analysis of conversion-electron data from the SAGE spectrometer at JYFL.',
    repoUrl: 'https://github.com/JChads4/EPIC',
    status: 'Active',
    role: 'Author',
    keywords: ['Python', 'BrIcc', 'Streamlit', 'conversion electrons'],
  },
  {
    id: 'patron',
    title: 'PATRON',
    tagline:
      'Monte Carlo simulation of coupled rotational bands in transfermium nuclei.',
    summary:
      'Simulates the stochastic side-feeding and decay cascade of millions of nuclei down a ' +
      'rotational band, interfaces directly to NNDC BrIcc for internal conversion coefficients, ' +
      'and overlays the resulting spectra on real experimental data. Used in the published work ' +
      'on $^{254}$No and $^{250}$Fm ground-state and isomeric decays.',
    repoUrl: 'https://github.com/JChads4/PATRON',
    status: 'Active',
    role: 'Author',
    keywords: ['Python', 'Plotly', 'BrIcc', 'rotational bands'],
  },
  {
    id: 'ppac-code',
    title: 'ppac_code / shrec_analysis',
    tagline:
      'Multi-threaded pipeline for the SHREC experiment and PPAC detector at LBNL.',
    summary:
      'Polars + Parquet pipeline for sorting and correlating events from the Berkeley-aligned ' +
      'focal-plane detector system. Implements adjacency clustering, energy averaging, and ' +
      'N-step inclusive correlation (RA, RAA, REA, …) with strict 1-to-1 matching to suppress ' +
      'statistical ghosts. Produces the experiment-wide master files for the SHREC program.',
    repoUrl: 'https://github.com/JChads4/ppac_code',
    status: 'In preparation',
    role: 'Lead author',
    keywords: ['Polars', 'Parquet', 'PPAC', 'SHREC'],
  },
  {
    id: 'phd-thesis',
    title: 'PhD thesis — $^{250}$Fm spectroscopy',
    tagline:
      'Conversion-electron and γ-ray spectroscopy of $^{250}$Fm at the SAGE spectrometer.',
    summary:
      'Doctoral thesis combining in-beam γ-ray and conversion-electron spectroscopy with ' +
      'recoil-decay tagging and Geant4 detector-response modelling to characterize the ' +
      'ground-state band and the K-isomer in $^{250}$Fm. Includes the analysis tooling (EPIC, ' +
      'PATRON, Geant4 simulations) and the experimental campaigns at JYFL and LBNL.',
    repoUrl: 'https://github.com/JChads4',
    status: 'Submitted Feb 2026',
    role: 'Author',
    keywords: ['$^{250}$Fm', 'SAGE', 'K-isomer', 'JYU / LBNL'],
  },
];