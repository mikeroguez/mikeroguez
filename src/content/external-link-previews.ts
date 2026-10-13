export interface ExternalLinkPreview {
  title: string;
  meta: string;
}

/**
 * Editorially verified metadata for recurring external resources. URLs not
 * listed here receive a neutral domain-only preview rather than scraped data.
 */
export const externalLinkPreviews: Record<string, ExternalLinkPreview> = {
  'https://doi.org/10.3390/app16199865': {
    title:
      'Beyond Grades: Temporal Validation of a Multi-Output Model for Formative Academic Indicators in a Latin American Public University',
    meta: 'Applied Sciences · 2026',
  },
  'https://doi.org/10.3390/app15158679': {
    title:
      'Machine Learning and Generative AI in Learning Analytics for Higher Education: A Systematic Review of Models, Trends, and Challenges',
    meta: 'Applied Sciences · 2025',
  },
  'https://doi.org/10.20944/preprints202607.0546.v1': {
    title: 'Beyond Grades: Multi-Target Deep Learning for Early Academic Risk Detection',
    meta: 'Preprint · 2026',
  },
};
