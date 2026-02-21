<script setup>
import BlockRenderer from "../engine/BlockRenderer.vue";

defineProps({
  schema: Object,
});
</script>

<template>
  <div class="routine-builder">
    <div class="content">
      <BlockRenderer
        v-for="(block, i) in schema.blocks"
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

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
