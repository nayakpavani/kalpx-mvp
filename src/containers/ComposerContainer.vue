<script setup>
import BlockRenderer from "../engine/BlockRenderer.vue";

const props = defineProps({
  schema: Object,
});
</script>

<template>
  <div>
    <BlockRenderer
      v-for="(block, i) in props.schema.blocks"
      :key="'cont-' + i"
      :block="block"
    />
  </div>
</template>
