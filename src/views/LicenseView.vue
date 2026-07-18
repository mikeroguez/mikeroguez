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
        h1: 'License and reuse',
        lead: 'Written dissemination content and source code are open with attribution requirements; brand and some assets remain separate.',
        updated: 'Last updated: July 18, 2026.',
        sections: [
          {
            heading: 'Default position',
            paragraphs: [
              'Unless a page or file states otherwise, written public-facing content on this site is available under Creative Commons Attribution 4.0 International (CC BY 4.0): https://creativecommons.org/licenses/by/4.0/. Reuse must give appropriate credit to Miguel Angel Rodriguez Ortiz / Mikeroguez, link back to the source when practical, link to the license and indicate changes when content is adapted.',
            ],
          },
          {
            heading: 'Suggested attribution',
            paragraphs: [
              'Suggested format: “Content by Miguel Angel Rodriguez Ortiz / Mikeroguez, available under CC BY 4.0, source: https://mikeroguez.me.” If you reuse a specific page or post, link to that specific URL when practical.',
            ],
          },
          {
            heading: 'What the content license covers',
            paragraphs: [
              'The content license is intended for dissemination, educational and scientific communication materials written for this site.',
            ],
            items: [
              'Public pages and blog posts written by Mikeroguez.',
              'Short excerpts with attribution.',
              'Translations or adaptations, as long as attribution is preserved and changes are indicated.',
            ],
          },
          {
            heading: 'What is not covered',
            paragraphs: ['The following materials are not covered by the default content license:'],
            items: [
              'Photographs and profile images.',
              'The Mikeroguez name, logo, isotype and brand assets. Mikeroguez is used publicly as an identity and brand name since 2008 according to the site owner; this notice does not claim trademark registration. Trademark registration may be pursued in the future.',
              'PDF documents and research-related materials unless their own source states otherwise.',
              'Third-party material, external publication records and linked resources.',
            ],
          },
          {
            heading: 'Third-party material',
            paragraphs: [
              'External services, publication links, social profiles and referenced research keep their own terms, licenses and citation requirements.',
            ],
          },
          {
            heading: 'Code',
            paragraphs: [
              'The source code in this repository is licensed under the MIT License through the root LICENSE file. Reuse, modification and distribution are allowed, but copies or substantial portions of the software must preserve the copyright notice and license text.',
              'The code license does not grant rights over the Mikeroguez name, logo, isotype, photographs, written content, PDFs, publication records or third-party materials.',
            ],
          },
        ],
      }
    : {
        eyebrow: 'Legal',
        h1: 'Licencia y reutilización',
        lead: 'El contenido escrito de difusión y el código fuente están abiertos con requisitos de atribución; la marca y algunos assets se manejan por separado.',
        updated: 'Última actualización: 18 de julio de 2026.',
        sections: [
          {
            heading: 'Postura por defecto',
            paragraphs: [
              'Salvo que una página o archivo indique otra cosa, el contenido público escrito de este sitio está disponible bajo Creative Commons Atribución 4.0 Internacional (CC BY 4.0): https://creativecommons.org/licenses/by/4.0/. La reutilización debe reconocer la autoría de Miguel Ángel Rodríguez Ortiz / Mikeroguez, enlazar la fuente cuando sea práctico, enlazar la licencia e indicar cambios cuando el contenido sea adaptado.',
            ],
          },
          {
            heading: 'Atribución sugerida',
            paragraphs: [
              'Formato sugerido: “Contenido de Miguel Ángel Rodríguez Ortiz / Mikeroguez, disponible bajo CC BY 4.0, fuente: https://mikeroguez.me.” Si reutilizas una página o entrada específica, enlaza esa URL cuando sea práctico.',
            ],
          },
          {
            heading: 'Qué cubre la licencia de contenido',
            paragraphs: [
              'La licencia de contenido está pensada para materiales de difusión, educación y comunicación científica escritos para este sitio.',
            ],
            items: [
              'Páginas públicas y entradas del blog escritas por Mikeroguez.',
              'Extractos breves con atribución.',
              'Traducciones o adaptaciones, siempre que se conserve la atribución y se indiquen los cambios.',
            ],
          },
          {
            heading: 'Qué no cubre',
            paragraphs: [
              'Los siguientes materiales no quedan cubiertos por la licencia de contenido:',
            ],
            items: [
              'Fotografías e imágenes de perfil.',
              'El nombre Mikeroguez, logotipo, isotipo y assets de marca. Mikeroguez se usa públicamente como identidad y nombre de marca desde 2008 según el responsable del sitio; este aviso no afirma registro marcario. El registro de marca puede buscarse en el futuro.',
              'Documentos PDF y materiales de investigación salvo que su propia fuente indique otra cosa.',
              'Material de terceros, registros externos de publicaciones y recursos enlazados.',
            ],
          },
          {
            heading: 'Material de terceros',
            paragraphs: [
              'Servicios externos, enlaces a publicaciones, perfiles sociales e investigación referenciada conservan sus propios términos, licencias y requisitos de citación.',
            ],
          },
          {
            heading: 'Código',
            paragraphs: [
              'El código fuente de este repositorio está licenciado bajo MIT mediante el archivo LICENSE en la raíz. Se permite reutilizar, modificar y distribuir el software, pero las copias o porciones sustanciales deben conservar el aviso de copyright y el texto de la licencia.',
              'La licencia del código no otorga derechos sobre el nombre Mikeroguez, logotipo, isotipo, fotografías, contenido escrito, PDFs, registros de publicaciones ni materiales de terceros.',
            ],
          },
        ],
      },
);
</script>
