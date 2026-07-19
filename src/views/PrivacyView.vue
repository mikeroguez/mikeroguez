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
        h1: 'Privacy notice',
        lead: 'This notice explains how this personal site handles data, cookies and contact information.',
        updated: 'Last updated: July 18, 2026.',
        sections: [
          {
            heading: 'Responsible party',
            paragraphs: [
              'This is the personal site of Miguel Angel Rodriguez Ortiz, who works publicly as Mikeroguez. For privacy questions, use the public contact email maro@ucol.mx or the contact page.',
            ],
          },
          {
            heading: 'Data handled by this site',
            paragraphs: [
              'The site does not include account creation, payment flows, comments or contact forms. It may process limited technical and preference data.',
            ],
            items: [
              'Language preference stored in the browser.',
              'Cookie consent preference stored in the browser.',
              'Basic analytics data through Google Tag Manager and Google Analytics only if you allow it.',
              'Information you choose to send by email when contacting Mikeroguez.',
            ],
          },
          {
            heading: 'Purposes',
            paragraphs: [
              'Data is handled only for limited site operation and communication purposes.',
            ],
            items: [
              'Remember site language and cookie choices.',
              'Understand aggregate site use when analytics is allowed.',
              'Respond to messages sent voluntarily by email.',
              'Maintain site security and public repository quality.',
            ],
          },
          {
            heading: 'Google Tag Manager and Google Analytics',
            paragraphs: [
              'This site loads Google Tag Manager with Consent Mode. Analytics storage is denied by default. Page-view measurement is sent only after you choose to allow analytics.',
              'Google Tag Manager is used to manage analytics tags, including Google Analytics. Google may receive technical information when the container loads. If you allow analytics, Google Analytics can process visit and usage data according to Google’s terms and privacy controls.',
              'Google LLC acts as an external tag management and analytics provider. Its processing may involve infrastructure outside your country. Review Google’s privacy information at https://policies.google.com/privacy.',
            ],
          },
          {
            heading: 'Retention',
            paragraphs: [
              'Language and cookie consent preferences remain in your browser until you change or clear them. Email messages are kept only as long as needed to respond, maintain context for voluntary communication or comply with applicable obligations.',
              'Google Analytics retention depends on the GA4 property configuration and Google’s own controls. Google Tag Manager does not define analytics retention by itself. This site should not use analytics data to identify individual visitors.',
            ],
          },
          {
            heading: 'Your choices',
            paragraphs: [
              'You can use the site without allowing analytics. You can change your choice later from “Cookie preferences” in the footer.',
            ],
          },
          {
            heading: 'Email contact',
            paragraphs: [
              'If you send an email, the information you include is used to read and respond to your message. Do not send confidential, sensitive or third-party personal data unless it is strictly necessary.',
            ],
          },
          {
            heading: 'External links',
            paragraphs: [
              'The site links to external services such as GitHub, LinkedIn, ORCID, Google Scholar and social networks. Those services apply their own privacy notices and terms.',
            ],
          },
          {
            heading: 'Rights and requests',
            paragraphs: [
              'Depending on your jurisdiction, you may have rights to access, correct, delete or object to certain processing of your personal data. Send requests through maro@ucol.mx and include enough context to identify the request without sending unnecessary sensitive data.',
            ],
          },
          {
            heading: 'Limits',
            paragraphs: [
              'This notice is informational and may need formal legal review before being used for institutional, commercial or high-risk processing.',
            ],
          },
        ],
      }
    : {
        eyebrow: 'Legal',
        h1: 'Aviso de privacidad',
        lead: 'Este aviso explica cómo este sitio personal maneja datos, cookies e información de contacto.',
        updated: 'Última actualización: 18 de julio de 2026.',
        sections: [
          {
            heading: 'Responsable',
            paragraphs: [
              'Este es el sitio personal de Miguel Ángel Rodríguez Ortiz, quien trabaja públicamente como Mikeroguez. Para dudas de privacidad, usa el correo público maro@ucol.mx o la página de contacto.',
            ],
          },
          {
            heading: 'Datos que maneja el sitio',
            paragraphs: [
              'El sitio no tiene cuentas, pagos, comentarios ni formularios de contacto. Puede tratar datos técnicos y de preferencias de alcance limitado.',
            ],
            items: [
              'Preferencia de idioma guardada en el navegador.',
              'Preferencia de consentimiento de cookies guardada en el navegador.',
              'Datos básicos de analítica mediante Google Tag Manager y Google Analytics solo si lo permites.',
              'Información que decidas enviar por correo al contactar a Mikeroguez.',
            ],
          },
          {
            heading: 'Finalidades',
            paragraphs: [
              'Los datos se manejan solo para operación limitada del sitio y comunicación.',
            ],
            items: [
              'Recordar idioma y decisiones de cookies.',
              'Entender uso agregado del sitio cuando la analítica está permitida.',
              'Responder mensajes enviados voluntariamente por correo.',
              'Mantener seguridad del sitio y calidad del repositorio público.',
            ],
          },
          {
            heading: 'Google Tag Manager y Google Analytics',
            paragraphs: [
              'Este sitio carga Google Tag Manager con Consent Mode. El almacenamiento de analítica está denegado por defecto. La medición de páginas vistas se envía solo después de elegir permitir analítica.',
              'Google Tag Manager se usa para gestionar etiquetas de analítica, incluido Google Analytics. Google puede recibir información técnica cuando carga el contenedor. Si permites analítica, Google Analytics puede procesar datos de visita y uso conforme a los términos y controles de privacidad de Google.',
              'Google LLC actúa como proveedor externo de gestión de etiquetas y analítica. Su procesamiento puede involucrar infraestructura fuera de tu país. Revisa la información de privacidad de Google en https://policies.google.com/privacy.',
            ],
          },
          {
            heading: 'Conservación',
            paragraphs: [
              'Las preferencias de idioma y consentimiento permanecen en tu navegador hasta que las cambies o las borres. Los correos se conservan solo mientras sean necesarios para responder, mantener contexto de una comunicación voluntaria o cumplir obligaciones aplicables.',
              'La conservación en Google Analytics depende de la configuración de la propiedad GA4 y de los controles propios de Google. Google Tag Manager no define por sí mismo la conservación de analítica. Este sitio no debe usar analítica para identificar visitantes individuales.',
            ],
          },
          {
            heading: 'Tus decisiones',
            paragraphs: [
              'Puedes usar el sitio sin permitir analítica. Puedes cambiar tu elección después desde “Preferencias de cookies” en el footer.',
            ],
          },
          {
            heading: 'Contacto por correo',
            paragraphs: [
              'Si envías un correo, la información incluida se usa para leer y responder tu mensaje. No envíes datos confidenciales, sensibles o personales de terceros salvo que sea estrictamente necesario.',
            ],
          },
          {
            heading: 'Enlaces externos',
            paragraphs: [
              'El sitio enlaza a servicios externos como GitHub, LinkedIn, ORCID, Google Scholar y redes sociales. Esos servicios aplican sus propios avisos de privacidad y términos.',
            ],
          },
          {
            heading: 'Derechos y solicitudes',
            paragraphs: [
              'Según tu jurisdicción, puedes tener derechos de acceso, rectificación, cancelación, oposición u otros derechos sobre tus datos personales. Envía solicitudes a maro@ucol.mx e incluye contexto suficiente para identificar la solicitud sin enviar datos sensibles innecesarios.',
            ],
          },
          {
            heading: 'Límites',
            paragraphs: [
              'Este aviso es informativo y puede requerir revisión legal formal antes de usarse para tratamientos institucionales, comerciales o de alto riesgo.',
            ],
          },
        ],
      },
);
</script>
