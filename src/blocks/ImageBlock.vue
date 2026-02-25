<script setup>
defineProps({
  block: Object,
});
</script>

<template>
  <div class="image-block" :style="block.style">
    <img :src="block.url || block.src" :alt="block.alt || 'KalpX Image'" class="image" />
  </div>
</template>

<style scoped>
.image-block {
  width: 100%;
  max-width: 600px;
  margin: 0 auto 24px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
}

.image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}
</style>
