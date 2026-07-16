<template>
  <article class="page">
    <p class="eyebrow">{{ t('contact.eyebrow') }}</p>
    <h1>{{ t('contact.h1') }}</h1>
    <p class="lead">{{ t('contact.lead') }}</p>
    <p>{{ t('contact.note') }}</p>

    <section class="content-section" aria-labelledby="contact-links">
      <h2 id="contact-links">{{ t('contact.linksHeading') }}</h2>
      <ul class="link-list">
        <li>
          <a
            href="https://www.linkedin.com/in/mikeroguez/"
            rel="me noopener noreferrer"
            target="_blank"
          >
            LinkedIn
            <span class="visually-hidden">{{ t('a11y.openNewTab') }}</span>
          </a>
        </li>
        <li>
          <a
            href="https://orcid.org/0000-0002-7545-2533"
            rel="me noopener noreferrer"
            target="_blank"
          >
            ORCID
            <span class="visually-hidden">{{ t('a11y.openNewTab') }}</span>
          </a>
        </li>
        <li>
          <a
            href="https://scholar.google.com/citations?user=LoAMxRIAAAAJ&hl=en"
            rel="me noopener noreferrer"
            target="_blank"
          >
            Google Scholar
            <span class="visually-hidden">{{ t('a11y.openNewTab') }}</span>
          </a>
        </li>
        <li>
          <a href="https://github.com/mikeroguez" rel="me noopener noreferrer" target="_blank">
            GitHub
            <span class="visually-hidden">{{ t('a11y.openNewTab') }}</span>
          </a>
        </li>
      </ul>
    </section>
  </article>
</template>

<script setup lang="ts">
import { t } from '@/i18n';
</script>
