<script setup>
import BlockRenderer from "../engine/BlockRenderer.vue";

defineProps({
  schema: Object,
});
</script>

<template>
  <div class="routine-locked">
    <div class="header">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter(b => b.position === 'header')"
        :key="i"
        :block="block"
      />
    </div>

    <div class="locked-summary">
       <div class="summary-card">
          <p class="label">Sankalp</p>
          <p class="value">{{ schema.sankalp }}</p>
          <div class="divider"></div>
          <p class="label">Mantra</p>
          <p class="value">{{ schema.mantra_reps }} repetitions</p>
          <div class="divider"></div>
          <p class="label">Anchor</p>
          <p class="value">{{ schema.anchor_duration }} minutes</p>
       </div>
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
.routine-locked {
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

.summary-card {
  background: white;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}

.label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #999;
  margin: 16px 0 4px;
}

.label:first-child {
  margin-top: 0;
}

.value {
  font-size: 18px;
  color: #1a1a1a;
  margin: 0;
  font-family: var(--font-serif);
}

.divider {
  height: 1px;
  background: #eee;
  margin: 16px 0;
}

.footer {
  margin-top: 40px;
  text-align: center;
}
</style>
