<script setup>
import BlockRenderer from "../engine/BlockRenderer.vue";

const props = defineProps({
  schema: Object,
});
</script>

<template>
  <div class="composer-container">
    <div class="composer-content">
      <BlockRenderer
        v-for="(block, i) in props.schema.blocks"
        :key="'cont-' + i"
        :block="block"
      />
    </div>
  </div>
</template>

<style scoped>
.composer-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 32px 24px;
  box-sizing: border-box;
}

.composer-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
}
</style>
