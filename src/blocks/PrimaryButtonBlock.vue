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
    class="primary-button-root"
    :class="[
      block.style_variant === 'gold' ? 'variant-gold' : 'variant-slate',
      block.style_variant === 'outline' ? 'variant-outline' : ''
    ]"
    :style="block.style"
    @click="handleClick"
  >
    <div class="inner-stack">
      <span class="main-label">{{ block.id && screenStore.screenState[block.id + '_label'] ? screenStore.screenState[block.id + '_label'] : block.label }}</span>
      <span v-if="block.subtext" class="sub-label">{{ block.subtext }}</span>
    </div>
  </button>
</template>

<style scoped>
.primary-button-root {
  width: 100%;
  max-width: 400px;
  min-height: 56px;
  padding: 12px 32px;
  border-radius: 14px; /* Spec: 14px */
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 0;
}

.inner-stack {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.main-label {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.sub-label {
  font-family: var(--font-sans);
  font-size: 11px;
  opacity: 0.6;
  text-transform: none;
  letter-spacing: 0.5px;
}

/* Variant: Slate (Default) */
.variant-slate {
  background: #1F2937;
  border-color: #4B5563;
  color: #F3F4F6;
}

.variant-slate:hover {
  background: #273244;
  border-color: #6B7280;
  transform: translateY(-1px);
}

/* Variant: Gold */
.variant-gold {
  background: #C9A227; /* Spec Focus Gold */
  color: #111827;
  box-shadow: 0 4px 20px rgba(201, 162, 39, 0.2);
}

.variant-gold:hover {
  background: #D4AF37;
  transform: translateY(-1px);
  box-shadow: 0 6px 25px rgba(201, 162, 39, 0.3);
}

/* Variant: Outline */
.variant-outline {
  background: transparent !important;
  border: 1px solid rgba(243, 244, 246, 0.3);
  color: #F3F4F6;
  box-shadow: none !important;
}

.variant-outline:hover {
  background: rgba(243, 244, 246, 0.05) !important;
  border-color: rgba(243, 244, 246, 0.6);
}

.primary-button-root:active {
  transform: scale(0.98) !important;
}
</style>
