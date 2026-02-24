<script setup>
import { computed } from "vue";

const props = defineProps({
  block: Object,
});

const sankalpText = computed(() => props.block.content || "...");
</script>

<template>
  <div class="sankalp-wrap">
    <div class="sacred-vignette"></div>
    <div class="content-box">
      <h2 class="sankalp-serif">{{ sankalpText }}</h2>
    </div>
  </div>
</template>

<style scoped>
.sankalp-wrap {
  position: relative;
  padding: 60px 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
}

.sacred-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(201, 162, 39, 0.05) 0%, transparent 80%);
  pointer-events: none;
}

.content-box {
  position: relative;
  z-index: 2;
  max-width: 480px;
  animation: focus-entrance 1.5s ease-out;
}

.sankalp-serif {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(28px, 8vw, 36px);
  font-weight: 500;
  line-height: 1.4;
  color: #F3F4F6;
  margin: 0;
  letter-spacing: -0.2px;
}

@keyframes focus-entrance {
  from { opacity: 0; filter: blur(4px); transform: translateY(10px); }
  to { opacity: 1; filter: blur(0); transform: translateY(0); }
}
</style>
