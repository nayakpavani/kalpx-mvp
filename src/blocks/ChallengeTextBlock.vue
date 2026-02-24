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
  <div class="challenge-text-block">
    <h2 class="serif-title">{{ text }}</h2>
  </div>
</template>

<style scoped>
.challenge-text-block {
  margin: 32px 0;
  padding: 32px 24px;
  background: #1F2937;
  border-radius: 18px;
  border: 1px solid #374151;
  width: 100%;
}

.serif-title {
  font-family: "Cormorant Garamond", serif;
  font-size: 30px;
  line-height: 1.3;
  color: #F3F4F6;
  text-align: center;
  margin: 0;
  font-weight: 500;
}
</style>
