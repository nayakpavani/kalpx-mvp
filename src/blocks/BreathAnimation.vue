<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const currentCycle = ref(1);
const totalCycles = props.block.cycles || 3;
const phase = ref("wait"); // wait, inhale, hold, exhale
// const progress = ref(0);

let timer = null;

function startBreathing() {
  phase.value = "inhale";
  runPhase();
}

async function runPhase() {
  if (currentCycle.value > totalCycles) {
    if (screenStore.currentScreen.on_complete) {
      screenStore.handleAction(screenStore.currentScreen.on_complete);
    }
    return;
  }

  // Inhale (4s)
  phase.value = "inhale";
  await delay(4000);

  // Hold (4s)
  phase.value = "hold";
  await delay(4000);

  // Exhale (4s)
  phase.value = "exhale";
  await delay(4000);

  currentCycle.value++;
  runPhase();
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

onMounted(() => {
  setTimeout(startBreathing, 1000);
});

onUnmounted(() => {
  clearTimeout(timer);
});

const phaseText = {
  wait: "Prepare...",
  inhale: "Inhale slowly",
  hold: "Hold with awareness",
  exhale: "Exhale completely",
};
</script>

<template>
  <div class="breath-animation-block">
    <div class="cycle-counter">
      Cycle {{ Math.min(currentCycle, totalCycles) }} of {{ totalCycles }}
    </div>

    <div class="orb-container">
      <div class="breath-orb" :class="phase">
        <div class="orb-inner"></div>
        <div class="orb-glow"></div>
      </div>
    </div>

    <div class="phase-text serif">{{ phaseText[phase] }}</div>
  </div>
</template>

<style scoped>
.breath-animation-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 20px 0;
  width: 100%;
}

.cycle-counter {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-secondary);
  opacity: 0.6;
}

.orb-container {
  position: relative;
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.breath-orb {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--gold-gradient);
  position: relative;
  transition: transform 4s linear;
}

.orb-inner {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: white;
  opacity: 0.1;
}

.orb-glow {
  position: absolute;
  inset: -20px;
  background: var(--gold-accent);
  filter: blur(40px);
  opacity: 0.2;
  border-radius: 50%;
  transition: opacity 4s linear;
}

/* Phases */
.breath-orb.inhale {
  transform: scale(2.2);
}

.breath-orb.exhale {
  transform: scale(1);
}

.breath-orb.hold {
  transform: scale(2.2);
}

.breath-orb.hold .orb-glow {
  opacity: 0.5;
}

.phase-text {
  font-size: 28px;
  color: var(--text-primary);
  font-weight: 300;
  height: 40px;
}
</style>
