<script setup>
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();

function handleClick() {
  const dynamicAction = props.block.id ? screenStore.screenState[props.block.id + '_action'] : null;
  screenStore.handleAction(dynamicAction || props.block.action);
}
</script>

<template>
  <button 
    :class="[
      'primary-btn', 
      block.style === 'gold' ? 'btn-gold btn-gold-pulse' : '',
      block.style === 'outline' ? 'btn-outline' : ''
    ]" 
    @click="handleClick"
  >
    <span>{{ block.id && screenStore.screenState[block.id + '_label'] ? screenStore.screenState[block.id + '_label'] : block.label }}</span>
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

.btn-outline {
  background: white;
  border: 1px solid var(--gold-accent, #c9a84c);
  color: #3d3b38;
}

.btn-outline:hover {
  background: rgba(201, 168, 76, 0.05);
}

.arrow {
  font-size: 18px;
  transition: transform 0.3s;
}

.primary-btn:hover .arrow {
  transform: translateX(5px);
}
</style>
