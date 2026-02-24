<script setup>
defineProps({
  block: Object,
});
</script>

<template>
  <h1 
    :class="[
      'headline', 
      'serif',
      block.variant === 'serif_gold_multiline' ? 'serif-gold multiline' : ''
    ]"
    :style="block.style"
  >
    {{ block.content }}
  </h1>
</template>

<style scoped>
.headline {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  line-height: 1.25;
  text-align: center;
}

.serif-gold {
  color: #c9a227;
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: 28px;
  margin: 16px 0;
}

.multiline {
  white-space: pre-line;
  line-height: 1.6;
}
</style>
