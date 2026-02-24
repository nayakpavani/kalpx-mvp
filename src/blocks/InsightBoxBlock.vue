<script setup>
import { computed } from "vue";

const props = defineProps({
  block: Object,
});

const items = computed(() => {
  return props.block.items || [];
});
</script>

<template>
  <div class="insight-box-wrap" :class="block.variant">
    <div v-for="(item, i) in items" :key="i" class="insight-item">
      <div v-if="item.icon" class="icon-indicator">
        <i :class="item.icon"></i>
      </div>
      <div class="text-stack">
        <p v-if="item.title" class="item-title">{{ item.title }}</p>
        <p class="main-text" v-html="item.text || item.content"></p>
        <p v-if="item.subtext" class="sub-text">{{ item.subtext }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.insight-box-wrap {
  position: relative;
  background: #1F2937;
  border: 1px solid #374151;
  border-radius: 16px;
  padding: 24px;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  text-align: left;
}

.insight-box-wrap.highlight {
  border-color: #C9A227;
  box-shadow: 0 0 20px rgba(201, 162, 39, 0.05);
}

.insight-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.icon-indicator {
  font-size: 16px;
  color: #C9A227;
  margin-top: 3px;
  flex-shrink: 0;
  opacity: 0.8;
}

.text-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item-title {
  font-family: var(--font-sans);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #C9A227;
  font-weight: 700;
  margin: 0;
}

.main-text {
  font-family: "Cormorant Garamond", serif;
  font-size: 18px;
  color: #F3F4F6;
  margin: 0;
  line-height: 1.4;
}

.sub-text {
  font-family: var(--font-sans);
  font-size: 14px;
  color: rgba(243, 244, 246, 0.5);
  margin: 0;
  line-height: 1.5;
}

:deep(strong) {
  color: #F3F4F6;
  font-weight: 600;
}
</style>
