<script setup>
import { ref } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const selectedValue = ref(screenStore.screenState[props.block.id] || null);

function select(val) {
  selectedValue.value = val;
  screenStore.setScreenValue(val, props.block.id);
}
</script>

<template>
  <div class="option-picker-wrap">
    <div class="options-grid">
      <button
        v-for="opt in block.options"
        :key="opt"
        class="opt-btn"
        :class="{ active: selectedValue === opt }"
        @click="select(opt)"
      >
        <span class="value">{{ opt }}</span>
        <span v-if="block.unit" class="unit">{{ block.unit }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.option-picker-wrap {
  margin: 16px 0;
  width: 100%;
}

.options-grid {
  display: grid;
  /* Optimized for routine picker (reps / minutes) */
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
}

.opt-btn {
  background: #1F2937;
  border: 1px solid #374151;
  padding: 20px 12px;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #F3F4F6;
}

.opt-btn:hover {
  background: #273244;
  border-color: #4B5563;
}

.opt-btn.active {
  background: #273244;
  border-color: #C9A227;
  box-shadow: 0 0 15px rgba(201, 162, 39, 0.1);
  transform: translateY(-2px);
}

.value {
  font-family: "Cormorant Garamond", serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
}

.unit {
  font-family: var(--font-sans);
  font-size: 11px;
  text-transform: uppercase;
  color: rgba(243, 244, 246, 0.5);
  letter-spacing: 1px;
}

.opt-btn.active .value {
  color: #C9A227;
}
</style>
