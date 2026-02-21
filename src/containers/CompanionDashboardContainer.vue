<script setup>
import { computed } from "vue";
import BlockRenderer from "../engine/BlockRenderer.vue";
import { useScreenStore } from "../store/screenStore";

const props = defineProps({
  schema: Object,
});

const screenStore = useScreenStore();

const progress = computed(() => {
  const cards = props.schema.blocks.filter((b) => b.type === "practice_card");
  if (cards.length === 0) return 0;
  const completed = cards.filter((b) => screenStore.screenState[b.id]).length;
  return completed / cards.length;
});

const isDayComplete = computed(() => progress.value === 1);
const daysRemaining = computed(() => 14 - (props.schema.day_number || 1));
</script>

<template>
  <div class="dashboard-container">
    <div class="header-section">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter((b) =>
          ['headline', 'subtext', 'identity_indicator'].includes(b.type),
        )"
        :key="'header-' + i"
        :block="block"
      />
      <div class="cycle-progress-bar">
        <div
          class="bar-fill"
          :style="{ width: ((schema.day_number || 1) / 14) * 100 + '%' }"
        ></div>
      </div>
    </div>

    <div class="progress-section">
      <div class="progress-ring-outer">
        <div class="progress-ring-inner">
          <span class="day-count">Day {{ schema.day_number || 1 }}</span>
          <span class="status-msg">{{
            isDayComplete ? "Day Sealed" : "Begins Today"
          }}</span>
        </div>
        <svg class="ring-svg" viewBox="0 0 100 100">
          <circle class="ring-bg" cx="50" cy="50" r="45" />
          <circle
            class="ring-progress"
            cx="50"
            cy="50"
            r="45"
            :style="{
              strokeDashoffset: 282 - 282 * progress,
              stroke: isDayComplete ? '#10b981' : '#bfa58a',
            }"
          />
        </svg>
      </div>
    </div>

    <div class="reminder-section" v-if="isDayComplete">
      <p class="remaining-text serif">
        {{ daysRemaining }} sessions remaining in this cycle.
      </p>
      <!-- <button 
        class="seal-day-btn" 
        @click="screenStore.handleAction({ type: 'seal_day' })"
      >
        Seal Day {{ schema.day_number || 1 }} & Advance →
      </button> -->
    </div>

    <div class="practice-list">
      <BlockRenderer
        v-for="(block, i) in schema.blocks.filter(
          (b) => b.type === 'practice_card',
        )"
        :key="'practice-' + i"
        :block="block"
      />
    </div>

    <!-- Render any floating buttons or overlays -->
    <BlockRenderer
      v-for="(block, i) in schema.blocks.filter(
        (b) => b.type === 'floating_button',
      )"
      :key="'floating-' + i"
      :block="block"
    />
    <!-- 
    <div class="quick-actions">
       <button class="action-btn gold" @click="screenStore.handleAction(schema.triggered_action)">
         I Feel Triggered
       </button>
       <button class="action-btn outline" @click="screenStore.handleAction(schema.checkin_action)">
         Quick Check-In
       </button>
    </div> -->

    <div class="dashboard-footer">
      <div class="divider">
        <div class="diamond"></div>
      </div>
      <div class="footer-link-wrap">
        <BlockRenderer
          v-for="(block, i) in schema.blocks.filter(
            (b) => b.position === 'footer',
          )"
          :key="'footer-' + i"
          :block="block"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px 24px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.header-section {
  text-align: center;
  margin-bottom: 32px;
}

.cycle-summary {
  font-size: 20px;
  color: #3d3b38;
  margin-bottom: 12px;
}

.cycle-progress-bar {
  height: 2px;
  background: rgba(191, 165, 138, 0.2);
  width: 100%;
  margin: 0 auto 20px;
  border-radius: 1px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--gold-accent);
  transition: width 0.8s ease-in-out;
}

.header-sub {
  font-size: 14px;
  color: #8c8881;
  font-family: var(--font-sans);
}

.progress-section {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.progress-ring-outer {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.day-count {
  font-family: var(--font-serif);
  font-size: 32px;
  color: #3d3b38;
}

.status-msg {
  font-size: 14px;
  color: #8c8881;
}

.ring-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-bg {
  fill: none;
  stroke: #f4eee0;
  stroke-width: 4;
}

.ring-progress {
  fill: none;
  stroke: #bfa58a;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 282;
  transition: stroke-dashoffset 0.8s ease-in-out;
}

.practice-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.quick-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 40px;
}

.action-btn {
  padding: 14px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.action-btn.gold {
  background: var(--gold-gradient);
  color: white;
  border: none;
}

.action-btn.outline {
  background: white;
  border: 1px solid var(--gold-accent);
  color: #3d3b38;
}

.reminder-section {
  text-align: center;
  margin-bottom: 24px;
  animation: fadeIn 1s ease-out;
}

.remaining-text {
  font-size: 16px;
  color: #bfa58a;
  font-style: italic;
  margin-bottom: 16px;
}

.seal-day-btn {
  background: var(--gold-gradient);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 40px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(191, 165, 138, 0.3);
  transition: all 0.3s ease;
}

.seal-day-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(191, 165, 138, 0.4);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dashboard-footer {
  margin-top: auto;
  text-align: center;
}

.divider {
  position: relative;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(191, 165, 138, 0.3) 50%,
    transparent 100%
  );
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.diamond {
  width: 6px;
  height: 6px;
  background: #bfa58a;
  transform: rotate(45deg);
}

.footer-link-wrap {
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #8c8881;
}
</style>
