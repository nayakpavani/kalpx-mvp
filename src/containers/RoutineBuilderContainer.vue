<script setup>
import BlockRenderer from "../engine/BlockRenderer.vue";

defineProps({
  schema: Object,
});
</script>

<template>
  <div class="routine-builder">
    <div class="header">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter(b => b.position === 'header')"
        :key="i"
        :block="block"
      />
    </div>

    <div class="options">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter(b => b.type === 'choice_card')"
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
.routine-builder {
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

.options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer {
  margin-top: 40px;
  text-align: center;
}
</style>
