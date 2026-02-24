<script setup>
import { computed } from "vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  block: Object,
});

const screenStore = useScreenStore();

const isCompleted = computed(() => {
  if (!props.block.id) return false;
  return !!screenStore.screenState[props.block.id];
});

function handleAction() {
  if (isCompleted.value) return;
  if (props.block.action) {
    screenStore.handleAction(props.block.action);
  }
}
</script>

<template>
  <div class="practice-card" :class="{ completed: isCompleted, awareness: block.category === 'awareness' }" @click="handleAction">
    <div class="card-body">
      <div class="content-left">
        <h4 v-if="block.purpose" class="micro-label">{{ block.purpose }}</h4>
        <h3 class="title">
          {{ block.id ? (screenStore.screenState[block.id + '_title'] || block.title) : block.title }}
        </h3>
        <p class="description">
          {{ block.id ? (screenStore.screenState[block.id + '_description'] || block.description) : block.description }}
        </p>
      </div>

      <div class="center-meta" v-if="block.meta">
        <span class="meta-tag">{{ block.meta }}</span>
      </div>

      <div class="action-zone">
        <div v-if="isCompleted" class="locked-state">
           <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
             <path d="M12 7V5C12 2.23858 9.76142 0 7 0C4.23858 0 2 2.23858 2 5V7H1C0.447715 7 0 7.44772 0 8V17C0 17.5523 0.447715 18 1 18H13C13.5523 18 14 17.5523 14 17V8C14 7.44772 13.5523 7 13 7H12ZM4 5C4 3.34315 5.34315 2 7 2C8.65685 2 10 3.34315 10 5V7H4V5ZM7 13.5C6.17157 13.5 5.5 12.8284 5.5 12C5.5 11.1716 6.17157 10.5 7 10.5C7.82843 10.5 8.5 11.1716 8.5 12C8.5 12.8284 7.82843 13.5 7 13.5Z" fill="rgba(243, 244, 246, 0.4)"/>
           </svg>
        </div>
        <button v-else class="start-btn">
          {{ block.action_label || 'Begin' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.practice-card {
  position: relative;
  background: #1F2937; /* Spec: #1F2937 */
  border: 1px solid #374151; /* Spec: #374151 */
  border-radius: 16px; /* Spec: 16px */
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  width: 100%;
}

.practice-card.awareness {
  background: #273244; /* Spec: slightly elevated #273244 */
  border-color: #4B5563;
}

.practice-card:hover:not(.completed) {
  background: #273244;
  border-color: #4B5563;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.practice-card.completed {
  opacity: 0.5;
  cursor: default;
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.content-left {
  flex: 1;
  text-align: left;
}

.micro-label {
  font-family: var(--font-sans);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #C9A227;
  margin: 0 0 8px;
  font-weight: 700;
}

.title {
  font-family: "Cormorant Garamond", serif;
  font-size: 21px; /* Spec: ~20px */
  font-weight: 500;
  color: #F3F4F6;
  margin: 0;
  line-height: 1.2;
}

.description {
  font-family: var(--font-sans);
  font-size: 15px;
  color: rgba(243, 244, 246, 0.6);
  margin: 6px 0 0;
  line-height: 1.4;
}

.center-meta { margin: 0 12px; }

.meta-tag {
  font-size: 12px;
  color: rgba(243, 244, 246, 0.4);
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 10px;
  border-radius: 100px;
  white-space: nowrap;
}

.action-zone {
  display: flex;
  align-items: center;
  justify-content: center;
}

.start-btn {
  background: #C9A227; /* Gold focus */
  color: #111827;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.start-btn:active {
  transform: scale(0.95);
}

.locked-state {
  opacity: 0.6;
}
</style>
