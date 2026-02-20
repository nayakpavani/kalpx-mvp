<script setup>
defineProps({
  block: Object,
});
</script>

<template>
  <div class="card-list">
    <div v-for="item in block.options" :key="item.id" class="card">
      {{ item.title }}
    </div>
  </div>
</template>

<style scoped>
.card-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
  margin-bottom: 24px;
}

.card {
  background-color: var(--surface-1);
  border: 1px solid var(--border-color);
  padding: 20px;
  border-radius: var(--radius-md);
  text-align: center;
  font-weight: 500;
  transition: var(--transition-base);
  cursor: pointer;
}

.card:hover {
  background-color: var(--surface-2);
  border-color: var(--accent-primary);
  transform: translateY(-4px);
}
</style>
