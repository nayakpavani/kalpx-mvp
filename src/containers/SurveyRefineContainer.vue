<script setup>
import BlockRenderer from "../engine/BlockRenderer.vue";

defineProps({
  schema: Object,
});
</script>

<template>
  <div class="survey-refine-container">
    <div class="scroll-wrapper">
      <div class="header">
        <BlockRenderer
          v-for="(block, i) in schema.blocks.filter(b => b.position === 'header')"
          :key="'head-'+i"
          :block="block"
        />
      </div>

      <div class="main-content">
        <BlockRenderer
          v-for="(block, i) in schema.blocks.filter(b => b.position === 'content' || !b.position)"
          :key="'content-'+i"
          :block="block"
        />
      </div>

      <div class="footer-actions">
        <div class="divider">
          <div class="diamond"></div>
        </div>
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
.survey-refine-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-gradient);
  min-height: 100vh;
}

.scroll-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 40px 24px 60px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  margin-bottom: 32px;
  text-align: center;
}

:deep(.header .headline) {
  font-family: var(--font-serif);
  font-size: 26px;
  color: #3d3b38;
  margin-bottom: 12px;
}

:deep(.header .subtext) {
  font-size: 14px;
  color: #8c8881;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
}

/* Custom styling for cards inside the refinement flow */
:deep(.choice-stack) {
  gap: 16px;
}

:deep(.choice-card) {
  background: white;
  border: 1px solid rgba(191, 165, 138, 0.2);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.divider {
  width: 100%;
  position: relative;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(191, 165, 138, 0.3) 50%,
    transparent 100%
  );
  margin: 0 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.diamond {
  width: 6px;
  height: 6px;
  background: #bfa58a;
  transform: rotate(45deg);
}
</style>
