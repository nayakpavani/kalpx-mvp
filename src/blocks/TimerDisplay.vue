<script setup>
import { ref, computed, onUnmounted, watch } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();

// duration_key might be something like "anchor_duration" which is "14 Minutes"
const rawDuration = screenStore.screenState[props.block.duration_key] || "5:00";
const initialSeconds = computed(() => {
  if (typeof rawDuration === 'number') return rawDuration;
  if (rawDuration.includes('Minute')) {
    return parseInt(rawDuration) * 60;
  }
  if (rawDuration.includes(':')) {
    const [m, s] = rawDuration.split(':').map(Number);
    return (m * 60) + (s || 0);
  }
  return 300;
});

const timeLeft = ref(initialSeconds.value);
const isRunning = ref(false);
let timer = null;

const displayTime = computed(() => {
  const m = Math.floor(timeLeft.value / 60);
  const s = timeLeft.value % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
});

function startTimer() {
  if (isRunning.value) return;
  isRunning.value = true;
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      stopTimer();
      // Handle completion - look for on_complete in current screen
      if (screenStore.currentScreen.on_complete) {
        screenStore.handleAction(screenStore.currentScreen.on_complete);
      }
    }
  }, 1000);
}

function stopTimer() {
  isRunning.value = false;
  if (timer) clearInterval(timer);
}

// Watch for control events from sister component
watch(() => screenStore.screenState['timer_control_event'], (event) => {
  if (!event) return;
  if (event === 'start' || event === 'resume') startTimer();
  if (event === 'pause') stopTimer();
  // Reset event
  screenStore.setScreenValue(null, 'timer_control_event');
});

onUnmounted(() => {
  stopTimer();
});
</script>

<template>
  <div class="timer-display-block">
    <div class="timer-circle">
      <svg class="timer-svg" viewBox="0 0 100 100">
        <circle class="timer-bg" cx="50" cy="50" r="48" />
        <circle 
          class="timer-progress" 
          cx="50" 
          cy="50" 
          r="48" 
          :style="{ strokeDashoffset: 301.59 * (1 - timeLeft / initialSeconds) }"
        />
      </svg>
      <div class="time-text">{{ displayTime }}</div>
    </div>
  </div>
</template>

<style scoped>
.timer-display-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
}

.timer-circle {
  position: relative;
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-svg {
  position: absolute;
  inset: 0;
  transform: rotate(-90deg);
}

.timer-bg {
  fill: none;
  stroke: var(--border-color);
  stroke-width: 2;
  opacity: 0.2;
}

.timer-progress {
  fill: none;
  stroke: var(--gold-accent);
  stroke-width: 2;
  stroke-dasharray: 301.59;
  transition: stroke-dashoffset 1s linear;
}

.time-text {
  font-family: var(--font-outfit);
  font-size: 64px;
  font-weight: 200;
  color: var(--text-primary);
  letter-spacing: -2px;
}
</style>
