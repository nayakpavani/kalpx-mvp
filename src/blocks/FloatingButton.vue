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
  <button class="floating-btn" @click="handleClick">
    <span class="pulse-bg"></span>
    <span class="btn-label">{{ block.label }}</span>
  </button>
</template>

<style scoped>
.floating-btn {
  position: fixed;
  bottom: 100px; /* Above dev tools */
  left: 50%;
  transform: translateX(-50%);
  background: rgba(17, 20, 23, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(232, 192, 96, 0.3);
  padding: 12px 24px;
  border-radius: 40px;
  color: #E8C060;
  font-family: var(--font-outfit);
  font-size: 13px;
  letter-spacing: 1px;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.floating-btn:hover {
  background: rgba(232, 192, 96, 0.1);
  border-color: #E8C060;
  transform: translateX(-50%) translateY(-2px);
}

.pulse-bg {
  position: absolute;
  inset: 0;
  border-radius: 40px;
  background: #E8C060;
  opacity: 0.1;
  animation: bg-pulse 2s infinite;
}

@keyframes bg-pulse {
  0% { transform: scale(1); opacity: 0.1; }
  50% { transform: scale(1.05); opacity: 0.15; }
  100% { transform: scale(1); opacity: 0.1; }
}
</style>
