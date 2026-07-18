import { readonly, ref } from 'vue';

import en from './en';
import es from './es';

export type Locale = 'es' | 'en';

export interface Messages {
  lang: { code: string; toggleLabel: string };
  a11y: {
    homeLink: string;
    menuLabel: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    breadcrumbNav: string;
    openNewTab: string;
    footerNav: string;
    skipLink: string;
  };
  nav: {
    home: string;
    about: string;
    work: string;
    research: string;
    blog: string;
    contact: string;
  };
  footer: {
    tagline: string;
    siteHeading: string;
    resourcesHeading: string;
    socialHeading: string;
    repositoryLabel: string;
    cookiePreferences: string;
    privacyLabel: string;
    cookiesLabel: string;
    licenseLabel: string;
  };
  breadcrumb: {
    home: string;
    about: string;
    work: string;
    research: string;
    blog: string;
    contact: string;
    privacy: string;
    cookies: string;
    license: string;
    notFound: string;
    publication: string;
  };
  meta: {
    homeTitle: string;
    homeDesc: string;
    aboutTitle: string;
    aboutDesc: string;
    workTitle: string;
    workDesc: string;
    researchTitle: string;
    researchDesc: string;
    blogTitle: string;
    blogDesc: string;
    blogPostTitle: string;
    blogPostDesc: string;
    contactTitle: string;
    contactDesc: string;
    privacyTitle: string;
    privacyDesc: string;
    cookiesTitle: string;
    cookiesDesc: string;
    licenseTitle: string;
    licenseDesc: string;
    notFoundTitle: string;
    notFoundDesc: string;
  };
  home: {
    eyebrow: string;
    h1: string;
    lead: string;
    intro: string;
    sectionsLabel: string;
    focusHeading: string;
    focusHciTitle: string;
    focusHciDesc: string;
    focusEduTitle: string;
    focusEduDesc: string;
    focusAiTitle: string;
    focusAiDesc: string;
  };
  about: {
    eyebrow: string;
    h1: string;
    lead: string;
    photoAlt: string;
    bio1: string;
    bio2: string;
    bio3: string;
    bio4: string;
    linesHeading: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    ctaLabel: string;
    ctaResearch: string;
    ctaWork: string;
  };
  work: {
    eyebrow: string;
    h1: string;
    lead: string;
    areasHeading: string;
    areaEduTitle: string;
    areaEduDesc: string;
    areaHciTitle: string;
    areaHciDesc: string;
    areaGamesTitle: string;
    areaGamesDesc: string;
    projectsHeading: string;
    projectVisit: string;
    projectResearch: string;
    projectLinksLabel: string;
    evpraxisType: string;
    evpraxisTitle: string;
    evpraxisDesc: string;
    evpraxisTagsLabel: string;
    evpraxisTag1: string;
    evpraxisTag2: string;
    evpraxisTag3: string;
    rediType: string;
    rediTitle: string;
    rediDesc: string;
    rediTagsLabel: string;
    rediTag1: string;
    rediTag2: string;
    rediTag3: string;
    encantoType: string;
    encantoTitle: string;
    encantoDesc: string;
    encantoTagsLabel: string;
    encantoTag1: string;
    encantoTag2: string;
    encantoTag3: string;
    collaborationsHeading: string;
    collaborationsLead: string;
    collaborationRole: string;
    collaborationLinksLabel: string;
    conacytSeedTitle: string;
    conacytSeedDesc: string;
    conacytSeedDate: string;
    conacytSeedTagsLabel: string;
    conacytSeedTag1: string;
    conacytSeedTag2: string;
    conacytSeedTag3: string;
    pronacesTitle: string;
    pronacesDesc: string;
    pronacesDate: string;
    pronacesTagsLabel: string;
    pronacesTag1: string;
    pronacesTag2: string;
    pronacesTag3: string;
  };
  research: {
    eyebrow: string;
    h1: string;
    lead: string;
    linesHeading: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    line6: string;
    line7: string;
    communityHeading: string;
    communityLead: string;
    communityAmexihc: string;
    communityLaihc: string;
    publicationsHeading: string;
    publicationsNote: string;
    searchLabel: string;
    searchPlaceholder: string;
    totalOne: string;
    totalMany: string;
    resultOne: string;
    resultMany: string;
    showMore: string;
    showMoreStatus: string;
    empty: string;
    emptySearch: string;
    clearSearch: string;
    viewAll: string;
    viewPublication: string;
    cite: string;
    citeTitle: string;
    citeCopy: string;
    citeCopied: string;
    citeClose: string;
    sidebarHeading: string;
    totalLabel: string;
    visibleLabel: string;
    typeFilterHeading: string;
    profilesHeading: string;
    typeAll: string;
    typeJournal: string;
    typeConference: string;
    typeChapter: string;
    typeThesis: string;
    typeReport: string;
    typePreprint: string;
  };
  blog: {
    eyebrow: string;
    h1: string;
    postsHeading: string;
    searchLabel: string;
    searchPlaceholder: string;
    totalOne: string;
    totalMany: string;
    resultQueryOne: string;
    resultQueryMany: string;
    showMore: string;
    showMoreStatus: string;
    empty: string;
    emptySearch: string;
    clearSearch: string;
    viewAll: string;
    yearsHeading: string;
    tagsHeading: string;
    tagsAll: string;
    readingTime: string;
    relatedHeading: string;
    sidebarHeading: string;
    statsTotal: string;
    statsVisible: string;
    rssLabel: string;
  };
  blogPost: {
    back: string;
    eyebrow: string;
    authorBy: string;
    shareHeading: string;
    share: string;
    copyLink: string;
    linkCopied: string;
    shareReady: string;
  };
  contact: {
    eyebrow: string;
    h1: string;
    lead: string;
    linksHeading: string;
    emailContext: string;
  };
  cookies: {
    title: string;
    description: string;
    optionsLabel: string;
    necessaryTitle: string;
    necessaryDescription: string;
    alwaysOn: string;
    optional: string;
    analyticsTitle: string;
    analyticsDescription: string;
    reject: string;
    accept: string;
  };
  notFound: { eyebrow: string; h1: string; lead: string; back: string };
}

