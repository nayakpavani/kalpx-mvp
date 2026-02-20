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
  <button 
    :class="['primary-btn', block.style === 'gold' ? 'btn-gold btn-gold-pulse' : '']" 
    @click="handleClick"
  >
    <span>{{ block.label }}</span>
    <span v-if="block.label.includes('→')" class="arrow">→</span>
  </button>
</template>

<style scoped>
.primary-btn {
  padding: 14px 28px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background-color: var(--surface-1);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: var(--transition-base);
  width: 100%;
}

.primary-btn:hover {
  background-color: var(--surface-2);
  transform: translateY(-2px);
}

.primary-btn:active {
  transform: translateY(0);
}

.arrow {
  font-size: 18px;
  transition: transform 0.3s;
}

.primary-btn:hover .arrow {
  transform: translateX(5px);
}
</style>
