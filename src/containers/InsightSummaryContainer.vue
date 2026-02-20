<script setup>
import BlockRenderer from "../engine/BlockRenderer.vue";

defineProps({
  schema: Object,
});
</script>

<template>
  <div class="insight-container">
    <div class="scroll-wrapper">
      <div class="header">
        <BlockRenderer
          v-for="(block, i) in schema.blocks.filter(b => b.position === 'header')"
          :key="'head-'+i"
          :block="block"
        />
      </div>

      <div class="main-content">
        <div 
          v-for="(block, i) in schema.blocks.filter(b => b.position === 'content' || !b.position)"
          :key="'content-'+i"
          class="insight-block-wrapper"
        >
          <!-- Special wrapper for insight cards to give them specific styling -->
          <div v-if="block.type === 'insight_card'" class="insight-card">
            <BlockRenderer :block="block" />
          </div>
          <!-- Special wrapper for charts/graphs -->
          <div v-else-if="block.type === 'trend_chart'" class="chart-wrapper">
            <BlockRenderer :block="block" />
          </div>
          <BlockRenderer v-else :block="block" />
        </div>
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
.insight-container {
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

/* Base headline styling overrides for insights */
:deep(.header .subtext.small-text) {
  font-family: var(--font-sans);
  font-size: 10px;
  letter-spacing: 2px;
  color: #a8a49d;
  margin-bottom: 8px;
  text-transform: uppercase;
}

:deep(.header .headline) {
  font-family: var(--font-serif);
  font-size: 28px;
  color: #3d3b38;
  margin-bottom: 8px;
}

:deep(.header .subtext.italic-text) {
  font-family: var(--font-serif);
  font-size: 14px;
  color: #8c8881;
  font-style: italic;
  margin-bottom: 24px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Styling for insight cards (the floating content boxes) */
.insight-card {
  background: white;
  border: 1px solid rgba(191, 165, 138, 0.2);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
}

/* Gold accent bar for highlighted cards */
.insight-card:first-child::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10%;
  bottom: 10%;
  width: 4px;
  background: var(--gold-gradient);
  border-radius: 0 4px 4px 0;
}

.chart-wrapper {
  margin: 16px 0 24px;
}

.footer-actions {
  margin-top: 48px;
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

:deep(.footer-actions .subtext.italic-text) {
  font-family: var(--font-serif);
  font-size: 14px;
  color: #8c8881;
  font-style: italic;
  margin-top: 16px;
}
</style>
