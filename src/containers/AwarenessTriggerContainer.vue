<script setup>
import { ref } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  schema: Object,
});

const screenStore = useScreenStore();
const currentStep = ref(0);

function nextStep() {
  if (currentStep.value < props.schema.steps.length - 1) {
    currentStep.value++;
  } else {
    screenStore.handleAction(props.schema.complete_action);
  }
}
</script>

<template>
  <div class="awareness-container">
    <div class="header">
       <button class="exit-btn" @click="screenStore.handleAction({ type: 'back' })">Exit</button>
    </div>

    <div class="step-content">
       <div v-if="schema.steps[currentStep].type === 'question'" class="question-step">
          <h2 class="question">{{ schema.steps[currentStep].text }}</h2>
          <div class="choices">
             <button 
              v-for="choice in schema.steps[currentStep].choices" 
              :key="choice.text"
              class="choice-btn"
              @click="nextStep"
            >
              {{ choice.text }}
            </button>
          </div>
       </div>

       <div v-if="schema.steps[currentStep].type === 'breath'" class="breath-step" @click="nextStep">
          <h2 class="instruction">{{ schema.steps[currentStep].text }}</h2>
          <div class="breath-circle"></div>
          <p class="hint">Tap when centered</p>
       </div>
    </div>
  </div>
</template>

<style scoped>
.awareness-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0b1220;
  color: white;
  padding: 40px 24px;
}

.exit-btn {
  background: none;
  border: none;
  color: rgba(255,255,255,0.4);
  font-size: 16px;
  cursor: pointer;
}

.step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.question {
  font-family: var(--font-serif);
  font-size: 28px;
  margin-bottom: 40px;
}

.choices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
}

.choice-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  padding: 16px;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.choice-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: var(--gold-accent);
}

.breath-circle {
  width: 150px;
  height: 150px;
  border: 2px solid var(--gold-accent);
  border-radius: 50%;
  margin: 40px 0;
  animation: breathe 8s infinite ease-in-out;
}

@keyframes breathe {
  0%, 100% { transform: scale(0.8); opacity: 0.3; }
  50% { transform: scale(1.3); opacity: 0.8; }
}

.instruction {
  font-family: var(--font-serif);
  font-size: 32px;
}

.hint {
  color: rgba(255,255,255,0.3);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 12px;
}
</style>
