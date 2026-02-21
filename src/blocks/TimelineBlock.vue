<script setup>
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const history = screenStore.screenState[props.block.data_key] || [];
</script>

<template>
  <div class="timeline-block">
    <div v-for="(item, i) in history" :key="item.id" class="timeline-item">
      <div class="timeline-marker">
        <div class="marker-dot" :class="{ active: item.status === 'Active' }"></div>
        <div v-if="i < history.length - 1" class="marker-line"></div>
      </div>
      <div class="timeline-content">
        <div class="item-header">
          <span class="item-date">{{ item.date }}</span>
          <span class="item-status" :class="item.status.toLowerCase()">{{ item.status }}</span>
        </div>
        <h4 class="item-name serif">{{ item.name }}</h4>
        <div class="item-growth">{{ item.growth }} Identity Shift</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-block {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.timeline-item {
  display: flex;
  gap: 24px;
  min-height: 100px;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.marker-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--border-color);
  z-index: 2;
  transition: all 0.4s ease;
}

.marker-dot.active {
  background: var(--gold-accent);
  box-shadow: 0 0 15px var(--gold-accent);
}

.marker-line {
  width: 1px;
  flex: 1;
  background: var(--border-color);
  margin: 4px 0;
}

.timeline-content {
  flex: 1;
  padding-bottom: 32px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.item-date {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-secondary);
}

.item-status {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 100px;
  border: 1px solid currentColor;
  opacity: 0.7;
}

.item-status.completed {
  color: #10b981;
}

.item-status.active {
  color: var(--gold-accent);
}

.item-name {
  font-size: 18px;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.item-growth {
  font-size: 13px;
  color: var(--text-secondary);
}
</style>
