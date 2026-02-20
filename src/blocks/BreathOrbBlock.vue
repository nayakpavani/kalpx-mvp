<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  block: Object,
});

const currentPhase = ref("Inhale");

onMounted(() => {
  setInterval(() => {
    if (currentPhase.value === "Inhale") currentPhase.value = "Hold";
    else if (currentPhase.value === "Hold") currentPhase.value = "Exhale";
    else currentPhase.value = "Inhale";
  }, 4000);
});
</script>

<template>
  <div class="orb-wrapper">
    <div class="glowing-orb">
      <div class="sankalpa-text serif">
        {{ props.block.sankalpa_text }}
      </div>
      <p class="return-hint">Return to this.</p>
    </div>

    <div class="breath-labels">
      <span :class="{ active: currentPhase === 'Inhale' }">Inhale</span>
      <span :class="{ active: currentPhase === 'Hold' }">Hold</span>
      <span :class="{ active: currentPhase === 'Exhale' }">Exhale</span>
    </div>
  </div>
</template>

<style scoped>
.orb-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin: 40px 0;
}

.glowing-orb {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  border: 1px solid rgba(200, 160, 100, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  box-shadow: 0 0 60px rgba(200, 161, 100, 0.15),
    inset 0 0 40px rgba(200, 161, 100, 0.1);
  animation: orbPulse 8s infinite ease-in-out;
}

.glowing-orb::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(201, 162, 39, 0.4),
    transparent
  );
  animation: rotateOrb 10s linear infinite;
}

.sankalpa-text {
  font-size: 24px;
  text-align: center;
  line-height: 1.4;
  color: #f1ebd9;
  z-index: 2;
}

.return-hint {
  margin-top: 16px;
  font-size: 14px;
  color: #bfa58a;
  font-style: italic;
  z-index: 2;
}

.breath-labels {
  display: flex;
  gap: 40px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.breath-labels span.active {
  color: var(--gold-accent);
  text-shadow: 0 0 10px rgba(201, 162, 39, 0.5);
}

@keyframes orbPulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 60px rgba(200, 161, 100, 0.15);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 100px rgba(200, 161, 100, 0.25);
  }
}

@keyframes rotateOrb {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
