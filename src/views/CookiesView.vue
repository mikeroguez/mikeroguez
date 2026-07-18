<template>
  <article class="page legal-page">
    <p class="eyebrow">{{ content.eyebrow }}</p>
    <h1>{{ content.h1 }}</h1>
    <p class="lead">{{ content.lead }}</p>
    <p class="legal-page__updated">{{ content.updated }}</p>

    <section v-for="section in content.sections" :key="section.heading" class="content-section">
      <h2>{{ section.heading }}</h2>
      <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
      <ul v-if="section.items?.length" class="clean-list">
        <li v-for="item in section.items" :key="item">{{ item }}</li>
      </ul>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { locale } from '@/i18n';

interface LegalSection {
  heading: string;
  paragraphs: string[];
  items?: string[];
}

interface LegalContent {
  eyebrow: string;
  h1: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
}

const content = computed<LegalContent>(() =>
  locale.value === 'en'
    ? {
        eyebrow: 'Legal',
        h1: 'Cookie notice',
        lead: 'This page lists the browser storage and analytics choices used by the site.',
        updated: 'Last updated: July 18, 2026.',
        sections: [
          {
            heading: 'Necessary preferences',
            paragraphs: [
              'These preferences support basic site behavior and are not used for advertising.',
            ],
            items: [
              'locale: stores the selected language. Provider: this site. Duration: until changed or cleared from the browser.',
              'mikeroguez_cookie_consent: stores whether Google Analytics is allowed or denied. Provider: this site. Duration: until changed or cleared from the browser.',
            ],
          },
          {
            heading: 'Optional analytics',
            paragraphs: [
              'Google Analytics is optional. The Google tag is loaded with Consent Mode and analytics storage denied by default. Analytics events are sent only after you choose “Allow Google Analytics”.',
            ],
            items: [
              '_ga, _gid, _gat and related Google Analytics cookies may be created by Google only when analytics is allowed. Provider: Google. Expected duration depends on Google Analytics configuration and Google’s own controls.',
              'If analytics is denied later, the site asks Google Consent Mode to deny analytics storage and attempts to clear known Google Analytics cookies.',
            ],
          },
          {
            heading: 'Provider information',
            paragraphs: [
              'Google Analytics is provided by Google LLC. Review Google’s privacy information at https://policies.google.com/privacy and Google Analytics controls at https://support.google.com/analytics/.',
            ],
          },
          {
            heading: 'Change your choice',
            paragraphs: [
              'Use “Cookie preferences” in the footer to accept or reject Google Analytics at any time.',
            ],
          },
        ],
      }
    : {
        eyebrow: 'Legal',
        h1: 'Aviso de cookies',
        lead: 'Esta página lista el almacenamiento del navegador y las decisiones de analítica usadas por el sitio.',
        updated: 'Última actualización: 18 de julio de 2026.',
        sections: [
          {
            heading: 'Preferencias necesarias',
            paragraphs: [
              'Estas preferencias sostienen funciones básicas del sitio y no se usan para publicidad.',
            ],
            items: [
              'locale: guarda el idioma seleccionado. Proveedor: este sitio. Duración: hasta que se cambie o borre del navegador.',
              'mikeroguez_cookie_consent: guarda si Google Analytics está permitido o rechazado. Proveedor: este sitio. Duración: hasta que se cambie o borre del navegador.',
            ],
          },
          {
            heading: 'Analítica opcional',
            paragraphs: [
              'Google Analytics es opcional. La etiqueta de Google se carga con Consent Mode y almacenamiento de analítica denegado por defecto. Los eventos de analítica se envían solo después de elegir “Permitir Google Analytics”.',
            ],
            items: [
              '_ga, _gid, _gat y cookies relacionadas de Google Analytics pueden ser creadas por Google solo cuando se permite analítica. Proveedor: Google. La duración esperada depende de la configuración de Google Analytics y de los controles propios de Google.',
              'Si después se rechaza analítica, el sitio pide a Google Consent Mode denegar almacenamiento de analítica e intenta borrar cookies conocidas de Google Analytics.',
            ],
          },
          {
            heading: 'Información del proveedor',
            paragraphs: [
              'Google Analytics es provisto por Google LLC. Revisa la información de privacidad de Google en https://policies.google.com/privacy y los controles de Google Analytics en https://support.google.com/analytics/.',
            ],
          },
          {
            heading: 'Cambiar tu elección',
            paragraphs: [
              'Usa “Preferencias de cookies” en el footer para aceptar o rechazar Google Analytics en cualquier momento.',
            ],
          },
        ],
      },
);
</script>
