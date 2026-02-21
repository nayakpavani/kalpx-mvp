<script setup>
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const data = screenStore.screenState[props.block.data_key || 'identity_delta'] || [];
</script>

<template>
  <div class="graph-block">
    <div v-for="item in data" :key="item.label" class="delta-row">
      <div class="row-header">
        <span class="label">{{ item.label }}</span>
        <span class="value">+{{ Math.round(((item.current - item.initial) / 10) * 100) }}%</span>
      </div>
      <div class="bar-container">
        <div class="bar-initial" :style="{ width: (item.initial * 10) + '%' }"></div>
        <div class="bar-current" :style="{ width: (item.current * 10) + '%' }"></div>
      </div>
      <div class="row-footer">
        <span>Initial: {{ item.initial }}/10</span>
        <span>Current: {{ item.current }}/10</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.graph-block {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 0;
}

.delta-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.row-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--text-primary);
}

.value {
  font-size: 14px;
  font-weight: 600;
  color: #10b981;
}

.bar-container {
  height: 6px;
  background: var(--surface-2);
  border-radius: 100px;
  position: relative;
  overflow: hidden;
}

.bar-initial {
  position: absolute;
  height: 100%;
  background: var(--border-color);
  z-index: 1;
  border-radius: 100px;
}

.bar-current {
  position: absolute;
  height: 100%;
  background: var(--gold-gradient);
  z-index: 2;
  border-radius: 100px;
  transition: width 1s cubic-bezier(0.23, 1, 0.32, 1);
}

.row-footer {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
