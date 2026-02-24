<script setup>
import { computed } from "vue";

const props = defineProps({
  block: Object,
});

const summaryData = computed(() => {
  if (props.block.fields) {
    return props.block.fields.map(field => ({
      label: field.label,
      value: field.value || "—",
      isLong: (field.value || "").length > 25
    }));
  }
  return [];
});
</script>

<template>
  <div class="summary-card">
    <div 
      v-for="(item, i) in summaryData" 
      :key="i" 
      class="summary-item"
      :class="{ 'vertical-layout': item.isLong }"
    >
      <span class="label">{{ item.label }}</span>
      <span class="value">{{ item.value }}</span>
    </div>
  </div>
</template>

<style scoped>
.summary-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #1F2937;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #374151;
  width: 100%;
  margin: 12px 0;
  text-align: left;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 16px;
  gap: 16px;
}

.summary-item.vertical-layout {
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.summary-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.label {
  font-family: var(--font-sans);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(243, 244, 246, 0.4);
  font-weight: 600;
  flex-shrink: 0;
}

.value {
  font-family: "Cormorant Garamond", serif;
  font-size: 17px;
  color: #F3F4F6;
  font-weight: 400;
  line-height: 1.4;
}

.vertical-layout .value {
  font-size: 19px;
}
</style>
