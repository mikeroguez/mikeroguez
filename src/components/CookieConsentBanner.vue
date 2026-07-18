<template>
  <div v-if="isVisible" class="cookie-consent" role="presentation">
    <section
      ref="panelRef"
      class="cookie-consent__panel"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      :lang="locale"
      :aria-labelledby="titleId"
      :aria-describedby="descriptionId"
      @keydown.tab="trapFocus"
    >
      <div class="cookie-consent__content">
        <p :id="titleId" class="cookie-consent__title">{{ t('cookies.title') }}</p>
        <p :id="descriptionId" class="cookie-consent__description">
          {{ t('cookies.description') }}
        </p>
        <div class="cookie-consent__options" role="group" :aria-label="t('cookies.optionsLabel')">
          <div class="cookie-consent__option">
            <span class="cookie-consent__status" aria-hidden="true">{{
              t('cookies.alwaysOn')
            }}</span>
            <span>
              <strong>{{ t('cookies.necessaryTitle') }}</strong>
              {{ t('cookies.necessaryDescription') }}
            </span>
          </div>
          <div class="cookie-consent__option">
            <span
              class="cookie-consent__status cookie-consent__status--optional"
              aria-hidden="true"
            >
              {{ t('cookies.optional') }}
            </span>
            <span>
              <strong>{{ t('cookies.analyticsTitle') }}</strong>
              <span :id="analyticsDescriptionId">{{ t('cookies.analyticsDescription') }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="cookie-consent__actions">
        <button class="cookie-consent__button" type="button" @click="acceptAnalytics">
          {{ t('cookies.accept') }}
        </button>
        <button class="cookie-consent__button" type="button" @click="rejectAnalytics">
          {{ t('cookies.reject') }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import {
  applyCookieConsent,
  getStoredCookieConsent,
  initializeGoogleAnalytics,
  storeCookieConsent,
  trackPageView,
} from '@/utils/analytics';
import { locale, t } from '@/i18n';

const titleId = 'cookie-consent-title';
const descriptionId = 'cookie-consent-description';
const analyticsDescriptionId = 'cookie-consent-analytics-description';
const isVisible = ref(false);
const analyticsAllowed = ref(false);
const panelRef = ref<globalThis.HTMLElement | null>(null);
const previouslyFocusedElement = ref<globalThis.HTMLElement | null>(null);
const route = useRoute();

onMounted(() => {
  initializeGoogleAnalytics();

  const stored = getStoredCookieConsent();
  if (stored) {
    analyticsAllowed.value = stored.analytics;
    applyCookieConsent(stored.analytics);
  } else {
    showPreferences();
  }

  window.addEventListener('mikeroguez:open-cookie-preferences', openPreferences);
});

onBeforeUnmount(() => {
  window.removeEventListener('mikeroguez:open-cookie-preferences', openPreferences);
});

watch(
  () => route.fullPath,
  (path, previousPath) => {
    if (!previousPath) return;
    trackPageView(path, document.title);
  },
);

function acceptAnalytics(): void {
  analyticsAllowed.value = true;
  persist(true);
}

function rejectAnalytics(): void {
  analyticsAllowed.value = false;
  persist(false);
}

function persist(analytics: boolean): void {
  storeCookieConsent(analytics);
  isVisible.value = false;
  previouslyFocusedElement.value?.focus();
  previouslyFocusedElement.value = null;
}

function openPreferences(): void {
  const stored = getStoredCookieConsent();
  analyticsAllowed.value = stored?.analytics ?? false;
  showPreferences();
}

function showPreferences(): void {
  previouslyFocusedElement.value =
    document.activeElement instanceof globalThis.HTMLElement ? document.activeElement : null;
  isVisible.value = true;
  void nextTick(() => panelRef.value?.focus());
}

function trapFocus(event: globalThis.KeyboardEvent): void {
  const panel = panelRef.value;
  if (!panel) return;

  const focusable = Array.from(
    panel.querySelectorAll<globalThis.HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('disabled') && element.tabIndex !== -1);

  if (focusable.length === 0) {
    event.preventDefault();
    panel.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first || !last) return;

  const active = document.activeElement;

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}
</script>
