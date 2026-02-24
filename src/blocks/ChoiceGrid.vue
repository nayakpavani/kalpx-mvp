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
  
  // Update store with selection
  screenStore.setScreenValue(option.id, props.block.id || "current_prana");

  // Handle auto-advance if enabled
  if (props.block.auto_advance) {
    setTimeout(() => {
        const onSelect = screenStore.currentScreen?.on_select;
        if (onSelect) {
            const targetAction = onSelect[option.id] || onSelect["default"];
            if (targetAction) {
                screenStore.handleAction(targetAction);
            }
        } else if (props.block.target) {
            screenStore.handleAction({ type: 'navigate', target: props.block.target });
        }
    }, 500);
  }
}
</script>

<template>
  <div class="choice-grid" :style="block.style">
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
      <span class="label">{{ option.title }}</span>
    </div>
  </div>
</template>

<style scoped>
.choice-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.grid-card {
  aspect-ratio: 1;
  background: white;
  border: 1px solid rgba(184, 134, 11, 0.1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.grid-card:hover {
  transform: translateY(-2px);
  border-color: rgba(184, 134, 11, 0.2);
}

.grid-card.selected {
  border-color: var(--gold-accent, #c9a84c);
  background-color: #fffaf0;
  box-shadow: 0 8px 20px rgba(184, 134, 11, 0.15);
  border-width: 2px;
}

.icon-wrap {
  font-size: 32px;
  color: var(--text-secondary, #8c8881);
  transition: color 0.3s ease;
}

.selected .icon-wrap {
  color: var(--gold-accent, #c9a84c);
}

/* Specific icon colors if needed */
.icon-wrap i.fa-sun { color: #f59e0b; }
.icon-wrap i.fa-balance-scale { color: #10b981; }
.icon-wrap i.fa-cloud-showers-heavy { color: #6366f1; }
.icon-wrap i.fa-arrow-down { color: #6b7280; }

.label {
  font-size: 14px;
  color: var(--text-primary, #3d3b38);
  font-weight: 500;
}
</style>
