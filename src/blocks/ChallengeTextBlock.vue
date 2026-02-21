<script setup>
import { computed } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const text = computed(() => {
  if (props.block.text_key) {
    return screenStore.screenState[props.block.text_key];
  }
  return props.block.content;
});
</script>

<template>
  <div class="challenge-text">
    <h2 class="serif">{{ text }}</h2>
  </div>
</template>

<style scoped>
.challenge-text {
  margin: 24px 0;
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.challenge-text h2 {
  font-size: 28px;
  line-height: 1.4;
  color: var(--text-primary);
  text-align: center;
  margin: 0;
  font-style: italic;
  font-weight: 400;
}
</style>
