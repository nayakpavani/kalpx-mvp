<script setup>
import { computed, ref } from "vue";
import { useScreenStore } from "../store/screenStore";
import { mockScreens } from "../mock/screens";

import PortalContainer from "../containers/PortalContainer.vue";
import ChoiceStackContainer from "../containers/ChoiceStackContainer.vue";
import ComposerContainer from "../containers/ComposerContainer.vue";
import LockRitualOverlay from "../containers/LockRitualOverlay.vue";
import RoutineBuilderContainer from "../containers/RoutineBuilderContainer.vue";
import RoutineLockedContainer from "../containers/RoutineLockedContainer.vue";
import CompanionDashboardContainer from "../containers/CompanionDashboardContainer.vue";
import PracticeRunnerContainer from "../containers/PracticeRunnerContainer.vue";
import EmbodimentChallengeRunnerContainer from "../containers/EmbodimentChallengeRunnerContainer.vue";
import AwarenessTriggerContainer from "../containers/AwarenessTriggerContainer.vue";
import InsightsProgressContainer from "../containers/InsightsProgressContainer.vue";
import PortalSplashContainer from "../containers/PortalSplashContainer.vue";
import InsightSummaryContainer from "../containers/InsightSummaryContainer.vue";
import SadhanaDeepenContainer from "../containers/SadhanaDeepenContainer.vue";
import CycleTransitionsContainer from "../containers/CycleTransitionsContainer.vue";
import StableScanContainer from "../containers/StableScanContainer.vue";

const screenStore = useScreenStore();

const containerMap = {
  portal: PortalContainer,
  portal_splash: PortalSplashContainer,
  choice_stack: ChoiceStackContainer,
  composer: ComposerContainer,
  lock_ritual: LockRitualOverlay,
  routine_builder: RoutineBuilderContainer,
  routine_locked: RoutineLockedContainer,
  dashboard: CompanionDashboardContainer,
  practice_runner: PracticeRunnerContainer,
  embodiment_runner: EmbodimentChallengeRunnerContainer,
  awareness_trigger: AwarenessTriggerContainer,
  insights_progress: InsightsProgressContainer,
  insight_summary: InsightSummaryContainer,
  sadhana_deepen: SadhanaDeepenContainer,
  cycle_transitions: CycleTransitionsContainer,
  stable_scan: StableScanContainer,
};

const currentComponent = computed(() => {
  const containerId = screenStore.currentScreen?.container_id;
  return containerMap[containerId] || PortalContainer;
});

const themeClass = computed(() => `theme-${screenStore.currentTheme}`);
const moodClass = computed(() => `mood-${screenStore.currentMood}`);

// --- DEV TOOLS: Check any states ---
const isDevMode = ref(true);
const allScreenKeys = Object.keys(mockScreens);

function jumpToScreen(event) {
  if (event.target.value) {
    screenStore.loadScreen(event.target.value);
  }
}
</script>

<template>
  <div :class="['rendering-engine-container', themeClass, moodClass]">
    <component 
      :is="currentComponent" 
      :schema="screenStore.currentScreen" 
    />

    <!-- DEV MODE OVERLAY FOR TESTING -->
    <div v-if="isDevMode" class="dev-state-picker">
      <label>DevTools: View States</label>
      <select @change="jumpToScreen" :value="screenStore.currentKey">
        <option value="" disabled selected>Select a State (68+)</option>
        <option v-for="key in allScreenKeys" :key="key" :value="key">
          {{ key }}
        </option>
      </select>
    </div>
  </div>
</template>

<style>
/* Global fade transitions for screen changes */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* DEV TOGGLE STYLES */
.dev-state-picker {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99999;
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(10px);
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(201, 168, 76, 0.5);
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dev-state-picker label {
  font-size: 10px;
  text-transform: uppercase;
  color: #c9a84c;
  letter-spacing: 1px;
}

.dev-state-picker select {
  font-family: var(--font-sans), monospace;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  max-width: 250px;
}
</style>
