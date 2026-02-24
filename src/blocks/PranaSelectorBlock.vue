<script setup>
import { ref } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const selectedId = ref(screenStore.screenState[props.block.id] || null);

function select(id) {
  selectedId.value = id;
  screenStore.setScreenValue(id, props.block.id);
  
  if (props.block.auto_next) {
     // handle auto next if needed
  }
}
</script>

<template>
  <div class="prana-selector-container">
    <div 
      v-for="opt in block.options" 
      :key="opt.id"
      class="prana-card"
      :class="{ selected: selectedId === opt.id }"
      @click="select(opt.id)"
    >
      <div class="icon-wrap">
        <i :class="opt.icon"></i>
      </div>
      <span class="label">{{ opt.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.prana-selector-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
  margin: 20px 0;
}

.prana-card {
  background: #1F2937;
  border: 1px solid #374151;
  border-radius: 12px;
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
}

.prana-card:hover {
  transform: translateY(-4px);
  border-color: #4B5563;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

.prana-card.selected {
  border-color: #C1A227; /* Gold accent */
  background: rgba(193, 162, 39, 0.05);
  box-shadow: 0 0 0 1px #C1A227, 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

.icon-wrap {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: rgba(243, 244, 246, 0.4);
  transition: all 0.3s ease;
}

.prana-card.selected .icon-wrap {
  color: #C1A227;
  transform: scale(1.1);
}

.label {
  font-size: 12px;
  font-weight: 500;
  color: rgba(243, 244, 246, 0.6);
  text-align: center;
}

.prana-card.selected .label {
  color: #F3F4F6;
}

@media (max-width: 400px) {
  .prana-selector-container {
    gap: 8px;
  }
  .icon-wrap {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
}
</style>
