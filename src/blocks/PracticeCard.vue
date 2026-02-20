<template>
  <div>
    <div class="card-content">
      <div class="icon-section">
        <i :class="isCompleted ? 'fas fa-lock' : block.icon"></i>
      </div>
      <div class="text-section">
        <span v-if="block.purpose" class="purpose-tag">{{
          block.purpose
        }}</span>
        <div class="title-row">
          <h3 class="title">{{ block.title }}</h3>
          <button
            v-if="block.info_action"
            class="info-btn"
            @click.stop="handleInfo"
          >
            <i class="fas fa-info-circle"></i>
          </button>
        </div>
        <p class="description">{{ block.description }}</p>
        <p v-if="block.meta" class="meta">{{ block.meta }}</p>
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
  background: white;
  border: 1px solid rgba(191, 165, 138, 0.2);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  transition: all 0.4s ease;
}

.practice-card.completed {
  background: #fdfdfd;
  opacity: 0.8;
  border-color: #e0eee0;
}

.gold-accent-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--gold-gradient);
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
  color: var(--gold-accent);
  width: 40px;
  display: flex;
  justify-content: center;
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
  font-family: var(--font-serif);
  font-size: 20px;
  color: #3d3b38;
  margin: 0;
  font-weight: 500;
}

.info-btn {
  background: transparent;
  border: none;
  color: #bfa58a;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  font-size: 14px;
}

.info-btn:hover {
  color: var(--gold-accent);
  transform: scale(1.1);
}

.description {
  font-size: 14px;
  color: #8c8881;
  margin: 4px 0 0;
  line-height: 1.4;
}

.meta {
  font-size: 12px;
  color: #bfa58a;
  margin: 4px 0 0;
  font-style: italic;
}

.action-btn {
  background: var(--gold-gradient);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  margin-left: 16px;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(201, 162, 39, 0.2);
}

.completed-badge {
  color: #10b981;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-left: 16px;
}

.purpose-tag {
  font-size: 10px;
  letter-spacing: 1.5px;
  color: #bfa58a;
  font-weight: 700;
  margin-bottom: 4px;
  display: inline-block;
}
</style>
