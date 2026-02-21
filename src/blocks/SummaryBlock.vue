<script setup>
import { computed } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();

const summaryData = computed(() => {
  if (props.block.fields) {
    return props.block.fields.map(field => ({
      label: field.label,
      value: screenStore.screenState[field.value_key] || "—"
    }));
  }
  
  if (props.block.data_key) {
    const data = screenStore.screenState[props.block.data_key] || {};
    return Object.entries(data).map(([key, value]) => ({
      label: key.replace(/_/g, ' ').toUpperCase(),
      value: value
    }));
  }
  
  return [];
});
</script>

<template>
  <div class="summary-block">
    <div v-for="(item, i) in summaryData" :key="i" class="summary-item">
      <span class="label">{{ item.label }}</span>
      <span class="value serif">{{ item.value }}</span>
    </div>
  </div>
</template>

<style scoped>
.summary-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--surface-1);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  margin: 20px 0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 12px;
}

.summary-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-secondary);
  font-weight: 600;
}

.value {
  font-size: 18px;
  color: var(--text-primary);
  font-weight: 400;
}
</style>
