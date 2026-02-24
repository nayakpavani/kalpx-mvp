<script setup>
import BlockRenderer from "../engine/BlockRenderer.vue";

defineProps({
  schema: Object,
});
</script>

<template>
  <div class="choice-stack-container" :class="[`tone-${schema.tone || 'grounded'}`]">
    <div class="ambient-glow"></div>
    
    <div class="header">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter(b => b.position === 'header')"
        :key="'header-'+i"
        :block="block"
      />
    </div>

    <div class="content">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter(b => !b.position || b.position === 'content')"
        :key="'content-'+i"
        :block="block"
      />
    </div>

    <div class="footer">
       <div class="actions">
         <BlockRenderer
            v-for="(block, i) in schema.blocks.filter(b => b.position === 'footer')"
            :key="'footer-'+i"
            :block="block"
          />
       </div>
    </div>
  </div>
</template>

<style scoped>
.choice-stack-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  /* Spec: same as Portal for consistency */
  background: linear-gradient(180deg, #111827 0%, #0B1220 100%);
  display: flex;
  flex-direction: column;
  padding: 80px 24px 60px;
  max-width: 520px; /* Spec: 520px */
  margin: 0 auto;
  color: #F3F4F6;
  overflow-y: auto;
}

.ambient-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at 50% 30%,
    rgba(201, 168, 76, 0.04) 0%,
    transparent 70%
  );
}

.header {
  position: relative;
  z-index: 10;
  margin-bottom: 48px;
  text-align: center;
  animation: fade-in 0.8s ease-out forwards;
}

.content {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: fade-in 1s ease-out forwards;
}

.footer {
  position: relative;
  z-index: 10;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Typography Consistency with Portal specs */
:deep(.micro-label) {
  font-family: var(--font-sans);
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(243, 244, 246, 0.6);
  margin-bottom: 12px;
}

:deep(.headline) {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(30px, 7vw, 36px);
  font-weight: 500;
  line-height: 1.2;
  color: #F3F4F6;
}

:deep(.subtext) {
  font-family: var(--font-sans);
  font-size: 16px;
  color: rgba(243, 244, 246, 0.6);
  margin-top: 8px;
}
</style>
