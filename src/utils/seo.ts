import { computed, type MaybeRefOrGetter } from 'vue';
import { toValue } from 'vue';
import { useHead, useSeoMeta } from '#imports';

import { locale, t } from '@/i18n';
import { absoluteUrl, SITE_NAME, SOCIAL_IMAGE_PATH } from '@/utils/site';

interface SeoOptions {
  title: MaybeRefOrGetter<string>;
  description: MaybeRefOrGetter<string>;
  path: string;
  type?: 'website' | 'article' | 'profile';
  imagePath?: MaybeRefOrGetter<string | undefined>;
}

export function useSiteSeo({
  title,
  description,
  path,
  type = 'website',
  imagePath = SOCIAL_IMAGE_PATH,
}: SeoOptions) {
  const resolvedTitle = computed(() => toValue(title));
  const resolvedDescription = computed(() => toValue(description));
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = computed(() => absoluteUrl(toValue(imagePath) ?? SOCIAL_IMAGE_PATH));

  useHead({
    htmlAttrs: {
      lang: computed(() => (locale.value === 'es' ? 'es-MX' : 'en')),
    },
    link: [
      { rel: 'canonical', href: canonicalUrl },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Publicaciones de Mikeroguez',
        href: absoluteUrl('/feed.xml'),
      },
    ],
  });

  useSeoMeta({
    title: resolvedTitle,
    description: resolvedDescription,
    ogType: type,
    ogSiteName: SITE_NAME,
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

export function usePageSeo(titleKey: string, descriptionKey: string, path: string) {
  useSiteSeo({
    title: computed(() => t(titleKey)),
    description: computed(() => t(descriptionKey)),
    path,
  });
}
