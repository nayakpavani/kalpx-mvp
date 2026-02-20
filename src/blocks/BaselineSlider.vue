<script setup>
import { ref } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const value = ref(props.block.value || 5);

function updateValue(e) {
  value.value = parseInt(e.target.value);
  screenStore.setScreenValue(value.value, props.block.id || props.block.label);
}
</script>

<template>
  <div class="baseline-slider-block">
    <div class="slider-header">
      <span class="label">{{ block.label }}</span>
    </div>
    
    <div class="slider-track-wrap">
      <span class="range-hint">Low</span>
      <div class="input-container">
        <input 
          type="range" 
          min="1" 
          max="10" 
          :value="value" 
          @input="updateValue"
          class="custom-range"
        >
      </div>
      <span class="range-hint">High</span>
    </div>
    
    <div class="current-value">Current: {{ value }} / 10</div>
  </div>
</template>

<style scoped>
.baseline-slider-block {
  margin-bottom: 40px;
  width: 100%;
}

.slider-header {
  margin-bottom: 12px;
}

.label {
  font-family: var(--font-serif);
  font-size: 20px;
  color: #3d3b38;
}

.slider-track-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.input-container {
  flex: 1;
  display: flex;
  align-items: center;
}

.range-hint {
  font-size: 14px;
  color: #8c8881;
}

.custom-range {
  width: 100%;
  -webkit-appearance: none;
  height: 2px;
  background: #e0ddd7;
  border-radius: 1px;
  outline: none;
}

.custom-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  background: var(--gold-accent);
  border: 4px solid white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
}

.custom-range::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.current-value {
  text-align: center;
  font-size: 14px;
  color: #bfa58a;
  letter-spacing: 0.5px;
}
</style>
