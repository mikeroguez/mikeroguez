<template>
  <span
    class="brand-logo"
    :class="`brand-logo--${size}`"
    :role="decorative ? undefined : 'img'"
    :aria-label="decorative ? undefined : label"
    :aria-hidden="decorative ? 'true' : undefined"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    decorative?: boolean;
    label?: string;
    size?: 'header' | 'footer';
  }>(),
  {
    decorative: false,
    label: 'Mikeroguez',
    size: 'header',
  },
);
</script>
