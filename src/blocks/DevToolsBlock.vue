<script setup>
import { useScreenStore } from "../store/screenStore";

// const props = defineProps({
//   block: Object,
// });

const screenStore = useScreenStore();

function setDay(day) {
  screenStore.setScreenValue(day, "day_number");
  // Trigger a re-render or navigation if needed
  if (day === 7) {
    screenStore.handleAction({
      type: "navigate",
      target: {
        container_id: "insights_progress",
        state_id: "milestone_7_day",
      },
    });
  } else if (day === 14) {
    screenStore.handleAction({
      type: "navigate",
      target: {
        container_id: "insights_progress",
        state_id: "cycle_graduation",
      },
    });
  } else {
    screenStore.handleAction({
      type: "navigate",
      target: { container_id: "companion_dashboard", state_id: "day_active" },
    });
  }
}
</script>

<template>
  <div class="dev-tools-block">
    <span class="label">DEV CONTROLS</span>
    <div class="btn-group">
      <button @click="setDay(1)">Day 1</button>
      <button @click="setDay(7)">Day 7</button>
      <button @click="setDay(14)">Day 14</button>
    </div>
  </div>
</template>

<style scoped>
.dev-tools-block {
  margin-top: 40px;
  padding: 16px;
  border: 1px dashed rgba(243, 244, 246, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.label {
  font-size: 10px;
  letter-spacing: 2px;
  color: rgba(243, 244, 246, 0.4);
  font-weight: 700;
}

.btn-group {
  display: flex;
  gap: 8px;
}

button {
  background: #374151;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  background: #4b5563;
}
</style>
