<script setup>
import { onMounted } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();

onMounted(() => {
  // Potentially trigger a haptic if the block says so
  if (props.block.haptic) {
    console.log("Haptic feedback triggered");
  }
});
</script>

<template>
  <div class="rep-feedback-container">
    <div class="feedback-icon" :class="block.animation">
      <div class="icon-circle">
        <i class="fas fa-check"></i>
      </div>
      <div class="ripple"></div>
    </div>
    <div class="feedback-text">
        <h2 class="serif">Session Recorded</h2>
        <p>Your repetitions have been synced to your identity map.</p>
    </div>
    
    <button class="continue-btn" @click="screenStore.handleAction({ type: 'back' })">
      Continue
    </button>
  </div>
</template>

<style scoped>
.rep-feedback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 40px;
  text-align: center;
  min-height: 400px;
}

.feedback-icon {
  position: relative;
  width: 120px;
  height: 120px;
}

.icon-circle {
  width: 100%;
  height: 100%;
  background: var(--gold-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #1a1a1a;
  z-index: 2;
  position: relative;
}

.ripple {
  position: absolute;
  inset: -20px;
  border: 1px solid var(--gold-accent);
  border-radius: 50%;
  animation: ripple 2s infinite ease-out;
  opacity: 0;
}

@keyframes ripple {
  0% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1.5); opacity: 0; }
}

.subtle_scale {
  animation: subtle-scale 2s infinite ease-in-out;
}

@keyframes subtle-scale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.feedback-text h2 {
  font-size: 32px;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.feedback-text p {
  color: var(--text-secondary);
  max-width: 250px;
  margin: 0 auto;
  line-height: 1.5;
}

.continue-btn {
  margin-top: 20px;
  padding: 16px 40px;
  border-radius: 30px;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-primary);
  font-size: 16px;
  cursor: pointer;
}
</style>
