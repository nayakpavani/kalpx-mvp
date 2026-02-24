<script setup>
import BlockRenderer from "../engine/BlockRenderer.vue";

const props = defineProps({
  schema: Object,
});
</script>

<template>
  <div class="composer-container" :class="[`tone-${schema.tone || 'quiet'}`]">
    <div class="vignette-overlay"></div>
    
    <div class="centered-stack">
      <BlockRenderer
        v-for="(block, i) in props.schema.blocks"
        :key="i"
        :block="block"
      />
    </div>
  </div>
</template>

<style scoped>
.composer-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #111827 0%, #0B1220 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #F3F4F6;
  overflow: hidden;
}

.vignette-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  /* Spec: vignette opacity 0.07 */
  background: radial-gradient(
    circle at center,
    transparent 0%,
    rgba(0, 0, 10, 0.4) 100%
  );
  opacity: 0.7;
}

.centered-stack {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 520px; /* Spec: 520px */
  padding: 40px 24px;
  text-align: center;
  animation: fade-focus 1s ease-out;
}

@keyframes fade-focus {
  from { opacity: 0; transform: scale(0.98); filter: blur(4px); }
  to { opacity: 1; transform: scale(1); filter: blur(0); }
}

/* Typography Overrides */
:deep(.micro-label) {
  font-family: var(--font-sans);
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(243, 244, 246, 0.5);
  margin-bottom: 8px;
}

:deep(.headline) {
  font-family: "Cormorant Garamond", serif;
  font-size: 36px;
  font-weight: 500;
  color: #F3F4F6;
  line-height: 1.2;
}

:deep(.subtext) {
  font-family: var(--font-sans);
  font-size: 16px;
  color: rgba(243, 244, 246, 0.6);
  margin-top: 4px;
}

/* Button override for Composer specifically if needed */
:deep(.primary-button) {
  max-width: 280px;
  margin: 16px auto 0;
  background: #1F2937 !important;
  border-radius: 14px !important;
}
</style>
