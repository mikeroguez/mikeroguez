<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__brand">
        <div class="site-footer__signature">
          <BrandLogo label="Mikeroguez" size="footer" />
          <p class="site-footer__tagline">{{ t('footer.tagline') }}</p>
        </div>
      </div>

      <nav class="site-footer__nav" :aria-label="t('a11y.footerNav')">
        <section aria-labelledby="footer-site-title">
          <h2 id="footer-site-title">{{ t('footer.siteHeading') }}</h2>
          <ul>
            <li v-for="link in siteLinks" :key="link.href">
              <RouterLink :to="link.href">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </section>

        <section aria-labelledby="footer-resources-title">
          <h2 id="footer-resources-title">{{ t('footer.resourcesHeading') }}</h2>
          <ul>
            <li v-for="link in resourceLinks" :key="link.href">
              <a
                :href="link.href"
                :aria-label="link.external ? `${link.label}${t('a11y.openNewTab')}` : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                :target="link.external ? '_blank' : undefined"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </section>

        <section aria-labelledby="footer-social-title">
          <h2 id="footer-social-title">{{ t('footer.socialHeading') }}</h2>
          <ul>
            <li v-for="link in socialLinks" :key="link.href">
              <a
                :href="link.href"
                :aria-label="`${link.label}${t('a11y.openNewTab')}`"
                rel="me noopener noreferrer"
                target="_blank"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </section>
      </nav>

      <div class="site-footer__meta">
        <p>
          <a
            :href="changelogUrl"
            :aria-label="`v${appVersion}${t('a11y.openNewTab')}`"
            rel="noopener noreferrer"
            target="_blank"
          >
            v{{ appVersion }}
          </a>
        </p>
        <p>
          <button class="site-footer__meta-button" type="button" @click="openCookiePreferences">
            {{ t('footer.cookiePreferences') }}
          </button>
        </p>
        <p>&copy; 2026 Mikeroguez.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import { t } from '@/i18n';
import BrandLogo from '@/components/BrandLogo.vue';

const appVersion = import.meta.env.VITE_APP_VERSION;
const changelogUrl = 'https://github.com/mikeroguez/mikeroguez/blob/main/CHANGELOG.md';

const siteLinks = computed(() => [
  { href: '/about', label: t('nav.about') },
  { href: '/work', label: t('nav.work') },
  { href: '/research', label: t('nav.research') },
  { href: '/contact', label: t('nav.contact') },
]);

const resourceLinks = computed(() => [
  { href: '/feed.xml', label: 'RSS' },
  { href: changelogUrl, label: 'Changelog', external: true },
  {
    href: 'https://github.com/mikeroguez/mikeroguez',
    label: t('footer.repositoryLabel'),
    external: true,
  },
]);

const socialLinks = [
  { href: 'https://www.linkedin.com/in/mikeroguez/', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/mikeroguez', label: 'Instagram' },
  { href: 'https://x.com/mikeroguez', label: 'X' },
  { href: 'https://www.facebook.com/mikeroguez', label: 'Facebook' },
];

function openCookiePreferences(): void {
  window.dispatchEvent(new window.Event('mikeroguez:open-cookie-preferences'));
}
</script>
