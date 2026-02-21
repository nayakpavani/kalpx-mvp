<script setup>
import { ref } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const count = ref(0);
const total = props.block.total || 9;

function logRep() {
  if (count.value < total) {
    count.value++;
    if (count.value === total) {
      setTimeout(() => {
        const onComplete = screenStore.currentScreen.on_complete || props.block.on_complete;
        if (onComplete) {
          screenStore.handleAction(onComplete);
        }
      }, 500);
    }
  }
}
</script>

<template>
  <div class="rep-counter-block" @click="logRep">
    <div class="counter-display">
      <span class="current">{{ count }}</span>
      <span class="separator">/</span>
      <span class="total">{{ total }}</span>
    </div>
    <div class="tap-target">
      <div class="rings">
        <div class="ring" v-for="i in 3" :key="i" :style="{ animationDelay: `${i * 0.5}s` }"></div>
      </div>
      <div class="tap-label">Tap</div>
    </div>
  </div>
</template>

<style scoped>
.rep-counter-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  cursor: pointer;
  padding: 20px;
  width: 100%;
}

.counter-display {
  font-family: var(--font-outfit);
  font-size: 32px;
  display: flex;
  gap: 8px;
  align-items: baseline;
  color: var(--text-primary);
}

.current {
  font-size: 64px;
  font-weight: 300;
  color: var(--gold-accent);
}

.separator {
  opacity: 0.3;
}

.total {
  opacity: 0.5;
}

.tap-target {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rings {
  position: absolute;
  inset: 0;
}

.ring {
  position: absolute;
  inset: 0;
  border: 1px solid var(--gold-accent);
  border-radius: 50%;
  opacity: 0;
  animation: ring-pulse 2s infinite ease-out;
}

@keyframes ring-pulse {
  0% { transform: scale(0.5); opacity: 0.8; }
  100% { transform: scale(1.5); opacity: 0; }
}

.tap-label {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--gold-accent);
  font-weight: 600;
  z-index: 2;
}
</style>
