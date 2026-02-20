<script setup>
import BlockRenderer from "../engine/BlockRenderer.vue";

defineProps({
  schema: Object,
});
</script>

<template>
  <div class="insights-container">
    <div class="header">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter(b => b.position === 'header')"
        :key="i"
        :block="block"
      />
    </div>

    <div class="main-stats">
       <div class="radar-placeholder">
          <!-- Placeholder for radar chart -->
          <div class="radar-dot"></div>
       </div>
    </div>

    <div class="insights-list">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter(b => !b.position || b.position === 'content')"
        :key="i"
        :block="block"
      />
    </div>

    <div class="footer">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter(b => b.position === 'footer')"
        :key="i"
        :block="block"
      />
    </div>
  </div>
</template>

<style scoped>
.insights-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px 24px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.header {
  margin-bottom: 32px;
  text-align: center;
}

.radar-placeholder {
  width: 100%;
  aspect-ratio: 1;
  border: 1px dashed var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
}

.radar-dot {
  width: 8px;
  height: 8px;
  background: var(--gold-accent);
  border-radius: 50%;
  box-shadow: 0 0 20px var(--gold-accent);
}

.insights-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer {
  margin-top: 40px;
  text-align: center;
}
</style>
