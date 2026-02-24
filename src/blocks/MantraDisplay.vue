<script setup>
import { computed } from "vue";

const props = defineProps({
  block: Object,
});

const mantraText = computed(() => props.block.content || "OM");
</script>

<template>
  <div class="mantra-showcase">
    <h1 class="mantra-serif">{{ mantraText }}</h1>
  </div>
</template>

<style scoped>
.mantra-showcase {
  padding: 32px 24px;
  text-align: center;
  width: 100%;
}

.mantra-serif {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(34px, 8vw, 44px);
  color: #F3F4F6;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: 0.5px;
  animation: serene-breathe 4s infinite ease-in-out;
}

@keyframes serene-breathe {
  0%, 100% { opacity: 0.7; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-2px); }
}
</style>
