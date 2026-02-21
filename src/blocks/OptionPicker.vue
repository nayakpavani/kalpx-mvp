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
  <div class="option-picker-block">
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
.option-picker-block {
  margin: 20px 0;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 12px;
}

.opt-btn {
  background: white;
  border: 1px solid var(--border-color);
  padding: 16px 8px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
}

.opt-btn.active {
  border-color: var(--gold-accent);
  background: #fffaf0;
  box-shadow: 0 4px 12px rgba(184, 134, 11, 0.1);
}

.value {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}

.unit {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--text-secondary);
  letter-spacing: 1px;
}
</style>
