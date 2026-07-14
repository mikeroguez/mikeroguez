<template>
  <header class="site-header">
    <div class="site-header__inner">
      <RouterLink class="site-header__brand" to="/" @click="closeMenu">Mikeroguez</RouterLink>
      <button
        class="site-header__menu-button"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="site-navigation"
        @click="toggleMenu"
      >
        <span class="site-header__menu-label">Menu</span>
      </button>
      <AppNavigation
        id="site-navigation"
        class="site-header__navigation"
        :class="{ 'site-header__navigation--open': isMenuOpen }"
        @navigate="closeMenu"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import AppNavigation from '@/components/AppNavigation.vue';

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}
</script>
