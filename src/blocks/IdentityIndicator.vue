<script setup>
import { computed } from 'vue';

const props = defineProps({
  block: Object,
});

const indicatorPosition = computed(() => {
  const state = props.block.state?.toLowerCase();
  if (state === 'drifting') return '15%';
  if (state === 'reactive') return '50%';
  return '85%'; // steady
});

const indicatorColor = computed(() => {
  const state = props.block.state?.toLowerCase();
  if (state === 'drifting') return '#B45309';
  if (state === 'reactive') return '#C2410C';
  return '#065F46'; // steady
});
</script>

<template>
  <div class="identity-indicator-wrap">
    <div class="continuum-bar">
      <div 
        class="indicator-dot" 
        :style="{ left: indicatorPosition, backgroundColor: indicatorColor, boxShadow: `0 0 12px ${indicatorColor}` }"
      ></div>
    </div>
    <div class="labels">
      <span :class="{ active: block.state === 'drifting' }">DRIFTING</span>
      <span :class="{ active: block.state === 'reactive' }">REACTIVE</span>
      <span :class="{ active: block.state === 'steady' }">STEADY</span>
    </div>
  </div>
</template>

<style scoped>
.identity-indicator-wrap {
  width: 100%;
  max-width: 280px;
  margin: 12px auto 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.continuum-bar {
  position: relative;
  width: 100%;
  height: 2px;
  background: rgba(243, 244, 246, 0.1);
  border-radius: 2px;
}

.indicator-dot {
  position: absolute;
  top: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.labels span {
  font-family: var(--font-sans);
  font-size: 9px;
  letter-spacing: 1.5px;
  color: rgba(243, 244, 246, 0.3);
  transition: color 0.5s ease;
}

.labels span.active {
  color: rgba(243, 244, 246, 0.7);
  font-weight: 600;
}
</style>
