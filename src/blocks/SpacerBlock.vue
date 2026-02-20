<script setup>
defineProps({
  block: Object,
});
</script>

<template>
  <div class="spacer" :style="{ height: (block.size || 24) + 'px' }"></div>
</template>

<style scoped>
.spacer {
  width: 100%;
}
</style>
