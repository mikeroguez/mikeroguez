import { computed, type MaybeRefOrGetter } from 'vue';
import { toValue } from 'vue';
import { useHead, useSeoMeta } from '#imports';

import { locale, t, translate } from '@/i18n';
import { absoluteUrl, SITE_NAME, SOCIAL_IMAGE_PATH } from '@/utils/site';
import { alternatePathsFor } from '@/utils/routes';

interface SeoOptions {
  title: MaybeRefOrGetter<string>;
  description: MaybeRefOrGetter<string>;
  path: string;
  lang?: MaybeRefOrGetter<'es' | 'en' | undefined>;
  alternatePaths?: MaybeRefOrGetter<{ es: string; en: string } | undefined>;
  type?: 'website' | 'article' | 'profile';
  imagePath?: MaybeRefOrGetter<string | undefined>;
}

export function useSiteSeo({
  title,
  description,
  path,
  lang,
  alternatePaths,
  type = 'website',
  imagePath = SOCIAL_IMAGE_PATH,
}: SeoOptions) {
  const resolvedTitle = computed(() => toValue(title));
  const resolvedDescription = computed(() => toValue(description));
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = computed(() => absoluteUrl(toValue(imagePath) ?? SOCIAL_IMAGE_PATH));
  const resolvedLang = computed(() => toValue(lang) ?? locale.value);
  const resolvedAlternatePaths = computed(() => toValue(alternatePaths) ?? alternatePathsFor(path));
  const spanishUrl = computed(() => absoluteUrl(resolvedAlternatePaths.value.es));
  const englishUrl = computed(() => absoluteUrl(resolvedAlternatePaths.value.en));
  const feedUrl = computed(() =>
    absoluteUrl(resolvedLang.value === 'en' ? '/feed-en.xml' : '/feed.xml'),
  );
  const feedTitle = computed(() =>
    resolvedLang.value === 'en' ? 'Mikeroguez posts' : 'Publicaciones de Mikeroguez',
  );

  useHead({
    htmlAttrs: {
      lang: computed(() => (resolvedLang.value === 'es' ? 'es-MX' : 'en')),
    },
    link: [
      { rel: 'canonical', href: canonicalUrl },
      { rel: 'alternate', hreflang: 'es-MX', href: spanishUrl },
      { rel: 'alternate', hreflang: 'en', href: englishUrl },
      { rel: 'alternate', hreflang: 'x-default', href: spanishUrl },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: feedTitle,
        href: feedUrl,
      },
    ],
  });

  useSeoMeta({
    title: resolvedTitle,
    description: resolvedDescription,
    ogType: type,
    ogSiteName: SITE_NAME,
    ogLocale: computed(() => (resolvedLang.value === 'es' ? 'es_MX' : 'en_US')),
    ogTitle: resolvedTitle,
    ogDescription: resolvedDescription,
    ogUrl: canonicalUrl,
    ogImage: imageUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: resolvedTitle,
    twitterDescription: resolvedDescription,
    twitterImage: imageUrl,
  });
}

export function usePageSeo(
  titleKey: string,
  descriptionKey: string,
  path: string,
  lang?: MaybeRefOrGetter<'es' | 'en' | undefined>,
) {
  const resolvedLang = computed(() => toValue(lang));
  useSiteSeo({
    title: computed(() =>
      resolvedLang.value ? translate(titleKey, resolvedLang.value) : t(titleKey),
    ),
    description: computed(() =>
      resolvedLang.value ? translate(descriptionKey, resolvedLang.value) : t(descriptionKey),
    ),
    path,
    lang,
  });
}
