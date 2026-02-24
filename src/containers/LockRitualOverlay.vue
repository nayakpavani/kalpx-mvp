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
      const lockAction = props.schema.lock_action || props.schema.blocks?.find(b => b.type === 'hold_button')?.on_complete;
      screenStore.handleAction(lockAction);
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
  <div class="lock-ritual-overlay">
    <div class="overlay-backdrop"></div>
    
    <div class="ritual-card">
      <div class="header">
        <BlockRenderer
          v-for="(block, i) in (schema.blocks || []).filter(b => b.position === 'header')"
          :key="i"
          :block="block"
        />
      </div>

      <div class="ritual-center">
        <template v-if="schema.id === 'hold_to_lock' || schema.blocks?.some(b => b.type === 'hold_button')">
          <div 
            class="hold-button-wrap"
            @mousedown="startHold"
            @mouseup="stopHold"
            @mouseleave="stopHold"
            @touchstart="startHold"
            @touchend="stopHold"
          >
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            <button class="lock-btn" :class="{ holding: isHolding }">
              {{ isHolding ? 'Committing...' : (schema.blocks?.find(b => b.type === 'hold_button')?.label || 'Hold to Lock') }}
            </button>
          </div>
          <p class="hint">Structure builds identity.</p>
        </template>
        <template v-else>
          <div class="blocks-container">
            <BlockRenderer
              v-for="(block, i) in (schema.blocks || []).filter(b => !b.position || b.position === 'content')"
              :key="i"
              :block="block"
            />
          </div>
        </template>
      </div>

      <div class="footer">
        <BlockRenderer
          v-for="(block, i) in (schema.blocks || []).filter(b => b.position === 'footer')"
          :key="i"
          :block="block"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.lock-ritual-overlay {
  position: fixed;
  inset: 0;
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.overlay-backdrop {
  position: absolute;
  inset: 0;
  /* Spec: #000000 opacity 0.6, blur 7px */
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(7px);
}

.ritual-card {
  position: relative;
  z-index: 10;
  /* Spec: max_width 420px, background #111827, border #374151, radius 20px, padding 32px */
  width: 100%;
  max-width: 420px;
  background: #111827;
  border: 1px solid #374151;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: enter-ritual 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes enter-ritual {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.header {
  margin-bottom: 32px;
  text-align: center;
}

.ritual-center {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.hold-button-wrap {
  position: relative;
  width: 100%;
  height: 56px;
  border-radius: 28px;
  overflow: hidden;
  background: #1F2937; /* Spec: #1F2937 */
  border: 1px solid #4B5563; /* Spec: #4B5563 */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: var(--gold-gradient); /* Spec: progress_ring/glow_color #C9A227 */
  transition: width 0.05s linear;
  opacity: 0.8;
}

.lock-btn {
  background: none;
  border: none;
  color: white;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
  z-index: 2;
  pointer-events: none;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.hint {
  color: rgba(243, 244, 246, 0.4);
  font-size: 13px;
  letter-spacing: 0.5px;
  margin: 0;
}

.footer {
  margin-top: 32px;
}

.blocks-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
}

/* Typography Overrides */
:deep(.micro-label) {
  font-family: var(--font-sans);
  font-size: 12px;
  letter-spacing: 1.5px;
  color: rgba(243, 244, 246, 0.5);
  margin-bottom: 8px;
  text-transform: uppercase;
}

:deep(.headline) {
  font-family: "Cormorant Garamond", serif;
  font-size: 32px;
  font-weight: 500;
  color: #F3F4F6;
  line-height: 1.2;
}

:deep(.subtext) {
  font-family: var(--font-sans);
  font-size: 15px;
  color: rgba(243, 244, 246, 0.6);
  margin-top: 4px;
}
</style>
