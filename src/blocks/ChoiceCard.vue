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
    // Small delay for visual feedback as per MD (150ms)
    setTimeout(() => {
      if (option.action) {
        screenStore.handleAction(option.action);
        return;
      }

      if (props.block.target) {
        screenStore.handleAction({ type: 'navigate', target: props.block.target });
      }
    }, 150);
  }
}
</script>

<template>
  <div class="choice-cards-stack">
    <div
      v-for="option in options"
      :key="option.id"
      class="choice-card"
      :class="{ selected: selectedId === option.id, recommended: option.Recommended }"
      @click="selectOption(option)"
    >
      <div v-if="option.Recommended" class="micro-tag">Recommended</div>
      
      <div class="card-content">
        <h3 class="title">{{ option.title }}</h3>
        <p class="description">{{ option.description }}</p>
      </div>

      <div class="select-indicator">
        <div class="soft-gold-check" v-if="selectedId === option.id">
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <path d="M1 5.5L4.5 9L13 1" stroke="#C9A227" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.choice-cards-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.choice-card {
  position: relative;
  background: #1F2937; /* Spec: #1F2937 */
  border: 1px solid #374151; /* Spec: #374151 */
  border-radius: 16px; /* Spec: 16px */
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.choice-card:hover {
  border-color: #4B5563; /* Spec: #4B5563 */
  background: #242F3F;
}

.choice-card.selected {
  background: #273244; /* Spec: #273244 */
  border-color: #C9A227;
  box-shadow: 0 0 15px rgba(201, 162, 39, 0.1);
}

.card-content {
  flex: 1;
  text-align: left;
}

.title {
  font-family: var(--font-sans);
  font-size: 19px; /* Spec: 18-20px */
  font-weight: 500;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.2;
}

.description {
  font-family: var(--font-sans);
  font-size: 15px; /* Spec: 14-15px */
  color: rgba(243, 244, 246, 0.7); /* Spec: Opacity 70% */
  margin: 6px 0 0;
  line-height: 1.4;
}

.micro-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 11px;
  text-transform: uppercase;
  color: rgba(201, 162, 39, 0.7);
  letter-spacing: 1px;
  font-weight: 600;
}

.select-indicator {
  margin-left: 16px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.soft-gold-check {
  animation: check-fade 0.3s ease-out;
}

@keyframes check-fade {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
</style>
