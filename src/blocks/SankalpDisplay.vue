<script setup>
import { computed } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const text = computed(() => screenStore.screenState[props.block.text_key] || props.block.content || "...");
</script>

<template>
  <div class="sankalp-display">
    <div class="quote-mark">“</div>
    <h1 class="sankalp-text serif">{{ text }}</h1>
    <div class="quote-mark bottom">”</div>
  </div>
</template>

<style scoped>
.sankalp-display {
  padding: 40px 20px;
  text-align: center;
  position: relative;
}

.sankalp-text {
  font-size: 36px;
  line-height: 1.3;
  color: var(--text-primary);
  font-style: italic;
  font-weight: 300;
  max-width: 800px;
  margin: 0 auto;
}

.quote-mark {
  font-family: var(--font-serif);
  font-size: 80px;
  color: var(--gold-accent);
  opacity: 0.2;
  line-height: 1;
}

.quote-mark.bottom {
  text-align: right;
  margin-top: -20px;
}
</style>
