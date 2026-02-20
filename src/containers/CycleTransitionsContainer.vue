<script setup>
import BlockRenderer from "../engine/BlockRenderer.vue";

defineProps({
  schema: Object,
});
</script>

<template>
  <div class="transition-container">
    <div class="intervention-card">
      <div class="header">
        <span class="tag">{{ schema.tag || 'AI INTERVENTION' }}</span>
        <BlockRenderer
          v-for="(block, i) in schema.blocks.filter(b => b.position === 'header')"
          :key="i"
          :block="block"
        />
      </div>

      <div class="content">
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
  </div>
</template>

<style scoped>
.transition-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.intervention-card {
  background: var(--surface-1);
  backdrop-filter: var(--glass-effect);
  -webkit-backdrop-filter: var(--glass-effect);
  border-radius: 20px;
  padding: 40px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 30px 60px rgba(0,0,0,0.2);
  border: 1px solid var(--border-color);
  text-align: center;
}

.tag {
  font-size: 10px;
  letter-spacing: 2.5px;
  color: #bfa58a;
  margin-bottom: 24px;
  display: block;
  font-weight: 700;
  text-transform: uppercase;
}

.content {
  margin: 24px 0;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
