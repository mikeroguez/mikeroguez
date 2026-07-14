<template>
  <nav aria-label="Navegacion principal">
    <ul class="nav-list">
      <li v-for="item in navigationItems" :key="item.to">
        <RouterLink :to="item.to" class="nav-link" @click="$emit('navigate')">
          {{ item.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineEmits<{
  navigate: [];
}>();

const navigationItems = [
  { to: '/', label: 'Inicio' },
  { to: '/about', label: 'Sobre mi' },
  { to: '/work', label: 'Trabajo' },
  { to: '/research', label: 'Investigacion' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contacto' },
];
</script>
