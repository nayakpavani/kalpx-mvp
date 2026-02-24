<script setup>
import { useScreenStore } from "../store/screenStore";
import BlockRenderer from "../engine/BlockRenderer.vue";

defineProps({
  schema: Object,
});

const screenStore = useScreenStore();
</script>

<template>
  <div class="embodiment-runner-container" :class="[`tone-${schema.tone || 'high_focus'}`]">
    <div class="focus-header">
       <button class="ghost-exit-btn" @click="screenStore.handleAction({ type: 'back' })">
         <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
           <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="rgba(243, 244, 246, 0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
         <span>Cancel Challenge</span>
       </button>
    </div>

    <div class="active-stage">
      <BlockRenderer
        v-for="(block, i) in schema.blocks"
        :key="i"
        :block="block"
      />
    </div>

    <!-- Background Layer -->
    <div class="deep-vignette"></div>
  </div>
</template>

<style scoped>
.embodiment-runner-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: #0B1220; /* Spec: static deep blue #0B1220 */
  display: flex;
  flex-direction: column;
  padding: 0;
  color: #F3F4F6;
  overflow: hidden;
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

.active-stage {
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
  animation: challenge-enter 0.8s ease-out;
}

@keyframes challenge-enter {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

.deep-vignette {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
}

/* Typography Overrides */
:deep(.micro-label) {
  font-family: var(--font-sans);
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #C9A227;
  margin-bottom: 32px;
  opacity: 0.8;
}

:deep(.headline) {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(30px, 8vw, 36px);
  font-weight: 500;
  color: #F3F4F6;
  line-height: 1.2;
}

:deep(.subtext) {
  font-family: var(--font-sans);
  font-size: 16px;
  color: rgba(243, 244, 246, 0.5);
  margin-top: 12px;
}
</style>
