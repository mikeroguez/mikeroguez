<template>
  <span
    class="brand-logo"
    :class="[`brand-logo--${mark}`, `brand-logo--${size}`]"
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
    mark?: 'logo' | 'isotype';
    size?: 'header' | 'footer' | 'bg';
  }>(),
  {
    decorative: false,
    label: 'Mikeroguez',
    mark: 'logo',
    size: 'header',
  },
);
</script>
