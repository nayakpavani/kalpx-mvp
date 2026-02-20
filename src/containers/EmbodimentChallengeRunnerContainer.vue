<script setup>
import { ref } from "vue";
import BlockRenderer from "../engine/BlockRenderer.vue";
import { useScreenStore } from "../store/screenStore";

defineProps({
  schema: Object,
});

const screenStore = useScreenStore();
const selectedOutcome = ref(null);

function selectOutcome(outcome) {
  selectedOutcome.value = outcome;
}
</script>

<template>
  <div class="embodiment-runner">
    <div class="header">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter(b => b.position === 'header')"
        :key="i"
        :block="block"
      />
    </div>

    <div class="challenge-card">
       <h2 class="challenge-text">{{ schema.challenge_text }}</h2>
    </div>

    <div class="outcome-selector">
       <p class="question">Did this occur today?</p>
       <div class="toggle-group">
          <button 
            v-for="opt in ['Completed', 'Avoided', 'Not Tested']" 
            :key="opt"
            class="outcome-btn"
            :class="{ active: selectedOutcome === opt }"
            @click="selectOutcome(opt)"
          >
            {{ opt }}
          </button>
       </div>
    </div>

    <div class="footer">
       <button 
        class="return-btn" 
        :disabled="!selectedOutcome"
        @click="screenStore.handleAction(schema.complete_action)"
      >
        Return to Day
      </button>
    </div>
  </div>
</template>

<style scoped>
.embodiment-runner {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px 24px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.header {
  margin-bottom: 32px;
  text-align: center;
}

.challenge-card {
  background: white;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
}

.challenge-text {
  font-family: var(--font-serif);
  font-size: 26px;
  line-height: 1.5;
  color: #1a1a1a;
  margin: 0;
}

.outcome-selector {
  text-align: center;
  margin-bottom: 40px;
}

.question {
  color: #888;
  font-size: 16px;
  margin-bottom: 20px;
}

.toggle-group {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.outcome-btn {
  background: #f4eee0;
  border: 1px solid transparent;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #3d3b38;
  cursor: pointer;
  transition: all 0.3s ease;
}

.outcome-btn.active {
  background: white;
  border-color: var(--gold-accent);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
}

.return-btn {
  width: 100%;
  background: var(--gold-gradient);
  color: #000;
  border: none;
  padding: 16px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.return-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
