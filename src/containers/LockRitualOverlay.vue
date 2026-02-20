<script setup>
import { ref } from "vue";
import BlockRenderer from "../engine/BlockRenderer.vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  schema: Object,
});

const screenStore = useScreenStore();
const progress = ref(0);
const isHolding = ref(false);
let interval = null;

function startHold() {
  isHolding.value = true;
  interval = setInterval(() => {
    progress.value += 5;
    if (progress.value >= 100) {
      clearInterval(interval);
      screenStore.handleAction(props.schema.lock_action);
    }
  }, 50);
}

function stopHold() {
  isHolding.value = false;
  clearInterval(interval);
  if (progress.value < 100) {
    progress.value = 0;
  }
}
</script>

<template>
  <div class="lock-ritual-container">
    <div class="header">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter(b => b.position === 'header')"
        :key="i"
        :block="block"
      />
    </div>

    <div class="ritual-center">
      <div 
        class="hold-button-wrap"
        @mousedown="startHold"
        @mouseup="stopHold"
        @mouseleave="stopHold"
        @touchstart="startHold"
        @touchend="stopHold"
      >
        <div class="progress-ring" :style="{ height: progress + '%' }"></div>
        <button class="lock-btn" :class="{ holding: isHolding }">
          {{ isHolding ? 'Committing...' : schema.button_label || 'Hold to Lock' }}
        </button>
      </div>
      <p class="hint">Structure builds identity.</p>
    </div>

    <div class="footer">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter(b => b.position === 'footer')"
        :key="i"
        :block="block"
      />
    </div>
  </div>
</template>

<style scoped>
.lock-ritual-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 24px;
  background: radial-gradient(circle at center, #111827 0%, #000 100%);
}

.header {
  margin-bottom: 60px;
  text-align: center;
}

.ritual-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.hold-button-wrap {
  position: relative;
  width: 250px;
  height: 60px;
  border-radius: 30px;
  overflow: hidden;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: var(--gold-gradient);
  transition: height 0.05s linear;
  opacity: 0.3;
  pointer-events: none;
}

.lock-btn {
  background: none;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 18px;
  z-index: 2;
  pointer-events: none;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.hint {
  color: rgba(255,255,255,0.4);
  font-size: 14px;
  margin-top: 20px;
}

.footer {
  margin-top: 60px;
}
</style>
