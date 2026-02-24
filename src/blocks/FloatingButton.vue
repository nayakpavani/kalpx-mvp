<script setup>
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();

function handleClick() {
  screenStore.handleAction(props.block.action);
}
</script>

<template>
  <button class="sacred-floating-btn" @click="handleClick">
    <div class="glow-ring"></div>
    <span class="btn-label">{{ block.label }}</span>
  </button>
</template>

<style scoped>
.sacred-floating-btn {
  position: relative;
  background: rgba(11, 18, 32, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(201, 162, 39, 0.3);
  padding: 10px 20px;
  border-radius: 20px;
  color: #F3F4F6;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.sacred-floating-btn:hover {
  transform: translateY(-2px);
  border-color: #C9A227;
  color: #C9A227;
  box-shadow: 0 8px 20px rgba(201, 162, 39, 0.1);
}

.glow-ring {
  position: absolute;
  inset: -2px;
  border-radius: 32px;
  border: 1px solid #C9A227;
  opacity: 0;
  animation: button-breathe 3s infinite ease-out;
}

@keyframes button-breathe {
  0% { transform: scale(1); opacity: 0; }
  50% { opacity: 0.3; }
  100% { transform: scale(1.1); opacity: 0; }
}

.btn-label {
  position: relative;
  z-index: 2;
}

/* Ensure it doesn't overlap with main footer if present */
@media (max-width: 600px) {
  .sacred-floating-btn {
    bottom: 40px;
  }
}
</style>
