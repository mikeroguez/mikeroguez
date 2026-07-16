import type { Publication } from '@/types/research';

import { researchPublications } from '@/content/generated/research-publications';

export function getPublishedPublications(): Publication[] {
  return researchPublications.filter((p) => p.status === 'published');
}
