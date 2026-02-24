<script setup>
import { ref, computed } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const selectedId = ref(null);

const options = computed(() => {
  return props.block.options || [];
});

function selectOption(option) {
  selectedId.value = option.id;
  
  // Update store with selection if block has an id
  if (props.block.id) {
    screenStore.setScreenValue(props.block.id, option.id);
  }

  // Handle action
  setTimeout(() => {
    if (option.action) {
      screenStore.handleAction(option.action);
    } else if (props.block.target) {
      screenStore.handleAction({ type: 'navigate', target: props.block.target });
    }
  }, 400);
}
</script>

<template>
  <div class="choice-grid-wrap">
    <div
      v-for="option in options"
      :key="option.id"
      class="grid-card"
      :class="{ selected: selectedId === option.id }"
      @click="selectOption(option)"
    >
      <div v-if="option.icon" class="icon-wrap">
        <i :class="option.icon"></i>
      </div>
      <span class="label">{{ option.label || option.title }}</span>
    </div>
  </div>
</template>

<style scoped>
.choice-grid-wrap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 420px;
  margin: 12px auto;
}

.grid-card {
  aspect-ratio: 1.2;
  background: #1F2937;
  border: 1px solid #374151;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 16px;
}

.grid-card:hover {
  background: #273244;
  border-color: #4B5563;
  transform: translateY(-2px);
}

.grid-card.selected {
  background: #273244;
  border-color: #C9A227;
  box-shadow: 0 0 20px rgba(201, 162, 39, 0.1);
}

.icon-wrap {
  font-size: 28px;
  color: rgba(243, 244, 246, 0.5);
  transition: color 0.3s ease;
}

.selected .icon-wrap {
  color: #C9A227;
}

.label {
  font-family: var(--font-sans);
  font-size: 14px;
  color: #F3F4F6;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
}
</style>
