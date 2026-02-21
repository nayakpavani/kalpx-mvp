<script setup>
import { computed } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const text = computed(() => screenStore.screenState[props.block.text_key] || "OM");
</script>

<template>
  <div class="mantra-display">
    <h1 class="mantra-text serif">{{ text }}</h1>
  </div>
</template>

<style scoped>
.mantra-display {
  padding: 40px 20px;
  text-align: center;
}

.mantra-text {
  font-size: 48px;
  color: var(--text-primary);
  letter-spacing: 2px;
  font-weight: 300;
  text-transform: uppercase;
  animation: pulse-glow 3s infinite ease-in-out;
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; text-shadow: 0 0 20px var(--gold-accent); }
}
</style>
