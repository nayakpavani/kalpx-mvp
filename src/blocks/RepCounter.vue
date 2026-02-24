<script setup>
import { ref } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const count = ref(0);
const total = Number(props.block.target || props.block.total) || 108;
const isScaling = ref(false);

function logRep() {
  if (count.value < total) {
    count.value++;
    
    // Simple haptic feedback simulation
    isScaling.value = true;
    setTimeout(() => isScaling.value = false, 150);

    if (count.value === total) {
      setTimeout(() => {
        const onComplete = props.block.on_complete;
        if (onComplete) {
          screenStore.handleAction(onComplete);
        }
      }, 600);
    }
  }
}
</script>

<template>
  <div class="rep-counter-wrap" @click="logRep">
    <div class="main-display" :class="{ scaling: isScaling }">
      <span class="current">{{ count }}</span>
      <div class="total-line">
        <div class="progress-underlay">
          <div class="progress-fill" :style="{ width: (count / total) * 100 + '%' }"></div>
        </div>
        <span class="total-label">of {{ total }} reps</span>
      </div>
    </div>

    <div class="tap-zone">
      <div class="pulse-ring"></div>
      <span class="tap-hint">Tap to chant</span>
    </div>
  </div>
</template>

<style scoped>
.rep-counter-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  width: 100%;
  cursor: pointer;
  user-select: none;
}

.main-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.15s ease-out;
}

.main-display.scaling {
  transform: scale(1.05);
}

.current {
  font-family: "Cormorant Garamond", serif;
  font-size: 110px;
  font-weight: 300;
  line-height: 1;
  color: #F3F4F6;
  text-shadow: 0 0 20px rgba(243, 244, 246, 0.1);
}

.total-line {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.progress-underlay {
  width: 120px;
  height: 2px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #C9A227;
  transition: width 0.3s ease;
}

.total-label {
  font-family: var(--font-sans);
  font-size: 13px;
  color: rgba(243, 244, 246, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tap-zone {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(201, 162, 39, 0.2);
  border-radius: 50%;
  animation: slow-pulse 3s infinite ease-out;
}

@keyframes slow-pulse {
  0% { transform: scale(0.8); opacity: 0; }
  50% { opacity: 0.5; }
  100% { transform: scale(1.5); opacity: 0; }
}

.tap-hint {
  font-family: var(--font-sans);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(243, 244, 246, 0.3);
  font-weight: 600;
}
</style>
