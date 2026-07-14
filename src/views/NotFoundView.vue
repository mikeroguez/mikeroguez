<template>
  <article class="page">
    <p class="eyebrow">404</p>
    <h1>Pagina no encontrada</h1>
    <p class="lead">La ruta solicitada no existe o todavia no esta disponible.</p>
    <RouterLink class="text-link" to="/">Volver al inicio</RouterLink>
  </article>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
