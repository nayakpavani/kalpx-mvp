<script setup>
import BlockRenderer from "../engine/BlockRenderer.vue";

defineProps({
  schema: Object,
});
</script>

<template>
  <div class="sadhana-deepen-container">
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
.sadhana-deepen-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-gradient);
  min-height: 100vh;
}

.scroll-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 40px 24px;
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

/* Custom styling specifically tuned for the 'Strengthen What You Have Begun' page context */
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
  font-size: 26px;
  color: #3d3b38;
  margin-bottom: 24px;
}  

:deep(.header .subtext:not(.small-text)) {
  font-size: 14px;
  color: #3d3b38;
  margin: 0 auto;
  max-width: 250px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}

.footer-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* Base override to give footer primary buttons the same layout styles */
:deep(.footer-actions .gold-btn) {
  width: 100%;
}

:deep(.footer-actions .subtext.link-text) {
  font-family: var(--font-serif);
  font-size: 13px;
  color: #8c8881;
}
</style>
