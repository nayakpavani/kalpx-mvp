<script setup>
import { ref } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const initialSelected = props.block.options.find(opt => opt.selected);
const selectedId = ref(initialSelected?.id || null);

if (initialSelected) {
  screenStore.setScreenValue(initialSelected.id, props.block.id || props.block.label);
}

function selectChip(option) {
  selectedId.value = option.id;
  screenStore.setScreenValue(option.id, props.block.id || props.block.label);
}
</script>

<template>
  <div class="chip-list-container" :style="block.style">
    <div v-if="block.label" class="section-label">{{ block.label }}</div>
    <div class="chips-wrapper">
      <button 
        v-for="option in block.options" 
        :key="option.id"
        class="chip"
        :class="{ selected: selectedId === option.id }"
        @click="selectChip(option)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.chip-list-container {
  margin-bottom: 32px;
  text-align: center;
}

.section-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #bfa58a;
  margin-bottom: 20px;
  font-weight: 700;
}

.chips-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.chip {
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid #e0ddd7;
  background: white;
  color: #3d3b38;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.chip:hover {
  border-color: var(--gold-accent);
}

.chip.selected {
  background: var(--gold-gradient);
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 15px rgba(201, 162, 39, 0.3);
}
</style>
