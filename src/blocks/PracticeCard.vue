<template>
  <div class="practice-card" :class="{ completed: isCompleted }">
    <div class="gold-accent-line"></div>
    <div class="card-content">
      <div class="icon-section">
        <i :class="isCompleted ? 'fas fa-lock' : block.icon"></i>
      </div>
      <div class="text-section">
        <span v-if="block.purpose" class="purpose-tag">{{
          block.purpose
        }}</span>
        <div class="title-row">
          <h3 class="title">
            {{ block.id ? (screenStore.screenState[block.id + '_title'] || block.title) : block.title }}
          </h3>
          <button
            v-if="block.info_action"
            class="info-btn"
            @click.stop="handleInfo"
          >
            <i class="fas fa-info-circle"></i>
          </button>
        </div>
        <p class="description">
          {{ block.id ? (screenStore.screenState[block.id + '_description'] || block.description) : block.description }}
        </p>
        <p v-if="block.meta || (block.id && screenStore.screenState[block.id + '_meta'])" class="meta">
          {{ block.id ? (screenStore.screenState[block.id + '_meta'] || block.meta) : block.meta }}
        </p>
      </div>
    </div>
    <button v-if="!isCompleted" class="action-btn" @click.stop="handleAction">
      {{ block.action_label || "Start →" }}
    </button>
    <div v-else class="completed-badge">
      <i class="fas fa-lock" style="margin-right: 4px; font-size: 10px"></i>
      Locked
    </div>
  </div>
</template>

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

function handleInfo() {
  if (props.block.info_action) {
    screenStore.handleAction(props.block.info_action);
  }
}
</script>

<style scoped>
.practice-card {
  background: var(--surface-2);
  backdrop-filter: var(--glass-effect);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  transition: var(--transition-base);
}

.practice-card.completed {
  opacity: 0.6;
}

.gold-accent-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--gold-gradient);
  opacity: 0.8;
}

.completed .gold-accent-line {
  background: #10b981;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.icon-section {
  font-size: 28px;
  color: var(--gold-accent, #c9a84c);
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(191, 165, 138, 0.05);
  border-radius: 12px;
}

.completed .icon-section {
  color: #10b981;
}

.text-section {
  display: flex;
  flex-direction: column;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title {
  font-family: var(--font-sans);
  font-size: 18px;
  color: var(--text-primary);
  margin: 0;
  font-weight: 600;
}

.info-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  font-size: 14px;
  opacity: 0.6;
}

.info-btn:hover {
  color: var(--gold-accent);
  transform: scale(1.1);
  opacity: 1;
}

.description {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 2px 0 0;
  line-height: 1.5;
  font-style: italic;
}

.meta {
  font-size: 11px;
  color: var(--text-secondary);
  margin: 6px 0 0;
  opacity: 0.8;
  letter-spacing: 0.5px;
}

.action-btn {
  background: var(--gold-gradient);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  margin-left: 16px;
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(184, 114, 26, 0.2);
}

.completed-badge {
  background: rgba(16, 185, 129, 0.08);
  color: #10b981;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.purpose-tag {
  font-size: 9px;
  letter-spacing: 1.5px;
  color: #bfa58a;
  font-weight: 700;
  margin-bottom: 2px;
  display: inline-block;
}
</style>
