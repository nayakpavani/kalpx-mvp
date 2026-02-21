<script setup>
import { ref, computed } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();
const selectedId = ref(null);

const options = computed(() => {
  return props.block.options || screenStore.screenState[props.block.options_key] || [];
});

// Initialize with already selected option if any
const initialSelected = options.value.find((opt) => opt.selected);
if (initialSelected) {
  selectedId.value = initialSelected.id;
  // Ensure the initial selection is in the store
  screenStore.setScreenValue(
    initialSelected.id,
    props.block.id || "current_choice",
  );
}

function selectOption(option) {
  selectedId.value = option.id;
  
  // Update store with selection
  screenStore.setScreenValue(option.id, props.block.id || "current_choice");

  const selectionMode = props.block.selection_mode;
  const isAuto = selectionMode === "auto" || selectionMode === "single_auto_advance";

  if (isAuto) {
    // 1. Check for action on the option itself
    if (option.action) {
      screenStore.handleAction(option.action);
      return;
    }

    // 2. Check for state-level on_select mapping
    const onSelect = screenStore.currentScreen?.on_select;
    if (onSelect) {
      const targetAction = onSelect[option.id] || onSelect["default"];
      if (targetAction) {
        screenStore.handleAction(targetAction);
        return;
      }
    }

    // 3. If no specific action, handle as simple navigation if target exists
    if (props.block.target) {
       screenStore.handleAction({ type: 'navigate', target: props.block.target });
    }
  }
}
</script>

<template>
  <div class="choice-stack">
    <div
      v-for="option in options"
      :key="option.id"
      class="choice-card"
      :class="{ selected: selectedId === option.id }"
      @click="selectOption(option)"
    >
      <div class="gold-accent-line"></div>
      <div class="card-left">
        <div v-if="option.icon" class="icon-wrap">
          <i :class="option.icon"></i>
        </div>
        <div class="details">
          <h3 class="title">{{ option.title }}</h3>
          <p class="description">{{ option.description }}</p>
          <p v-if="option.meta" class="meta-text">{{ option.meta }}</p>
        </div>
      </div>
      <div class="selection-indicator">
        <div v-if="selectedId === option.id" class="check-mark">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#B8860B" />
            <path
              d="M8 12L11 15L16 9"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div v-else class="empty-circle"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.choice-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.choice-card {
  background: white;
  border: 1px solid rgba(184, 134, 11, 0.1);
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  overflow: hidden;
}

.gold-accent-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--gold-gradient);
  opacity: 0.1;
  transition: opacity 0.3s ease;
}

.choice-card.selected {
  border-color: rgba(184, 134, 11, 0.4);
  background-color: #fffaf0;
  box-shadow: 0 10px 25px rgba(184, 134, 11, 0.1);
}

.choice-card.selected .gold-accent-line {
  opacity: 1;
}

.card-left {
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 1;
}

.icon-wrap {
  font-size: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold-accent);
}

.title {
  font-family: var(--font-serif);
  font-size: 19px;
  font-weight: 500;
  margin: 0;
  color: #3d3b38;
}

.description {
  font-size: 14px;
  color: #8c8881;
  margin: 2px 0 0;
}

.meta-text {
  font-size: 13px;
  color: #3d3b38;
  font-style: italic;
  margin: 4px 0 0;
  opacity: 0.8;
}

.selection-indicator {
  z-index: 1;
}

.empty-circle {
  width: 22px;
  height: 22px;
  border: 1.5px solid #e0ddd7;
  border-radius: 50%;
}

.check-mark {
  display: flex;
  align-items: center;
}
</style>
