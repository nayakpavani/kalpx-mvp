<script setup>
import { ref } from "vue";
import { useScreenStore } from "../store/screenStore";

// const props = defineProps({
//   block: Object,
// });

const screenStore = useScreenStore();
const isRunning = ref(false);

function trigger(action) {
  if (action === "start" || action === "resume") isRunning.value = true;
  if (action === "pause") isRunning.value = false;

  // Send event to timer display via store
  screenStore.setScreenValue(action, "timer_control_event");
}
</script>

<template>
  <div class="timer-controls-block">
    <button
      v-if="!isRunning"
      class="control-btn play"
      @click="trigger('start')"
    >
      <i class="fas fa-play"></i> Start
    </button>
    <button v-else class="control-btn pause" @click="trigger('pause')">
      <i class="fas fa-pause"></i> Pause
    </button>
  </div>
</template>

<style scoped>
.timer-controls-block {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.control-btn {
  background: var(--surface-1);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 16px 40px;
  border-radius: 40px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: var(--surface-2);
  border-color: var(--gold-accent);
}

.control-btn.play {
  background: var(--gold-gradient);
  color: #1a1a1a;
  border: none;
  font-weight: 700;
}
</style>
