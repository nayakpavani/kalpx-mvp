<script setup>
const props = defineProps({
  block: Object,
});
</script>

<template>
  <div :class="['micro-label', { centered: block.variant === 'centered' }]">
    {{ props.block.content }}
  </div>
</template>

<style scoped>
.micro-label {
  font-family: var(--font-outfit);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: var(--gold-accent);
  margin-bottom: 8px;
  font-weight: 600;
  opacity: 0.8;
}

.centered {
  text-align: center;
  width: 100%;
}
</style>
