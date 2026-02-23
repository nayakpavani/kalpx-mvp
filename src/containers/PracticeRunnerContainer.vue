<script setup>
import { ref, computed } from "vue";
import { useScreenStore } from "../store/screenStore";
import BlockRenderer from "../engine/BlockRenderer.vue";

const props = defineProps({
  schema: Object,
});

const screenStore = useScreenStore();
const count = ref(0);

const statusMessage = computed(() => {
  if (count.value === 0) return "Ready to begin";
  if (count.value < props.schema.target_count / 2) return "Chant focused...";
  if (count.value < props.schema.target_count) return "Feel the resonance...";
  return "Practice complete";
});

function logRep() {
  if (props.schema.variant === 'mantra_runner') {
    count.value++;
    if (count.value >= props.schema.target_count) {
      setTimeout(() => {
        const action = props.schema.on_complete || props.schema.complete_action;
        if (action) screenStore.handleAction(action);
      }, 1000);
    }
  }
}
</script>

<template>
  <div class="practice-runner" :class="[`theme-${screenStore.currentTheme}`, `mood-${screenStore.currentMood}`]">
    <div class="header">
       <button class="exit-btn" @click="screenStore.handleAction({ type: 'back' })">
         <i class="fas fa-times"></i> Exit
       </button>
    </div>

    <div class="center-stage" @click="logRep">
      <div v-if="schema.variant === 'mantra_runner'" class="mantra-content">
         <div class="status-chip">{{ statusMessage }}</div>
         <h1 class="mantra-text">{{ schema.mantra_text }}</h1>
         <div class="counter-ring">
           <span class="count">{{ count }}</span>
           <span class="total">/ {{ schema.target_count }}</span>
         </div>
         <p class="tap-hint">Tap for each repetition</p>
      </div>

      <div v-if="schema.variant === 'sankalp_embody'" class="sankalp-content">
         <div class="status-chip">Embodiment</div>
         <h1 class="sankalp-text">"{{ schema.sankalp_text }}"</h1>
         <p class="instruction">Read slowly. Internalize. Commit.</p>
         <button class="activate-btn" @click="screenStore.handleAction(schema.on_complete || schema.complete_action)">
           I Embody This →
         </button>
      </div>

      <div v-else-if="schema.blocks" class="block-content">
         <BlockRenderer v-for="(block, i) in schema.blocks" :key="i" :block="block" />
      </div>
    </div>

    <div v-if="schema.variant === 'mantra_runner'" class="progress-bar-wrap">
       <div class="progress-line" :style="{ width: (count / schema.target_count) * 100 + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.practice-runner {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-gradient);
  color: var(--text-primary);
  padding: 40px 24px;
  transition: var(--transition-slow);
}

.header {
  height: 60px;
}

.exit-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.center-stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.status-chip {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--accent-primary);
  margin-bottom: 24px;
  opacity: 0.8;
}

.mantra-text, .sankalp-text {
  font-family: var(--font-serif);
  font-size: 40px;
  line-height: 1.4;
  max-width: 90%;
  margin-bottom: 40px;
  letter-spacing: -1px;
}

.counter-ring {
  margin-bottom: 20px;
}

.count {
  font-size: 84px;
  font-weight: 300;
  color: var(--text-primary);
  font-family: var(--font-sans);
}

.total {
  font-size: 24px;
  color: var(--text-secondary);
  margin-left: 8px;
}

.tap-hint {
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
  margin-top: 20px;
  animation: pulse-text 2s infinite ease-in-out;
}

@keyframes pulse-text {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

.activate-btn {
  background: var(--gold-gradient);
  color: #1a1a1a;
  border: none;
  padding: 20px 40px;
  border-radius: 40px;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  box-shadow: var(--gold-glow);
  transition: var(--transition-base);
}

.activate-btn:hover {
  transform: scale(1.05);
}

.progress-bar-wrap {
  height: 4px;
  background: rgba(255,255,255,0.1);
  width: 100%;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 40px;
}

.progress-line {
  height: 100%;
  background: var(--gold-gradient);
  transition: width 0.3s ease;
}
</style>
