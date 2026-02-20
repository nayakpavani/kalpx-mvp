<script setup>
import { onMounted, ref } from "vue";
import { useScreenStore } from "../store/screenStore";
import BlockRenderer from "../engine/BlockRenderer.vue";

const props = defineProps({
  schema: Object,
});

const screenStore = useScreenStore();
const isFadingOut = ref(false);

onMounted(() => {
  // Show the logo for 2 seconds, then fade out, then navigate
  setTimeout(() => {
    isFadingOut.value = true;
    
    // Wait for the fade out animation to finish, then go to dashboard
    setTimeout(() => {
      screenStore.handleAction({ type: "navigate", target: "dashboard" });
    }, 1000); // 1 second for the fade out transition
  }, 2000); // 2 seconds display time before starting to fade
});
</script>

<template>
  <div class="portal-splash-page" :class="{ 'fade-out': isFadingOut }">
    <div class="ambient-glow"></div>
    <div class="content-wrapper">
      <div class="logo-section bounce-in">
        <BlockRenderer
          v-for="(block, i) in props.schema.blocks"
          :key="'logo-' + i"
          :block="block"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.portal-splash-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: #111417;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity 1s ease-in-out;
  opacity: 1;
}

.portal-splash-page.fade-out {
  opacity: 0;
}

.ambient-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
      ellipse 55% 50% at 50% 50%,
      rgba(201, 168, 76, 0.15) 0%,
      transparent 70%
    ),
    radial-gradient(ellipse 100% 100% at 50% 50%, #0e1012 55%, #080a0c 100%);
  animation: pulse-glow 3s infinite alternate ease-in-out;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-section.bounce-in {
  /* Scale up from small to normal size, with a slight bounce at the end */
  animation: logo-reveal 1.5s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
  opacity: 0;
  transform: scale(0.8);
}

@keyframes logo-reveal {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  60% {
    opacity: 1;
    transform: scale(1.05) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes pulse-glow {
  0% {
    opacity: 0.6;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1.05);
  }
}
</style>
