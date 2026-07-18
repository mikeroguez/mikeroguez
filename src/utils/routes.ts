import type { Locale } from '@/i18n';

type RouteKey =
  | 'home'
  | 'about'
  | 'work'
  | 'research'
  | 'blog'
  | 'contact'
  | 'privacy'
  | 'cookies'
  | 'license'
  | 'notFound';

const localizedRoutes: Record<RouteKey, Record<Locale, string>> = {
  home: { es: '/', en: '/home' },
  about: { es: '/sobre-mi', en: '/about' },
  work: { es: '/trabajo', en: '/work' },
  research: { es: '/investigacion', en: '/research' },
  blog: { es: '/publicaciones', en: '/blog' },
  contact: { es: '/contacto', en: '/contact' },
  privacy: { es: '/privacidad', en: '/privacy' },
  cookies: { es: '/aviso-de-cookies', en: '/cookies' },
  license: { es: '/licencia', en: '/license' },
  notFound: { es: '/404', en: '/not-found' },
};

const routeKeys = Object.keys(localizedRoutes) as RouteKey[];

export function localizedPath(pathOrKey: string, locale: Locale): string {
  const key = routeKeyFromPath(pathOrKey) ?? routeKeyFromValue(pathOrKey);
  if (key) return localizedRoutes[key][locale];
  return pathOrKey;
}

export function localizedRoute(key: RouteKey, locale: Locale): string {
  return localizedRoutes[key][locale];
}

export function alternatePathsFor(pathOrKey: string): Record<Locale, string> {
  const key = routeKeyFromPath(pathOrKey) ?? routeKeyFromValue(pathOrKey);
  if (!key) return { es: pathOrKey, en: pathOrKey };
  return localizedRoutes[key];
}

export function pathLocale(path: string): Locale | undefined {
  const match = routeKeys.find((key) =>
    (Object.values(localizedRoutes[key]) as string[]).includes(path),
  );
  if (!match) return undefined;
  return localizedRoutes[match].en === path ? 'en' : 'es';
}

function routeKeyFromValue(value: string): RouteKey | undefined {
  return routeKeys.find((key) => key === value);
}

function routeKeyFromPath(path: string): RouteKey | undefined {
  return routeKeys.find((key) => (Object.values(localizedRoutes[key]) as string[]).includes(path));
}
