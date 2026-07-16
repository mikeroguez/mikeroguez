export type PublicationType = 'journal' | 'conference' | 'chapter' | 'thesis' | 'report';
export type PublicationStatus = 'draft' | 'published';

export interface Publication {
  slug: string;
  title: string;
  year: string;
  type: PublicationType;
  venue?: string;
  doi?: string;
  url?: string;
  description: string;
  descriptionEn?: string;
  status: PublicationStatus;
  searchText: string;
}
