export const SITE_URL = 'https://mikeroguez.me';
export const SITE_NAME = 'Mikeroguez';
export const SITE_AUTHOR = 'Miguel Ángel Rodríguez Ortiz';
export const SOCIAL_IMAGE_PATH = '/social/mikeroguez-card.jpg';

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}