const STORAGE_KEY = 'locale';
const all: Record<Locale, Messages> = { es, en };

function getStoredLocale(): Locale | undefined {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'es' || stored === 'en') return stored;
  } catch {
    // localStorage unavailable
  }
  return undefined;
}

function detectLocale(): Locale {
  const stored = getStoredLocale();
  if (stored) return stored;

  return detectNavigatorLocale();
}

export function hasStoredLocalePreference(): boolean {
  return getStoredLocale() !== undefined;
}

export function detectNavigatorLocale(): Locale {
  if (typeof navigator === 'undefined') return 'es';
  const langs = navigator.languages?.length ? [...navigator.languages] : [navigator.language ?? ''];
  for (const l of langs) {
    if (l.toLowerCase().startsWith('es')) return 'es';
    if (l.toLowerCase().startsWith('en')) return 'en';
  }
  return 'es';
}

const _locale = ref<Locale>(detectLocale());

if (typeof document !== 'undefined') {
  document.documentElement.lang = _locale.value;
}

export const locale = readonly(_locale);

function applyLocale(l: Locale): void {
  _locale.value = l;
  if (typeof document !== 'undefined') {
    document.documentElement.lang = l;
  }
}

export function setLocale(l: Locale): void {
  applyLocale(l);
  try {
    localStorage.setItem(STORAGE_KEY, l);
  } catch {
    // ignore
  }
}

export function setLocaleForRoute(l: Locale): void {
  applyLocale(l);
}

export function translate(
  key: string,
  targetLocale: Locale,
  params?: Record<string, string | number>,
): string {
  const msg = all[targetLocale] as unknown as Record<string, unknown>;
  const value = key.split('.').reduce<unknown>((obj, k) => {
    if (obj != null && typeof obj === 'object') return (obj as Record<string, unknown>)[k];
    return undefined;
  }, msg);

  if (typeof value !== 'string') return key;
  if (!params) return value;
  return value.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? `{${k}}`));
}

export function t(key: string, params?: Record<string, string | number>): string {
  return translate(key, _locale.value, params);
}

export function useLocale() {
  return { locale, t, setLocale };
}
