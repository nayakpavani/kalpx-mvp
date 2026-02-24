<script setup>
import BlockRenderer from "../engine/BlockRenderer.vue";

defineProps({
  schema: Object,
});
</script>

<template>
  <div class="routine-builder-container" :class="[`tone-${schema.tone || 'precise'}`]">
    <div class="ambient-glow"></div>
    
    <div class="builder-stack">
      <BlockRenderer
        v-for="(block, i) in schema.blocks"
        :key="i"
        :block="block"
      />
    </div>
  </div>
</template>

<style scoped>
.routine-builder-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #111827 0%, #0B1220 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 60px;
  color: #F3F4F6;
  overflow: hidden;
}

.ambient-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at 50% 25%,
    rgba(201, 168, 76, 0.05) 0%,
    transparent 70%
  );
}

.builder-stack {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 520px; /* Spec consistency: 520px */
  display: flex;
  flex-direction: column;
  gap: 32px;
  text-align: center;
  animation: fade-up 0.8s ease-out;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Typography Consistency */
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
  font-size: 34px;
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

/* Primary Button for Builder specifically */
:deep(.primary-button) {
  margin-top: 16px;
  background: #1F2937 !important;
  border-radius: 14px !important;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
}
</style>
