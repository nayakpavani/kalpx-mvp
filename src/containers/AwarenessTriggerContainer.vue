<script setup>
import { useScreenStore } from "../store/screenStore";
import BlockRenderer from "../engine/BlockRenderer.vue";

defineProps({
  schema: Object,
});

const screenStore = useScreenStore();
</script>

<template>
  <div class="awareness-trigger-container" :class="[`tone-${schema.tone || 'supportive'}`]">
    <div class="ambient-glow"></div>
    
    <div class="focus-header">
       <button class="ghost-exit-btn" @click="screenStore.handleAction({ type: 'back' })">
         <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
           <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="rgba(243, 244, 246, 0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
         <span>Cancel</span>
       </button>
    </div>

    <div class="trigger-stage">
      <BlockRenderer
        v-for="(block, i) in schema.blocks"
        :key="i"
        :block="block"
      />
    </div>
  </div>
</template>

<style scoped>
.awareness-trigger-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #111827 0%, #0B1220 100%);
  display: flex;
  flex-direction: column;
  padding: 0;
  color: #F3F4F6;
  overflow: hidden;
}

.ambient-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at 50% 15%,
    rgba(201, 168, 76, 0.05) 0%,
    transparent 60%
  );
}

.focus-header {
  position: relative;
  z-index: 20;
  padding: 40px 24px;
  display: flex;
  justify-content: flex-start;
}

.ghost-exit-btn {
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(243, 244, 246, 0.4);
  font-family: var(--font-sans);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
}

.trigger-stage {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  width: 100%;
  max-width: 520px; /* Spec: 520px */
  margin: 0 auto;
  text-align: center;
  animation: trigger-enter 0.8s ease-out;
}

@keyframes trigger-enter {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Typography Overrides */
:deep(.micro-label) {
  font-family: var(--font-sans);
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(243, 244, 246, 0.5);
  margin-bottom: 24px;
}

:deep(.headline) {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(32px, 9vw, 38px);
  font-weight: 500;
  color: #F3F4F6;
  line-height: 1.2;
}

:deep(.subtext) {
  font-family: var(--font-sans);
  font-size: 16px;
  color: rgba(243, 244, 246, 0.6);
  margin-top: 12px;
  line-height: 1.5;
}
</style>
